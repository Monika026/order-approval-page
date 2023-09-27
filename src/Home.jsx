import React, { useState } from "react";
import { Link } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SearchIcon from "@mui/icons-material/Search";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import IcecreamOutlinedIcon from "@mui/icons-material/IcecreamOutlined";
import SetMealIcon from "@mui/icons-material/SetMeal";
import Swal from "sweetalert2";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const users = useSelector((state) => state.users);
  const [items, setItems] = useState(users);
  const handleApproveClick = (index) => {
    const updatedItems = items.map((item) => {
      if (item.id === index + 1) {
        return { ...item, status: "Approved" };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleConfirm = async (index) => {
    const result = await Swal.fire({
      title: "Missing Product?",
      text: "Is Chicken Breast Fillets, Boneless matuu maMarinated 6 Ounce Raw, Invivid?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      const val = items.map((item) => {
        if (item.id === index + 1) {
          return { ...item, status: "Missing-Urgent" };
        }
        return item;
      });
      setItems(val);
    } else if (result.isDismissed) {
      const missing = items.map((item) => {
        if (item.id === index + 1) {
          return { ...item, status: "Missing" };
        }
        return item;
      });
      setItems(missing);
    }
  };
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Shipping Date</th>
            <th>Total</th>
            <th>Category</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>East Coast Fruits & Vegetables</td>
            <td>Mon, Oct 2</td>
            <td>$ 15,028.3</td>
            <td>
              <KebabDiningIcon />
              <SetMealIcon />
              <IcecreamOutlinedIcon />
            </td>
            <td>30-586-9000</td>
            <td>Awaiting your Approval</td>
          </tr>
        </tbody>
      </table>
      <input
        type="text"
        placeholder="search..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <SearchIcon />
      <Link
        to="/create"
        className="btn my-3"
        variant="outlined"
        style={{ float: "right", borderColor: "black" }}
      >
        Add Item
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items
            .filter((val) => {
              if (searchTerm == "") return val;
              else if (
                val.productName.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <tr key={index}>
                <td>{user.productName}</td>
                <td>{user.brand}</td>
                <td>{user.price}</td>
                <td>{user.quantity}</td>
                <td>{user.total}</td>
                <td>{user.status}</td>
                <td>
                  <button
                    className="btn btn-sm "
                    onClick={() => handleApproveClick(index)}
                  >
                    <DoneIcon />
                  </button>
                  <button
                    className="btn btn-sm  ms-2"
                    onClick={() => handleConfirm(index)}
                  >
                    <CloseOutlinedIcon />
                  </button>
                  <Link to={`/edit/${user.id}`} className="btn btn-sm">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default Home;
