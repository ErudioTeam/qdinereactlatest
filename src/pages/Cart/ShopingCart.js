import React, { useState } from "react";
import "./ShopingCart.css"; // Import your CSS file

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Simulated cart data (replace with actual cart data)
  const initialCartData = [
    {
      id: 1,
      productName: "Product 1",
      price: 10.99,
      quantity: 2,
    },
    {
      id: 2,
      productName: "Product 2",
      price: 19.99,
      quantity: 1,
    },
    // Add more cart items as needed
  ];
//

// READ PRODUCT 
  // Initialize cart with initial data
  useState(() => {
    setCartItems(initialCartData);
  }, []);

  // Calculate total cart amount
  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  const [userStatus, setUserStatus] = useState({
    Message: "Pls. Create Entry..",
  });
  
  return (
    <div>
      <h1>Shopping Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.productName}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total:</td>
            <td>${totalAmount}</td>
          </tr>
        </tfoot>
      </table>
      <div className="checkout-button">
        <button>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
