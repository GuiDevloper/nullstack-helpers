function loadSVG(config) {
  function addSVGTest(idx) {
    const oldRule = config.module.rules[idx];
    config.module.rules[idx] = {
      ...oldRule,
      test: new RegExp(oldRule.test.source.replace(')', '|svg)'))
    };
  }
  addSVGTest(config.entry.startsWith('./client') ? 2 : 4);

  config.module.rules.push({
    test: /\.svg/,
    loader: require.resolve('./loaders/svg.js'),
  });

  return config;
}

function useTSX(config) {
  /** old logic
  if (((rule.resolve || {}).extensions || []).includes('.nts')) {
    const ntsId = rule.resolve.extensions.indexOf('.nts');
    rule.resolve.extensions[ntsId] = '.tsx';
  }
  */
  const ntsId = config.resolve.extensions.indexOf('.nts');
  config.resolve.extensions[ntsId] = '.tsx';

  config.module.rules = config.module.rules.map(rule => {
    if (!rule.test) return rule;

    const ruleTest = rule.test.source;
    const isNTS = ruleTest.indexOf('nts') > -1;
    return {
      ...rule,
      test: isNTS ? new RegExp(ruleTest.replace('nts', 'tsx')) : rule.test
    }
  })

  return config;
}

function useSWCLoader(config) {
  function factorySWC(type) {
    const transformReact = {
      transform: {
        react: {
          pragma: "Nullstack.element",
          pragmaFrag: "Nullstack.fragment",
          throwIfNamespace: true,
        }
      }
    };
    const loader = {
      loader: require.resolve('swc-loader'),
      options: {
        jsc: {
          parser: {
            syntax: type === 'TS' ? 'typescript' : "ecmascript",
            exportDefaultFrom: true,
            jsx: type === 'JS',
            tsx: type === 'TS',
          },
          ...(!!type ? transformReact : {})
        },
        env: {
          targets: { node: "10" }
        },
      }
    };

    return loader;
  }

  const loadersIdxs = config.entry.startsWith('./client')
    ? [1, 2, 8]
    : [3, 4, 8];
  const loadersTypes = ['', 'JS', 'TS'];
  loadersIdxs.forEach((idx, i) => {
    config.module.rules[idx] = {
      ...config.module.rules[idx],
      use: factorySWC(loadersTypes[i])
    };
  });

  return config;
}

function useSWCBuild(config) {
  const TerserPlugin = require('terser-webpack-plugin');
  config.optimization.minimizer = [
    new TerserPlugin({
      minify: function terserMinimizer(file, _sourceMap) {
        return require('@swc/core').minify(file, {
          keepClassnames: true,
          keepFnames: true
        })
      }
    })
  ];

  return config;
}

module.exports = { loadSVG, useTSX, useSWCLoader, useSWCBuild };