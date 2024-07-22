<template>
  <div>
    <div class="d-flex w-100 justify-center">
      <v-card
        class="py-4 text-center px-4 politics w-100"
        elevation="12"
        rounded="lg"
        title="Listado de opniones"
      >
      <div class="d-flex justify-end px-4 align-center flex-column flex-md-row">
        <!-- <div class="input_search d-flex align-center">
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
        </div> -->
        <div class="mt-5 mt-md-0">
          <v-btn prepend-icon="$plus" variant="tonal" @click="dialogShow = 'opinion'; selectedOpinion = {}">
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
            <VCol cols="6" md="4"  v-for="(opinion, index) in opinions" :key="index" >
              <VCard class="pa-6 pb-4">
                <div class="text-h6 text-black font-weight-bold pb-2 text-decoration-underline" @click="showModal(opinion.id, 'view')">
                  "{{ opinion.title }}"
                </div>
                <div class="text-justify">
                  {{ opinion.opinion.substring(0, 200) }}{{ opinion.opinion.length > 200 ? '...' :'' }}
                  <span class="text-decoration-underline">
                    <!-- {{ opinion.opinion.length > 200 ? 'Ver mas' :'' }} -->
                  </span>
                </div>
                <div class="mt-4 d-flex align-center">
                  <div>
                    <VImg :src="opinion.photo" height="60" width="60" class="rounded-circle opinion__img"/>
                  </div>
                  <div class="ms-2">
                    <div class="text-body-1	"> {{ opinion.author }} </div>
                    <div class="text-body-2	"> {{ opinion.institution }} </div>
                  </div>
                </div>
                <div class="d-flex justify-end w-100">
                  <v-btn icon="$edit" size="small"  color="secondary" class="bg-primary me-2 politics-actions" @click="showModal(opinion.id, 'opinion')" />
                  <v-btn icon="$delete" size="small"  color="error" class="bg-terciary ms-2 politics-actions" @click="showModal(opinion.id, 'delete')"/>
                </div>
              </VCard>
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
    <actionOpinionModal :dialog="dialogShow == 'opinion'" :opinion="selectedOpinion" @hideModal="hideModal"  @refresh="refreshAction"/>
    <deleteOpinionModal :dialog="dialogShow == 'delete'"  :opinion="selectedOpinion" @hideModal="hideModal"  @refresh="deleteOpinion"/>
    <viewOpinionModal   :dialog="dialogShow == 'view'"    :opinion="selectedOpinion" @hideModal="hideModal" />


  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { GET_OPINION, GET_OPINION_BY_ID } from '@/core/services/store/opinion.module'
import debounce from 'debounce';
import 'flatpickr/dist/themes/confetti.css';
import actionOpinionModal from '@/components/opinion/modals/actionOpinionModal.vue';
import deleteOpinionModal from '@/components/opinion/modals/deleteOpinionModal.vue';
import viewOpinionModal from '@/components/opinion/modals/viewOpinionModal.vue';


export default defineComponent({
  components: {
    actionOpinionModal,
    deleteOpinionModal,
    viewOpinionModal,
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
    async showModal(opinionId, modal = ""){
      await this.getPoliticByID(opinionId).then(() =>{
        this.dialogShow = modal
      })
    },
    hideModal(){
      this.dialogShow = ''
    },
    getPoliticByID(opinionId){
      return new Promise( (resolve) => {
        this.$store
          .dispatch(GET_OPINION_BY_ID, opinionId)
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
    paginationAction(data){
      this.currentPage = data.data.current_page
      this.loadContinuos = data.data.current_page == data.data.last_page 
    },
    addNewOpinion(opinion){
      this.opinions.push(opinion)
    },
    updateList(data){
      for(let i = 0; i < this.opinions.length; i++){
        if(this.opinions[i].id == data.id){
            this.opinions[i] = data;
            return;
        }
      }
    },
    deleteOpinion(data){ 
      const index = this.opinions.findIndex((politic) => politic.id == data.id)
      this.opinions.splice(index,1)
    },
    refreshAction(data){
      Object.values(this.selectedOpinion).length == 0 
      ? this.addNewOpinion(data)
      : this.updateList(data)
    },
  },
  mounted(){
    this.getOpinions()
  }
})
</script>

<style lang="scss">
@media screen and (max-width: 780px){

}
</style>
<style lang="scss" scoped>
  .input_search {
    width: 50%
  } 
  .opinion__img {
    border: 3px solid #fd2a2a;
  }
  .text-decoration-underline{
    cursor: pointer;
  }
  @media screen and (max-width: 780px){
    .input_search {
      width: 100%
    } 
  }
</style>