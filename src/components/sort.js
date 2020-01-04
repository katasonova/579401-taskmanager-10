import AbstractComponent from './abstract';

export const SortingType = {
  DEFAULT: `default`,
  DATE_UP: `date-up`,
  DATE_DOWN: `date-down`
};

const createSortTemplate = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" data-sorting-type=${SortingType.DEFAULT} class="board__filter">SORT BY DEFAULT</a>
      <a href="#" data-sorting-type=${SortingType.DATE_UP} class="board__filter">SORT BY DATE up</a>
      <a href="#" data-sorting-type=${SortingType.DATE_DOWN} class="board__filter">SORT BY DATE down</a>
    </div>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currenSortingType = SortingType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  setSortingTypeClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const selectedSortingType = evt.target.dataset.SortingType;

      if (this._currenSortingType === selectedSortingType) {
        return;
      }

      this._currenSortingType = selectedSortingType;
      handler(this._currenSortingType);
    });
  }
}
