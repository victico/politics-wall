<template>
  <div class="layout-wrapper layout-content-navbar" >
    <div class="layout-container">
      <!-- begin:: Header Mobile -->
      <!-- <KTHeaderMobile></KTHeaderMobile> -->
      <!-- end:: Header Mobile -->
      <!-- begin:: Aside Left -->
      <KTAside ></KTAside>
      <!-- end:: Aside Left -->

      <!-- <Loader v-if="loaderEnabled" v-bind:logo="loaderLogo"></Loader> -->

      <!-- begin::Body -->
      <div id="kt_wrapper" class="layout-page">
          <!-- begin:: Header -->
          <KTHeader></KTHeader>
          <!-- end:: Header -->
          <!-- begin:: Content -->
          <div id="kt_content" class="content-wrapper">
            <div class="container-xxl flex-grow-1 container-p-y" >
              <router-view v-slot="{Component}">
                <transition 
                    mode="out-in" 
                    enter-active-class="animate__animated animate__zoomIn" 
                    leave-active-class="animate__animated animate__zoomOut"
                  >
                    <component :is="Component"/>
                </transition>
              </router-view>
            </div>
            <KTFooter></KTFooter>
          </div>
          <!-- end:: Content -->
      </div>
      <div class="content-backdrop fade"></div>
    </div>
    
    <!-- Overlay -->
    <div class="layout-overlay layout-menu-toggle"></div>

    <!-- Drag Target Area To SlideIn Menu On Small Screens -->
    <div class="drag-target"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import KTAside from "@/layouts/aside/Aside.vue";
import KTHeader from "@/layouts/header/Header.vue";
// import KTHeaderMobile from "@/layouts/header/HeaderMobile.vue";
import KTFooter from "@/layouts/footer/Footer.vue";
import HtmlClass from "@/core/services/htmlclass.service";

import { GET_USER, PURGE_AUTH } from "@/core/services/store/auth.module";
import {
  ADD_BODY_CLASSNAME,
  REMOVE_BODY_CLASSNAME
} from "@/core/services/store/htmlclass.module.js";

export default {
  name: "Layout",
  data(){
    return {
      timerx:0,
      isDesactivate: '',
      openModal:'',
      isAdmin: false,
    }
  },
  components: {
    KTAside,
    KTHeader,
    // KTHeaderMobile,
    KTFooter,
    // KTScrollTop,
  },
  beforeMount() {
    
    // show page loading
    window.localStorage.removeItem("has_account")
    this.$store.dispatch(ADD_BODY_CLASSNAME, "page-loading");
    this.$store.dispatch(ADD_BODY_CLASSNAME, "p-0");
    // initialize html element classes
    HtmlClass.init(this.layoutConfig());
  },
  mounted() {
    this.getUser()
    
    this.emitter.on("logoutSession", () => {
      this.outSession()
    })
    // Simulate the delay page loading
    setTimeout(() => {
      // Remove page loader after some time
      this.$store.dispatch(REMOVE_BODY_CLASSNAME, "page-loading");
    }, 2000);
  },
  methods: {
    getUser(){
      this.$store.dispatch(GET_USER)
      .then((data) => {
        // console.log(data)
        if(!data.user){ 
          throw new Error('server Error');
        }
      }).catch((e) => {
        this.outSession()
      })
    },
    outSession(){
      this.$store.commit(PURGE_AUTH);
      alert('Sesión Caducada')
      setTimeout(() => {
        
        this.$router.push({ name: "Login" });
      }, 2000);

    }
  },
  computed: {
    ...mapGetters([
      "isAuthenticated",
      "breadcrumbs",
      "pageTitle",
      "layoutConfig"
    ]),

    /**
     * Check if the page loader is enabled
     * @returns {boolean}
     */
    loaderEnabled() {
      return !/false/.test(this.layoutConfig("loader.type"));
    },

    /**
     * Check if container width is fluid
     * @returns {boolean}
     */
    img(){
      return({
        backgroundImage : backgroundImage
      })
    },
    contentFluid() {
      return this.layoutConfig("content.width") === "fluid";
    },

    /**
     * Page loader logo image using require() function
     * @returns {string}
     */
    loaderLogo() {
      return process.env.BASE_URL + this.layoutConfig("loader.logo");
    },

    /**
     * Check if the left aside menu is enabled
     * @returns {boolean}
     */
    asideEnabled() {
      return !!this.layoutConfig("aside.self.display");
    },

    /**
     * Set the right toolbar display
     * @returns {boolean}
     */
    toolbarDisplay() {
      // return !!this.layoutConfig("toolbar.display");
      return true;
    },

    /**
     * Set the subheader display
     * @returns {boolean}
     */
    subheaderDisplay() {
      return !!this.layoutConfig("subheader.display");
    }
  }
};
</script>
