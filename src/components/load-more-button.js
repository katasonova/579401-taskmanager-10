import AbstractComponent from './abstract';

const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class LoadMoreButton extends AbstractComponent{
  getTemplate() {
    return createLoadMoreButtonTemplate();
  }

  setLoadMoreButtonClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
