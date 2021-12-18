import axios from 'axios';
import { useState } from 'react';
import './App.css';
import Routers from './Routers';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL="http://localhost:4000/";

function App() {

  return (
    <div className="App">
        <Routers />
    </div>
  );
}

export default App;
