import {
    Container,
    Row,
    Col,
    Nav
} from 'react-bootstrap';

export default function Footer() {
    return (
        <Container className="border-top border-secondary mt-4 ">
            <Row>
                <Nav className="w-100 justify-content-between">
                    <Col>
                        <Nav.Link href="#">Home</Nav.Link>
                    </Col>
                    <Col>
                        <Nav.Link href="#">Latest Comic</Nav.Link>
                    </Col>
                    <Col>
                        <Nav.Link href="#">News</Nav.Link>
                    </Col>
                    <Col>
                        <Nav.Link href="#">Merch</Nav.Link>
                    </Col>
                </Nav>
            </Row>
            <Row className="justify-content-center">
                <p className="text-muted">Copyright 2020 by Just Egg Comics.</p>
            </Row>
        </Container>
    )
}