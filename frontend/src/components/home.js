import { Card, Button } from 'react-bootstrap';
import React from 'react';
import "./home.css";

function Home(){
    const user = JSON.parse(window.localStorage.getItem('user'));
    const name = user.name;
    const email = user.email;
    const balance = user.balance;

    async function deleteAccount(credentials){
        const result = await fetch('/api/home', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
          .then(data => data.json())
    }

    const onSubmit = async e => {
        
        let closeAccount = prompt("This will permanently delete your account. Type YES to confirm.");
        if (closeAccount === 'YES'){
            console.log("delete");
            
            e.preventDefault();
            deleteAccount({ email });

            sessionStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.reload()
            window.location.href = "/";
        }
    }

    const onSubmitpassword = async e => {
        
            console.log("reset");
            e.preventDefault();
            window.location.href = window.location + "changePwd"
            
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
                    <Card.Text>
                        Username: {name} 
                    </Card.Text>
                    <Card.Text>
                        Balance: ${balance}
                    </Card.Text>
                    <Card.Text>
                        <div>
                            <Button onClick={onSubmitpassword}>Reset password</Button>
                        </div>
                        <div>
                            <Button onClick={onSubmit}>Permanently close this Account.</Button>
                        </div>
                    </Card.Text>
                </div>
            </Card.ImgOverlay>
        </Card>

    );
}

export default Home;