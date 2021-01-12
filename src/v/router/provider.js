import { Component, createElement } from '..';
import Router from '.';

class RouterProvider extends Component {
  constructor(routes = []) {
    super();
    this.router = Router;

    this.router.setProvider(this);
    routes.forEach((route) => {
      this.router.addRule(route);
    });

    this.state = {
      route: this.router.routes[this.router.routes.length - 1] || {
        path: this.router.root,
        component: null,
      },
    };
  }

  onUpdate({ path, component }) {
    this.setState({
      route: {
        path,
        component,
      },
    });
  }

  render() {
    const { route } = this.state;
    const { component } = route;

    return createElement(component);
  }
}

export default RouterProvider;
