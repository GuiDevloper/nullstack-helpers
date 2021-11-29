/// <reference types="nullstack-types"/>

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
