import { Card, Button } from 'react-bootstrap';
import React from 'react';
import "./home.css";


function Logout(){

    function onSubmit(){
        console.log("logged out");
        sessionStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload()
        window.location.href = "/";
     }

    const user = JSON.parse(window.localStorage.getItem('user'));
    const name = user.name;
    const balance = user.balance;

    return(
        <Card bgcolor="primary" header="Deposit">
            <Card.Img src="./bank.jpg" alt="Banking image" />
            <Card.ImgOverlay>
                <div className="user-home">
                    <Card.Text>
                        Username: {name} 
                    </Card.Text>
                    <Card.Text>
                        Balance: ${balance}
                    </Card.Text>
                </div>
                <div className="message">
                    <Card.Header> Thank you for your business. </Card.Header>
                </div>
                <Card.Body>
                    <Button onClick={onSubmit}>Click here to confirm logout.</Button>
                </Card.Body>
            </Card.ImgOverlay>
        </Card>     
    )
}
export default Logout;
