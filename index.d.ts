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
  render?(context: Context, components: Object)
})

type ElementNode = {
  type: String | Boolean,
  attributes: {
    route: String,
    html: String
  },
  children: Array<any>
};

interface ContextNode extends Context {
  node: ElementNode
}

export function createPlugin(params: {
  /**
   * Runs transformation to node element
   * @param context Context with node attributes
   */
  transform?(context: ContextNode),
  /**
   * Load something when plugin installs
   * @param context Application context
   */
  load?(context: Context),
  /**
   * Use plugin in server context
   */
  server?: Boolean,
  /**
   * Use plugin in client context
   */
  client?: Boolean
}): Object

/**
 * Generates a function to match a specific node
 * @param fn Function testing the node
 */
export function pluginMatch(fn: function (ElementNode)): (function(): Boolean)

/**
 * Generates a function to be used as class method
 * @param fn Pure class method
 */
export function classFn(fn: function (Context)): (function(): any)