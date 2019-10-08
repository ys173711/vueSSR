import createApp from './create-app'

const { app, router, store } = createApp()

router.onReady(() => {
  const root = document.createElement('div')
  document.body.appendChild(root)
  app.$mount(root)
})
