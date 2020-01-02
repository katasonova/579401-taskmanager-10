import {render} from './utils/render'
import Menu from './components/menu'
import Filter from './components/filter'
import {generateFilters} from './mock/filter'
import Board from './components/board'
import {generateTasks} from './mock/task'
import BoardController from './controllers/board'

const TASKS_NUMBER = 19;

const mainElemen = document.querySelector(`.main`);
const headerElement = mainElemen.querySelector(`.main__control`);

render(headerElement, new Menu().getElement());

const filters = generateFilters();
render(mainElemen, new Filter(filters).getElement());

const board = new Board();
render(mainElemen, board.getElement());

const tasks = generateTasks(TASKS_NUMBER);

const boardController = new BoardController(board);
boardController.render(tasks);
