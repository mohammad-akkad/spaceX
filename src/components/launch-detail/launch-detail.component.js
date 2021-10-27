import React, { Component } from "react";
import SpaceXDataService from "../../services/spaceX.service";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import moment from "moment";

export default class LaunchDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      details: "",
      air_date: "",
    };
  }

  componentWillMount() {
    this.getLaunch();
  }

  getLaunch() {
    const id = this.props.match.params.id || 1;
    SpaceXDataService.getLaunchDetail(id).then((response) => {
      this.setState({
        ...response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <Container>
          <div>
            <img
              src={this.state.links?.patch.large}
              alt="picture"
              width="500"
            />
          </div>
          <div
            style={{ backgroundColor: "white", marginTop: "3%", padding: "5%" }}
          >
            <Row>
              <Col sm={2}>Name: </Col>
              <Col sm={2}>{this.state.name}</Col>
            </Row>
            <Row>
              <Col sm={2}>Details: </Col>
              <Col sm={2}>{this.state.details}</Col>
            </Row>
            <Row>
              <Col sm={2}>date: </Col>
              <Col sm={2}>
                {moment(this.state.date_utc).format("YYYY/MM/DD h:mm A")}
              </Col>
            </Row>
            <Row>
              <Col sm={2}>Wikipedia: </Col>
              <Col sm={2}>
                <a href={this.state.links?.wikipedia}>Link</a>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}
