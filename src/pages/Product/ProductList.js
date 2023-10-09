import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductList.css";
import { Link } from "react-router-dom";

export const ProductList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function ImageDisplay(props) {
    const { filename } = props;
    const imageUrl = `http://103.186.185.127:8085/images/${filename}.jpeg`; // Replace with the actual image URL

    return (
      <div>
        <img src={imageUrl} alt="Image" width="60" height="60" />
      </div>
    );
  }

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
            <th>SKU</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Quantity</th>
            <th>Content</th>
            <th>Edit</th>
            <th>Delete</th>
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
              <td>{item.sku}</td>
              <td>${item.price}</td>
              <td>{item.discount}%</td>
              <td>{item.quantity}</td>
              <td>{item.content}</td>
              <td>
                <Link to={`/dashboard/productedit/${item.id}`}>Edit</Link>
              </td>
              <td>
                <Link to={`/dashboard/productdelete/${item.id}`}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
