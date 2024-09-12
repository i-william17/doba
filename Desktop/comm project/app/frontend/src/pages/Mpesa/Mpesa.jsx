// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import axios from "axios";
import "./Mpesa.css"; // Import the CSS file
import { StoreContext } from "../../context/StoreContext";

const Mpesa = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { totalCartAmount } = useContext(StoreContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3500/api/mpesa/token", {
        phone,
        amount: totalCartAmount() + 45, // Use the amount from context plus any additional charges
      });

      setMessage(`Payment Request Sent: ${response.data}`);
    } catch (error) {
      setMessage(`Error: ${error.response ? error.response.data : error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mpesa-form-container">
      <h2>Mpesa Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0712345678"
            required
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            value={totalCartAmount() === 0 ? 0 : totalCartAmount() + 45}
            disabled
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
      {message && <p className={message.startsWith("Error") ? "error-message" : "success-message"}>{message}</p>}
    </div>
  );
};

export default Mpesa;
