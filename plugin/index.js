function createPlugin(params) {
  const Plugin = {
    ...params,
    transform: params.transform || function() {}
  };

  return Plugin;
}

function pluginMatch(fn) {
  return fn;
}

export { createPlugin, pluginMatch };