import { mountComponent } from './component';
import { mountElement, mountText } from './dom';

export const mount = (element, parentNode) => {
  if (['string', 'number'].includes(typeof element)) {
    return mountText(element, parentNode);
  }

  if (typeof element.tag === 'function') {
    return mountComponent(element, parentNode);
  }

  return mountElement(element, parentNode);
};
