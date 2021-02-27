
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Chat from './Chat';
import Login from "./Login";

import Sidebar from "./Sidebar";
import { useStateValue } from "./StateProvider";

function App() {
  
  const [{ user }, dispatch] = useStateValue();
  
  return (
    <div className="App">
        {!user ? (
          <Login />
        ) : (
          <div className="app-body">
            <Router>
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route> 
                <Route path="/">
                  {/* <Sidebar /> */}
                </Route>
              </Switch>
            </Router>
            
          </div>
        )}
    </div>
  );
}

export default App;
