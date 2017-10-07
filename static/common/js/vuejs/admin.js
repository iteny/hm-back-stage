// import jcc from 'jquery'
import Vue from 'vue'

// import VueAjax from 'vue-resource/dist/vue-resource'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import login from './admin/login/index.vue'
import input from './admin/component/input.vue'
import formInput from './admin/component/formInput.vue'
import form from './admin/component/form.vue'
import item from './admin/component/formItem.vue'
import inputAddon from './admin/component/inputAddon.vue'
import button from './admin/component/formButton.vue'

// Vue.use(ElementUI)
// Vue.use(VueAjax)
// Vue.component("hm-login",{
//         template: login,
// });
// Vue.component("hm-input",{
//         template: input,
// });
new Vue({
    el: '#hm-app',
    delimiters: ['[[', ']]'],
    components: {
        'hm-login': login,
        'hm-input': input,
        'hm-input-addon': inputAddon,
        'hm-form-input': formInput,
        'hm-form': form,
        'hm-form-item': item,

        'hm-form-button': button,
    },
    // render: h => h(login)
})
