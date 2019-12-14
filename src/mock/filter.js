const filterOptions = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

const generateFilters = () => {
  return filterOptions.map((el) => {
    return {
      name: el,
      count: Math.floor(Math.random() * 10),
    }
  });
};

export {generateFilters}
