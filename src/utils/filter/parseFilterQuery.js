const parseString = (str) => {
  if (typeof str !== 'string') return;
  if (str?.length > 0) return str.trim();
};

const parseBoolean = (boolVar) => {
  if (typeof boolVar !== "string") return;
  const parsedValue = boolVar && JSON.parse(boolVar);
  if (typeof parsedValue === "boolean") return parsedValue;
};

const parseFilterQuery = (query) => {
  const { name, email, phone, favorite } = query;
  const parsedName = parseString(name);
  const parsedEmail = parseString(email);
  const parsedPhone = parseString(phone);
  const parsedFavorite = parseBoolean(favorite);

  return {
    name: parsedName,
    email: parsedEmail,
    phone: parsedPhone,
    favorite: parsedFavorite,
  };
};

export default parseFilterQuery;
