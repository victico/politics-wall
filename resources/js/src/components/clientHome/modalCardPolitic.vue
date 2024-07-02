<template>
  <div v-show="dialogCentral" class="modal_vic">
    <div class="w-100">
      <div class=" cards-content d-flex justify-center backSida" :class="{'activeReveal':runAnimation}">
        <transition 
          mode="out-in" 
          enter-active-class="animate__animated animate__flipInY" 
          leave-active-class="animate__animated animate__flipOutY"
        >
          <VCard class=" px-0 pb-0 pt-2 rounded-xl d-flex flex-column align-center justify-space-between position-relative poilitic-card__image-content"  height="550px" width="360px" v-if="!selectedPolitic.show">
            <div class="w-100">
              <v-btn icon="$close" variant="tonal" color="white" @click="closeModal()" style=" position: absolute; right: 5px; top: 5px" />
            </div>
            <div class="w-100 d-flex flex-column align-center  pt-8"> 
              <div class="position-relative">
                <VImg 
                  class="rounded-lg"
                  cover
                  :width="250"
                  height="250"
                  :src="selectedPolitic.normal_photo"
                />
                <div class="wastedImg_content">
                  <div style=""  class="wastedImgFirst" :class="{'wastedActive': selectedPolitic.wasted}" >
                    <img :src="wastedImg" alt=""   style="transform: rotate(-35deg)">
                  </div>
                </div>
              </div>  
            </div>
            <div class="w-100 mt-0  px-0 bg-white description mt-7 " >
              <div class="politic-button description-politic pt-md-4 pt-5 d-flex flex-column align-center justify-space-between h-100" >
                <div class=" w-100 px-0" style="height: 150px;">
                  <div>
                    <div class="text-center ">
                      <h5 class="text-h5 mb-1">{{ selectedPolitic.name }}</h5>
                      <div class="text-h7">
                        {{ selectedPolitic.office }}
                      </div>
                    </div>
                  </div>
                  <VRow class="pa-0 ma-0">
                    <VCol cols="6" class="px-md-4 px-4 pt-0"> 
                      <div class="mt-3 ">
                        <!-- <div class="text-subtitle-2 d-flex justify-start align-center">
                          <b class="text-start"> ▪ Edad: {{ selectedPolitic.age }} años</b>
                        </div> -->
                        <div class="text-subtitle-2  d-flex justify-start align-center mt-2">
                          <b> ▪ Nacionalidad:</b>
                          <img :src="`https://flagsapi.com/${selectedPolitic.nationality}/shiny/24.png`" class="ms-1">
                        </div>
                        
                      </div>
                    </VCol>
                    <VCol cols="6" class="px-md-4 px-4  pt-0"> 
                      <div class="mt-3">
                        
                        <div class="text-subtitle-2  d-flex justify-end align-center mt-2">
                          <b class="text-end"> ▪ Desde: {{ selectedPolitic.since }}</b>
                        </div>
                      </div>
                    </VCol>
                  </VRow>
                </div>
                <div class="mt-2 w-100 bg-primary ">
                  <div class=" more_info_btn">
                    <v-btn variant="text" class="w-100 px-0" @click="showCrimes(selectedPolitic.id)" >
                      Mas información
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </VCard>
          <VCard class="  px-0 pb-0 pt-0 rounded-xl poilitic-card__image-content description " height="550px" width="360px" v-else>
            <div class="w-100 mt-0 h-100 px-2  description ">
              <div class="politic-button description-politic  d-flex flex-column align-center justify-space-between h-100"   >
                <div class="w-100 back-section_card">
                  <div class="pa-2 pt-4 w-100 d-flex"  @click="hideCrimes()">
                    <v-icon icon="$back" class="mx-2 " />
                    <span>
                      Volver
                    </span>
                  </div>
                </div>
                <div class="w-100 d-flex flex-column align-center h-300 mt-4 "> 
                  <VImg 
                    class="rounded-lg"
                    cover
                    :width="280"
                    height="180"
                    :src="selectedPolitic.normal_photo"
                  />
                </div>
                <div class=" w-100 px-0">
                  <div>
                    <div class="text-center mt-2">
                      <h5 class="7 ">{{ selectedPolitic.name }}</h5>
                    </div>
                  </div>
                  <VRow class="pa-0 ma-0" >
                      <VCol cols="12" class="px-2 pt-0"> 
                        <div class="w-100 ">
                          <div class="text-subtitle-1 text-center mt-0" v-if="selectedPolitic.crimes.length > 0">Anticuchos</div>
                        </div>
                        <div class="mt-3" v-if="selectedPolitic.crimes.length > 0">
                          <div class="text-subtitle-1 d-flex align-center mt-1 ms-2" v-for="(crime, index) in selectedPolitic.crimes" :key="index">
                            <b> ▪ 
                              <span class="text-decoration-underline" @click="selectCrime(crime.id)"> 
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
                  <v-btn variant="tonal"  class="bg-error px-4 mx-1 vote-buttons" @click="hideCrimes()" >
                    Absolver
                  </v-btn>
                  <v-btn variant="tonal"  class="bg-success px-4 mx-1 vote-buttons" @click="sendCarcel()">
                    A la carcel
                  </v-btn>
                </div>
                <div class="wastedImg_content">
                  <div style=""  class="wastedImg" :class="{'wastedActive': selectedPolitic.wasted}" >
                    <img :src="wastedImg" alt=""   style="transform: rotate(-35deg)">
                  </div>
                </div>
              </div>
            </div>
          </VCard>
        </transition>
      </div>
    </div>
    <div v-if="Object.values(selectedCrime).length > 1">
      <crimesModal  :crime="selectedCrime" :dialog="dialogCrimes" @hideModal="hideCrimeModal" />
    </div>
  </div>
</template>
<script>
  import { defineComponent } from 'vue'
  import jailSound from "@/assets/audio/jailSound2.mp3";
  import wastedImg from "@/assets/media/utils/wasted.png";
  import crimesModal from '@/components/clientHome/modals/crimeModal.vue';
  export default defineComponent({
    props:[
      'dialog',
      'politic'
    ],
    data: () => {
      return {
        dialogCentral: false,
        selectedPolitic: {},
        sound: new Audio(jailSound),
        wastedImg,
        dialogCrimes: false,
        selectedCrime:{},
        runAnimation:false,
      }
    },
    components:{
      crimesModal
    },
    methods:{
      closeModal(){
        this.runAnimation = false
        setTimeout(() => {
          this.$emit("hideModal")
        }, 1000);
      },
      showCrimes(idPolitic){
        this.selectedPolitic.show = true
      },
      hideCrimes(){
        this.selectedPolitic.show = false
      },
      hideCrimeModal(){
        this.dialogCrimes = false
      },
      sendCarcel(){
        this.selectedPolitic.wasted = true
        this.sound.play()
        this.$emit("wasted", this.selectedPolitic.id)
        setTimeout(()=>{
          this.closeModal()
        },1100)
      },
      selectCrime(id){
        this.selectedCrime = Object.assign(this.selectedPolitic.crimes.find((crime) => crime.id == id))
        setTimeout(()=>{
          this.dialogCrimes = true
        },500)
      },
      
    },
    created(){
      this.selectedPolitic = Object.assign(this.politic)
    },
    watch: {
      // whenever question changes, this function will run
      dialog(newQuestion, oldQuestion) {
        // console.log('ooo')
        this.dialogCentral = newQuestion
        this.runAnimation = newQuestion
      },
      politic(newQuestion, oldQuestion) {
        this.selectedPolitic = Object.assign(newQuestion)

      }
    },
  })
</script>

<style lang="scss" scoped>
  .back-section_card{
    height: 25px;
    cursor: pointer!important;
  }
.modal_vic{
  height: 100vh; 
  width: 100%; 
  position: fixed; 
  top: 0px; 
  backdrop-filter: blur(10px); 
  background: #000000bd;
  display: flex; 
  align-items: center;
  z-index: 3;
}
.cards-content{
  animation: floating 3s infinite;
}
.poilitic-card__image-content{
  box-shadow: 0 20px 20px 0px rgba(0,0,0,0.4);
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
    height: 35px;
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
  .backSida{
    animation: DesrevealCar 0.7s forwards!important;
    
  }
  .activeReveal{
    animation: revealCar 0.7s forwards!important;
  }
  @media screen and (max-width: 780px){
    .w-100-50{
      width: 100%;
    }
  }
@keyframes revealCar {
  0% {
		
		transform:scale(0.2) rotatey(360deg);

	}
	100% {
    
		transform:scale(1) rotatey( 0deg);
	}  
  
}
@keyframes DesrevealCar {
  0% {
		opacity: 1;
		transform:scale(1) rotatey(0deg);

	}
  90% {
		opacity: 1;
	}
	100% {
    
		transform:scale(0) rotatey( 360deg);
    opacity: 0;
	}  
  
}
</style>