import {render} from '../utils/render';
import Sort, {SortingType} from '../components/sort';
import Tasks from '../components/tasks';
import NoTasks from '../components/no-tasks';
import TaskEditor from '../components/task-editor';
import Task from '../components/task-item';
import LoadMoreButton from '../components/load-more-button';

const INITIAL_TASKS_NUMBER = 8;
const TASKS_TO_LOAD_MORE = 8;

const renderTasks = (container, array) => {
  array.slice(0, INITIAL_TASKS_NUMBER).forEach((task) => renderTask(container, task));
};

const renderTask = (boardListElement, task) => {
  const taskItem = new Task(task);
  const taskEditor = new TaskEditor(task);

  const replaceCardWithEditCard = () => {
    boardListElement.replaceChild(taskItem.getElement(), taskEditor.getElement());
  };

  const replaceEditCardWithCard = () => {
    boardListElement.replaceChild(taskEditor.getElement(), taskItem.getElement());
  };

  const closeEditCardHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      replaceCardWithEditCard();
      document.removeEventListener(`keydown`, closeEditCardHandler);
    }
  };

  taskItem.setEditButtonClickHandler(() => {
    replaceEditCardWithCard();
    document.addEventListener(`keydown`, closeEditCardHandler);
  });

  taskEditor.setSubmitHandler(() => {
    replaceCardWithEditCard();
  });

  render(boardListElement, taskItem.getElement());
};

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._tasks = new Tasks();
    this._noTasks = new NoTasks();
    this._sort = new Sort();
    this._loadMoreButton = new LoadMoreButton();
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasks.getElement());
      return;
    }

    render(container, this._sort.getElement());
    render(container, this._tasks.getElement());

    const boardListElement = this._tasks.getElement();

    let sortedTasks = [];
    const sortHandler = (type) => {
      boardListElement.innerHTML = ``;

      switch (type) {
        case SortingType.DATE_UP:
          sortedTasks = tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
          break;
        case SortingType.DATE_DOWN:
          sortedTasks = tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
          break;
        case SortingType.DEFAULT:
          sortedTasks = tasks;
          break;
      }
      renderTasks(boardListElement, sortedTasks);
      render(container, this._loadMoreButton.getElement());
      //this._loadMoreButton.setLoadMoreButtonClickHandler(() => loadMoreButtonClickHandler(sortedTasks));
    };
    this._sort.setSortingTypeClickHandler(sortHandler);

    renderTasks(boardListElement, tasks);

    const loadMoreButton = this._loadMoreButton;
    render(container, loadMoreButton.getElement());

    let presentTasksNumber = INITIAL_TASKS_NUMBER;
    const loadMoreButtonClickHandler = (array) => {
      const renderedTasks = presentTasksNumber;
      presentTasksNumber += TASKS_TO_LOAD_MORE;

      array.slice(renderedTasks, presentTasksNumber).forEach((task) => renderTask(boardListElement, task));

      if (presentTasksNumber >= array.length) {
        loadMoreButton.getElement().remove();
        presentTasksNumber = INITIAL_TASKS_NUMBER;
      }
    };

    loadMoreButton.setLoadMoreButtonClickHandler(() => loadMoreButtonClickHandler(tasks));
  }
}
