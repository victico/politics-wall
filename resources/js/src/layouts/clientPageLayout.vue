<template>
  <div>
    <div class="preloader " :class="{'preloader-deactivate':!loading}">
      <div class="loader">
        <div class="loader-outter"></div>
        <div class="loader-inner"></div>
        <div class="indicator"> 
        </div>
      </div>
    </div>
    <headerClient />
    <div>
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
    <footerClient />

    <!-- </full-page> -->
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import headerClient from '@/components/clientHome/headerClient.vue'
import footerClient from '@/components/clientHome/footerClient.vue'


export default defineComponent({
  components:{
    headerClient,
    footerClient,
  },
  data: () => {
    return {
      loading:true
    }
  },
  methods: {
  },
  mounted(){
    setTimeout(() => {
      this.loading = false
    }, 1500);
  }
})
</script>

