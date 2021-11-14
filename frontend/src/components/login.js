import React, { useState } from 'react';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import "./home.css";
import { DataContext } from "../App.js"

async function loginUser(credentials){
  const result= await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
      .then(user => user)
  const user = result.user;

  if(result.status === 'ok') {
    console.log('Got the token: ', result.data)
    console.log('Got user: ', result.user)
		alert('You have successfully logged in')
    const token = result.data;
    localStorage.setItem("user", JSON.stringify(result.user));
    return token; 
    //window.location.href = window.location + "home"
  }
}

async function signupUser(credentials){
  const result = await fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())

  if (result.status === 'ok') {
    alert('You have successfully created an account');
    window.location.reload();
    alert('Please login to your newly created account');
  } 
  else {
    alert(result.error)
  }
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const balance = 0;
  
  const handleSubmitLogin = async e => {
    e.preventDefault();
    console.log("clicked login in");
    const token = await loginUser({
      email,
      password
    });

    if (token !== undefined){
    setToken(token);
    console.log(token)
    window.location.reload()
    }
    else alert("invalid email or password, please try again or create an account")
  }

  const handleSubmitSignup = async e => {
    e.preventDefault();
    console.log("clicked signed up");
    signupUser({
      name,
      email,
      password,
      balance
    });
  }
  return (
      <Card
        bgcolor="primary"
        header="Login"
      >
          
          <Card.Img src="./bank.jpg" alt="Banking image" />
          <Card.ImgOverlay>
            <Card.Title className="title">Welcome To BadBank</Card.Title>
              <Card.Text className="text">
                Let us help you with all your banking needs!
              </Card.Text>

              <div className="spacer">
                <br></br>
                <br></br>
              </div>

            <div className="container-login">

              <Card.Header> Login </Card.Header>
                <Card.Body>
                  <Form className="acc-form" onSubmit={handleSubmitLogin}>
                    <Form.Group className="mb-3-email">
                      <Form.Label> Email address </Form.Label>
                      <InputGroup>
                        <Form.Control 
                            type="email"
                            placeholder="email@address.com"
                            required
                            id="email"
                            onChange={e=> setEmail(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3-password">
                      <Form.Label>Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                            type="password"
                            placeholder="password"
                            required
                            id="password"
                            onChange={e=> setPassword(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>

                    <Button as="input" type="submit" value="Login"/>
                  </Form>    
                </Card.Body>
            </div>
                
            <div className="spacer">
                <br></br>
            </div>
            
            <div className="container-create">
                <Card.Header> Create An Account </Card.Header>
                <Card.Body>
                <Form className="acc-form" onSubmit={handleSubmitSignup}>
                    <Form.Group className="mb-3-name">
                        <Form.Label className="name-label">Enter Full Name</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                required
                                id="name"
                                onChange={e=> setName(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3-email">
                        <Form.Label> Email address </Form.Label>
                        <InputGroup>
                            <Form.Control 
                                type="email"
                                placeholder="email@address.com"
                                required
                                id="email"
                                onChange={e=> setEmail(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3-password">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                required
                                id="password"
                                onChange={e=> setPassword(e.target.value)}
                            />
                        </InputGroup>
                        <Form.Text className="text-muted">
                            Password must contain at least 8 characters.
                        </Form.Text>
                    </Form.Group>

                    <Button as="input" type="submit" value="Create Account"/>
                </Form>
                </Card.Body>
            </div>
          </Card.ImgOverlay> 
      </Card> 
  );
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}