
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
import middlewarePipeline from './middlewares/middlewarePipeline';

import VueFullPage from 'vue-fullpage.js'
import 'vue-fullpage.js/dist/style.css'
// import './fullpage.scrollHorizontally.min' // Optional. When using fullpage extensions

import mitt from 'mitt';

import vuetify from '@/plugins/vuetify';
import './styles/styles.scss';

const emitter = mitt()

const app = createApp(App)

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title + ' - Muro de politicos'
  if (!to.meta.middleware) {
    return next()
  }
  // store.dispatch(CHECK_TOKEN).then((data)=>{
  //  if(data.data.code !== 200){
  //   store.commit(SET_TOKEN,data.data.new_token)
  //  } 
  // });
  setTimeout(() => {
    let trashElement = [document.querySelectorAll('.modal-backdrop'), document.querySelectorAll('.tooltip')];

    trashElement.forEach((item)=>{
      item.forEach(element => document.querySelector('body').removeChild(element))
    })
  }, 200);
  if(from.path !== to.path) emitter.emit('displayOverlayLoad', true)
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 0)
  })
});

app.use(VueAxios, axios);
app.use(vuetify)
app.use(router)
app.use(store)
app.use(VueFullPage)
app.use(mitt)
// app.use(func)


app.axios.defaults.baseURL = import.meta.env.VUE_APP_BACKEND_URL 
app.config.globalProperties.emitter = emitter
// app.config.globalProperties.$helper = func;

app.mount('#app')
