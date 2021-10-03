import {useRouter} from 'next/router';

import {
    Container,
    Row,
    Col,
    Image
  } from 'react-bootstrap';
  
  import ComicDisplay from '../../components/ComicDisplay';
  
  export default function Home(props) {
    const router = useRouter();
    const { cid } = router.query;

    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              <h1>Just Egg Comics</h1><br />
              <p>Welcome to the home of the original egg comic. That's it, nothing else. Just Egg Comics.</p>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs={12} md={2}>
              <Image className="w-100 h-100" data-src="holder.js/100px100p?text=AD 1" />
            </Col>
            <Col xs={12} md={8}>
              <ComicDisplay comicID={cid} user={props.user} />
            </Col>
            <Col xs={12} md={2}>
              <Image className="w-100 h-100" data-src="holder.js/100px100p?text=AD 2" />
            </Col>
          </Row>
        </Container>
      </>
    )
  }
  
export function getServerSideProps() {
    return {
        props: {}
    }
}
  