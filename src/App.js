import './App.css';
import { useState } from 'react';

const URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=';
const API_KEY = 'd4ef271573cd1c22fd264677385bab8a';

function App() {
  const [eur, setEur] = useState(0);
  const [gbp, setGbp] = useState(0);
  const [usd, setUsd] = useState(0);
  const [gbpRate, setGbpRate] = useState(0);
  const [usdRate, setUsdRate] = useState(0);
  
  async function convert(e) {
    e.preventDefault();
    try {
      const address = URL + API_KEY;
      const response = await fetch(address);

      if (response.ok) {
        const json = await response.json();
        console.log(json.rates.GBP);
        console.log(json.rates.USD);
        setGbpRate(json.rates.GBP);
        setUsdRate(json.rates.USD);

        setUsd(eur * json.rates.USD);
        setGbp(eur * json.rates.GBP);
      } else {
        alert('Error retrieving exchange rate');
        console.log(response);
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div id="container">
      <form onSubmit={convert}>
        <div>
          <label>EUR:</label>&nbsp;
          <input type="number" step="0.01" value={eur} onChange={e => setEur(e.target.value)} />
          
        </div>
        <div>
          <label>GBP:</label>&nbsp;
          <output>{gbp.toFixed(2)} £ Exchange rate: {gbpRate}</output><div></div>
        </div>
        <div>
          <label>USD:</label>&nbsp;
          <output>{usd.toFixed(2)} $ Exchange rate: {usdRate}</output>
        </div>
        <div>
          <button>Calculate</button>
        </div>
      </form>
    </div>
  );
}

export default App;
