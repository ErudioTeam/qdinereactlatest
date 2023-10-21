import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CartList.css";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

export const CartList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define cart state
  const [cart, setCart] = useState([]);
  const [cartitem, setCartitem] = useState([]);
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

    // create cart item

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

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cart) => cart.id !== el.id);
    setCart(hardCopy);
  };

  const handleEmptycart = () => {
    console.log("Clear Cart");
    // e.preventDefault();
  };

  // payment integration
  const makePayment = async () => {
    const stripe = await loadStripe(
      "https://buy.stripe.com/test_5kAaFcec1c5ogJa4gh"
    );


//     const stripe = require('stripe')('sk_test_51O1LmJGwJrwHzQ06JKny9Cu6iRC4wDGp5nAW4yAJj3U3piEvqpTK2jghiVAJAIpT5kFXOY6Whjz4wFENnXhSWt8l0032eCkGDM');

// const session = await stripe.checkout.sessions.create({
//   success_url: 'https://example.com/success',
//   line_items: [
//     {price: 'price_H5ggYwtDq4fbrJ', quantity: 2},
//   ],
//   mode: 'payment',
// });

    const body = {
      products: cart,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:7000/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
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
    var cartitem = {
      productId: 1,
      cartId: 2,
      sku: "100",
      price: 1,
      discount: 1,
      quantity: 1,
      active: true,
      createdAt: "0001-01-01T00:00:00Z",
      content: "1",
    };
    console.log("cart : " + cartitem);

    cart.map((cartlist, i) => {
      console.log("Content " + cartlist.content);
      cartitem.productId = cartlist.id;
      cartitem.cartId = cartlist.id;
      cartitem.price = cartlist.price;
      cartitem.discount = cartlist.discount;
      cartitem.quantity = cartlist.quantity;
      cartitem.active = true;

      console.log("Adding Cart:" + cartitem.price);
      // Perform the POST request to create a new user
      axios
        .post("http://103.186.185.127:8082/cartitems", cartitem)
        .then((response) => {
          console.log("Cart Item created :", response.data);

          const { data, message } = response;
          setUserStatus({ ...userStatus, Message: response.data.message });

          // Handle success (e.g., display a success message or redirect)
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          setUserStatus({ ...userStatus, Message: error });
          // Handle errors (e.g., display an error message)
        });
    });

    console.log("added to to cart Item." + cart.length);
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
    //  setCartitem([...cartitem.itemid, item.cartId]);
    //   setCartitem([...cartitem.itemid, item.cartId]);
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
            <th>Description</th>
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

        <div>
          {cart.length === 0 ? (
            <div className="cart cart-header">Cart is empty</div>
          ) : (
            <div className="cart cart-header">
              You have {cart.length} in the cart{" "}
            </div>
          )}
        </div>
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
                <td>
                  {" "}
                  <input
                    type="submit"
                    value="remove"
                    onClick={() => removeFromCart(item)}
                  />
                </td>
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

        <div className="checkout-button">
          <button onClick={handleEmptycart}>Clear Cart</button>
        </div>

        <div className="checkout-button">
          <button
            className="btn btn-success"
            onClick={makePayment}
            type="button"
          >
            Checkout
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default CartList;
