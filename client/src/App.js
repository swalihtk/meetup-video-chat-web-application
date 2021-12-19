import axios from 'axios';
import { useState } from 'react';
import './App.css';
import Routers from './Routers';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux'
import store from "./redux/store";

axios.defaults.baseURL="http://localhost:4000/";
axios.defaults.withCredentials=true;

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Routers />
      </div>
    </Provider>
  );
}

export default App;
