import { Component, createElement } from './v';
import router from './v/router';
import RouterProvider from './v/router/provider';
import Index from './pages/index';
import Empty from './pages/empty';

router.addRule('/', Index);
router.addRule('/empty', Empty);
router.push(location.pathname);

export class App extends Component {
  render() {
    return createElement(
      'div', { className: 'container' }, [
        createElement(RouterProvider),
      ],
    );
  }
}

export default App;
