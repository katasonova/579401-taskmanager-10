import AbstractComponent from './abstract';

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const element = this.getElement();
    const elementParent = element.parentElement;

    this.removeElement();

    const changedElement = this.getElement();
    elementParent.replaceChild(changedElement, element);

    this.recoveryListeners();
  }
}
