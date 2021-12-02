/// <reference types="nullstack-types"/>

/**
 * Generates a class component based on params
 */
export function createApp(params: {
  methods?: {
    initiate?(context: Context)
    prepare?(context: Context)
    hydrate?(context: Context)
    terminate?(context: Context)
    update?(context: Context)
  },
  render?(context: Context, components: object)
})

/**
 * Generates a plugin object
 * @param params Plugin object
 */
export function createPlugin(params: ElementPlugin): ElementPlugin

/**
 * Generates a function to match a specific node
 * @param fn Function testing the node
 */
export function pluginMatch(
  fn: (node: ElementNode) => any
): (node: ElementNode) => boolean

/**
 * Generates a function to be used as class method
 * @param fn Pure class method
 */
export function classFn(
  fn: (context: Context) => any,
  ctx?: Context
): (context?: any) => any