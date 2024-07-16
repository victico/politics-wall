<template>
  <div>
    <div class="d-flex w-100 justify-center">
      <v-card
        class="py-4 text-center px-4 politics w-100"
        elevation="12"
        rounded="lg"
        title="Listado de politicos"
      >
      <div class="d-flex justify-space-between px-4 align-center flex-column flex-md-row">
        <div class="input_search d-flex align-center">
          <v-text-field 
            clearable 
            label="Buscar" 
            placeholder="Buscar..." 
            v-model="search"
            variant="outlined" 
            clear-icon="$close"
            @click:clear="searchPolitic()"
            @change="searchPolitic()"
          />
          <v-btn class="ms-4" variant="tonal" @click="searchPolitic()">
            Buscar
          </v-btn>
        </div>
        <div class="mt-5 mt-md-0">
          <v-btn prepend-icon="$plus" variant="tonal" @click="dialogCreate = true">
            Agregar Politico
          </v-btn>
        </div>
      </div>
      </v-card>
    </div>
    <div>
      <v-infinite-scroll
        height="100%"
        mode="manual"
        @load="load"
      >
        <VRow class="pa-0 ma-0 mt-5" v-if="loading">
          <template v-if="politics.length > 0">

            <VCol cols="12" md="4"  v-for="(politic, index) in politics" :key="index" >
              <VCard class=" px-0 pb-0 pt-2 d-flex flex-column align-center justify-space-between position-relative poilitic-card__image-content elevation-24" height="auto" v-if="!politic.show">
                  <div class="w-100 d-flex flex-column align-center h-300 "> 
                    <VImg 
                      class="rounded-lg"
                      cover
                      :width="250"
                      height="100"
                      :src="politic.normal_photo"
                    />
                  </div>
                  <div class="w-100 mt-0 h-40 px-2 bg-white description mt-5 " >
                    <div class="politic-button description-politic pt-md-4 pt-5 d-flex flex-column align-center justify-space-between h-100" >
                      <div class=" w-100 px-0 mb-0 d-flex flex-column justify-space-between" style="height: 200px;">
                        <div class="h-25">
                          <div class="text-center ">
                            <h5 class="text-h5 mb-1">{{ politic.name }}</h5>
                            <div class="text-h7">
                              {{ politic.office }}
                            </div>
                            
                          </div>
                        </div>
                        <VRow class="pa-0 ma-0 h-50 pt-2" style="">
                          <VCol cols="7" class="ps-4 pe-0 pt-0"> 
                            <div class="mt-3 ">
                              <!-- <div class="text-subtitle-2 ">
                                <b> ▪ Edad: {{ politic.age }} años</b>
                              </div> -->
                              <div class="text-subtitle-2  d-flex justify-start align-center mt-2">
                                <b> ▪ Partido político: {{ politic.political_party}} </b>
                                <!-- <img :src="`https://flagsapi.com/${politic.nationality}/shiny/24.png`" class="ms-1"> -->
                              </div>
                              
                            </div>
                          </VCol>
                          <VCol cols="5" class="pe-4 ps-0 pt-0"> 
                            <div class="mt-3">
                              <div class="text-subtitle-2  mt-2 text-end">
                                <b> ▪ Desde: {{ politic.since }}</b>
                              </div>
                            </div>
                          </VCol>
                        </VRow>
                        <VRow class="pa-0 ma-0 h-25 mb-2">
                          <VCol cols="12"  class="d-flex justify-end pt-2 pb-0 align-center">
                            <v-btn icon="$edit" size="small"  color="white" class="bg-primary mx-2 politics-actions" @click="showModal(politic.id, 'update')" />
                            <v-btn icon="$listCrime" size="small"  color="terciary" class="bg-terciary mx-2 politics-actions" @click="showModal(politic.id, 'crimes')"/>
                            <v-btn icon="$delete" size="small"  color="error" class="bg-error mx-2 politics-actions" @click="showModal(politic.id, 'delete')"/>
                          </VCol>
                        </VRow>
                      </div>
                    </div>
                  </div>
                </VCard>
            </VCol>
          </template>
          <VCol v-else cols="12" class="text-center">
            <h4 class="text-h4">No hay politicos creados</h4>
          </VCol>
        </VRow>
        <VRow class="pa-0 ma-0 mt-5" v-else>
          <VCol cols="12" md="3"  v-for="n in 6" :key="n">
            <v-skeleton-loader class="w-100" type="card"></v-skeleton-loader>
          </VCol>
        </VRow>
        <template v-slot:empty>
          <div class="bg-error w-50 text-center pa-2 rounded-sm" >
            No hay mas politicos
          </div>
        </template>
        <template v-slot:load-more="{ props }">
          <v-btn
            size="large"
            variant="tonal"
            v-bind="props"
            :disabled="loadContinuos"
          >Cargar más</v-btn>
        </template>
      </v-infinite-scroll>
    </div>
    <createPoliticModal :dialog="dialogCreate" @hideModal="hideModal" @refresh="addNewPolitic" />
    <div v-if=" Object.values(selectedPolitic).length > 1">
      <updatePoliticModal :dialog="dialogUpdate" @hideModal="hideModal" @refresh="updateList" :politic="selectedPolitic" />
      <deletePoliticModal :dialog="dialogDelete" @hideModal="hideModal" @refresh="deletePolitic" :politic="selectedPolitic" />
      <v-dialog
        v-model="dialogCrimes"
        class="mxmd-50"
      >
        <v-card
          prepend-icon="$listCrime"
          title='Listado de "anticuchos"'
          style="position: relative"
        >
          <v-card-text class="mt-5">
            <div class="w-100 d-flex justify-end">
              <v-btn prepend-icon="$plus" variant="tonal" @click="showInternalModal('createCrimes')">
                Agregar delito
              </v-btn>
            </div>
            <VRow class="pa-0 ma-0 mt-2" >
              <VCol cols="12" class="px-2 py-2" v-if="selectedPolitic.crimes.length > 0" > 
                <div class="mt-3 d-flex align-center" v-for="(crime, index) in selectedPolitic.crimes" :key="index" >
                  <div class="text-subtitle-1 d-flex align-center mt-2 w-75">
                    <b> ▪ 
                      <span class="text-decoration-underline" @click="selectCrime(crime.id, 'view')"> 
                        {{crime.title}}
                      </span>
                    </b>
                  </div>
                  <div class="d-flex justify-end w-25">
                    <v-btn icon="$edit" size="x-small"  color="white" class="bg-primary mx-2 politics-actions" @click="selectCrime(crime.id, 'update')" />
                    <v-btn icon="$delete" size="x-small"  color="error" class="bg-error mx-2 politics-actions" @click="selectCrime(crime.id, 'delete')"/>
                  </div>
                </div>
              </VCol>
              <VCol cols="12" class="px-2 mt-8" v-else> 
                <div class="">
                  <div class="text-h4 d-flex align-center w-100 justify-center mt-0">
                    No se han cargado anticuchos
                  </div>
                </div>
              </VCol>
            </VRow>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              text="Cerrar"
              variant="outlined"
              color="terciary"
              @click="dialogCrimes = false; "
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialogCrimesCreate"
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
                sm="12"
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
              @click="hideInternalModal('createCrimes')"
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
      <v-dialog
        v-model="dialogCrimesUpdate"
        class="mxmd-50"
      >
        <v-card
          prepend-icon="$listCrime"
          id="date-update-crimes-form"
          title="Modificación de anticuchos"
        >
          <v-card-text class="mt-5">
            <v-row dense>
              <v-col
                cols="12"
                sm="12"
              >
                <v-text-field
                  label="Titulo del delito*"
                  required
                  v-model="selectedCrime.title"
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
                  v-model="selectedCrime.description"
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
                  v-model="selectedCrime.references"
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
              @click="hideInternalModal('update')"
            ></v-btn>
            <v-btn
              color="primary"
              text="Modificar"
              variant="tonal"
              @click="updateCrime()"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialogCrimesDelete"
        class="mxmd-50"
      >
        <v-card
          prepend-icon="$listCrime"
          title="Eliminar Delito"
        >
          <v-card-text class="mt-5">
            <v-row dense>
              <VCol cols="12" class="px-0 "> 
                <div class="">
                    <h3>¿Seguro que desea eliminar  <b>"{{ selectedCrime.title }}"</b> de {{selectedPolitic.name}}?</h3>
                </div>
              </VCol>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              text="Cerrar"
              variant="plain"
              @click="hideInternalModal('delete')"
            ></v-btn>
  
            <v-btn
              color="error"
              text="Eliminar"
              variant="tonal"
              @click="deleteCrime()"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialogCrimesView"
        class="mxmd-50"
      >
        <v-card
          prepend-icon="$listCrime"
          title="Detalles del anticuchos"
        >
          <v-card-text class="mt-5 pb-0">
            <v-row dense>
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
              @click="hideInternalModal('view')"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { GET_POLITICS, GET_POLITIC_BY_ID } from '@/core/services/store/politic.module'
import { DELETE_CRIME, STORE_CRIME, UPDATE_CRIME } from '@/core/services/store/crime.module'
import createPoliticModal from '@/components/politics/modals/createPoliticModal.vue'
import updatePoliticModal from '@/components/politics/modals/updatePoliticModal.vue'
import deletePoliticModal from '@/components/politics/modals/deletePoliticModal.vue'
import debounce from 'debounce';
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
        references: '',
      },
      dialogDelete: false,
      dialogCreate: false,
      dialogReport: false,
      dialogUpdate: false,
      dialogCrimesCreate: false,
      dialogCrimes: false,
      dialogCrimesDelete: false,
      dialogCrimesUpdate: false,
      dialogCrimesView: false,
      inputDate:'',
      nationality,
      politics: [],
      selectedCrime: {},
      selectedPolitic: {},
      moment,
      search:'',
      currentPage:0,
      loading:false,
      loadContinuos:false
    }
  },
  components: {
    createPoliticModal,
    updatePoliticModal,
    deletePoliticModal,
  },
  methods:{
    searchPolitic(){
      this.loading = false
      debounce(this.getPolitics,500)('noload');
    },
    load({ done }) {
      this.getPolitics()
      setTimeout(() => {
        done('ok')
      }, 1000)
    },
    getPolitics(type="load"){
      const data = {
        search: this.search ?? '',
        pageNumber: type !== 'load'? 1 : this.currentPage + 1 
      }

      this.$store
      .dispatch(GET_POLITICS, data)
      .then((data) =>{
        if(!data.code) throw new Error('server error')

        if(type !== 'load')this.politics = data.data.data
        else this.politics.push(...data.data.data)
      
        this.loading = true
        this.paginationAction(data)
      }).catch(() => {
        this.emitter.emit('logoutSession')
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
    showInternalModal( modal = ""){
      if(modal == 'createCrimes') { 
        this.dialogCrimesCreate = true;
        setTimeout(() => {
          // this.initFlatpickr('date-create-crimes')
        },300)
      }
      if(modal == 'delete') this.dialogCrimesDelete = true
      if(modal == 'update') {
        this.dialogCrimesUpdate = true;
        setTimeout(() => {
          // this.initFlatpickr('date-update-crimes');
        },300)
      }
      if(modal == 'view') this.dialogCrimesView = true
     
      
    },
    hideInternalModal(modal){
      if(modal == 'createCrimes') this.dialogCrimesCreate = false
      if(modal == 'delete') this.dialogCrimesDelete = false
      if(modal == 'update') this.dialogCrimesUpdate = false
      if(modal == 'view') this.dialogCrimesView = false
      this.dialogCrimes = true;
    },
    getPoliticByID(idPolitic){
      return new Promise( (resolve) => {
        this.$store
          .dispatch(GET_POLITIC_BY_ID, idPolitic)
          .then((response) => {
            this.selectedPolitic = Object.assign({}, response.data);
            setTimeout(() => {
              resolve(response.data);
            }, 500);
          })
      }).catch((err) => {
          console.log(err)
          return new Promise((resolve) => {
            resolve(false);
          });
      });
    },
    resetForm(){
      // this.inputDate.clear();
      this.createCrime = {
        title: '',
        description: '',
        references: '',
      };
      
    },
    createCrimes(){
      const data = new FormData();
      data.append('title', this.createCrime.title)
      data.append('description', this.createCrime.description)
      data.append('references', this.createCrime.references)
      data.append('user_id', this.selectedPolitic.id)

      this.$store
      .dispatch(STORE_CRIME, data)
      .then((response) =>{
        this.selectedPolitic = Object.assign({}, response.data);
        this.resetForm();
        this.hideInternalModal('createCrimes')
      })
    },
    deleteCrime(){
      this.$store
      .dispatch(DELETE_CRIME, this.selectedCrime.id)
      .then((response) => {
        
        this.selectedPolitic = Object.assign({}, response.data);
        this.hideInternalModal('delete')
      })
    },
    updateCrime(){
      const data = new FormData();
      data.append('title', this.selectedCrime.title)
      data.append('description', this.selectedCrime.description)
      data.append('date', this.$refs.dateUpdateCrimes.value)
      data.append('references', this.selectedCrime.references)

      this.$store
      .dispatch(UPDATE_CRIME, {id:this.selectedCrime.id, data:data})
      .then((response) =>{
        
        this.selectedPolitic = Object.assign({}, response.data);
        // this.resetForm('newCrime');
        this.hideInternalModal('update')
      })
    },
    initFlatpickr(id){
      this.inputDate = flatpickr(document.getElementById(id), {
        dateFormat: 'd/m/Y',
        maxDate: "today",
        locale: Spanish,
        disableMobile:true,
        appendTo:document.getElementById(id+'-form'),
        onClose: function (selectedDate) {
          document.querySelector('#date-input-val-'+id).value = moment(selectedDate[0]).format('YYYY-MM-DD')
        }
      });
      if(id == 'date-update-crimes'){
        this.inputDate.setDate(moment(this.selectedCrime.date).format('DD-MM-YYYY'),true);
      }
    },
    selectCrime(id, modal){
      this.selectedCrime = this.selectedPolitic.crimes.find((crime) => crime.id == id);
      setTimeout(() => {
        this.showInternalModal(modal)
      }, 400);
    },
    paginationAction(data){
      this.currentPage = data.data.current_page
      this.loadContinuos = data.data.current_page == data.data.last_page 
    },
    addNewPolitic(politic){
      this.politics.push(politic)
    },
    updateList(data){
      for(let i = 0; i < this.politics.length; i++){
        if(this.politics[i].id == data.id){
            this.politics[i] = data;
            return;
        }
      }
    },
    deletePolitic(data){ 
      const index = this.politics.findIndex((politic) => politic.id == data.id)
      this.politics.splice(index,1)
    }
  },
  mounted(){
    // console.log(this.nationality)
    this.getPolitics()
  }
})
</script>

<style lang="scss">
.text-h7{
  font-size: 17px;
  color:#83888d;
}
.flatpickr-calendar.animate.arrowTop.arrowLeft.open{
  top: 21%!important;
  left: 50%!important;
}
.politics {
  .v-card-item{
    padding-top: 0px;
  }
}
.v-overlay__scrim{
  opacity: .9!important;
}
.politics-actions {
  &:hover{
    opacity: 0.9;
    transform: scale(1.1);
  }
  & path{
    color: white!important;
  }
} 
.w-100-50{
  width: 50%;
}
.img-content{
  position:relative;
  width: auto;
  max-width: fit-content;
  border-radius: 10px;
  &:hover > label > .overlay-img{
    opacity: 1;
    transform: scale(1);
  }
  & path{
    color: white!important;
  }
}
.overlay-img{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #3f3f3f70;
  border-radius: 20px;
  opacity: 0;
  transform: scale(0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in;
}
.mxmd-50 {
    max-width: 50%;
  }
@media screen and (max-width: 780px){
  .w-100-50{
    width: 100%;
  }
  .mxmd-50 {
    max-width: 100%;
  }
  .flatpickr-calendar.animate.arrowTop.arrowLeft.open{
    top: 30%!important;
    left: 5%!important;
  }
}
</style>
<style lang="scss" scoped>
  .input_search {
    width: 40%
  } 
  .animate__animated{
    animation-duration: 0.8s;
  }
  .back-section_card{
    height: 25px;
    cursor: pointer;
  }
  .h-300{
    height: 300px;
  }
  .h-60{
    height: 58.5%;
  }
  .h-40{
    height: 40%;
  }
  .politic-button{
    margin:0px -8px;
  }
  .poilitic-card__image-content{
    max-height: 600px;
    background: rgb(173,177,173);
    background: radial-gradient(circle, rgb(211, 211, 211) 20%, rgb(238, 240, 238) 33%, #8d8a8a 100%);
  }
  .description-politic{
    box-shadow: 0px 0px 11px 0px #00000057;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  .description{
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  .more_info_btn{
    background: rgb(161 161 161);
    transition: all 0.5s ease;
  }
  .text-decoration-underline{
    cursor: pointer;
  }
  .politics {
    .v-card-item{
      padding-top: 0px;
    }
  }
  .v-overlay__scrim{
    opacity: .9!important;
  }
  .politics-actions {
    &:hover{
      opacity: 0.9;
      transform: scale(1.1);
    }
    & path{
      color: white!important;
    }
  } 
  .w-100-50{
    width: 50%;
  }
  .img-content{
    position:relative;
    width: auto;
    max-width: fit-content;
    border-radius: 10px;
    &:hover > label > .overlay-img{
      opacity: 1;
      transform: scale(1);
    }
    & path{
      color: white!important;
    }
  }
  .overlay-img{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #3f3f3f70;
    border-radius: 20px;
    opacity: 0;
    transform: scale(0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in;
  }

  
  @media screen and (max-width: 780px){
    .w-100-50{
      width: 100%;
    }
    .input_search {
      width: 100%
    } 
  }
</style>