import React from 'react';
import Users from './comp/Users';
import Navbar from './comp/Navbar';
import './App.css';
import AddUser from './comp/AddUser';

function App() {
   return (
      <div className="App">
         <Navbar title="User App" />
         <hr />
         <AddUser />
         <Users />
      </div>
   );
}

export default App;
