import React, { useState } from 'react';

const TotalPricesCalculator = () => {
  const [productType, setProductType] = useState('');
  const [totalPrices, setTotalPrices] = useState(null);

  const sendRequest = async () => {
    try {
      const url = 'https://asia-south1.gcp.data.mongodb-api.com/app/application-0-ospfr/endpoint/tonghang';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productType }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTotalPrices(data.body.totalPrices[0]);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <div>
      <h2>Tổng tiền một loại hàng</h2>
   
      <form>
        <label htmlFor="productType">Loại sản phẩm:</label>
        <input
          type="text"
          id="productType"
          name="productType"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        />
        <br />
        <button type="button" onClick={sendRequest}>
          Bấm vào để tính
        </button>
      </form>

      <div id="response">
        <label>Kết quả:</label>
      { totalPrices}
      </div>
    </div>
  );
};

export default TotalPricesCalculator;
