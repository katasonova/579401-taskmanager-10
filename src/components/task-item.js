import {formatTime, formatDate, createElement} from '../utils.js';

const renderHashtags = (array) => {
  return array.map(((el) => {
    return (
      `<span class="card__hashtag-inner">
        <span class="card__hashtag-name">
          #${el}
        </span>
      </span>`
    );
  })).join(``);
};

const createTaskItemTemplate = (task) => {
  const isExpired = task.dueDate instanceof Date && task.dueDate < Date.now();
  const hashtags = renderHashtags(Array.from(task.tags));
  const deadlineClass = isExpired ? `card--deadline` : ``;

  const date = task.dueDate === null ? `` : formatDate(task.dueDate);
  const time = task.dueDate === null ? `` : formatTime(task.dueDate);

  return (
    `<article class="card card--${task.color} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites card__btn--disabled"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${task.description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                    <span class="card__time">${time}</span>
                  </p>
                </div>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${hashtags}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class Task {
  constructor (task) {
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return createTaskItemTemplate(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate())
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
