import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './Routes/Home';
import Tv from './Routes/Tv';
import Search from './Routes/Search';
import Header from './Components/Header';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}><Route path="/movie/:movieId" element={<Home/>}></Route></Route>
        <Route path="/tv" element={<Tv/>}><Route path="/tv/:tvId" element={<Tv/>}></Route></Route>
        <Route path="/search" element={<Search />}><Route path="/search/movie/:movieId" element={<Search/>}></Route><Route path="/search/tv/:tvId" element={<Search/>}></Route></Route>
      </Routes>
    </Router>
  );
}

export default App;
