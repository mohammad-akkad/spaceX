import React, { Component } from "react";
import MortyDataService from "../services/morty.service";
import Episode from "./episode/episode.component";
import CardColumns from "react-bootstrap/CardColumns";
import Pagination from "react-pagination-bootstrap";

export default class EpisodesList extends Component {
  constructor(props) {
    super(props);
    this.state = { episodes: [], info: {}, active: 1 };
  }

  getEpsiods(pageNumber) {
    MortyDataService.getAllEpsiodes(pageNumber).then(response => {
      this.setState({
        episodes: response.data.results,
        info: response.data.info
      });
    });
  }

  handlePageChange(pageNumber) {
    this.getEpsiods(pageNumber);
    this.setState({ active: pageNumber });
    this.props.history.replace({ pathname: `/episodes/page/${pageNumber}` });
  }
  componentWillMount() {
    this.setState({ active: this.props.match.params.page || 1 });
  }

  componentDidMount() {
    this.getEpsiods(this.state.active);
  }

  render() {
    const { episodes, info, active } = this.state;

    const Episodes = ({ episodes }) => (
      <>
        {episodes.map(episode => (
          <Episode key={episode.id} {...episode}></Episode>
        ))}
      </>
    );

    return (
      <div>
        <CardColumns>
          <Episodes episodes={episodes}></Episodes>
        </CardColumns>
        <Pagination
          activePage={active}
          totalItemsCount={info.count}
          itemsCountPerPage={20}
          pageRangeDisplayed={15}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}
