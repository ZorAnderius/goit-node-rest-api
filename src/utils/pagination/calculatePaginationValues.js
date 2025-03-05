const calculatePaginationValues = (count, page, perPage) => {
  const totalPage = Math.ceil(count / perPage);
  const hasNextPage = Boolean(totalPage - page) && totalPage - page > 0;
  const hasPreviousPage = page != 1 && page <= totalPage + 1;

  return {
    page: Number(page),
    perPage: Number(perPage),
    totalItem: count,
    totalPage: totalPage === 0 ? 1 : totalPage,
    hasPreviousPage,
    hasNextPage,
  };
};

export default calculatePaginationValues;
