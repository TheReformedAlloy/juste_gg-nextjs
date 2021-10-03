const btoa = require('btoa');

require('isomorphic-fetch');

import {
    Container,
    Row,
    Col,
    Button,
    Image,
    Spinner
} from 'react-bootstrap';
import React from 'react';

import {Counter} from '../mongodb';

import Link from 'next/link';

export default class ComicDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",      //this.props.comic.title,
            img: "",        //base64Flag + imageStr,
            alt_text: "",   //this.props.comic.alt_text || "",
            description: "", //this.props.comic.description || "",
            show: false,
            admin: props.user ? props.user.admin : false,
            prevID: parseInt(props.comicID) - 1,
            nextID: parseInt(props.comicID) + 1 
        };
        
        fetch(`https://www.juste.gg/api/comics/lastID`)
            .then(response => response.json())
            .then(data => {
                this.setState({'lastID': data.lastID})
            });

        let url = `https://www.juste.gg/api/comics?comicID=${this.props.comicID}`;
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

    render() {
        return (
            <Container>
                {this.state.show ? 
                    <>
                        <Row>
                            <Col className="d-flex justify-content-between">
                                <h2>{this.state.title}</h2>
                                {this.state.admin && <Button variant="secondary" href={`/admin/edit/${this.props.comicID}`}>
                                        Edit&nbsp;
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>
                                    </Button>}
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col xs={12} lg={8}>
                                <Image thumbnail src={this.state.img} alt={this.state.alt_text} />
                            </Col>
                        </Row>
                        <Row className="p-5">
                            <Col>
                                <p>{this.state.description}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                {/*Skip to Beginning*/}
                                {this.props.comicID != 1 ?
                                    <a href="/comics/1">
                                        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-skip-backward" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z"/>
                                        </svg>
                                    </a>
                                :
                                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-skip-backward" fill="gray" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z"/>
                                    </svg>
                                }
                                {/*Go Back*/}
                                {this.state.prevID >= 1 ?
                                    <a href={`/comics/${this.state.prevID}`}>
                                        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-caret-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10 12.796L4.519 8 10 3.204v9.592zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                                        </svg>
                                    </a>
                                :
                                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-caret-left" fill="gray" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 12.796L4.519 8 10 3.204v9.592zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                                    </svg>
                                }
                                {/*Current Index*/}
                                    <h3>{this.props.comicID}</h3>
                                {/*Go Forward*/}
                                {this.state.nextID <= this.state.lastID ?
                                    <a href={`/comics/${this.state.nextID}`}>
                                        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-caret-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                        </svg>
                                    </a>
                                :
                                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-caret-right" fill="gray" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                    </svg>
                                }
                                {/*Skip to End*/}
                                {this.state.lastID != this.props.comicID ?
                                    <a href={`/comics/${this.state.lastID}`}>
                                        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-skip-forward" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z"/>
                                        </svg>
                                    </a>
                                :
                                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-skip-forward" fill="gray" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z"/>
                                </svg>
                                }
                            </Col>
                        </Row>
                    </> : 
                    <>
                        <Row style={{minHeight: "250px"}} className="text-center align-items-center justify-content-center">
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