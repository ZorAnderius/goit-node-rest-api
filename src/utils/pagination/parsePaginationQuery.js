import defaultPagination from "../../constants/defaultPagination.js";
import parseNumber from "../parseNumber.js";

const parsePaginationQuery = (query) => {
  const { page, perPage } = query;
  return {
    page: parseNumber(page, defaultPagination.page),
    perPage: parseNumber(perPage, defaultPagination.perPage),
  };
};

export default parsePaginationQuery;
