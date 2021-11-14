import React from 'react';
//import { useContext } from 'react';
import "./Navbar.css";
import { NavLink } from 'react-router-dom';


const NavBar = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const username = user.name;

    return (
        
        <nav className="navbar bg-light">
            <div id="nav-username">
                <h3>{username}</h3>
            </div>
            <div className="container-fluid">
                <NavLink
                    exact
                    activeClassName="active"
                    className="nav-link"
                    to="/">
                        Welcome to BadBank
                        <span className="tooltiptext"> Home page/Account Information </span>
                </NavLink>
                <NavLink 
                    activeClassName="active"
                    className="nav-link ms-auto"  
                    to="/deposit/">
                        Deposit
                        <span className="tooltiptext">Deposit cash from your account. </span>
                </NavLink>        
                <NavLink 
                    activeClassName="active"
                    className="nav-link"  
                    to="/withdraw/">
                        Withdraw
                        <span className="tooltiptext">Withdraw cash from your account. </span>
                </NavLink>      
                <NavLink 
                    activeClassName="active"
                    className="nav-link"  
                    to="/logout/">
                        Logout
                        <span className="tooltiptext">Logout of your account. </span>
                </NavLink> 
            </div>       
        </nav>
    )
}

export default NavBar;