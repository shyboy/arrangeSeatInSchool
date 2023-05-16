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

const app = createApp(App)


//全局注册elementplus icon
Object.keys(Elicons).forEach((key) => {
    app.component(key, Elicons[key as keyof typeof Elicons]);
  });
// app.use(QrReader);
app.use(createPinia())
app.use(router)

app.mount('#app')
