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
              <v-btn icon="$plus" color="white" variant="tonal" size="small" @click="dialogCreate = true" />
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
              <v-btn icon="$plus" color="white" variant="tonal" size="small" @click="showSnack('black', 'Función no permitida')" />
            </template>
          </v-card>
        </v-col>
    
      </v-row>
    </v-card>
    <createPoliticModal :dialog="dialogCreate" @hideModal="hideModal" />
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
      dialogCrimesCreate: false,
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
    hideModal(modal){
      if(modal == 'create') this.dialogCreate = false
      if(modal == 'delete') this.dialogDelete = false
      if(modal == 'update') this.dialogUpdate = false
      if(modal == 'crimes') this.dialogCrimes = false
    },
    resetForm(){
      this.inputDate.clear();
      this.createCrime = {
        title: '',
        description: '',
        date: '',
        references: '',
      };
      
    },
    createCrimes(){
      const data = new FormData();
      data.append('title', this.createCrime.title)
      data.append('description', this.createCrime.description)
      data.append('date', this.$refs.dateCreateCrimes.value)
      data.append('references', this.createCrime.references)
      data.append('user_id', this.selectedPolitic.id)

      this.$store
      .dispatch(STORE_CRIME, data)
      .then((response) =>{
        this.getPolitics();
        this.selectedPolitic = Object.assign({}, response.data);
        this.resetForm();
        this.hideInternalModal('createCrimes')
      })
    },
    initFlatpickr(id){
      this.inputDate = flatpickr(document.getElementById(id), {
        dateFormat: 'd/m/Y',
        maxDate: "today",
        locale: Spanish,
        disableMobile:true,
        onClose: function (selectedDate) {
          document.querySelector('#date-input-val-'+id).value = moment(selectedDate[0]).format('YYYY-MM-DD')
        }
      });
      if(id == 'date-update-crimes'){
        console.log(id)
        console.log(this.selectedCrime.date)
        this.inputDate.setDate(moment(this.selectedCrime.date).format('DD-MM-YYYY'),true);
      }
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
