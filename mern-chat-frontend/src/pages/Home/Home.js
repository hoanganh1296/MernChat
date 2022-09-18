import React from 'react';
import {Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './home.css';

function Home() {
    return (
        <Container fluid>
            <Row>
                <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center">
                    <div>
                        <h1>Share the world with your friends</h1>
                        <p>Chat App lets you connect with the world</p>
                        <LinkContainer to="/chat">
                            <Button variant="success">
                                Get Started <i className="fas fa-comments home-message-icon"></i>
                            </Button>
                        </LinkContainer>
                    </div>
                </Col>
                <Col md={6} className="home__bg"></Col>
            </Row>
        </Container>
    );
}

export default Home;
