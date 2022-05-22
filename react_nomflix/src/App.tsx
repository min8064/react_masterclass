import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './Routes/Home';
import Tv from './Routes/Tv';
import Search from './Routes/Search';

function App() {
  return 
  <Router>
    <Routes>
      <Route path='/'>
        <Home/>
      </Route>
      <Route path="/tv">
        <Tv/>
      </Route>
      <Route path='/search'>
        <Search/>
      </Route>
    </Routes>
  </Router>;
}

export default App;
