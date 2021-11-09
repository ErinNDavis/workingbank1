import { Card } from 'react-bootstrap';
//import { userContext } from '../userContext';
import React from 'react';
import "./home.css";

function Home(){
    
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
                        Username: User
                    </Card.Text>
                    <Card.Text> 
                        Account Type: Checking
                    </Card.Text>
                    <Card.Text>
                        Balance: $100
                    </Card.Text>
                </div>
            </Card.ImgOverlay>
        </Card>

    );
}

export default Home;