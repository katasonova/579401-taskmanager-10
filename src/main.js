import {renderMenu} from './components/menu'
import {renderFiltersList} from './components/filter'
import {generateFilters} from './mock/filter'
import {renderBoard} from './components/board'
import {renderTaskEditor} from './components/task-editor'
import {renderTaskItem} from './components/task-item'
import {generateTasks} from './mock/task'
import {renderLoadMoreButton} from './components/load-more-button'

const TASKS_NUMBER = 8;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const mainElemen = document.querySelector(`.main`);
const headerElement = mainElemen.querySelector(`.main__control`);

render(headerElement, renderMenu());
const filters = generateFilters();
render(mainElemen, renderFiltersList(filters));
render(mainElemen, renderBoard());

const boardListElement = mainElemen.querySelector(`.board__tasks`);
const boardContainerElement = mainElemen.querySelector(`.board`);
const tasks = generateTasks(TASKS_NUMBER);

render(boardListElement, renderTaskEditor(tasks[0]));
tasks.slice(1).forEach(task => render(boardListElement, renderTaskItem(task)));

render(boardContainerElement, renderLoadMoreButton());
