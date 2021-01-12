import { Component, createElement } from '../index';
import Router from './index';

class Link extends Component {
  constructor({
    className, path, text, attr,
  }) {
    super();
    this.router = Router;

    this.props = {
      className,
      path,
      text,
      attr,
    };
  }

  render() {
    const {
      className, path, text, attr,
    } = this.props;
    const attributes = { href: path, ...attr };
    return createElement('a', {
      className,
      attr: attributes,
      events: {
        click: (e) => {
          e.preventDefault();
          if (!attributes.disabled) {
            this.router.push(path);
          }
        },
      },
    }, text);
  }
}

export default Link;
