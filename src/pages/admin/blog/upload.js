import {
    Container,
    Form,
    Button
} from 'react-bootstrap';

import Head from 'next/head';

import React from 'react';

export default class Upload extends React.Component {
    componentDidMount() {
        var simplemde = new SimpleMDE({ element: $("#postText")[0] });
    }

    render() {
        return (
            <>
                <Head>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css" />
                    <script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>
                </Head>
                <Container className="p-3">
                    <h1>Create a New Blog Post:</h1>
                    <Form action="/api/blog" method="post">
                        <Form.Group controlId="postTitle">
                            <Form.Label>Post Title</Form.Label>
                            <Form.Control name="postTitle" type="text" />
                        </Form.Group>
                        <Form.Group controlId="postText">
                            <Form.Label>Post Text</Form.Label>
                            <Form.Control name="postText" as="textarea" />
                        </Form.Group>
                        <Form.Group controlId="keywords">
                            <Form.Label>Keywords</Form.Label>
                            <Form.Control as="textarea" name="postKeywords" />
                        </Form.Group>
                        <Button type="submit">Submit Post</Button>
                    </Form>
                </Container>
            </>
        );
    }
}