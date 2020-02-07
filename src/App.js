import React from 'react';
import Users from './comp/Users';
import Navbar from './layout/Navbar';
import './App.css';
import AddUser from './forms/AddUser';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './pages/NotFound';
import UpdateUser from './forms/UpdateUser';
// import LifeCycleTest from './comp/LifeCycleTest';



function App() {

   return (
      <div className="App">
         <Router>
            <Navbar title="User App" />
            <hr />
            <Switch>
               <Route exact path="/" component={Users} />
               <Route exact path="/Add" component={AddUser} />
               <Route exact path="/Update/:id" component={UpdateUser} />
               <Route component={NotFound} />
            </Switch>
         </Router>


         {/* <LifeCycleTest test="Deneme" /> */}

      </div>
   );
}

export default App;
