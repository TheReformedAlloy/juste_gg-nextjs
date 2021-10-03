import { getBlogData } from './../../../../lib/blog';

import {
    Container,
    Form,
    Button
} from 'react-bootstrap';

import Head from 'next/head';

import React from 'react';

export default class EditPost extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var simplemde = new SimpleMDE({ element: $("#postText")[0] });
        
        simplemde.value(this.props.post.content);

        $("postKeywords").val(this.props.post.keywords.join(", "))
    }

    render() {
        return (
            <>
                <Head>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css" />
                    <script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>
                </Head>
                <Container className="p-3">
                    <h1>Edit Your Blog Post:</h1>
                    <Form action={`/api/blog/${this.props.post.id}`} method="post">
                        <Form.Group controlId="postTitle">
                            <Form.Label>Post Title</Form.Label>
                            <Form.Control type="text"  name="postTitle" defaultValue={this.props.post.title} />
                        </Form.Group>
                        <Form.Group controlId="postText">
                            <Form.Label>Post Text</Form.Label>
                            <Form.Control as="textarea" name="postText" />
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

export async function getServerSideProps({ params }) {
    const post = await getBlogData(params.id);

    return {
        props: {
            post
        }
    }
}