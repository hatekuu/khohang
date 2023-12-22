// nhap.js

export async function submitForm() {
    const productName = document.getElementById("productName").value;
    const price = document.getElementById("price").value;
    const productType = document.getElementById("productType").value;
  
    const url = "https://asia-south1.gcp.data.mongodb-api.com/app/application-0-ospfr/endpoint/nhaphang";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productName,
        price: parseFloat(price),
        productType
      })
    });
  
    const result = await response.json();
  
    if (response.ok) {
      alert(result.body);
    } else {
      alert("Đã xảy ra lỗi: " + result.body);
    }
  }
  