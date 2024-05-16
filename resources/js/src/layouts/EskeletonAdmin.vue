<template>
  <div class="w-100 ma-0 pa-0 bg-primary h-100"> 
    <section id="menu" class="position-fixed w-100" style="z-index:2">
      <VRow class="ma-0 pa-0 ">
        <VCol cols="4" md="2" class="py-0 my-0">
        </VCol>
        <VCol cols="12" md="8" class="d-flex flex-justify pa-0 ma-0">
          <div class="w-100 d-flex justify-center pa-0 ma-0">
            <Navbar />
          </div>
        </VCol>
        <VCol cols="12" md="2" class="py-0 my-0 d-none d-md-block">
          <Logout />
        </VCol>
      </VRow>
    </section>
    <section id="container" class="h-section bg-primary mt-16" >
      <VRow class="ma-0 pa-0">
        <VCol cols="12" class="px-1">
          <router-view v-slot="{Component}" >
            <transition 
              mode="out-in" 
              enter-active-class="animate__animated animate__fadeIn" 
              leave-active-class="animate__animated animate__fadeOut"
            >
              <component  :is="Component"/>
            </transition>
          </router-view>
        </VCol>
      </VRow>
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from './Navbar.vue';
import Logout from '../components/home/Logout.vue';
export default defineComponent({
  components: { 
    Navbar,
    Logout 
  },
  setup() {
    
  },
})
</script>
<style lang="scss" scoped>
 .h-section{
  height: auto;
 }
</style>
