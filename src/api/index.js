import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "../constants";

class API {
  constructor() {
    this.api_url = process.env.REACT_APP_API_URL;
  }

  _getAccessToken() {
    const tokenJSON = window.localStorage.getItem(
      LOCAL_STORAGE_ACCESS_TOKEN_KEY
    );

    if (tokenJSON) {
      try {
        const token = JSON.parse(tokenJSON);
        if (token && token.accessToken) {
          return token.accessToken;
        }
      } catch (err) {
        throw new Error("Unable to parse token");
      }
    }

    return null;
  }

  async request({ method, path, transformResponse, payload, query = {} }) {
    try {
      const config = {
        method: method || "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        qs: "",
      };

      const token = this._getAccessToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      if (Object.keys(query).length) {
        config.qs =
          "?" +
          Object.keys(query)
            .map(
              (k) => encodeURIComponent(k) + "=" + encodeURIComponent(query[k])
            )
            .join("&");
      }

      const response = await fetch(
        `${this.api_url}/v1${path}${config.qs}`,
        config
      );

      if (response.ok) {
        // debugger;
        let data = await response.json();

        if (typeof transformResponse == "function") {
          data = transformResponse(data);
        }

        return {
          data,
        };
      }

      const error = await response.json();

      return {
        error: `${error.code} - ${error.message}`,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}

export default new API();
