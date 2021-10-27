import React, { Component } from "react";
import SpaceXDataService from "../services/spaceX.service";
import Launch from "./launch/launch.component";
import CardColumns from "react-bootstrap/CardColumns";
import Pagination from "react-pagination-bootstrap";

export default class LaunchesList extends Component {
  constructor(props) {
    super(props);
    this.itemsCountPerPage = 20;
    this.state = { launches: [], info: {}, paginatedLaunches: [], active: 1 };
  }

  getLaunches() {
    SpaceXDataService.getAllLaunches().then(response => {
      this.setState({
        launches: response.data,
        paginatedLaunches: this.reduceLaunches(response.data, 1)
      });
    });
  }

  handlePageChange(pageNumber) {
    this.setState({
      active: pageNumber,
      paginatedLaunches: this.reduceLaunches(this.state.launches, pageNumber)
    });
  }

  reduceLaunches(launches, pageNumber) {
    return launches.slice(
      (pageNumber - 1) * this.itemsCountPerPage,
      pageNumber * this.itemsCountPerPage
    );
  }

  componentWillMount() {
    this.setState({ active: this.props.match.params.page || 1 });
  }

  componentDidMount() {
    this.getLaunches();
  }

  render() {
    const { paginatedLaunches, launches, active } = this.state;
    console.log(paginatedLaunches);
    const Launches = ({ paginatedLaunches }) => (
      <>
        {paginatedLaunches.map(launch => (
          <Launch key={launch.id} {...launch}></Launch>
        ))}
      </>
    );

    return (
      <div>
        <CardColumns>
          <Launches paginatedLaunches={paginatedLaunches}></Launches>
        </CardColumns>
        <Pagination
          activePage={active}
          totalItemsCount={launches.length}
          itemsCountPerPage={this.itemsCountPerPage}
          pageRangeDisplayed={15}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}
