import Menu from './components/menu'
import Filter from './components/filter'
import {generateFilters} from './mock/filter'
import Board from './components/board'
import TaskEditor from './components/task-editor'
import Task from './components/task-item'
import {generateTasks} from './mock/task'
import LoadMoreButton from './components/load-more-button'

const TASKS_NUMBER = 20;
const INITIAL_TASKS_NUMBER = 8;
const TASKS_TO_LOAD_MORE = 8;

const render = (container, node, place = `beforeend`) => {
  switch (place) {
    case `afterbegin`:
      container.prepend(node);
      break;
    case `beforeend`:
      container.append(node);
      break;
  }
};

const mainElemen = document.querySelector(`.main`);
const headerElement = mainElemen.querySelector(`.main__control`);

render(headerElement, new Menu().getElement());
const filters = generateFilters();
render(mainElemen, new Filter(filters).getElement());
render(mainElemen, new Board().getElement());

const boardListElement = mainElemen.querySelector(`.board__tasks`);
const boardContainerElement = mainElemen.querySelector(`.board`);
const tasks = generateTasks(TASKS_NUMBER);

render(boardListElement, new TaskEditor(tasks[0]).getElement());
let presentTasksNumber = INITIAL_TASKS_NUMBER;
tasks.slice(1, presentTasksNumber).forEach(task => render(boardListElement, new Task(task).getElement()));

render(boardContainerElement, new LoadMoreButton().getElement());

const loadMoreButton = boardContainerElement.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  presentTasksNumber += TASKS_TO_LOAD_MORE;
  tasks.slice(INITIAL_TASKS_NUMBER, presentTasksNumber).forEach(task => render(boardListElement, new Task(task).getElement()));

  if (presentTasksNumber >= tasks.length) {
    loadMoreButton.remove();
  }
});
