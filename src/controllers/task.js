import TaskEditor from '../components/task-editor';
import Task from '../components/task-item';
import {render} from '../utils/render';

export default class TaskController {
  constructor(container) {
    this._container = container;
    this._taskComponent = null;
    this._taskEditComponent = null;
  }

  render(task) {
    this._taskComponent = new Task(task);
    this._taskEditComponent = new TaskEditor(task);

    const replaceCardWithEditCard = () => {
      this._container.replaceChild(this._taskComponent.getElement(), this._taskEditComponent.getElement());
    };

    const replaceEditCardWithCard = () => {
      this._container.replaceChild(this._taskEditComponent.getElement(), this._taskComponent.getElement());
    };

    const closeEditCardHandler = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        replaceCardWithEditCard();
        document.removeEventListener(`keydown`, closeEditCardHandler);
      }
    };

    this._taskComponent.setEditButtonClickHandler(() => {
      replaceEditCardWithCard();
      document.addEventListener(`keydown`, closeEditCardHandler);
    });

    this._taskEditComponent.setSubmitHandler(() => {
      replaceCardWithEditCard();
    });

    render(this._container, this._taskComponent.getElement());
  }
}
