import Link from 'next/link'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function LoginForm() {
    return (
        <Form action="/login" method="post">
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" placeholder="Enter username" />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
                <Container>
                    <Row className="my-3">
                        <Button variant="primary" type="submit">Login</Button>
                    </Row>
                    <Row className="my-2">
                        <Link href="/register">Don't have an account? Click here.</Link>
                    </Row>
                </Container>
            </Form>
    )
}