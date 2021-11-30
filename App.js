function createApp({ methods, render, Nullstack }) {
  class Application extends Nullstack {
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
  /*
  // initial static logic
  let appString = Application.toString();
  appString = appString.substring(0, appString.length - 1) + 'static async fala() {console.log("fala")}\n} Application;';
  const App = eval(appString)
  console.log(App);
  */

  return Application;
}

function classFn(fn, ctx) {
  return ctx ? fn(ctx) : fn;
}

function clientFn(fn, ctx) {
  return ctx ? fn(ctx) : fn;
}

export { createApp, classFn };