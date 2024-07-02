<template>
  <footer class="content-footer footer bg-footer-theme" >
    <div class="container-xxl">
      <div
        class="footer-container d-flex align-items-center justify-content-between py-2 flex-md-row flex-column"
      >
        <div>
          ©

            {{ new Date().getFullYear()}}
            El Muro - Derechos reservados
        </div>
        <div>
        

          <a
            href="#"
            target="_blank"
            class="footer-link me-4"
            >Términos y condiciones</a
          >

          <a href="#" target="_blank" class="footer-link d-none d-sm-inline-block"
            >FAQ</a
          >
        </div>
      </div>
    </div>
  </footer>
  <!-- begin:: Footer -->

  <!-- end:: Footer -->
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "KTFooter",

  computed: {
    ...mapGetters(["layoutConfig"]),

    /**
     * Check if footer container is fluid
     */
    widthFluid() {
      return this.layoutConfig("footer.width") === "fluid";
    }
  }
};
</script>
