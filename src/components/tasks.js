import AbstractComponent from './abstract';

const createTasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export default class Tasks extends AbstractComponent {
  getTemplate() {
    return createTasksTemplate();
  }
}
