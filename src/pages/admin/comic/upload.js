import {
    Container,
    Col,
    Form,
    Button
} from 'react-bootstrap';

export default function Upload() {
    return (
        <Container>
            <Form action="/api/comics" method="post" encType="multipart/form-data">
                <Form.Row>
                    <Form.Group as={Col} controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required size="lg" type="text" name="title" placeholder="Post Title" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formAltText">
                        <Form.Label>Alt Text</Form.Label>
                        <Form.Control as="textarea" name="altText" rows={3} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description" rows={3} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formImage">
                        <Form.File name="image" label="Comic Image" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Button variant="primary" type="submit">Submit Post</Button>
                </Form.Row>
            </Form>
        </Container>
    )
}