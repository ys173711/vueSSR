import createApp from './create-app'

const { app, router, store } = createApp()

router.onReady(() => {
  app.$mount("#root")
})
