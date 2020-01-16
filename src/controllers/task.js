import TaskEditor from '../components/task-editor';
import Task from '../components/task-item';
import {render} from '../utils/render';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._mode = Mode.DEFAULT;
    this._onViewChange = onViewChange;
  }

  render(task) {
    this._taskComponent = new Task(task);
    this._taskEditComponent = new TaskEditor(task);

    const replaceCardWithEditCard = () => {
      this._onViewChange();
      this._container.replaceChild(this._taskComponent.getElement(), this._taskEditComponent.getElement());
      this._mode = Mode.EDIT;
    };

    const replaceEditCardWithCard = () => {
      this._taskEditComponent.reset();
      this._container.replaceChild(this._taskEditComponent.getElement(), this._taskComponent.getElement());
      this._mode = Mode.DEFAULT;
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

    this._taskComponent.setArchiveButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive
      }));
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite
      }));
    });

    this._taskEditComponent.setSubmitHandler(() => {
      replaceCardWithEditCard();
    });

    render(this._container, this._taskComponent.getElement());
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this.replaceEditCardWithCard();
    }
  }
}
