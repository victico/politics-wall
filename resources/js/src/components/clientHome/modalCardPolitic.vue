<template>
  <div v-show="dialogCentral" >
    <div class="modal_vic" @click="closeModal()"></div>
    <div class="carder">
      <div class=" cards-content d-flex align-center flex-column justify-center backSida" :class="{'activeReveal':runAnimation}" style="position: relative;">
        <!-- <div >
          <v-btn icon="$close" variant="elevated" elevated color="white" @click="closeModal()" style="position: absolute; right: 37.8%; top: -3%; z-index: 2;" />
        </div> -->
        <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
          <div class="card">
            <div class="front">
              <div class="logo-up text-white" style="height: 10%;">
                <span style="text-transform: uppercase;" class="text-white">

                  {{selectedPolitic.name}}<br>
                </span>
                <small class="text-white">{{selectedPolitic.office}}</small>
              </div>
              <div class="fotomuro py-2 mb-3" style="height: 74%;" >
                <div style="height: 100%; position: relative; overflow: hidden;" >
                  <img :src="selectedPolitic.normal_photo" style="height:100%; object-fit: cover; width: 100%;" alt="#">
                  <div class="wastedImg_content">
                    <div style=""  class="wastedImg" :class="selectedPolitic.barAnimationx" >
                      <img :src="wastedImg" alt=""  class="barrotes">
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-content  text-subtitle-1 text-white" style="font-size: 1rem;  height: 10%; color: white!important;">
                Partido Político:  <p class="contenido text-subtitle-1 text-white" style="font-weight: 600; color: white!important; margin-top: -5px;">{{ selectedPolitic.political_party }}</p>
              </div>
            </div>
            <div class="back py-3 d-flex flex-column  justify-space-between align-center">
              <div class="back-content" >
                <div class="fotoback" style="position: relative; overflow: hidden;">
                  <img :src="selectedPolitic.normal_photo"  style="height:100%; object-fit: cover; width: 100%;" alt="#">
                  <div class="wastedImg_content">
                    <div style=""  class="wastedImg" :class="selectedPolitic.barAnimationx" >
                      <img :src="wastedImg" alt=""  class="barrotes" >
                    </div>
                  </div>
                </div>
                <div class="mt-2">
                  <h2 class="nombre font-weight-medium">{{selectedPolitic.name}}</h2>
                  <h4 class="titulo font-weight-medium" style="color: #bc2828!important;">Anticuchos</h4>
                  <div class="mt-2">
                    <ul v-if="selectedPolitic.crimes.length > 0" class="ps-0">
                      <li 
                       class="mt-1" 
                       style="color: #05122d; cursor: pointer" 
                       v-for="(crime, index) in selectedPolitic.crimes" 
                       :key="index"
                       @click="selectCrime(crime.id)"
                      >
                        {{crime.title}}
                      </li>
                    </ul>
                    <div v-else>
                      <h4 class="text-center pt-7 my-2 ">
                        No tiene anticuchos registrado
                      </h4>
                    </div>
                  </div>
                </div>
                <br>
              </div>
              <div class="buttons mt-2">
                <button class="primary me-4" @click="absolver()">
                  Absolver
                </button>
                <button class="primary ghost" @click="sendCarcel()">
                  A la carcel
                </button>
              </div>
            </div>
          </div>
        </div>
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
  import boo1 from "@/assets/audio/boo1.mp3";
  import boo2 from "@/assets/audio/boo2.mp3";
  import wastedImg from "@/assets/media/utils/reja.png";
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
        booSound: new Audio(boo1),
        booSound2: new Audio(boo2),
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
        }, 500);
      },
      showCrimes(idPolitic){
        this.selectedPolitic.show = true
      },
      absolver(){
        // this.selectedPolitic.show = false
        if(this.selectedPolitic.wasted){
          this.booSound.play()
          this.booSound2.play()
          this.selectedPolitic.barAnimationx ='wastedLeave'
        }
        this.selectedPolitic.wasted = false
        this.$emit("absolver", this.selectedPolitic.id)

      },
      hideCrimeModal(){
        this.dialogCrimes = false
      },
      sendCarcel(){
        if(!this.selectedPolitic.wasted) {
          this.sound.play()
          this.selectedPolitic.barAnimationx ='wastedActive'
        }
        this.$emit("wasted", this.selectedPolitic.id)
        this.selectedPolitic.wasted = true
        setTimeout(()=>{
          // this.closeModal()
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
.back-content{
  height: 90%;
  box-sizing: border-box!important;
  display: flex;
  width: 100%;
  flex-direction: column;
}
.carder {
  position: fixed;
  top: 15%;
  z-index: 3;
  left: calc( 50% - 168px );
}
.barrotes{
  transform: rotate(0deg) translateY(-25px) translateX(0px);
  max-width: none;
  width: 105%;
}
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