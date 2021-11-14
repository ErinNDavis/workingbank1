import {React, useState, useContext } from 'react';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataContext } from "../App.js"
import "./home.css";

function Withdraw() {
  const [withdrawal, setWithdrawal] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [balance, setBalance] = useState('0');

  //-----------------------------------------------
  let user = JSON.parse(window.localStorage.getItem('user'));
  let userbalance = user.balance;
  let email = user.email;
  console.log(userbalance + " userbalance");
  //-------------------------------------------------

  const ctx = useContext(DataContext);

  ctx.balance = userbalance;
  let status = ctx.balance;

  const handleChange = e => {
    setIsValid(true);
    setWithdrawal(e.target.value);
  };

  async function updateDB(credentials){
    const result = await fetch('/api/withdraw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
  }

  const handleSubmit = async e => {

    if (isNaN(withdrawal)) {
      alert("Please enter valid number to withdraw, cannot include non-number values.")
      setWithdrawal(0);
      setIsValid(false);
      return;
    }
    
    if (withdrawal < 0) {
      alert("Please enter valid number to withdraw, cannot include negative numbers.");
      setWithdrawal(0);
      setIsValid(false);
      return;
    }

    if (withdrawal > status) {
      alert("Withdraw amount cannot exceed account balance.")
    }
    else{

      ctx.updateBalance(withdrawal, "MINUS");
      e.preventDefault();

      var newBalance = parseInt(balance) - parseInt(withdrawal);
      setBalance(newBalance.toString());

      status = ctx.balance;
      console.log(status);
      alert('Your withdraw was successful. Account Balance is now: $' + ctx.balance);

      user['balance']=ctx.balance;
      localStorage.setItem('user', JSON.stringify(user));
      
      e.preventDefault();
      console.log("balance "+ status + " email " + email);
      updateDB({
        email,
        status
      });
    }
  };

  return (
    <Card
      bgcolor="primary"
      header="Withdraw"
      status={status}
    >

      <Card.Img src="./bank.jpg" alt="Banking image" />
      <Card.ImgOverlay>
        <div className="money-card">
        <Card.Header> Withdraw </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="withdraw amount">
              <h3> Account Balance: $ {status} </h3>
              <Form.Label> Please enter the amount you would like to withdraw. </Form.Label>
              <InputGroup>
                <Form.Control type="number" placeholder="$0" min="0" onChange={handleChange} />
              </InputGroup>
            </Form.Group>
            <Button as="input" type="submit" disabled={!isValid} value="Make Withdraw"/>
          </Form>
        </Card.Body>
        </div>
      </Card.ImgOverlay>
    </Card>
  );
}

export default Withdraw;