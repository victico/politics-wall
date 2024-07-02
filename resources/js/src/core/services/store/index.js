
import { createStore } from "vuex";

import auth from "./auth.module";
import config from "./config.module";
import crime from "./crime.module";
import htmlClass from "./htmlclass.module";
import notification from "./notification.module";
import politic from "./politic.module";
import user from "./user.module";

const store = createStore({
  modules:{
    auth,
    config,
    crime,
    htmlClass,
    notification,
    politic,
    user,
  }
})

export default store
