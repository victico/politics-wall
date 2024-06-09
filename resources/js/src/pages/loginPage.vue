<template>
  <div class="body h-screen d-flex  align-center pa-8">
  <VRow class="justify-end">
    <VCol cols="5">

      <VCard class="elevation-24 "> 
        <v-form class="px-16 my-16">
          <div  class="my-8">
            <h1 class="text-h4">
              Hola 👋🏻 
              Bienvenido!
            </h1>
          </div>

          <v-container class="my-8">

            <v-row>
      
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Usuario"
                  variant="outlined"
                  placeholder="Usuario"
                  v-model="user.username"
                ></v-text-field>
              </v-col>
      
              <v-col
                cols="12"
                class="mt-2"
              >
                <v-text-field
                  label="Contraseña"
                  variant="outlined"
                  placeholder="Contraseña"
                  v-model="user.password"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-2 d-flex justify-end">
                <v-btn elevation="24" size="x-large" color="terciary" > 
                  <p class="text-secondary">Ingresar</p> 
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </VCard>
    </VCol>
  </VRow>
  </div>
</template>
<style lang="scss" scoped>
  .body{
    background: rgb(214, 214, 214)!important;
  }
</style>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    
  },
  data: () => {
    return {
      user:{
        username:'',
        password:'',
      }
    }
  }
})
</script>
