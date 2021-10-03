import {
    Container,
    Row,
    Col,
    Image,
    Nav,
    Navbar
} from 'react-bootstrap';

export default function NavBar() {
    return (
        <Navbar expand="md" id="navBanner" className="align-items-lg-end">
            <Col xs={12} md={9} lg={4}>
                <Image src="/img/logo.png" className="w-100" />
            </Col>
            <Col xs={12} md={3} lg={0} className="d-xs-block d-lg-none border border-dark rounded my-2 my-lg-auto p-3">
                <Row>
                    <Col xs={10} md={12} id="nutFactTop">
                        <svg className="text-dark w-100" viewBox="0 0 87 18">
                            <text x="0" y="15">Nutrition Facts</text>
                        </svg>
                        <hr />
                        <p>Serving Size 1 Egg</p>
                        <p>Servings Per Container About 2</p>
                    </Col>
                    <Col xs={2} md={0} className="d-flex justify-content-center align-items-center">
                        <Navbar.Toggle />
                    </Col>
                </Row>
                <Row>
                    <Navbar.Collapse className="m-3">
                        <Nav className="w-100 flex-column">
                            <hr id="nutFactSeparator" className="bg-dark" />
                            <Nav.Link className="w-100 d-block d-flex justify-content-between" href="/"><span>Home</span><Image style={{height: "1.5em"}} src="/img/NavItem.png" /></Nav.Link>
                            <Nav.Link className="w-100 d-block d-flex justify-content-between" href="#"><span>Latest Comic</span><Image style={{height: "1.5em"}} src="/img/NavItem.png" /></Nav.Link>
                            <Nav.Link className="w-100 d-block d-flex justify-content-between" href="#"><span>News</span><Image style={{height: "1.5em"}} src="/img/NavItem.png" /></Nav.Link>
                            <Nav.Link className="w-100 d-block d-flex justify-content-between" href="#"><span>Merch</span><Image style={{height: "1.5em"}} src="/img/NavItem.png" /></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Row>
            </Col>
            <Col xs={0} lg={8} className="d-none d-lg-block">
                <Nav className="w-100">
                    <Nav.Link href="/"><Image style={{height: "1.5em"}} src="/img/NavItem.png" /><span>Home</span></Nav.Link>
                    <Nav.Link href="#"><Image style={{height: "1.5em"}} src="/img/NavItem.png" /><span>Latest Comic</span></Nav.Link>
                    <Nav.Link href="#"><Image style={{height: "1.5em"}} src="/img/NavItem.png" /><span>News</span></Nav.Link>
                    <Nav.Link href="#"><Image style={{height: "1.5em"}} src="/img/NavItem.png" /><span>Merch</span></Nav.Link>
                </Nav>
            </Col>
        </Navbar>
    )
}