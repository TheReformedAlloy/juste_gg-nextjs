import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';

export default function Admin () {
    return (
        <Container>
            <h1>Admin Control Panel:</h1>
            <h2>Comic Controls:</h2>
            <Row>
                <Col xs={12} md={3} lg={2}>
                    <Button href="/admin/comic/upload" variant="outline-success">Upload</Button>
                </Col>
                <Col xs={12} md={3} lg={2}>
                    <Button href="/admin/comic/viewAll" variant="outline-secondary">View All</Button>
                </Col>
            </Row>
            <h2>Blog Controls:</h2>
            <Row>
                <Col xs={12} md={3} lg={2}>
                    <Button href="/admin/blog/upload" variant="outline-success">Create</Button>
                </Col>
                <Col xs={12} md={3} lg={2}>
                    <Button href="/admin/blog/viewAll" variant="outline-secondary">View All</Button>
                </Col>
            </Row>
        </Container>
    );
}