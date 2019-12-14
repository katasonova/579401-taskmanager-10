import {renderMenu} from './components/menu'
import {renderFiltersList} from './components/filter'
import {generateFilters} from './mock/filter'
import {renderBoard} from './components/board'
import {renderTaskEditor} from './components/task-editor'
import {renderTaskItem} from './components/task-item'
import {generateTask} from './mock/task'
import {renderLoadMoreButton} from './components/load-more-button'

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const mainElemen = document.querySelector(`.main`);
const headerElement = mainElemen.querySelector(`.main__control`);

render(headerElement, renderMenu());
const filters = generateFilters();
console.log(filters);
render(mainElemen, renderFiltersList(filters));
render(mainElemen, renderBoard());

const boardListElement = mainElemen.querySelector(`.board__tasks`);
const boardContainerElement = mainElemen.querySelector(`.board`);
render(boardListElement, renderTaskEditor());
const task = generateTask();
render(boardListElement, renderTaskItem(task));

render(boardContainerElement, renderLoadMoreButton());
