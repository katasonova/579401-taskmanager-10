import {render} from './utils/render'
import Menu from './components/menu'
import Filter from './components/filter'
import {generateFilters} from './mock/filter'
import Board from './components/board'
import Sort from './components/sort'
import Tasks from './components/tasks'
import NoTasks from './components/no-tasks'
import TaskEditor from './components/task-editor'
import Task from './components/task-item'
import {generateTasks} from './mock/task'
import LoadMoreButton from './components/load-more-button'

const TASKS_NUMBER = 19;
const INITIAL_TASKS_NUMBER = 8;
const TASKS_TO_LOAD_MORE = 8;

const mainElemen = document.querySelector(`.main`);
const headerElement = mainElemen.querySelector(`.main__control`);

render(headerElement, new Menu().getElement());

const filters = generateFilters();
render(mainElemen, new Filter(filters).getElement());

const board = new Board();
render(mainElemen, board.getElement());

const renderTask = (boardListElement, task) => {
  const taskItem = new Task(task);
  const taskEditor = new TaskEditor(task);

  const replaceCardWithEditCard = () => {
    boardListElement.replaceChild(taskItem.getElement(), taskEditor.getElement());
  };

  const replaceEditCardWithCard = () => {
    boardListElement.replaceChild(taskEditor.getElement(), taskItem.getElement());;
  }

  const closeEditCardHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      replaceCardWithEditCard();
      document.removeEventListener(`keydown`, closeEditCardHandler)
    };
  };

  taskItem.setEditButtonClickHandler(() => {
    replaceEditCardWithCard();
    document.addEventListener(`keydown`, closeEditCardHandler)
  });

  taskEditor.setSubmitHandler(() => {
    replaceCardWithEditCard();
  });

  render(boardListElement, taskItem.getElement());
}

const tasks = generateTasks(TASKS_NUMBER);
const isAllTasksArchived = tasks.every((task) => task.isArchive);

if (isAllTasksArchived) {
  render(board.getElement(), new NoTasks().getElement())
} else {
  render(board.getElement(), new Sort().getElement());
  render(board.getElement(), new Tasks().getElement());

  const boardListElement = mainElemen.querySelector(`.board__tasks`);
  tasks.slice(0, INITIAL_TASKS_NUMBER).forEach(task => renderTask(boardListElement, task));

  const loadMoreButton = new LoadMoreButton();
  render(board.getElement(), loadMoreButton.getElement());

  let presentTasksNumber = INITIAL_TASKS_NUMBER;

  loadMoreButton.setLoadMoreButtonClickHandler(() => {
    const renderedTasks = presentTasksNumber;
    presentTasksNumber += TASKS_TO_LOAD_MORE;
    tasks.slice(renderedTasks, presentTasksNumber).forEach(task => renderTask(boardListElement, task));

    if (presentTasksNumber >= tasks.length) {
      loadMoreButton.getElement().remove();
    }
  });
}
