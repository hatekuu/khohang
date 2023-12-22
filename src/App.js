import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css'; 
import { submitForm } from './nhap'; 
import TotalPricesCalculator from './TotalPricesCalculator';
import DeleteProductForm from './DeleteProductForm';
function App() {
  // Function to fetch data from MongoDB
  const fetchData = () => {
    const mongodbUrl = 'https://asia-south1.gcp.data.mongodb-api.com/app/application-0-ospfr/endpoint/layhang';

    fetch(mongodbUrl)
      .then(response => response.json())
      .then(data => {
        displayData(data.body);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  // Function to display data in a table
  const displayData = (data) => {
    const mongodbDataDiv = document.getElementById('mongodbData');

    const html = (
      <table className="custom-table">
        <thead>
          <tr>
            <th className="custom-th" onClick={() => sortTable(0)}>Product Name</th>
            <th className="custom-th" onClick={() => sortTable(1)}>Price</th>
            <th className="custom-th" onClick={() => sortTable(2)}>Product Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td className="custom-td">{item.productName}</td>
              <td className="custom-td">{item.price}</td>
              <td className="custom-td">{item.productType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

    ReactDOM.render(html, mongodbDataDiv);
  };

  // Function to sort the table by the selected column
  const sortTable = (columnIndex) => {
    const table = document.querySelector('table');
    const rows = Array.from(table.rows);

    // Save the header row
    const headerRow = rows.shift();

    // Sort the data
    rows.sort((a, b) => {
      const cellA = a.cells[columnIndex].textContent.trim();
      const cellB = b.cells[columnIndex].textContent.trim();
      return cellA.localeCompare(cellB);
    });

    // Clear all rows from the table
    table.innerHTML = '';

    // Add the header row back to the table
    table.appendChild(headerRow);

    // Add the sorted rows back to the table
    rows.forEach(row => table.appendChild(row));
  };

  useEffect(() => {
    fetchData();
    // Fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 1000);

    // Clean up interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array as fetchData does not depend on any variable

  return (
    <div className="App">
      <h1>Các mặt hàng</h1>
      <div id="mongodbData"></div>

      {/* Your form directly within JSX */}
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <form id="productForm" style={{ float: 'left', marginRight: '20px' }}>
        <h2>Thêm/Sửa Sản Phẩm</h2>

        <label htmlFor="productName">Tên Sản Phẩm:</label>
        <input type="text" id="productName" name="productName" required /><br />

        <label htmlFor="price">Giá:</label>
        <input type="number" id="price" name="price" required /><br />

        <label htmlFor="productType">Loại Sản Phẩm:</label>
        <input type="text" id="productType" name="productType" required /><br />

        <button type="button" onClick={submitForm}>Gửi</button>
      </form>

      {/* Integrate the new component */}
    
        <TotalPricesCalculator  />
        <DeleteProductForm style={{ float: 'left', marginRight: '20px' }}/>
      </div>
    </div>
  );
}

export default App;
