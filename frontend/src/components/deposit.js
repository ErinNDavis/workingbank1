import React, { useState, useContext } from 'react';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataContext } from "../App.js"

function Deposit() {
  const [deposit, setDeposit] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [balance, setBalance] = useState('0');
  
  const ctx = useContext(DataContext);

  let status = ctx.balance;
  
  const handleChange = e => {
    setIsValid(true);
    setDeposit(e.target.value);
  };

  const handleSubmit = (e) => {
    
    if (deposit == 0) {
      alert("Please enter how much you would like to deposit");
      setDeposit(0);
      setIsValid(false);
      return;
    }
   
    ctx.updateBalance(deposit, "ADD")
    e.preventDefault();

    var newBalance = parseInt(balance) + parseInt(deposit);
    setBalance(newBalance.toString());

    status = ctx.balance;
    console.log(status);
    alert('Deposit was a success! Account Balance is now: $' + ctx.balance);
    
  };

  return (

    <Card
      bgcolor="primary"
      header="Deposit"
    >
      <Card.Img src="./bank.jpg" alt="Banking image" />
      <Card.ImgOverlay>
      <div className="money-card">
        <Card.Header> Deposit </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="deposit amount">
            <h3> Account Balance: $ {status} </h3>
              <Form.Label> Please enter the amount you would like to deposit. </Form.Label>
              <InputGroup>
                <Form.Control type="number" placeholder="$0" min="0" onChange={handleChange} />
              </InputGroup>
            </Form.Group>
            <Button as="input" type="submit" disabled={!isValid} value="Deposit"/>
          </Form>
        </Card.Body>
        </div>
      </Card.ImgOverlay>
    </Card>
  );
}

export default Deposit;