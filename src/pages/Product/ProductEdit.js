// src/Edit.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const ProductEdit = () => {
  const { id } = useParams();
  const [userStatus, setUserStatus] = useState({
    Message: "Pls. Update Entry..",
  });

  const [filenameValue, setFilenameValue] = useState("");

  // Function to update the form field value with the current date and time
  const setCurrentfilename = async () => {
    const timestamp = await getCurrentDateTimeStamp();
    const Currentfilename = `qdine_food_${timestamp}`;
    //alert (Currentfilename);// Get the current date and time in ISO format
    setFilenameValue(Currentfilename); // Update the state with the current date and time
  };

  useEffect(() => {
    if (!filenameValue) {
      console.log("filename empty");
    } else {
      setProductData({ ...productData, slug: filenameValue });
      console.log("file name use effect" + filenameValue);
    }
  }, [filenameValue]);

  const [file, setFile] = useState(null);
  //var filename = "sample";
  const handleFileChange = async (e) => {
    await setCurrentfilename();
    setFile(e.target.files[0]);
    if (!file) {
      // alert("Pls. select a file");
      setUserStatus("Please select a file.");
      return;
    }

    await setCurrentfilename();
  };

  const getCurrentDateTimeStamp = async () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
  };

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


    //upload file upload 
    console.log("Filename at submit - Slug", productData.slug);
    // setProductData({ })
    //qdine_food_20230926_102534
    const formData = new FormData();
    formData.append("file", file, productData.slug); // "file" should match the server's expected field name for the file

    // Create a FormData object to send the image
    //const productimaageno = productData.id +

    // Perform the POST request to upload the image
    axios
      .post(
        `http://103.186.185.127:8085/qdineimagecif/${productData.slug}`,
        formData
      )
      .then((response) => {
        console.log("Image uploaded successfully:", response.data);
        // Handle success (e.g., display a success message or redirect)
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        // Handle errors (e.g., display an error message)
      });

    console.log("API Post with Fileupload:", formData);
  
    
    // Perform the PUT request to update user data
    axios
      .put(`http://103.186.185.127:8082/products/${id}`, productData) // Replace '3' with the desired user ID
      .then((response) => {
        console.log("Product data updated:", response.data);
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
      <h2>Edit Product</h2>
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
                <label htmlFor="file">Upload File:</label>
              </td>
              <td>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
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
                    setProductData({ ...productData, slug: filenameValue })
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
                    setProductData({
                      ...productData,
                      type: parseInt(e.target.value, 10),
                    })
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
                    setProductData({
                      ...productData,
                      price: parseFloat(e.target.value, 2),
                    })
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
                    setProductData({
                      ...productData,
                      discount: parseInt(e.target.value),
                    })
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
                    setProductData({
                      ...productData,
                      quantity: parseInt(e.target.value),
                    })
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
        <button type="submit">Update Product</button>

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

export default ProductEdit;
