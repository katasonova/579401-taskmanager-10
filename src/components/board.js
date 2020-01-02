import AbstractComponent from './abstract';

const createBoardTemplate = () => {
  return (
    `<section class="board container"></section>`
  );
};

export default class Board extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}
