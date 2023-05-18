import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as Elicons from '@element-plus/icons-vue';
//引入Elmessage和Elloading的css样式文件
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';
// import QrReader from 'vue3-qr-reader';
import './assets/base.css'
import Vue3Menus from 'https://esm.sh/vue3-menus@1.0.3'; // 也可以将1.0.3换成其他版本号
const pinia = createPinia()
const app = createApp(App)


//全局注册elementplus icon
Object.keys(Elicons).forEach((key) => {
    app.component(key, Elicons[key as keyof typeof Elicons]);
  });
// app.use(QrReader);
app.use(pinia)
app.use(router)

app.mount('#app')
