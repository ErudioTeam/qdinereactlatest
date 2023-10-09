import React, { useState } from "react";
import axios from "axios";

export function ProductChange() {
  const [file, setFile] = useState(null);
  const [newFileName, setNewFileName] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    alert(selectedFile);
    setFile(selectedFile);
    const now = new Date();
    setNewFileName(String(now.getSeconds()).padStart(2, "0"));
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
  const handleNewFileNameChange = (e) => {
    setNewFileName(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    if (!newFileName) {
      setMessage("Please enter a new file name.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("newFileName", newFileName);

    try {
      // Make a POST request to upload the file with the new name
      await axios.post(
        "http://103.186.185.127:8085/qdineimagecif/${newFileName}",
        formData
      );

      // Reset form fields and display a success message
      setFile(null);
      setNewFileName("");
      setMessage("File uploaded successfully.");
    } catch (error) {
      setMessage("Error uploading file.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        <label>New File Name:</label>
        <input
          type="text"
          value={newFileName}
          onChange={handleNewFileNameChange}
        />
      </div>
      <div>
        <button onClick={handleUpload}>Upload File</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ProductChange;
