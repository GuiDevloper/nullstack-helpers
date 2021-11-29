import Nullstack from 'nullstack';

function createApp({ methods, render }) {

  const Application = class extends Nullstack {
    constructor() {
      super();
      for (let method in methods) {
        const tMethod = typeof methods[method] === 'function'
          ? methods[method].bind(this)
          : methods[method];
        this[method] = tMethod;
      }
    }

    render(context) {
      let components = {};
      Object.keys(this)
        .filter(name => name.startsWith('render') && name !== 'render')
        .forEach(name => {
          components = {
            ...components,
            [name.replace('render', '')]: this[name]
          }
        })
      return render ? render.bind(this)(context, components) : false;
    }
  };

  return Application;
}

export { createApp };