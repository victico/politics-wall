<template>
  <v-dialog
    v-model="dialogCrimes"
    class="mxmd-50"
  >
    <v-card
      prepend-icon="$listCrime"
      title="Detalles del anticucho"
    >
      <v-card-text class="mt-5 pb-0">
        <v-row dense>
          <v-col
            cols="12"
            class="mt-4"
          >
            <h4 class="text-right me-2">
              Fecha: {{ moment(selectedCrime.date).format('DD/MM/YYYY') }}
            </h4>
          </v-col>
          <v-col
            cols="12"
            class="mt-0"
          >
            <h1 class="text-h5 text-center">
              {{ selectedCrime.title }}.
            </h1>
          </v-col>
          <v-col
            cols="12"
            class="mt-4"
          >
            <div>
              - {{ selectedCrime.description }}
            </div>
          </v-col>
          <v-col
            cols="12"
            class="mt-4"
          >
            <div>
              Referencias: <a :href="selectedCrime.references" target="_blank"><span class="text-decoration-underline">{{ selectedCrime.references }}</span></a>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="Cerrar"
          variant="plain"
          @click="closeModal()"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  import { defineComponent } from 'vue'
  import moment from 'moment';
  export default defineComponent({
    props:[
      'dialog',
      'crime'
    ],
    data: () => {
      return {
        selectedCrime: {},
        dialogCrimes: false,
        moment,
      }
    },
    methods:{
      closeModal(){
        this.$emit("hideModal")
      },


    },
    created(){
      this.selectedCrime = Object.assign(this.crime)
    },
    watch: {
      // whenever question changes, this function will run
      dialog(newQuestion, oldQuestion) {
        this.dialogCrimes = newQuestion
      },
      crime(newQuestion, oldQuestion) {
        this.selectedCrime = Object.assign(newQuestion)
      }
    },
  })
</script>

