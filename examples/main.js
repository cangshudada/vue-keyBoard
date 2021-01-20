import Vue from 'vue'
import App from './App.vue'
import './less.css';
// lib
// import '../lib/CmappaxEditor.css'
// import CmappaxEditor from '../lib/CmappaxEditor.umd.min';

// dev
import KeyBoard from '../packages';

Vue.config.productionTip = false;

Vue.use(KeyBoard);

new Vue({
  render: h => h(App)
}).$mount('#app');
