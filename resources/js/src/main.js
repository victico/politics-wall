
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { func } from '@/core/services/utils/utils.js'
// import { loadFonts } from '@/plugins/webfontloader'
// import { CHECK_TOKEN, SET_TOKEN } from "@/core/services/store/auth.module";
import App from '@/App.vue';
import { createApp } from 'vue';
import store from '@/core/services/store/index.js';
import VueAxios from "vue-axios";
import axios from 'axios';
import router from './router.js';
import VueFullPage from 'vue-fullpage.js'
import 'vue-fullpage.js/dist/style.css'
import { Helpers } from "./concept/helpers";
import mitt from 'mitt';
import vuetify from '@/plugins/vuetify';
import './styles/styles.scss';
import './assets/css/style.css';
import './assets/css/bootstrap.min.css';
import './assets/css/slicknav.min.css';
import './assets/css/font-awesome.min.css';
import './assets/css/normalize.css';
import './assets/css/responsive.css';
import './assets/css/owl-carousel.css';
import './assets/css/magnific-popup.css';
import './assets/css/animate.min.css';

import $ from 'jquery'


window.$ = $

// import './@core/libs/owl-carousel';

const emitter = mitt()

const app = createApp(App)


app.use(VueAxios, axios);
app.use(vuetify)
app.use(router)
app.use(store)
app.use(VueFullPage)
app.use(mitt)
// app.use(func)
window.Helpers = Helpers;


app.axios.defaults.baseURL = import.meta.env.VUE_APP_BACKEND_URL 
app.config.globalProperties.emitter = emitter
// app.config.globalProperties.$helper = func;

app.mount('#app')
