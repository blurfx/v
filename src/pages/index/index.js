import { Component, createElement } from '../../v';
import Router from '../../v/router';
import Link from "../../v/router/link";
import './style.scss';

class Index extends Component {
  constructor() {
    super();
    this.router = Router;

    this.state = {
      clicked: 0,
    };

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    const { clicked } = this.state;
    this.setState({
      clicked: clicked + 1,
    });
  }

  render() {
    const { clicked } = this.state;
    return createElement(
      'div', { className: 'index-wrapper' }, [
        createElement('div', {},[
          createElement('button', {
            events: {
              click: this.onButtonClick,
            }
          }, 'Click me'),
          createElement('span', {}, `You clicked button ${clicked} times`),
        ]),
        createElement('div', {},[
          createElement(Link, {
            className: '',
            path: '/empty',
            text: 'Go /empty',
          }),
        ]),
      ],
    );
  }
}

export default Index;
