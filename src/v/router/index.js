class Router {
  constructor(config = {}) {
    const baseRoot = '/';
    this.routes = [];
    this.rules = {};
    this.root = config.root || baseRoot;
    this.provider = null;
  }

  setProvider(provider) {
    this.provider = provider;
    this.updateProvider();
  }

  addRule(path, component) {
    this.rules[path] = component;
  }

  push(path) {
    const component = this.rules[path] || this.rules[this.root];
    this.routes.push({ path, component });
    this.updateProvider();
    history.pushState(null, null, path);
    return this;
  }

  pop() {
    this.routes.pop();
    this.updateProvider();
    return this;
  }

  updateProvider() {
    const currentRoute = this.routes[this.routes.length - 1];
    if (this.provider) {
      this.provider.onUpdate(currentRoute);
    }
  }
}

const router = new Router();

export default router;
