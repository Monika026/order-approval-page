import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./UserReducer";
import { useNavigate } from "react-router-dom";

function Create() {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      addUser({
        id: users[users.length - 1].id + 1,
        productName,
        brand,
        price,
        quantity,
        total,
        status,
      })
    );
    Navigate("/");
  };
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h1>Add New Product Details</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              name="productName"
              className="form-control"
              placeholder="enter product name"
              onChange={(e) => setProductName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              name="brand"
              className="form-control"
              placeholder="enter brand"
              onChange={(e) => setBrand(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              name="price"
              className="form-control"
              placeholder="enter price"
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="text"
              name="quantity"
              className="form-control"
              placeholder="enter quantity"
              onChange={(e) => setQuantity(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="total">Total:</label>
            <input
              type="text"
              name="total"
              className="form-control"
              placeholder="enter total"
              onChange={(e) => setTotal(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <input
              type="text"
              name="status"
              className="form-control"
              placeholder="enter status"
              onChange={(e) => setStatus(e.target.value)}
            ></input>
          </div>
          <br />
          <button className="btn btn-info">submit</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
