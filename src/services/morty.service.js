import http from "../http-common";

class MortyDataService {
  getAllEpsiodes(pageNumber) {
    return http.get(`/episode?page=${pageNumber}`);
  }

  getEpsiodeDetail(id) {
    return http.get(`/episode/${id}`);
  }

  getCharacterDetail(id) {
    return http.get(`/character/${id}`);
  }

  getMultiCharacters(characterIds) {
    return http.get(`/character/${characterIds}`);
  }

  getAllCharacters(payload) {
    return http.get(`/character/?${payload}`);
  }
}

export default new MortyDataService();
