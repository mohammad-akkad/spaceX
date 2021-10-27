import http from "../http-common";

class SpaceXDataService {
  getAllLaunches() {
    return http.get(`/launches`);
  }

  getLaunchDetail(id) {
    return http.get(`/launches/${id}`);
  }
  getAllPersonsSentToSpace() {
    return http.get(`/crew/`);
  }

  getTotalLoadSentToSpace() {
    return http.get(`/payloads/`);
  }

  getAllRockets() {
    return http.get(`/rockets/`);
  }
}

export default new SpaceXDataService();
