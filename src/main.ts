import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/reset.less";
import "./styles/globalStyle.less";

createApp(App).use(router).mount("#app");
