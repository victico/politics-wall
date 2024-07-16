<template>
  <div>
    <div class="d-flex w-100 justify-center">
      <v-card
        class="py-4 text-center px-4 politics w-100"
        elevation="12"
        rounded="lg"
        title="Listado de opniones"
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
          <v-btn prepend-icon="$plus" variant="tonal" @click="dialogShow = 'opinion'">
            Agregar opinión
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
          <template v-if="opinions.length > 0">
            <VCol cols="12" md="4"  v-for="(politic, index) in opinions" :key="index" >
              
            </VCol>
          </template>
          <VCol v-else cols="12" class="text-center">
            <h4 class="text-h4">No hay opniones creadas</h4>
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
    <createOpinionModal :dialog="dialogShow == 'opinion'" @hideModal="hideModal" />

  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { GET_OPINION } from '@/core/services/store/opinion.module'
import debounce from 'debounce';
import 'flatpickr/dist/themes/confetti.css';
import createOpinionModal from '@/components/opinion/modals/createOpinionModal.vue';
export default defineComponent({
  components: {
    createOpinionModal,
  },
  data: () => {
    return{
      dialogShow: '',
      inputDate:'',
      opinions: [],
      selectedOpinion: {},
      search:'',
      currentPage:0,
      loading:false,
      loadContinuos:false
    }
  },
  methods:{
    searchPolitic(){
      this.loading = false
      debounce(this.getOpinions,500)('noload');
    },
    load({ done }) {
      this.getOpinions()
      setTimeout(() => {
        done('ok')
      }, 1000)
    },
    getOpinions(type="load"){
      const data = {
        search: this.search ?? '',
        pageNumber: type !== 'load'? 1 : this.currentPage + 1 
      }

      this.$store
      .dispatch(GET_OPINION, data)
      .then((data) =>{
        if(!data.code) throw new Error('server error')

        if(type !== 'load')this.opinions = data.data.data
        else this.opinions.push(...data.data.data)
      
        this.loading = true
        this.paginationAction(data)

      }).catch(() => {
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
    hideModal(data){
      if(data)
      this.dialogShow = ''
    },
    showInternalModal( modal = ""){
      if(modal == 'createOpinion') { 
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
      if(modal == 'createOpinion') this.dialogCrimesCreate = false
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
            this.selectedOpinion = Object.assign({}, response.data);
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
      this.createOpinion = {
        institution:'',
        title:'',
        name:'',
        opinion:'',
        photo:''
      }
      
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
    this.getOpinions()
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