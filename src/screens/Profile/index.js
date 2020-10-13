import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "store/slices/ordersSlice";

import style from "./style.module.scss";

function Profile() {
  const dispatch = useDispatch();
  const selectedCurrency = useSelector((state) => state.global.currency);
  const profile = useSelector((state) => state.profile.data);
  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [selectedCurrency]);

  const renderOrders = () => {
    const { loading, ids, entities } = orders;

    if (loading) return "orders loading...";

    if (!ids.length) return "No Orders Yet";

    return (
      <div className={style["orders"]}>
        {ids.map((id) => {
          const data = entities[id];
          const { currency, value } = data.totalPrice;
          const { street, floor, flat } = data.address;

          return (
            <div className={style["orders-item"]} key={id}>
              <p>{`Street: ${street} Flat/Office: ${flat} Floor: ${floor}`}</p>
              <p>
                <b>Total Price:</b> {value} {currency.iso}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={style["profile"]}>
      <div className={style["profile-data"]}>
        <Link to="/">Go To Menu</Link>
        <h1>Profile</h1>
        <div>
          <b>Email:</b> {profile.email}
        </div>
        <div>
          <b>Name:</b> {profile.name}
        </div>
      </div>
      <div>
        <h2>History</h2>
        {renderOrders()}
      </div>
    </div>
  );
}

export default Profile;
