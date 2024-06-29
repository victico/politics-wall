<template>
  <div class="mt-14">
    <Carousel :itemsToShow="view" :wrapAround="true" :transition="500" @slide-start="handleSlideStart">
      <Slide v-for="(politic, index) in politics" :key="index">
        <div class="carousel__item w-100">
          <div class="w-100 cards-content">
            <transition 
              mode="out-in" 
              enter-active-class="animate__animated animate__flipInY" 
              leave-active-class="animate__animated animate__flipOutY"
            >
              <VCard class="w-100 px-0 pb-0 pt-2 rounded-xl d-flex flex-column align-center justify-space-between position-relative poilitic-card__image-content" height="auto" v-if="!politic.show">
                <div class="w-100 d-flex flex-column align-center h-300 "> 
                  
                  <VImg 
                    class="rounded-lg"
                    cover
                    :width="250"
                    height="200"
                    :src="politic.normal_photo"
                  />
                </div>
                <div class="w-100 mt-0 h-40 px-2 bg-white description mt-7 " >
                  <div class="politic-button description-politic pt-md-4 pt-5 d-flex flex-column align-center justify-space-between h-100" >
                    <div class=" w-100 px-0" style="height: 150px;">
                      <div>
                        <div class="text-center ">
                          <h5 class="text-h5 mb-1">{{ politic.name }}</h5>
                          <div class="text-h7">
                            {{ politic.office }}
                          </div>
                        </div>
                      </div>
                      <VRow class="pa-0 ma-0">
                        <VCol cols="7" md="8" class="px-2 pt-0"> 
                          <div class="mt-3 ">
                            <div class="text-subtitle-2 d-flex justify-start align-center">
                              <b class="text-start"> ▪ Edad: {{ politic.age }} años</b>
                            </div>
                            <div class="text-subtitle-2  d-flex justify-start align-center mt-2">
                              <b> ▪ Nacionalidad:</b>
                              <img :src="`https://flagsapi.com/${politic.nationality}/shiny/24.png`" class="ms-1">
                            </div>
                            
                          </div>
                        </VCol>
                        <VCol cols="5" md="4" class="px-1 pt-0"> 
                          <div class="mt-3">
                            
                            <div class="text-subtitle-2  d-flex justify-start align-center mt-2">
                              <b class="text-start"> ▪ Desde: {{ politic.since }}</b>
                            </div>
                          </div>
                        </VCol>
                      </VRow>
                    </div>
                    <div class="mt-2 w-100 bg-primary ">
                      <div class=" more_info_btn">
                        <v-btn variant="text" class="w-100 px-0" @click="getPoliticByID(politic.id)" >
                          Mas información
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </VCard>
              <VCard class=" w-100 px-0 pb-0 pt-0 rounded-xl poilitic-card__image-content description " height="540" v-else>
                <div class="w-100 mt-0 h-100 px-2  description ">
                  <div class="politic-button description-politic  d-flex flex-column align-center justify-space-between h-100"   >
                    <div class="w-100 back-section_card">
                      <div class="pa-2 pt-4 w-100 d-flex"  @click="unSelectPolictic(politic.id)">
                        <v-icon icon="$back" class="mx-2 " />
                        <span>
                          Volver
                        </span>
                      </div>
                    </div>
                    <div class="w-100 d-flex flex-column align-center h-300 mt-5 "> 
                      <VImg 
                        class="rounded-lg"
                        cover
                        :width="280"
                        height="155"
                        :src="politic.normal_photo"
                      />
                    </div>
                    <div class=" w-100 px-0">
                      <div>
                        <div class="text-center mt-2">
                          <h5 class="7 ">{{ politic.name }}</h5>
                        </div>
                      </div>
                      <VRow class="pa-0 ma-0" >
                          <VCol cols="12" class="px-2 pt-0"> 
                            <div class="w-100 ">
                              <div class="text-subtitle-1 text-center mt-0" v-if="politic.crimes.length > 0">Anticuchos</div>
                            </div>
                            <div class="mt-3" v-if="politic.crimes.length > 0">
                              <div class="text-subtitle-1 d-flex align-center mt-1 ms-2" v-for="(crime, index) in politic.crimes" :key="index">
                                <b> ▪ 
                                  <span class="text-decoration-underline"> 
                                    {{crime.title}}
                                  </span>
                                </b>
                              </div>
                            </div>
                            <div v-else >
                              <h3 class="text-center 7 my-2">
                                No tiene anticuchos registrado
                              </h3>
                            </div>
                          </VCol>
                      </VRow>
                    </div>
                    <div class="mt-2 w-100  d-flex justify-center justify-md-space-between px-md-8 px-2 pb-5 buttonsArea">
                      <v-btn variant="tonal"  class="bg-error px-4 mx-1 vote-buttons" @click="unSelectPolictic(politic.id)" >
                        Absolver
                      </v-btn>
                      <v-btn variant="tonal"  class="bg-success px-4 mx-1 vote-buttons" @click="sendCarcel($event)">
                        A la carcel
                      </v-btn>
                    </div>
                    <div class="wastedImg_content">
                      <div style="position: absolute; top: 0; left:0; right: 0; bottom: 0; "  class="wastedImg" >
                        <img :src="wastedImg" alt=""   style="transform: rotate(-35deg)">
                      </div>
                    </div>
                  </div>
                </div>
              </VCard>
            </transition>
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>
<script >
import { defineComponent } from 'vue'
import { GET_POLITICS_PUBLIC } from '../../core/services/store/politic.module';
import { Carousel, Pagination, Slide } from 'vue3-carousel'
import jailSound from "@/assets/audio/jailSound2.mp3";
import wastedImg from "@/assets/media/utils/wasted.png";
import 'vue3-carousel/dist/carousel.css'
import closest from '../../assets/plugins/formvalidation/src/js/utils/closest';

export default defineComponent({
  data: () => {
    return{
      politics: [],
      view: window.screen.width < 480 ? 1.27 : 4.2,
      sound: new Audio(jailSound),
      wastedImg,
    }
  },
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  methods: {
    getPolitics(){
      this.$store
      .dispatch(GET_POLITICS_PUBLIC)
      .then((data) =>{
        this.politics = data.data
      })
    },
    handleSlideStart(data) {
      setTimeout(() => {
        
        const element = document.querySelector('.carousel__slide--active');
  
        console.log(element)
      }, 600);
    },
    async shoModal(idPolitic, modal = ""){
      await this.getPoliticByID(idPolitic).then(() =>{
        if(modal == 'delete') this.dialogDelete = true
        if(modal == 'update') this.dialogUpdate = true
      })
    },
    getPoliticByID(idPolitic){
      
      this.selectedPolitic = this.politics.find((politic) => politic.id == idPolitic);
      this.selectedPolitic.show = true

    },
    unSelectPolictic(id){
      let politic = this.politics.find((politic) => politic.id == id);
      politic.show = false

    },
    sendCarcel(e){

      const element = e.target.closest('.buttonsArea').nextElementSibling  
      console.log()
      element.querySelector('.wastedImg').style.display = 'block'
      this.sound.play()
    }
  },
  mounted() {
    this.getPolitics();
  }
})
</script>
<style >
li.carousel__slide.carousel__slide--visible:not(.carousel__slide--active){
  opacity: 0.5;
}
li.carousel__slide--prev{
  transform: rotateY(-0deg) scale(0.8) translateY(20px)!important;
  filter: blur(5px);
}
li.carousel__slide{
  transform: rotateY(-0deg) scale(0.6) translateY(-50px);
  filter: blur(5px);
}
li.carousel__slide--active ~ .carousel__slide{
  transform: rotateY(0deg) scale(0.6) translateY(-50px);
  filter: blur(5px);
}
li.carousel__slide--next{
  transform: rotateY(0deg) scale(0.8) translateY(20px)!important;
}
li.carousel__slide.carousel__slide--visible.carousel__slide--active{
  transform: rotateY(0deg) scale(1);
  filter: blur(0px);

}

li.carousel__slide.carousel__slide--visible.carousel__slide--active .cards-content{
  background: none;
  border-radius: 28%;
  animation: floating 3s infinite;
  
}
li.carousel__slide.carousel__slide--visible.carousel__slide--active .v-card {
  box-shadow: 0 20px 20px 0px rgba(0,0,0,0.4);
}
.carousel__viewport{
  overflow: visible;
}
#politic-section > .fp-overflow{
  overflow-y: visible!important;
}
.wastedImg{
  display: none;
}
.wastedActive{
  display: block!important;
  animation: wasted 2s forwards;
}
@keyframes floating {
  0% {
		
		transform: translatey(0px);
	}
	50% {
		transform: translatey(-20px);
	}
	100% {
		transform: translatey(0px);
	}  
}
@keyframes wasted {
  0% {
		opacity: 0;
		transform: translatez(1000px);
	}
	50% {
    transform: translatez(500px);
	}
	100% {
    opacity: 1;
		transform: translatez(0px);
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