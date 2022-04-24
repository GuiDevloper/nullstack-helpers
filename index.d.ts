/// <reference types="nullstack-types"/>

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