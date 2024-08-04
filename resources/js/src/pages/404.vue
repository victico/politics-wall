<template>
  <div style="height: 100vh; display: flex; flex-direction: column; justify-content: space-between;">

    <section class="error-page section" >
      <div class="container">
        <div class="row">
          <div class="col-lg-6 offset-lg-3 col-12">
            <!-- Error Inner -->
            <div class="error-inner">
              <h1>404<span>Oop's  no pudimos encontrar la página!</span></h1>
              <p>¿¡Pero donde te has metido!?... vuelve con nosotros</p>
              <router-link to="/home" >
                <a class="btn text-white">INICIO</a>
              </router-link>
            </div>
            <!--/ End Error Inner -->
          </div>
        </div>
      </div>
    </section>
    <footerClient />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import '@/assets/css/style.css';
import '@/assets/css/bootstrap.min.css';
import '@/assets/css/slicknav.min.css';
import '@/assets/css/font-awesome.min.css';
import '@/assets/css/icofont.css';
import '@/assets/css/card.css';
import '@/assets/css/normalize.css';
import '@/assets/css/responsive.css';
// import '@/assets/css/owl-carousel.css';
import '@/assets/css/magnific-popup.css';
import '@/assets/css/animate.min.css';
import footerClient from '@/components/clientHome/footerClient.vue'

export default defineComponent({
  components: {
    footerClient
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