<template>
  <nav class="d-flex justify-center position-fixed mt-2 desktop ">
    <v-bottom-navigation grow class=" position-relative rounded-pill">
      
      <RouterLink to="/politics">
        <v-btn value="politics" class="mx-md-5 menu-btns h-100">
          <VIcon icon="$politic" />
          <span>Politicos</span>
        </v-btn>
      </RouterLink>
      <RouterLink to="/view">
        <v-btn value="view" class="mx-md-5 menu-btns h-100">
          <VIcon icon="$card" />
          <span>View</span>
        </v-btn>
      </RouterLink>
      <v-btn value="logout" class="mx-md-5 menu-btns h-100 d-block d-md-none">
        <VIcon icon="$logout" />
        <span>Salir</span>
      </v-btn>
    </v-bottom-navigation>
  </nav>

</template>
<style lang="scss">
  .desktop {
    & span{
      font-size: 10px;
    }
    & > .v-bottom-navigation{
      top: 0px;
      width: 50%;
      position: relative;
      box-shadow: 0px 4px 6px 2px #03044177;
    }
  }
  .menu-btns {
    &:hover{
      text-shadow: #0508b1b7 0px 1px 5px;
    }
    &:hover > .v-btn__content{
      text-shadow: #0508b1b7 0px 1px 5px;
    }
    &:focus-visible  > .v-btn__content{
      text-shadow: #0609b4bd 1px 0 10px;
    }
    &:hover  > .v-btn__overlay{
      opacity: 0.1!important;
      border: 0px;
      outline: 0px;
    }
  }

</style>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    
  },
})
</script>
