import React, { Component } from "react";
import MortyDataService from "../../services/morty.service";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

export default class CharacterDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getCharacter() {
    const id = this.props.match.params.id || 1;
    MortyDataService.getCharacterDetail(id).then(response => {
      this.setState({
        ...response.data
      });
    });
  }

  componentWillMount() {
    this.getCharacter();
  }

  render() {
    const {
      name,
      status,
      species,
      gender,
      origin,
      location,
      image
    } = this.state;
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Image src={image} />
            </Col>
            <Col style={{ paddingTop: "5%" }}>
              <Row>
                <Col sm={2}>Name: </Col>
                <Col sm={8}>{name}</Col>
              </Row>
              <Row>
                <Col sm={2}>Status: </Col>
                <Col sm={8}>{status}</Col>
              </Row>
              <Row>
                <Col sm={2}>Species: </Col>
                <Col sm={8}>{species}</Col>
              </Row>
              <Row>
                <Col sm={2}>Gender: </Col>
                <Col sm={8}>{gender}</Col>
              </Row>
              <Row>
                <Col sm={2}>origin: </Col>
                <Col sm={8}>{origin ? origin.name : ""}</Col>
              </Row>
              <Row>
                <Col sm={2}>Location: </Col>
                <Col sm={8}>{location ? location.name : ""}</Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
