import Menu from './components/menu'
import Filter from './components/filter'
import {generateFilters} from './mock/filter'
import Board from './components/board'
import TaskEditor from './components/task-editor'
import Task from './components/task-item'
import {generateTasks} from './mock/task'
import LoadMoreButton from './components/load-more-button'

const TASKS_NUMBER = 19;
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

let presentTasksNumber = INITIAL_TASKS_NUMBER;

render(boardContainerElement, new LoadMoreButton().getElement());

const renderTask = (task) => {
  const taskItem = new Task(task);
  const taskEditor = new TaskEditor(task);

  const editButton = taskItem.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    boardListElement.replaceChild(taskEditor.getElement(), taskItem.getElement());
  });

  const editTaskFrom = taskEditor.getElement().querySelector(`form`);
  editTaskFrom.addEventListener(`submit`, () => {
    boardListElement.replaceChild(taskItem.getElement(), taskEditor.getElement());
  });

  render(boardListElement, new Task(task).getElement());
}

tasks.slice(0, presentTasksNumber).forEach(task => renderTask(task));

const loadMoreButton = boardContainerElement.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  presentTasksNumber += TASKS_TO_LOAD_MORE;
  tasks.slice(INITIAL_TASKS_NUMBER, presentTasksNumber).forEach(task => renderTask(task));

  if (presentTasksNumber >= tasks.length) {
    loadMoreButton.remove();
  }
});
