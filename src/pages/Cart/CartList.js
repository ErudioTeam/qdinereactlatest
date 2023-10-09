import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CartList.css";
import { Link } from "react-router-dom";

export const CartList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define cart state
  const [cart, setCart] = useState([]);
  const [order, serOrder] = useState([]);
  const [userStatus, setUserStatus] = useState({
    Message: "Pls. Create Entry..",
  });

  const mapCartToOrder = (cart) => {
    // Calculate subtotal, itemDiscount, tax, shipping, and total based on cart items
    const subTotal = cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    // You can calculate other values (e.g., tax, shipping, discounts) as needed
    const itemDiscount = 0; // Calculate item discounts if applicable
    const tax = 0; // Calculate tax if applicable
    const shipping = 0; // Calculate shipping cost if applicable
    const total = subTotal - itemDiscount + tax + shipping;

    // Create the order object
    // {data.map((item) => (
    // const order = {
    //   "id": 2,
    //       "userId": 2,
    //       "sessionId": "1",
    //       "token": "1",
    //       "status": 1,
    //       "subTotal": 1,
    //       "itemDiscount": cart.,
    //       "tax": 1,
    //       "shipping": 1,
    //       "total": 1,
    //       "promo": "1",
    //       "discount": 1,
    //       "grandTotal": 1,
    //       "firstName": "1",
    //       "middleName": "1",
    //       "lastName": "11",
    //       "mobile": "1",
    //       "email": "1",
    //       "line1": "1",
    //       "line2": "1",
    //       "city": "1",
    //       "province": "1",
    //       "country": "1",
    //       "createdAt": "0001-01-01T00:00:00Z",
    //       "content": ""
    //  // ... (order properties, see previous answer)
    // });

    return order;
  };

  // Function to submit the cart as an order
  const submitOrder = () => {
    // Map cart data to an order object
    const order = mapCartToOrder(cart);

    // Send a POST request to create the order
    axios
      .post("http://103.186.185.127:8082/orders", order)
      .then((response) => {
        // Handle the response if needed
        console.log("Order submitted successfully:", response.data);
        // Clear the cart after placing the order
        setCart([]);
      })
      .catch((error) => {
        // Handle errors if any
        console.error("Error submitting order:", error);
      });
  };

  const handleOrder = () => {
    console.log("Add order to order table ");

    //  e.preventDefault();
    // {
    //     "id": 2,
    //     "userId": 2,
    //     "sessionId": "1",
    //     "token": "1",
    //     "status": 1,
    //     "subTotal": 1,
    //     "itemDiscount": 1,
    //     "tax": 1,
    //     "shipping": 1,
    //     "total": 1,
    //     "promo": "1",
    //     "discount": 1,
    //     "grandTotal": 1,
    //     "firstName": "1",
    //     "middleName": "1",
    //     "lastName": "11",
    //     "mobile": "1",
    //     "email": "1",
    //     "line1": "1",
    //     "line2": "1",
    //     "city": "1",
    //     "province": "1",
    //     "country": "1",
    //     "createdAt": "0001-01-01T00:00:00Z",
    //     "content": ""
    // }
    console.log(cart);
    // Perform the POST request to create a new user
    axios
      .post("http://103.186.185.127:8082/ordercreate", cart)
      .then((response) => {
        console.log("Order created :", response.data);

        const { data, message } = response;
        setUserStatus({ ...userStatus, Message: response.data.message });

        // Handle success (e.g., display a success message or redirect)
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setUserStatus({ ...userStatus, Message: error });
        // Handle errors (e.g., display an error message)
      });
  };

  function ImageDisplay(props) {
    const { filename } = props;
    const imageUrl = `http://103.186.185.127:8085/images/${filename}.jpeg`; // Replace with the actual image URL

    return (
      <div>
        <img src={imageUrl} alt="Image" width="60" height="60" />
      </div>
    );
  }

  // Function to add items to the cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  useEffect(() => {
    axios
      .get("http://103.186.185.127:8082/products") // Replace with the actual API endpoint
      .then((response) => {
        setData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Calculate total cart amount
  const totalAmount = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div>
      <h1>Product Details</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Summary</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Quantity</th>
            <th>Add to Cart</th> {/* Add this column */}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <ImageDisplay filename={item.slug}></ImageDisplay>
              </td>
              <td>{item.title}</td>
              <td>{item.summary}</td>
              <td>${item.price}</td>
              <td>{item.discount}%</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </td>
              <td>{item.content}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display Cart */}
      <div>
        <h2>Cart</h2>
        <tables>
          <thead>
            <tr>
              <th>Title</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total:</td>
              <td>${totalAmount}</td>
            </tr>
          </tfoot>
        </tables>
        <div className="checkout-button">
          <button onClick={handleOrder}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartList;
