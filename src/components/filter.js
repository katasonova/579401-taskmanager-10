import AbstractComponent from './abstract';

const renderFilterItem = (filter) => {
  return (`
  <input
    type="radio"
    id="filter__${filter.name}"
    class="filter__input visually-hidden"
    name="filter"
    checked
  />
  <label for="filter__${filter.name}" class="filter__label">${filter.name.toUpperCase()}
    <span class="filter__${filter.name}-count">${filter.count}</span>
  </label
>`);
};

const createFiltersListTemplate = (filters) => {
  const generatedFilters = filters.map(((el) => renderFilterItem(el))).join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${generatedFilters}
    </section>`
  );
};

export default class Filter extends AbstractComponent{
  constructor(filter) {
    super();
    this._filter = filter;
  }

  getTemplate() {
    return createFiltersListTemplate(this._filter);
  }
}
