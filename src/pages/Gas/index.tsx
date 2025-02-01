import { GasForm } from 'pages/Gas/components/GasForm';
import { GasPriceFetcher } from './components/GasPriceFetcher';
import { useState } from 'react';

const Gas = () => {
const [gasPricesAverage, setGasPricesAverage] = useState<number | null>(null);

  return (
    <div className="flex justify-center">
      <div className="my-4 py-4">
        <GasForm gasPricesAverage={gasPricesAverage}/>
        <GasPriceFetcher setGasPrice={setGasPricesAverage}/>
      </div>
    </div>
  )
}

export default Gas
