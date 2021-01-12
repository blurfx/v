import { mount } from './mount';
import { createElement } from './index';

export class Component {
  constructor(props) {
    this.props = props || {};
    this.state = {};
    this.refs = {};

    this._currentElement = null;
    this._nextState = null;
    this._parentNode = null;
  }

  shouldComponentUpdate() {
    return true;
  }

  updateComponent() {
    const prevState = this.state;
    const prevElement = this._currentElement;

    if (this._nextState !== prevState) {
      this.state = this._nextState;
    }

    this._nextState = null;
    const nextElement = this.render();
    this._currentElement = nextElement;

    update(prevElement, nextElement, this._parentNode);
  }

  setState(newState) {
    this._nextState = { ...this.state, ...newState };
    this.updateComponent();
  }

  onMount() {}

  render() {}
}

export const update = (prevElement, nextElement, parentNode) => {
  if (prevElement === null || prevElement === undefined) {
    if (typeof nextElement.tag === 'function') {
      createElement(nextElement);
    } else {
      mount(nextElement, parentNode);
    }
  } else if (prevElement.tag === nextElement.tag) {
    if (typeof prevElement.tag === 'string') {
      updateElement(prevElement, nextElement);
    } else if (typeof prevElement.tag === 'function') {
      updateComponent(prevElement, nextElement);
    }
  } else if (typeof prevElement.tag === 'function' && typeof nextElement.tag === 'function') {
    const { _instance } = prevElement;

    mount(nextElement, parentNode);
    parentNode.removeChild(_instance._currentElement.dom);
    _instance._currentElement.dom = null;
  } else {
    const { parentNode } = prevElement.dom;
    parentNode.removeChild(prevElement.dom);
    mount(nextElement, parentNode);
  }
};

export const updateElement = (prevElement, nextElement) => {
  const { dom } = prevElement;
  nextElement.dom = dom;

  const { attr = {}, events = {} } = nextElement;

  for (const [key, value] of Object.entries(prevElement.attr || {})) {
    dom.removeAttribute(key);
  }

  for (const [key, value] of Object.entries(attr)) {
    if (typeof value === 'boolean') {
      if (value) {
        dom.setAttribute(key, key);
      }
      continue;
    }
    dom.setAttribute(key, value);
  }

  for (const [key, value] of Object.entries(prevElement.events || {})) {
    dom.removeEventListener(key, value);
  }

  for (const [key, value] of Object.entries(events)) {
    dom.addEventListener(key, value);
  }

  if (nextElement.props.children) {
    updateChildren(prevElement.props.children, nextElement.props.children, dom);
  }
};

export const updateComponent = (prevComponent, nextComponent) => {
  const { _instance } = prevComponent;
  if (_instance.shouldComponentUpdate()) {
    const { _currentElement } = _instance;

    const nextProps = nextComponent.props;

    nextComponent.dom = prevComponent.dom;
    nextComponent._instance = _instance;
    nextComponent._instance.props = nextProps;

    const nextElement = _instance.render();

    nextComponent._instance._currentElement = nextElement;

    update(_currentElement, nextElement, _instance._parentNode);
  }
};

export const updateChildren = (prevChildren, nextChildren, parentNode) => {
  if (!Array.isArray(prevChildren)) {
    prevChildren = [prevChildren];
  }

  if (!Array.isArray(nextChildren)) {
    nextChildren = [nextChildren];
  }

  for (let i = 0; i < nextChildren.length; i += 1) {
    const prevChild = prevChildren[i];
    const nextChild = nextChildren[i];

    if (typeof prevChild === 'string' && typeof nextChild === 'string') {
      updateText(prevChild, nextChild, parentNode);
    } else {
      update(prevChild, nextChild, parentNode);
    }
  }
};

export const updateText = (prevText, nextText, parentNode) => {
  if (prevText !== nextText) {
    parentNode.firstChild.nodeValue = nextText;
  }
};

export const createComponent = (tag, props) => ({
  tag,
  props,
  dom: null,
});

export const mountComponent = (component, parentNode) => {
  const { tag, props } = component;

  const instance = new tag(props);
  const element = instance.render();
  if (element === undefined) {
    return null;
  }
  const dom = mount(element, parentNode);

  instance._currentElement = element;
  instance._parentNode = parentNode;

  component._instance = instance;
  component.dom = dom;
  parentNode.appendChild(dom);

  instance.onMount();
  return dom;
};
