import {
    Container,
    Row,
    Col,
    Image
  } from 'react-bootstrap';
  
  import ComicDisplay from '../../components/ComicDisplay';
  
  import {Comic} from '../../mongodb';
  
  export default function Home(props) {
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
              <ComicDisplay comicID={props.comicID} user={props.user} />
              {/* <Image className="w-100" data-src="holder.js/100px400?text=Latest Comic Available" /> */}
            </Col>
            <Col xs={12} md={2}>
              <Image className="w-100 h-100" data-src="holder.js/100px100p?text=AD 2" />
            </Col>
          </Row>
        </Container>
      </>
    )
  }
  
  export async function getServerSideProps() {
    const docs = await Comic.find({}, {}, { sort: { 'created_at' : -1 } });
    const comicID = docs[0].comicID;
    return {
      props: {
        comicID
      }
    }
  }
  