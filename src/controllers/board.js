import {render} from '../utils/render';
import Sort, {SortingType} from '../components/sort';
import Tasks from '../components/tasks';
import NoTasks from '../components/no-tasks';
import LoadMoreButton from '../components/load-more-button';
import TaskController from '../controllers/task';

const INITIAL_TASKS_NUMBER = 8;
const TASKS_TO_LOAD_MORE = 8;

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._tasks = new Tasks();
    this._noTasks = new NoTasks();
    this._sort = new Sort();
    this._loadMoreButton = new LoadMoreButton();
  }

  renderTasks(container, array, _onDataChange) {
    return array.slice(0, INITIAL_TASKS_NUMBER).map((task) => {
      const taskController = new TaskController(container, _onDataChange);
      taskController.render(task);
      return taskController;
    });
  }

  _onDataChange(taskController,initialData, changedData) {
    const index = this._tasks.findIndex((el) => el === initialData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), changedData, this._tasks.slice(index + 1))
    taskController.render(this._tasks[index]);
  };

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

    let sortedTasks = tasks;
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
          sortedTasks = tasks.slice();
          break;
      }
      this.renderTasks(boardListElement, sortedTasks, this._onDataChange);
      render(container, this._loadMoreButton.getElement());
    };
    this._sort.setSortingTypeClickHandler(sortHandler);

    this.renderTasks(boardListElement, sortedTasks, this._onDataChange);

    const loadMoreButton = this._loadMoreButton;
    render(container, loadMoreButton.getElement());

    let presentTasksNumber = INITIAL_TASKS_NUMBER;
    const loadMoreButtonClickHandler = (array) => {
      const renderedTasks = presentTasksNumber;
      presentTasksNumber += TASKS_TO_LOAD_MORE;

      this.renderTasks(boardListElement, array.slice(renderedTasks, presentTasksNumber), this._onDataChange);

      if (presentTasksNumber >= array.length) {
        loadMoreButton.getElement().remove();
        presentTasksNumber = INITIAL_TASKS_NUMBER;
      }
    };

    loadMoreButton.setLoadMoreButtonClickHandler(() => loadMoreButtonClickHandler(sortedTasks));
  }
}
