const isEmptyObject = (object) => {
 return object && Object.keys(object).length === 0;
};

export default isEmptyObject;