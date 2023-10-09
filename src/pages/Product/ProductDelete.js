// src/Edit.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const ProductDelete = () => {
  const { id } = useParams();
  const [userStatus, setUserStatus] = useState({
    Message: "Pls. Delete Entry..",
  });
  // const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [productData, setProductData] = useState({
    id: 5,
    title: "",
    metaTitle: "",
    slug: "",
    summary: "",
    type: 1,
    sku: "",
    price: 0,
    discount: 0,
    quantity: 0,
    shop: false,
    createdAt: "",
    content: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Perform the PUT request to update user data
    axios
      .delete(`http://103.186.185.127:8082/products/${id}`, productData) // Replace '3' with the desired user ID
      .then((response) => {
        console.log("Product data deleted:", response.data);
        setUserStatus({ ...productData, Message: response.data.message });
        // Handle success (e.g., display a success message or redirect)
      })
      .catch((error) => {
        console.error("Error updating product data:", error);
        // Handle errors (e.g., display an error message)
      });
  };

  useEffect(() => {
    // Fetch user data based on the email parameter from the URL
    axios
      .get(`http://103.186.185.127:8082/products/${id}`)
      .then((response) => {
        console.log("API Response:", response.data.data); // Debugging line
        // console.log(Object.keys(response.data.data.id).length);
        console.log(response.data.data.id > 0);
        if (response.data.data && response.data.data.id > 0) {
          setProductData(response.data.data);
          console.log(response.data.data);
          //  console.log(Object.keys(response["data"][0].id).length) // Use the first user found with the matching email
        } else {
          setError("Product not found");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div className="edit">
      <h2>Delete Product</h2>
      <form onSubmit={handleFormSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="title">Title:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={productData.title}
                  onChange={(e) =>
                    setProductData({ ...productData, title: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="metaTitle">Meta Title:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="metaTitle"
                  name="metaTitle"
                  value={productData.metaTitle}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      metaTitle: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="slug">Slug:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={productData.slug}
                  onChange={(e) =>
                    setProductData({ ...productData, slug: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="summary">Summary:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="summary"
                  name="summary"
                  value={productData.summary}
                  onChange={(e) =>
                    setProductData({ ...productData, summary: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="type">Type:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={productData.type}
                  onChange={(e) =>
                    setProductData({ ...productData, type: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="sku">SKU:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={productData.sku}
                  onChange={(e) =>
                    setProductData({ ...productData, sku: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="price">Price:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={productData.price}
                  onChange={(e) =>
                    setProductData({ ...productData, price: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="discount">Discount:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="discount"
                  name="discount"
                  value={productData.discount}
                  onChange={(e) =>
                    setProductData({ ...productData, discount: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="quantity">Quantity:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={productData.quantity}
                  onChange={(e) =>
                    setProductData({ ...productData, quantity: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="shop">Shop:</label>
              </td>
              <td>
                <input
                  type="checkbox"
                  id="shop"
                  name="shop"
                  checked={productData.shop}
                  onChange={(e) =>
                    setProductData({ ...productData, shop: e.target.checked })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="createdAt">Created At:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="createdAt"
                  name="createdAt"
                  value={productData.createdAt}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      createdAt: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="content">Content:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="content"
                  name="content"
                  value={productData.content}
                  onChange={(e) =>
                    setProductData({ ...productData, content: e.target.value })
                  }
                />
              </td>
            </tr>
            {/* Include rows for other product data as needed */}
          </tbody>
        </table>
        <button type="submit">Delete Product</button>
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="status">Status: {userStatus.Message}</label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default ProductDelete;
