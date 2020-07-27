import Vue from 'vue'
import './plugins/element.js'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import VuePortal from '@linusborg/vue-simple-portal'
import VueResize from 'vue-resize'

import 'vue-resize/dist/vue-resize.css'

Vue.use(VuePortal, {
  name: 'portal', // optional, use to rename component
  selector: '#focusedModal',  // rename selector
})
Vue.use(VueResize)

// Globally register all `_base`-prefixed components
const requireComponent = require.context(
  // Look for files in the current directory
  './components',
  // Do not look in subdirectories
  false,
  // Only include "_base-" prefixed .vue files
  /_base-[\w-]+\.vue$/
)

// For each matching file name...
requireComponent.keys().forEach((fileName) => {
  // Get the component config
  const componentConfig = requireComponent(fileName)
  // Get the PascalCase version of the component name
  const componentName = fileName
    // Remove the "./_" from the beginning
    .replace(/^\.\/_/, '')
    // Remove the file extension from the end
    .replace(/\.\w+$/, '')
    // Split up kebabs
    .split('-')
    // Upper case
    .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
    // Concatenated
    .join('')

  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
