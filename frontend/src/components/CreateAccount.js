import React, { useState, useContext } from 'react';
import { Form, Card, InputGroup, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataContext } from "../App.js"

function CreateAccount() {
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const ctx = useContext(DataContext);
  //const string = JSON.stringify;
  const [data, setData] = useState([{user: ctx.users, email: ctx.email, password: ctx.password, balance: "$" + ctx.balance}]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password.length < 8) {
      alert("Password must contain at least 8 characters.");
      setPassword("");
    } else {
      alert('Success! Account created.');
      ctx.updateUsers(Name);
      ctx.updateEmail(email);
      ctx.updatePassword(password);
      
      let newAccount = {user: ctx.users, email: ctx.email, password: ctx.password, balance: ctx.balance}; 
      setData([...data, newAccount]);
      console.log(data);   
    }
  }
  
  
  const NameInput = (e) => {
    setName(e.target.value);
    setIsValid(true);
  }

  const emailInput = (e) => {
    setEmail(e.target.value);
    setIsValid(true);
  }

  const passwordInput = (e) => {
    setPassword(e.target.value);
    setIsValid(true);
  }

  return (
      <Card
        bgcolor="primary"
        header="Create Account"
      >
          <Card.Header> Create An Account </Card.Header>
          <Card.Body>
              <Form className="acc-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3-name">
                    <Form.Label className="name-label">Enter Full Name</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            onChange={NameInput}
                            placeholder="Enter Name"
                            required
                            id="name"
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3-email">
                    <Form.Label> Email address </Form.Label>
                    <InputGroup>
                        <Form.Control 
                            type="email"
                            onChange={emailInput}
                            placeholder="email@address.com"
                            required
                            id="email"
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
                            onChange={passwordInput}
                        />
                    </InputGroup>
                    <Form.Text className="text-muted">
                        Password must contain at least 8 characters.
                    </Form.Text>
                </Form.Group>

                <Button as="input" type="submit" disabled={!isValid} value="Create Account"/>
                  
                <Button as="input" type="reset" value="Add Another Account"/>
            </Form>
        </Card.Body>
      </Card>
  );
}

export default CreateAccount;