<template>
  <section class="bg-light-6 py-3 py-md-5 mb-5">
    <div class="container">
      <div class="row gy-5 gy-lg-0 align-items-top">
        <div class="col-12 col-lg-4 pt-16 mt-16">
          <h2 class="display-5 mb-3 mb-xl-4">Los expertos opinan</h2>
          <p class="lead mb-4 mb-xl-5">Conoce las opiniones de destacados analistas y profesionales.</p>
         
        </div>
        <div class="col-12 col-lg-8">
          <div class="row justify-content-xl-end">
            <div class="col-12 col-xl-11">
              <div  v-if="opinions.length > 0  && loading ">
                <v-infinite-scroll
                height="100%"
                style="overflow-x: hidden;"
                mode="manual"
                @load="load"
                >
                  <div class="row gy-4 mt-6">
                    <div class="col-12 col-md-6" v-for="(opinion, index) in opinions" :key="index">
                      <div class="card border-0 border-bottom border-primary shadow-sm">
                        <div class="card-body p-4">
                          <figure>
                            <img class="img-fluid rounded rounded-circle mb-4 border border-5" loading="lazy" :src="opinion.photo" height="100" width="100" alt="Luna Joh">
                            <figcaption class="mt-5">
                              <blockquote class="bsb-blockquote-icon mb-4">
                                {{ JSON.parse(opinion.opinion).text.substring(0, 200) }}{{ JSON.parse(opinion.opinion).text.length > 200 ? '...' :'' }}
                                  <span class="text-decoration-underline" @click="showModal(opinion.id)">
                                    {{ opinion.opinion.length > 200 ? 'Ver opinión completa' :'' }}
                                  </span>
                              </blockquote>
                              <h4 class="mb-2">{{ opinion.author }}</h4>
                              <h5 class="fs-6 mb-0" style="color:#5d596c!important">{{ opinion.institution }}</h5>
                            </figcaption>
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                  <template v-slot:empty>
                    <div class="bg-error w-50 text-center pa-2 rounded-sm" >
                      No hay mas políticos
                    </div>
                  </template>
                  <template v-slot:load-more="{ props }">
                    <v-btn
                      class="mt-5"
                      size="large"
                      variant="tonal"
                      v-bind="props"
                      :disabled="loadContinuos"
                    >Cargar más</v-btn>
                  </template>
                </v-infinite-scroll>
              </div>
              <div v-else class="row">
                <div class="col-12 col-md-6 mt-6" v-for=" n in 10" :key="n">
                  <div class="card border-0 border-bottom border-primary shadow-sm">
                    <div class="card-body pa-4">
                      <figure>
                        <v-skeleton-loader
                          max-width="100"
                          type="avatar"
                        />
                        <figcaption class="mt-5">
                          <v-skeleton-loader type="paragraph"/>
                          <v-skeleton-loader type="paragraph"/>
                          <v-skeleton-loader width="50%" type="text" style="transform: translatey(35%)"/>
                          <v-skeleton-loader width="70%" type="text"/>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <viewOpinionModal   :dialog="dialog == 'view'"    :opinion="selectedOpinion" @hideModal="hiddenModal" />

  </section>
</template>
<script >
import { defineComponent } from 'vue'
import { GET_PUBLIC, GET_OPINION_BY_ID_PUBLIC } from '@/core/services/store/opinion.module';
import viewOpinionModal from '@/components/opinion/modals/viewOpinionModal.vue';

// import debounce from 'debounce';

export default defineComponent({
  data: () => {
    return{
      opinions: [],
      currentPage: 0,
      loadContinuos:false,
      selectedOpinion:null,
      dialog:'',
      loading:false,
    }
  },
  components: {
    // modalCardPoliticVue
    viewOpinionModal,
  },
  methods: {
    getOpinions(type="load"){
      const data = {
        search: this.search ?? '',
        pageNumber: type !== 'load'? 1 : this.currentPage + 1 
      }

      this.$store
      .dispatch(GET_PUBLIC, data)
      .then((data) =>{
        if(!data.code) throw new Error('server error')

        if(type !== 'load')this.opinions = data.data.data
        else this.opinions.push(...data.data.data)
      
        setTimeout(() => {
          this.loading = true
        }, 800);
        this.paginationAction(data)
      }).catch(() => {
        this.emitter.emit('logoutSession')
      })
    },    
    // getOpinionByID(idPolitic){
    //   return new Promise((resolve, reject) =>{
    //     this.selectedOpinion = this.opinions.find((politic) => politic.id == idPolitic);
    //     // console.log(JSON.parse(this.selectedOpinion.opinion).text)
    //     this.selectedOpinion.opinion = JSON.parse(this.selectedOpinion.opinion).text

    //     setTimeout(()=>{
    //       resolve(this.selectedOpinion)
    //     }, 800)
    //   })

    // },
    getOpinionByID(opinionId){
      return new Promise( (resolve) => {
        this.$store
          .dispatch(GET_OPINION_BY_ID_PUBLIC, opinionId)
          .then((response) => {
            this.selectedOpinion = Object.assign({}, response.data);
            this.selectedOpinion.opinion = JSON.parse(this.selectedOpinion.opinion).text
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
    load({ done }) {
      this.getOpinions()
      setTimeout(() => {
        done('ok')
      }, 1000)
    },
    async showModal(idPolitic){
      await this.getOpinionByID(idPolitic).then(() =>{
        this.dialog = 'view'
      })
    },
    hiddenModal() {
      this.dialog = ''
    }
    

  },
  mounted() {
    this.getOpinions();
  }
})
</script>

<style scoped>
.text-decoration-underline{
  cursor: pointer;
}
.img-fluid {
  max-width: 100%;
  height: 100px!important;
  object-fit: cover!important;
}
.bsb-blockquote-icon{
  line-height: 1.8!important
}
</style>