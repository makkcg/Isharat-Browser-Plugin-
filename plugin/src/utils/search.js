// Used for search
export const have = (value, searchValue) => {
  if (!value && value !== 0) return false;
  if (typeof value === "number") return value === +searchValue;
  return (
    value.toString().includes(searchValue) ||
    value.toLowerCase().toString().includes(searchValue)
  );
};

// used to find relational objects by id
export const findById = (list, id) => list.find((item) => item._id === id);
