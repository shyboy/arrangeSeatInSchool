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

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// 引入你所使用的主题 此处以 github 主题为例
import githubTheme from '@kangc/v-md-editor/lib/theme/github';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

const pinia = createPinia()
const app = createApp(App)

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
app.use(VMdPreview);

//全局注册elementplus icon
Object.keys(Elicons).forEach((key) => {
    app.component(key, Elicons[key as keyof typeof Elicons]);
  });
// app.use(QrReader);
app.use(pinia)
app.use(router)

app.mount('#app')
