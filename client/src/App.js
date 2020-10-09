import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Register} from './components/signup/Register';
import {Login} from './components/login/Login';
import {Newreservation} from './components/reservation/Newreservation';
import {Listreservation} from './components/listReservation/Listreservation';
import {Viewreservation} from './components/viewReservation/Viewreservation';
import {Editreservation} from './components/Editreservation/Editreservation';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/register" component={Register} />
        <Route exact path="/" component={Login} />
        <Route path="/newreservation" component={Newreservation} />
        <Route path="/listreservation" component={Listreservation} />
        <Route path="/viewreservation" component={Viewreservation} />
        <Route path="/editreservation" component={Editreservation} />
      </BrowserRouter>
    </div>
  );
}

export default App;
