import { createApp } from "vue";
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import "@/assets/index.css";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");
