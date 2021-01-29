import Vue from 'vue'
import App from './App.vue'
import './less.css';
// lib
import '../lib/keyboard.min.css'
import CmappaxEditor from '../lib/keyboard.min';

// dev
// import KeyBoard from '../packages';

Vue.config.productionTip = false;

Vue.use(CmappaxEditor);

new Vue({
  render: h => h(App)
}).$mount('#app');
