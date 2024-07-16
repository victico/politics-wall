<template>
  <div>
    <v-dialog
      v-model="dialog"
      class="mxmd-50"
    >
      <v-card
        prepend-icon="$listCrime"
        id="date-create-crimes-form"
        title="Creacion de anticuchos"
      >
        <v-card-text class="mt-5">
          <v-row dense>
            <v-col 
              cols="12"
            >
              <v-combobox
                clearable
                clear-icon="$close"
                label="Selecciona político"
                :items="politics"
                item-title="name"
                item-value="id"
                v-model="createCrime.user_id"
                variant="outlined"
              />
            </v-col>
            <v-col
              cols="12"
              class="mt-5"
            >
              <v-text-field
                label="Titulo del delito*"
                required
                v-model="createCrime.title"
              />
            </v-col>
            <v-col
              cols="12"
              class="mt-5"
            >
              <v-textarea 
                label="Descripción del caso*"
                variant="outlined"
                required
                v-model="createCrime.description"
              />
            </v-col>
            
            <v-col
              cols="12"
              class="mt-5"
            >
              <v-textarea 
                label="Link de referencias*"
                variant="outlined"
                required
                v-model="createCrime.references"
              />
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
          />
  
          <v-btn
            color="primary"
            text="Crear"
            variant="tonal"
            @click="createCrimes()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbarShow"
      :color="snackbarType"
      :timeout="3000"
    >
      <div class="text-white font-weight-bold text-center">
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
<script>
import { defineComponent } from 'vue'
import { GET_POLITIC_BY_SEARCH, } from '@/core/services/store/politic.module'
import { STORE_CRIME, } from '@/core/services/store/crime.module'
import debounce from 'debounce';
import 'flatpickr/dist/themes/confetti.css';

export default defineComponent({
  props:[
    'dialog'
  ],
  data: () => {
    return{
      createCrime:{
        title: '',
        description: '',
        references: '',
        user_id:null,
      },
      snackbarShow:false,
      snackbarType:'',
      snackbarMsg:'',
      search:'',
      politics: [],
    }
  },
  methods:{
    searchPolitic(){
      this.loading = false
      debounce(this.getPolitics,500)('noload');
    },
    closeModal(){
      // this.resetForm()
      this.$emit("hideModal")
    },
    getPolitics(){

      this.$store
      .dispatch(GET_POLITIC_BY_SEARCH, this.search)
      .then((data) =>{
        if(!data.code) throw new Error('server error')
        this.politics = data.data
      }).catch(() => {
        // this.emitter.emit('logoutSession')
      })
    },

    createCrimes(){
      const data = new FormData();
      data.append('title', this.createCrime.title)
      data.append('description', this.createCrime.description)
      data.append('references', this.createCrime.references)
      data.append('user_id', this.createCrime.user_id.id)

      this.$store
      .dispatch(STORE_CRIME, data)
      .then((response) =>{
        this.showSnack('success', 'Crimen creado con exito')
        setTimeout(()=>{

          this.resetForm();
          this.closeModal()
        },800)
      })
    },
    showSnack(type, text){
      this.snackbarType = type;
      this.snackbarMsg  = text;
      this.snackbarShow = true;
    },
    resetForm(){
      this.createCrime = {
        title: '',
        description: '',
        references: '',
        user_id:'',
      }
      this.politics = []
    },
  },
  mounted(){
    // console.log(this.nationality)
    this.getPolitics()
  }
})
</script>