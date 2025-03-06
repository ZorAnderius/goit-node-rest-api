import sortOrder from "../../constants/sortOrder.js";

const parseSortOrder = (order) => {
  const isKnowOrder = [sortOrder.ASC, sortOrder.DESC].includes(order);
  return isKnowOrder ? order : sortOrder.ASC;
};

const parseSortBy = (sortBy) => {
  const keysOfContact = [
    "id",
    "name",
    "email",
    "phone",
    "favorite",
    "createdAt",
    "updatedAt",
  ];
  return keysOfContact.includes(sortBy) ? sortBy : "id";
};

const parseSortParams = (query) => {
  const { sortBy, order } = query;
  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(order);

  return {
    order: [[parsedSortBy, parsedSortOrder]],
  };
};

export default parseSortParams;
