import { createComponent } from './component';
import { mount } from './mount';

export const createElement = (tag, config, children) => {
  if (typeof tag === 'function') {
    const node = createComponent(tag, config);
    return node;
  }

  const node = createDOMElement(tag, config, children);
  return node;
};

export const createDOMElement = (tag, config = {}, children = []) => {
  const {
    className, events, attr, ref,
  } = config;

  return {
    tag,
    attr,
    ref,
    props: {
      children,
    },
    events,
    className,
    dom: null,
  };
};

export const mountText = (text, parentNode) => {
  parentNode.textContent = text;
};

export const mountElement = (element, parentNode) => {
  const {
    attr = {}, className, events = {}, ref, tag, props = {},
  } = element;
  const node = document.createElement(tag);
  element.dom = node;

  if (props.children) {
    if (!Array.isArray(props.children)) {
      props.children = [props.children];
    }
    props.children.forEach((child) => {
      mount(child, node);
    });
  }

  if (className !== undefined) {
    node.className = className;
  }

  for (const [key, value] of Object.entries(attr)) {
    if (typeof value === 'boolean') {
      if (value) {
        node.setAttribute(key, key);
      } else {
        node.removeAttribute(key);
      }
      continue;
    }
    node.setAttribute(key, value);
  }

  for (const [eventName, callback] of Object.entries(events)) {
    node.addEventListener(eventName, callback);
  }
  if (ref) {
    ref.pool[ref.key] = node;
  }

  parentNode.appendChild(node);

  return node;
};
