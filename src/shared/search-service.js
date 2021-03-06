import request from "./api-service";

function search(term) {
  return request({
    url: `/search`,
    method: "GET",
    params: {
      term: term,
    }
  });
}

const SearchService = {
  search,
};

export default SearchService;
