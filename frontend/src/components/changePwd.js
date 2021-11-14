import { Card, Button, Form, InputGroup } from 'react-bootstrap';
import React, { useState } from 'react';
import "./home.css";

async function changePassword(credentials){
    const result = await fetch('/api/changePwd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())

      if (result.status === 'ok') {
        alert('You have successfully updated your password');
      } else {
        alert(result.error)
      }
}


export default function ChangePwd(){

    const [password, setPassworda] = useState();
    const [passwordb, setPasswordb] = useState();

    let user = JSON.parse(window.localStorage.getItem('user'));
    let email = user.email;

    const onSubmit = async e => {

        console.log("reset");
        e.preventDefault();
        if (password.length < 8) {
            alert("Passwords have to be at least 8 characters");
        }
        if (password !== passwordb){
            alert("Entered Passwords do not match");
        }
        else {
            changePassword({ 
                email,
                password
            });
        }  
    }

return (
        
    <Card className="bg-dark text-white" border="light" >
        <Card.Img src="./bank.jpg" alt="Banking image" />
        <Card.ImgOverlay>
            <Card.Title className="title">Welcome To BadBank</Card.Title>
            <Card.Text className="text">
                Thank you for trusting us with your banking needs!
            </Card.Text>
            <div className="user-home">
            <Form.Group className="mb-3-password">
                      <Form.Label>Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                            type="password"
                            placeholder="enter new password"
                            required
                            id="current-password"
                            onChange={e=> setPassworda(e.target.value)}
                        />
                      </InputGroup>
                      <InputGroup>
                        <Form.Control
                            type="password"
                            placeholder="re-enter new password"
                            required
                            id="new-password"
                            onChange={e=> setPasswordb(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                <Card.Text>
                    <div>
                        <Button onClick={onSubmit}>Reset password</Button>
                    </div>
                </Card.Text>
            </div>
        </Card.ImgOverlay>
    </Card>

);
}