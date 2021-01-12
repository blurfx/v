import { Component, createElement } from '../../v';
import Link from '../../v/router/link';
import './style.scss';

class Empty extends Component {
  render() {

    return createElement(
      'div', { className: 'empty-wrapper' }, [
        createElement('p', { className: 'title' }, 'Nothing here'),
        createElement(Link, {
          path: '/',
          text: 'Back to /',
        }),
      ],
    );
  }
}

export default Empty;
