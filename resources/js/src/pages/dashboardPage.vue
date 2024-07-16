<template>
  <div>
    <v-card class="px-3 pb-12 page-card" title="">
      <v-row align="center" justify="center" dense>
        <v-col class="mt-2" cols="12" md="6">
          <v-card
            append-icon="$plus"
            class="mx-auto"
            prepend-icon="$account"
            subtitle="Agrega de forma rapida un nuevo politico"
            title="Agregar politicos"
          >
            <template v-slot:append>
              <v-btn icon="$plus" color="white" variant="tonal" size="small" @click="dialogCreate = 'politic'" />
            </template>
          </v-card>
        </v-col>
    
        <v-col class="mt-2" cols="12" md="6">
          <v-card
            class="mx-auto"
            prepend-icon="$listCrime"
            subtitle="Selecciona al politico y agrega un crimen"
            title="Agregar crimen"
          >
            <template v-slot:append>
              <!-- <v-btn icon="$plus" color="white" variant="tonal" size="small" @click="showSnack('black', 'Función no permitida')" /> -->
              <v-btn icon="$plus" color="white" variant="tonal" size="small" @click="dialogCreate = 'crimes'"/>

            </template>
          </v-card>
        </v-col>
    
      </v-row>
    </v-card>
    <createPoliticModal :dialog="dialogCreate == 'politic'" @hideModal="hideModal" />
    <createCrimeModal :dialog="dialogCreate == 'crimes'" @hideModal="hideModal" />

    <v-snackbar
      v-model="snackbarShow"
      :color="snackbarType"
       :timeout="3000"
    >
      <div class="text-white text-center">
        {{ snackbarMsg }}
      </div>
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbarShow = false"
          color="white"
        >
          <span class="text-white">Cerrar</span>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<style lang="scss">
  .page-card > .v-card-item{
    text-align: center;
    text-decoration: underline;
  }
</style>
<script>
import { defineComponent } from 'vue'
import { GET_POLITICS } from '@/core/services/store/politic.module'
import { STORE_CRIME } from '@/core/services/store/crime.module'
import createPoliticModal from '@/components/politics/modals/createPoliticModal.vue'
import createCrimeModal from '@/components/crimes/modals/createCrimeModal.vue'

// import * as bootstrap from 'bootstrap'
import nationality from '@/core/plugins/nationalityJson'

import moment from 'moment';
import flatpickr from "flatpickr";
import 'flatpickr/dist/themes/confetti.css';
import { Spanish } from "flatpickr/dist/l10n/es.js";
export default defineComponent({
  data: () => {
    return{
      createCrime:{
        title: '',
        description: '',
        date: '',
        references: '',
      },
      dialogCreate: false,
      inputDate:'',
      nationality,
      snackbarShow:false,
      snackbarType:'',
      snackbarMsg:'',
      politics: [],
      selectedPolitic: {},
      moment,
    }
  },
  components: {
    createPoliticModal,
    createCrimeModal,
  },
  methods:{
    getPolitics(){
      const data = {
        search: '',
        pageNumber: 1
      }
      this.$store
      .dispatch(GET_POLITICS, data)
      .then((data) =>{
        if(!data.code) throw new Error('server error')
        this.politics = data.data.data
      }).catch((e) => {
        console.log(e)
        // this.emitter.emit('logoutSession')
      })
    },
    async showModal(idPolitic, modal = ""){
      await this.getPoliticByID(idPolitic).then(() =>{
        if(modal == 'delete') this.dialogDelete = true
        if(modal == 'update') this.dialogUpdate = true
        if(modal == 'crimes') this.dialogCrimes = true
      })
    },
    hideModal(){
      this.dialogCreate = '';
    },
    showSnack(type, text){
      this.snackbarType = type;
      this.snackbarMsg  = text;
      this.snackbarShow = true;
    }
  },
  mounted(){
    // console.log(this.nationality)
    this.getPolitics()
  }
})
</script>
