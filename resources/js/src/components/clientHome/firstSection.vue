<template>
  <div class="mt-14" style="height: calc(100vh - 56px);">
    <v-infinite-scroll
        height="100%"
        mode="manual"
        id="infiniteScrollClient"
        style="width: 100%;"
        @load="load"
      >
      <div class="mt-16 pt-16 grid-gallery">
        <div  class="px-0 grid-gallery__item position-relative" v-for="(politic, index) in politics" :key="index">
          <img :src="politic.normal_photo" class="grid-gallery__image" alt="" style="width: 100%; ">
          <div class="wastedImg_content"  >
            <div style=""  class="wastedSecond" :class="{'wastedActive': politic.wasted}" >
              <img :src="wastedImg" alt=""   style="transform: rotate(-35deg)">
            </div>
          </div>
          <div class="overlay_grid_img text-center" @click="shoModal(politic.id)">
            <img src="https://cdn-icons-png.flaticon.com/256/738/738502.png"     height="50px" width="50px"  alt="">
            <div class="w-100 text-white mt-2" >
              Presiona aquí

            </div>
          </div>
        </div>
      </div>
      <template v-slot:empty>
        <div class="bg-error w-50 text-center pa-2 rounded-sm" >
          No hay mas politicos
        </div>
      </template>
      <template v-slot:load-more="{ props }">
        <v-btn 
          size="large"
          variant="tonal"
          class="mt-10 bg-primary"
          v-bind="props"
          :disabled="loadContinuos"
        >Cargar más</v-btn>
      </template>
    </v-infinite-scroll>
    <div v-if="selectedPolitic">
      <modalCardPoliticVue :politic="selectedPolitic" :dialog="dialog" @hideModal="dialog = false" @wasted="wastedPolitic" />
    </div>
  </div>
</template>
<script >
import { defineComponent } from 'vue'
import { GET_POLITICS_PUBLIC } from '@/core/services/store/politic.module';
import 'vue3-carousel/dist/carousel.css'
import modalCardPoliticVue from '@/components/clientHome/modalCardPolitic.vue';
import wastedImg from "@/assets/media/utils/wasted.png";

export default defineComponent({
  data: () => {
    return{
      politics: [],
      currentPage: 0,
      loadContinuos:false,
      view: window.screen.width < 480 ? 1.27 : 4.2,
      selectedPolitic:null,
      dialog:false,
      wastedImg 
    }
  },
  components: {
    modalCardPoliticVue
  },
  methods: {
    load({ done }) {
      this.getPolitics()
      setTimeout(() => {
        done('ok')
      }, 1000)
    },
    getPolitics(){
      const pageNumber = this.currentPage + 1 
      
      this.$store
      .dispatch(GET_POLITICS_PUBLIC, pageNumber)
      .then((data) =>{
        if(!data.code) throw new Error('server error')


        this.politics.push(...data.data.data)
        this.paginationAction(data)
      }).catch(() => {
        this.emitter.emit('logoutSession')
      })
    },
    load({ done }) {
      this.getPolitics()
      setTimeout(() => {
        done('ok')
      }, 1000)
    },
    paginationAction(data){
      this.currentPage = data.data.current_page
      this.loadContinuos = data.data.current_page == data.data.last_page 
    },
    async shoModal(idPolitic){
      await this.getPoliticByID(idPolitic).then(() =>{
        this.dialog = true
      })
    },
    getPoliticByID(idPolitic){
      return new Promise((resolve, reject) =>{
        this.selectedPolitic = this.politics.find((politic) => politic.id == idPolitic);
        this.selectedPolitic.show = false
        resolve(this.selectedPolitic)
      })

    },

    wastedPolitic(id){
      let politic = this.politics.find((politic) => politic.id == id);
      politic.wasted = true 
    },

  },
  mounted() {
    this.getPolitics();
  }
})
</script>
<style lang="scss">
#infiniteScrollClient::-webkit-scrollbar {
  display: none;
  background: white!important;
  padding: 5px 0px;
}
.grid-gallery {
  
  display: grid;
  grid-auto-rows: 200px;
  gap: 0.5rem;
  grid-auto-flow: row dense;
}

@media all and (min-width: 320px) {
  .grid-gallery {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media all and (min-width: 768px) {
  .grid-gallery {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media all and (min-width: 1024px) {
  .grid-gallery {
    grid-template-columns: repeat(6, 1fr);
  }
}
.overlay_grid_img{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.363);
  color: white!important;
  transition: all 0.5s ease;
  cursor: pointer;
  & img {
    filter: contrast(0) brightness(2);
  }
}
.grid-gallery__item
{
  transition: all 0.5s ease;
  &:hover{
    transform: scale(1.02);
    animation: floating 2s infinite;
  }
  &:hover  > .overlay_grid_img{
    opacity: 1;
  }
}
.grid-gallery__item:nth-child(11n+1) {
  grid-column: span 1;
}

.grid-gallery__item:nth-child(11n+4) {
  grid-column: span 2;
  grid-row: span 1;
}

.grid-gallery__item:nth-child(11n+6) {
  grid-column: span 3;
  grid-row: span 1;
}

.grid-gallery__item:nth-child(11n+7) {
  grid-column: span 1;
  grid-row: span 2;
}

.grid-gallery__item:nth-child(11n+8) {
  grid-column: span 2;
  grid-row: span 2;
}

.grid-gallery__item:nth-child(11n+9) {
  grid-row: span 3;
}

.grid-gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel__viewport{
  overflow: visible;
}
#politic-section > .fp-overflow{
  overflow-y: visible!important;
}
.wastedImg, .wastedImgFirst{
  display: none;
  position: absolute; top: 0%;  right: 0; bottom: 0; 
}
.wastedSecond{
  display: none;
  position: absolute; top: -50%;  right: 0; bottom: 0; 
  left: -40%;
  transform: scale(0.5)!important;
}
.wastedImg{
  left: -19%;
}
.wastedImgFirst{
  left: -45%;
}
.wastedActive{
  display: block!important;
  animation: wasted 0.5s forwards;
}
@keyframes floating {
  0% {
		
		transform: translatey(0px);
	}
	50% {
		transform: translatey(-10px);
	}
	100% {
		transform: translatey(0px);
	}  
}
@keyframes wasted {
  0% {
		
		transform:scale(5.1);
	}
	100% {
    
		transform:scale(0.75);
	}  
}


.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
  cursor: grab;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}


</style>

<style lang="scss" scoped>
  .text-h7{
    font-size: 17px;
    color:#83888d;
  }
  .animate__animated{
    animation-duration: 0.8s;
  }
  .back-section_card{
    height: 25px;
    cursor: pointer!important;
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
    position: relative;
    width: 80%;
    max-height: 580px;
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
  }
</style>