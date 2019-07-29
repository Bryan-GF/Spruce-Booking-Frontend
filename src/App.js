import React from 'react';
import './App.scss';
import {Nav} from './components/Nav/Nav';
import Bookings from './components/Bookings/Bookings';

const App = () => {
  return (
    <div className="App">
      <Nav/>
      <Bookings/>
    </div>
  );
}

export default App;
