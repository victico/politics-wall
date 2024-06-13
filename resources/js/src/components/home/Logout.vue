<template>
  <div class="w-100 d-flex mt-4 align-center">

    <v-btn value="favorites" class="mx-5 bg-secondary" @click="logout()">
       <VIcon icon="$logout" class="mx-2" />
       <span>Salir</span>
     </v-btn>
  </div>

</template>

<script>
import { defineComponent } from 'vue'
import { LOGOUT } from '@/core/services/store/auth.module'
export default defineComponent({
  setup() {
    
  },
  methods: {
    logout(){
      this.$store.dispatch(LOGOUT)
      .then((data) => {

        setTimeout(() => {
          
          this.$router.push('/')
        }, 1000);
      })
    }
  }
})
</script>