
import { createStore } from "vuex";

import auth from "./auth.module";
import crime from "./crime.module";
import notification from "./notification.module";
import politic from "./politic.module";
import user from "./user.module";

const store = createStore({
  modules:{
    auth,
    crime,
    notification,
    politic,
    user,
  }
})

export default store
