import React, { Component } from "react";
import MortyDataService from "../../services/morty.service";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BootstrapTable from "react-bootstrap-table-next";
import "../style.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

export default class EpisodeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      episode: "",
      air_date: "",
      charactersArray: []
    };
  }

  getEpsiode() {
    const id = this.props.match.params.id || 1;
    MortyDataService.getEpsiodeDetail(id).then(response => {
      this.setState({
        ...response.data
      });
      this.getcharacters();
    });
  }
  getcharacters() {
    var stringOfIds = "";
    this.state.characters.forEach(url => {
      var slashIndex = url.lastIndexOf("/");
      var id = url.substring(slashIndex + 1);
      stringOfIds = stringOfIds + id + ",";
    });

    MortyDataService.getMultiCharacters(stringOfIds).then(response => {
      var characters = response.data.map((character, index) => ({
        ...character,
        id: index + 1
      }));
      this.setState({
        charactersArray: characters
      });
    });
  }
  componentWillMount() {
    this.getEpsiode();
  }
  componentDidMount() {}

  render() {
    const columns = [
      {
        dataField: "id",
        text: "#",
        sort: true,
        filter: textFilter()
      },
      {
        dataField: "name",
        text: "Name",
        sort: true,
        filter: textFilter()
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
        filter: textFilter()
      },
      {
        dataField: "species",
        text: "Species",
        sort: true,
        filter: textFilter()
      },
      {
        dataField: "origin.name",
        text: "Origin",
        sort: true,
        filter: textFilter()
      },
      {
        dataField: "location.name",
        text: "Location",
        sort: true,
        filter: textFilter()
      },
      {
        dataField: "gender",
        text: "Gender",
        sort: true,
        filter: textFilter()
      }
    ];
    return (
      <div>
        <Container>
          <Row>
            <Col sm={2}>Name: </Col>
            <Col sm={2}>{this.state.name}</Col>
          </Row>
          <Row>
            <Col sm={2}>Episode: </Col>
            <Col sm={2}>{this.state.episode}</Col>
          </Row>
          <Row>
            <Col sm={2}>Air date: </Col>
            <Col sm={2}>{this.state.air_date}</Col>
          </Row>
          <Row>
            <Col>
              <h2>Characters</h2>
            </Col>
          </Row>
        </Container>
        <BootstrapTable
          keyField="id"
          data={this.state.charactersArray}
          columns={columns}
          filter={filterFactory()}
        />
      </div>
    );
  }
}
