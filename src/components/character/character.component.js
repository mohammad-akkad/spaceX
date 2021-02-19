import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./character.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Character(props) {
  return (
    <a href={`/character/${props.id}`}>
      <Card className="p-3">
        <Card.Img variant="top" src={props.image} />
        <Card.Header></Card.Header>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            <Row>
              <Col sm={4}>Status:</Col>
              <Col className="text" sm={8}>
                {props.status}
              </Col>
            </Row>
            <Row>
              <Col sm={4}>Species:</Col>
              <Col className="text" sm={8}>
                {props.species}
              </Col>
            </Row>
            <Row>
              <Col sm={4}>Gender:</Col>
              <Col className="text" sm={8}>
                {props.gender}
              </Col>
            </Row>
            <Row>
              <Col sm={4}>Origin:</Col>
              <Col className="text" sm={8}>
                {props.origin.name}
              </Col>
            </Row>
            <Row>
              <Col sm={4}>Location:</Col>
              <Col className="text" sm={8}>
                {props.location.name}
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
}

export default Character;
