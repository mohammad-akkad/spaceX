import React, { Component } from "react";
import MortyDataService from "../services/morty.service";
import Pagination from "react-pagination-bootstrap";
import Character from "./character/character.component";
import CardColumns from "react-bootstrap/CardColumns";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default class CharactersList extends Component {
  constructor(props) {
    super(props);
    this.state = { characters: [], info: {}, active: 1, filter: "" };
  }

  getCharacters(pageNumber) {
    var payload = "page=" + pageNumber;
    if (this.state.filter !== "") {
      payload = payload + this.state.filter;
    }

    MortyDataService.getAllCharacters(payload).then(response => {
      this.setState({
        characters: response.data.results,
        info: response.data.info
      });
    });
  }

  onFormSubmit = e => {
    var filter = "";
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    for (const [key, value] of Object.entries(formDataObj)) {
      if (value !== "1" && value !== "") {
        filter = filter + "&" + key + "=" + value;
      }
    }
    this.setState({ active: 1, filter: filter }, () => {
      this.getCharacters(1);
    });
  };

  handlePageChange(pageNumber) {
    this.getCharacters(pageNumber, null);
    this.setState({ activePage: pageNumber });
    this.props.history.replace({ pathname: `/characters/page/${pageNumber}` });
  }

  componentWillMount() {
    this.setState({ active: this.props.match.params.page || 1 });
  }

  componentDidMount() {
    this.getCharacters(this.state.active);
  }
  render() {
    const { characters, info, active } = this.state;

    let items = [];

    const Characters = ({ characters }) => (
      <>
        {characters.map(character => (
          <Character key={character.id} {...character}></Character>
        ))}
      </>
    );

    return (
      <div>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Row className="align-items-center">
            <Col xs="auto">
              <Form.Control
                className="mb-2"
                placeholder="Enter Name"
                name="name"
              />
            </Col>
            <Col xs="auto">
              <Form.Control
                className="mb-2"
                as="select"
                defaultValue="1"
                name="status"
              >
                <option value="1">Select a status</option>
                <option value="1">alive</option>
                <option value="1">dead</option>
                <option value="1">unknown</option>
              </Form.Control>
            </Col>
            <Col xs="auto">
              <Form.Control
                className="mb-2"
                placeholder="Enter Species"
                name="species"
              />
            </Col>
            <Col xs="auto">
              <Form.Control
                className="mb-2"
                as="select"
                defaultValue="1"
                name="gender"
              >
                <option value="1">Select a gender</option>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="genderless">genderless</option>
                <option value="unknown">unknown</option>
              </Form.Control>
            </Col>
            <Col xs="auto">
              <Button type="submit" className="mb-2">
                Search
              </Button>
            </Col>
          </Form.Row>
        </Form>
        <CardColumns>
          <Characters characters={characters}></Characters>
        </CardColumns>
        <Pagination
          activePage={this.state.activePage}
          totalItemsCount={this.state.info.count}
          itemsCountPerPage={20}
          pageRangeDisplayed={15}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}
