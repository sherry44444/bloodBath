import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import setHeaders from "./helpers/setHeaders";
import validateToken from "./helpers/validateToken";

import PrivateRoute from "./components/Common/PrivateRoute";
import Navbar from "./components/Layout/Navbar/";
import Footer from "./components/Layout/Footer/";
import Register from "./components/Auth/Register/";
import Login from "./components/Auth/Login";
import Profile from "./components/Auth/Profile/";
import EditUserInfo from "./components/EditUserInfo/";
import Ticket from "./components/DonationTicket/";
import Mission from "./components/InfoPages/Mission";
import Vision from "./components/InfoPages/Vision";
import About from "./components/InfoPages/About";
import NotFound from "./components/NotFound/";

if (validateToken().status)
  setHeaders({ token: localStorage.getItem("token") });

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" exact component={Login}></Route>
        <div className="container">
          <Route exact path="/register" exact component={Register}></Route>
          <Route exact path="/mission" exact component={Mission}></Route>
          <Route exact path="/vision" exact component={Vision}></Route>
          <Route exact path="/about" exact component={About}></Route>
          <PrivateRoute exact path="/login" exact component={Login} />
          <PrivateRoute exact path="/profile" exact component={Profile} />
          <PrivateRoute
            exact
            path="/edit-user"
            exact
            component={EditUserInfo}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/ticket"
            exact
            component={Ticket}
          ></PrivateRoute>
          <Route exact path="/not-found" exact component={NotFound}></Route>
        </div>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
