const btoa = require('btoa');

require('isomorphic-fetch');

import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Image,
    Spinner
} from 'react-bootstrap';
import React from 'react';

export default class ComicDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",      //this.props.comic.title,
            img: "",        //base64Flag + imageStr,
            alt_text: "",   //this.props.comic.alt_text || "",
            description: "", //this.props.comic.description || "",
            show: false
        };

        let url = `https://www.juste.gg/api/comics?comicID=${this.props.comicID}`;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const res = data[0]
                const base64Flag = `data:${res.img.contentType};base64,`;

                this.setState({
                    title: res.title,
                    alt_text: res.altText,
                    description: res.description
                });

                const imagePromise = new Promise((resolve, reject) => {
                    var binary = '';
                    var bytes = new Uint8Array(res.img.data.data);
                    bytes.forEach((b, index) => {
                        binary += String.fromCharCode(b);
                        if(index == (bytes.length - 1)) {
                            resolve(btoa(binary));
                        }
                    });
                });
                imagePromise.then((value) => {
                    this.setState({
                        img: base64Flag + value,
                        show: true
                    });
                });
            });
    }

    onFileChange = (event) => {
        console.log(event.target)
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            
            reader.onload = (e) => {
                this.setState({
                    'img': e.target.result
                });
            }
            
            reader.readAsDataURL(event.target.files[0]); // convert to base64 string
        }
    }

    render() {
        return (
            <Container>
                {this.state.show ? 
                    <Form action={`/api/comics/${this.props.comicID}`} method="post" encType="multipart/form-data">
                        <Form.Row>
                            <Form.Group as={Col} controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control defaultValue={this.state.title} required size="lg" type="text" name="title" placeholder="Post Title" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formAltText">
                                <Form.Label>Alt Text</Form.Label>
                                <Form.Control as="textarea" defaultValue={this.state.alt_text} name="altText" rows={3} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" defaultValue={this.state.description} name="description" rows={3} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} xs={12} md={6} controlId="formImage" className="d-flex align-items-center">
                                <Form.File name="image" label="Comic Image" onChange={this.onFileChange} />
                            </Form.Group>
                            <Col xs={12} md={6} className="d-flex justify-content-center align-items-center">
                                <img className="w-50" src={this.state.img} />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Button variant="primary" type="submit">Submit Post</Button>
                        </Form.Row>
                    </Form> : 
                    <>
                        <Row className="text-center justify-content-center">
                            <Spinner animation="border" variant="primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </Row>
                    </>
                }
            </Container>
        );
    }
}