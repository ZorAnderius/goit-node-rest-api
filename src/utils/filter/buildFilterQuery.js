const buildFilterQuery = (filterValues) => {
  const { name, email, phone, favorite } = filterValues;
  const query = {};
  if (name) query.name = name;
  if (email) query.email = email;
  if (phone) query.phone = phone;
  if (favorite !== undefined) query.favorite = favorite;

  return query;
};

export default buildFilterQuery;
