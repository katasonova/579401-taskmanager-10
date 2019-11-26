import {renderMenu} from './components/menu'
import {renderFilter} from './components/filter'
import {renderBoard} from './components/board'
import {renderTaskEditor} from './components/task-editor'
import {renderTaskItem} from './components/task-item'
import {renderLoadMoreButton} from './components/load-more-button'

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const mainElemen = document.querySelector(`.main`);
const headerElement = mainElemen.querySelector(`.main__control`);

render(headerElement, renderMenu());
render(mainElemen, renderFilter());
render(mainElemen, renderBoard());

const boardListElement = mainElemen.querySelector(`.board__tasks`);
const boardContainerElement = mainElemen.querySelector(`.board`);
render(boardListElement, renderTaskEditor());
render(boardListElement, renderTaskItem());

render(boardContainerElement, renderLoadMoreButton());
