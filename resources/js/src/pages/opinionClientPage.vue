<template>
  <section class="bg-light-6 py-3 py-md-5 mb-5">
    <div class="container">
      <div class="row gy-5 gy-lg-0 align-items-center">
        <div class="col-12 col-lg-4">
          <h2 class="display-5 mb-3 mb-xl-4">Los expertos opinan</h2>
          <p class="lead mb-4 mb-xl-5">Conoce las opiniones de destacados analistas y profesionales.</p>
         
        </div>
        <div class="col-12 col-lg-8">
          <div class="row justify-content-xl-end">
            <div class="col-12 col-xl-11">
              <div class="row gy-4">
                <div class="col-12 col-md-6" v-for="(opinion, index) in opinions" :key="index">
                  <div class="card border-0 border-bottom border-primary shadow-sm">
                    <div class="card-body p-4">
                      <figure>
                        <img class="img-fluid rounded rounded-circle mb-4 border border-5" loading="lazy" :src="opinion.photo" height="100" width="100" alt="Luna Joh">
                        <figcaption>
                          <blockquote class="bsb-blockquote-icon mb-4">
                            {{ opinion.opinion.substring(0, 400) }}{{ opinion.opinion.length > 200 ? '...' :'' }}
                              <span class="text-decoration-underline">
                                <!-- {{ opinion.opinion.length > 200 ? 'Ver mas' :'' }} -->
                              </span>
                          </blockquote>
                          <h4 class="mb-2">{{ opinion.author }}</h4>
                          <h5 class="fs-6 text-secondary mb-0">{{ opinion.institution }}</h5>
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
  </section>
</template>
<script >
import { defineComponent } from 'vue'
import { GET_PUBLIC } from '@/core/services/store/opinion.module';
// import debounce from 'debounce';

export default defineComponent({
  data: () => {
    return{
      opinions: [],
      currentPage: 0,
      loadContinuos:false,
      selectedPolitic:null,
      dialog:false,
      loading:false,
    }
  },
  components: {
    // modalCardPoliticVue
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
        }, 1000);
        this.paginationAction(data)
      }).catch(() => {
        this.emitter.emit('logoutSession')
      })
    },    
    getPoliticByID(idPolitic){
      return new Promise((resolve, reject) =>{
        this.selectedPolitic = this.opinions.find((politic) => politic.id == idPolitic);
        this.selectedPolitic.show = false
        setTimeout(()=>{
          resolve(this.selectedPolitic)
        }, 800)
      })

    },
    searchPolitic(){
      this.loading = false
      // debounce(this.getOpinions,500)('noload');
      this.getOpinions('noload')
    },
    wastedPolitic(id){
      let politic = this.opinions.find((politic) => politic.id == id);
      politic.wasted = true 
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
    async shoModal(idPolitic){
      await this.getPoliticByID(idPolitic).then(() =>{
        this.dialog = true
      })
    },
    

  },
  mounted() {
    this.getOpinions();
  }
})
</script>

<style scoped>
.img-fluid {
    max-width: 100%;
    height: 100px!important;
    object-fit: cover!important;
}
.bsb-blockquote-icon{
  line-height: 1.8!important
}
</style>