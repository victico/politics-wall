
<template>
  <VApp style="background: transparent;">
    <router-view v-slot="{Component}">
       <transition 
          mode="out-in" 
          enter-active-class="animate__animated animate__zoomIn" 
          leave-active-class="animate__animated animate__zoomOut"
        >
          <component :is="Component"/>
       </transition>
    </router-view>
  </VApp>
</template>
<style>
.animate__animated {/* referring directly to the animation's @keyframe declaration */
  animation-duration: 0.2s; /* don't forget to set a duration! */
}
/* *{
  font-family: Figtree, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color emoji;
} */
</style>


<style lang="scss">
// 3rd party plugins css

// @import "~perfect-scrollbar/css/perfect-scrollbar.css";
// @import "~socicon/css/socicon.css";
// @import "~animate.css";
// @import "~@fortawesome/fontawesome-free/css/all.css";
// @import "~line-awesome/dist/line-awesome/css/line-awesome.css";
@import "assets/plugins/flag-icons.css";
@import "assets/plugins/fontawesome.css";
@import "assets/plugins/tabler-icons.css";
@import "assets/plugins/keenthemes-icons/font/ki.css";

// Main demo style scss;
// @import "assets/sass/style.vue";
// @import "assets/sass/style.vue";
@import "assets/sass/core";
@import "assets/sass/theme-default";
// Check documentation for RTL css
// Update HTML with RTL attribute at public/index.html
/*@import "assets/css/style.vue.rtl";*/
</style>

<script>
import { OVERRIDE_LAYOUT_CONFIG } from "@/core/services/store/config.module";

export default {
  name: "MetronicVue",
  mounted() {
    /**
     * this is to override the layout config using saved data from localStorage
     * remove this to use config only from static json (@/core/config/layout.config.json)
     */
    this.$store.dispatch(OVERRIDE_LAYOUT_CONFIG);
    
  }
};
</script>