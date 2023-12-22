import React, { useState } from 'react';

const DeleteProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');

  const getProductType = async () => {
    // Fetch data from the MongoDB API
    const url = "https://asia-south1.gcp.data.mongodb-api.com/app/application-0-ospfr/endpoint/layhang";
    try {
      const response = await fetch(url);
      const data = await response.json();

      // Find the product in the data
      const product = data.body.find((item) => item.productName === productName);

      // Update the productType state
      if (product) {
        setProductType(product.productType);
      } else {
        setProductType('');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteProduct = async () => {
    const url = "https://asia-south1.gcp.data.mongodb-api.com/app/application-0-ospfr/endpoint/xoa";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          productType,
        }),
      });

      const result = await response.json();
      alert(result.body);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Check the console for details.");
    }
  };

  return (
    <div>
      <h2>Xóa sản phẩm</h2>

      <form id="deleteForm">
        <label htmlFor="productName">Tên sản phẩm muốn xóa:</label>
        <input
          type="text"
          id="productName"
          name="productName"
          onChange={(e) => setProductName(e.target.value)}
          onBlur={getProductType}
          required
        /><br />

        <label htmlFor="productType">Loại sản phẩm:</label>
        <input
          type="text"
          id="productType"
          name="productType"
          value={productType}
          readOnly
        /><br />

        <button type="button" onClick={deleteProduct}>Bấm zô để xóa</button>
      </form>
    </div>
  );
};

export default DeleteProductForm;
