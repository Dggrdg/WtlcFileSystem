import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style/global.css'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import FontAwesomeIcon from './fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap";

const app = createApp(App);

// 全局註冊 Font Awesome Icon
app.component('font-awesome-icon', FontAwesomeIcon);

// 使用 Vue Router 和 Element Plus
app.use(router).use(ElementPlus).mount('#app');
