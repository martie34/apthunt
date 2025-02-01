import React, { useState, useEffect } from 'react';
import { Button, message, Spin } from 'antd';

export const GasPriceFetcher: React.FC<{ setGasPrice: (price: number) => void }> = ({ setGasPrice }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [gasPrice, setGasPriceLocal] = useState<number | null>(null);
  
    useEffect(() => {
      const fetchGasPrice = async () => {
        setLoading(true);
        setError(null);
  
        try {
            const apiKey = import.meta.env.VITE_APP_COLLECT_API_KEY;

            if (!apiKey) {
              throw new Error("API key is missing. Please set the VITE_APP_COLLECT_API_KEY environment variable.");
            }
    
            const response = await fetch(
              "https://api.collectapi.com/gasPrice/stateUsaPrice?state=WA",
              {
                method: "GET",
                headers: {
                  "content-type": "application/json",
                  "authorization": `${apiKey}`, 
                },
              }
            );
    
          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }
  
          const data = await response.json();

          if (data.success && data.result && data.result.state) {
            const priceStr = data.result.state.gasoline;
            if(priceStr){
              const price = parseFloat(priceStr);
              setGasPriceLocal(price);
              setGasPrice(price);
            } else {
              console.error("Gasoline price not found in API response.");
              setError("Gasoline price not found in API response.");
              message.error("Gasoline price not found.");
            }
          } else {
            throw new Error("Invalid API response format.");
          }
        } catch (err) {
          console.error("Error fetching gas prices:", err);
          setError(err.message);
          message.error("Failed to fetch gas prices. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchGasPrice();
    }, []); 
  
    return (
      <div>
        {loading && <Spin />} 
        {error && <p style={{ color: 'red' }}>{error}</p>} 
        {gasPrice && (
          <p style={{color: 'white'}}>
            Average gas price in WA: ${gasPrice.toFixed(2)}
          </p>
        )}
        <Button type="primary" onClick={()=>{
          if(gasPrice){
            setGasPrice(gasPrice);
          }
        }} disabled={!gasPrice || loading}>Use this Price</Button>
      </div>
    );
  };
  