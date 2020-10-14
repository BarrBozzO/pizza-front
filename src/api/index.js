import { logout, getToken } from "store/slices/profileSlice";

class API {
  constructor(store) {
    this.api_url = process.env.REACT_APP_API_URL;
    this.store = store;
  }

  _getAccessToken() {
    const token = getToken(this.store.getState());

    if (token) {
      return token.accessToken;
    }

    return null;
  }

  _unAuthorize() {
    this.store.dispatch(logout());
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

      if (response.status === 401) {
        this._unAuthorize();
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

export default API;
