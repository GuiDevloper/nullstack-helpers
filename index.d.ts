import type { NullstackNode, NullstackPlugin } from 'nullstack-types';

/**
 * Generates a plugin object
 * @param params Plugin object
 */
export function createPlugin(params: NullstackPlugin): NullstackPlugin

/**
 * Generates a function to match a specific node
 * @param fn Function testing the node
 */
export function pluginMatch(
  fn: (node: NullstackNode) => any
): (node: NullstackNode) => boolean