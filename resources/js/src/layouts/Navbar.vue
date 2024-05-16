<template>
  <nav class="d-flex justify-center position-fixed mt-2">
    <v-bottom-navigation grow class=" position-relative rounded-pill">
      <v-btn value="recent" class="mx-5">
        <VIcon icon="mdi-home" />
        <span>Home</span>
      </v-btn>

      <v-btn value="favorites" class="mx-5">
        <VIcon icon="$politic" />
        <span>Politicos</span>
      </v-btn>

      <v-btn value="nearby" class="mx-5">
        <VIcon icon="$report" />
        <span>Estadisticas</span>
      </v-btn>
    </v-bottom-navigation>
  </nav>
</template>
<style lang="scss">
  .v-bottom-navigation{
    top: 0px;
    width: 50%;
    position: relative;
  }
</style>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    
  },
})
</script>
