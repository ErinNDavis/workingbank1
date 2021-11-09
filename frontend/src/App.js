import { HashRouter, Route } from 'react-router-dom';
import "./App.css";
import NavBar from './components/Navbar';
import useToken from './components/useToken';
import Home from './components/home';
import Login from './components/login';
import Deposit from './components/deposit';
import Withdraw from './components/withdraw';
import Logout from './components/logout';
import React, {createContext, useState} from 'react';

export const DataContext = createContext();


/**function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}*/

function App() {

  const [user, updateUser]= useState({users:'peter', updateUsers:updateUsers, email:'peter@mit.edu', updateEmail:updateEmail, password:'secret', updatePassword:updatePassword, balance:100, updateBalance:updateBalance});
  
  function updateEmail(email){
    user.email = email;
  }

  function updateUsers(Name){
    user.users = Name;
  }

  function updatePassword(password){
    user.password = password;
  }
  
  function updateBalance(depositAmount, transaction ){
    if(transaction ==="ADD"){
      user.balance = parseInt(depositAmount) + user.balance;
      updateUser(user);
     // updateAllData(data);
      console.log(user.balance);
    }   
    if(transaction ==="MINUS"){
      user.balance = user.balance - parseInt(depositAmount);
      updateUser(user);
     // updateAllData(data);
      console.log(user.balance);
    }
  }

  //const [token, setToken] = useState();
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
      <HashRouter>
        <NavBar/>
        <DataContext.Provider value={user}>
            <div className="container" style={{padding: "20px"}}>
              <Route path="/" exact component={Home} />
              <Route path="/deposit/" component={Deposit} />
              <Route path="/withdraw/" component={Withdraw} />
              <Route path="/logout/" component={Logout} />
            </div>
          </DataContext.Provider>
        </HashRouter>
    
  );
}

export default App;
