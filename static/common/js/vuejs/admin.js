// import jcc from 'jquery'
import Vue from 'vue'

// import VueAjax from 'vue-resource/dist/vue-resource'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import login from './admin/login/index.vue'
import input from './admin/component/input.vue'

// Vue.use(ElementUI)
// Vue.use(VueAjax)
// Vue.component("hm-login",{
//         template: login,
// });
// Vue.component("hm-input",{
//         template: input,
// });
new Vue({
  el: '#app',
  delimiters:['<{', '}>'],
  components: {
    'hm-login':login,
    'hm-input':input,
  },
  // render: h => h(login)
})
