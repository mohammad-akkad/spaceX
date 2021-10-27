import React, { Component } from "react";
import SpaceXDataService from "../services/spaceX.service";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPersonsSentToSpace: "",
      totalLoadSentToSpace: "",
      totalLoadByFalconSum: ""
    };
  }


  componentDidMount() {
    this.getAllPersonsSentToSpace();
    this.getTotalLoadSentToSpace();
    this.getAllRockets();
    this.getAllLaunches();
  }

  
  getAllPersonsSentToSpace() {
    SpaceXDataService.getAllPersonsSentToSpace().then(response => {
      this.setState({ allPersonsSentToSpace: response.data.length });
    });
  }

  getTotalLoadSentToSpace() {
    SpaceXDataService.getTotalLoadSentToSpace().then(response => {
      this.setState({
        totalLoadSentToSpace: response.data.reduce((a, b) => +a + +b.mass_kg, 0)
      });
    });
  }

  getAllRockets() {
    SpaceXDataService.getAllRockets().then(response => {
      let totalLoadByFalconSum = 0;
      response.data.forEach(rocket => {
        if (rocket.name.includes("Falcon")) {
          rocket.payload_weights.forEach(payload => {
            totalLoadByFalconSum += payload.kg;
          });
        }
      });

      this.setState({ totalLoadByFalconSum: totalLoadByFalconSum });
    });
  }

  getAllLaunches() {
    SpaceXDataService.getAllLaunches().then(response => {
      let allLaunchesCount = response.data.length;
      let successfulLaunchesCount = response.data.filter(launch => {
        return launch.success === true
      }).length;

      let successRate = (successfulLaunchesCount/allLaunchesCount) * 100
  
      this.setState({
        allSuccessfulLaunchesCount: successfulLaunchesCount,
        FailLaunchesCount: allLaunchesCount - successfulLaunchesCount,
        successRate: successRate.toFixed(2)
      });
    });
  }
  render() {
    return (
      
      <Container style={{backgroundColor: "white",  padding: "5%"}}>
        <Row>
          <Col sm={4}>Number of People sent to space: </Col>
          <Col sm={2}>{this.state.allPersonsSentToSpace}</Col>
        </Row>
        <Row>
          <Col sm={4}>Total load sent to space: </Col>
          <Col sm={2}>{this.state.totalLoadSentToSpace} Kg</Col>
        </Row>
        <Row>
          <Col sm={4}>Total load using falcon: </Col>
          <Col sm={2}>{this.state.totalLoadByFalconSum} Kg</Col>
        </Row>
        <Row>
          <Col sm={4}>Successful launches: </Col>
          <Col sm={2}>{this.state.allSuccessfulLaunchesCount} </Col>
        </Row>
        <Row>
          <Col sm={4}>Falied launches: </Col>
          <Col sm={2}>{this.state.FailLaunchesCount} </Col>
        </Row>

        <Row>
          <Col sm={4}>Success rate: </Col>
          <Col sm={2}>{this.state.successRate}%</Col>
        </Row>
      </Container>

    );
  }
}
