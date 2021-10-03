import Link from 'next/link';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {useState} from 'react';

export default function RegisterForm({eventTypes}) {
    const [key, setKey] = useState('client');
    
    return (
        <Form action="/register" method="post">
                <Form.Row>
                    <Form.Group as={Col} controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control required type="text" name="firstName" placeholder="Enter first name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control required type="text" name="lastName" placeholder="Enter last name" />
                    </Form.Group>
                </Form.Row>
        
                <Form.Row>
                    <Form.Group as={Col} controlId="formUserName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username"
                        placeholder="Enter username" />
                    </Form.Group>
                </Form.Row>
                    
                <Form.Row>
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formEmailConf">
                            <Form.Control type="email" placeholder="Confirm email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formPassConf">
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Col>
                </Form.Row>
                
                <Container>
                    <Row className="my-3">
                        <Button variant="primary" type="submit">Register</Button>
                    </Row>
                    <Row className="my-2">
                        <Link href="/login">Already have an account? Click here.</Link>
                    </Row>
                </Container>
            </Form>
    )
}