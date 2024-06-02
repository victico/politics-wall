<template>
  <div>
    <VRow class="pa-0 ma-0 mt-5 ">
      <VCol cols="12" md="3"  v-for="(politic, index) in politics" :key="index">
        <transition 
          mode="out-in" 
          enter-active-class="animate__animated animate__flipInY" 
          leave-active-class="animate__animated animate__flipOutY"
        >
          <VCard class=" px-0 pb-0 pt-2 d-flex flex-column align-center justify-space-between position-relative poilitic-card__image-content elevation-24" height="auto" v-if="!politic.show">
            <div class="w-100 d-flex flex-column align-center h-300 "> 
              
              <VImg 
                class="rounded-lg"
                cover
                :width="250"
                height="200"
                :src="politic.normal_photo"
              />
            </div>
            <div class="w-100 mt-0 h-40 px-2 bg-white description mt-5 " >
              <div class="politic-button description-politic pt-md-4 pt-5 d-flex flex-column align-center justify-space-between h-100" >
                <div class=" w-100 px-0" style="height: 150px;">
                  <div>
                    <div class="text-center ">
                      <h5 class="text-h5 ">{{ politic.name }}</h5>
                    </div>
                  </div>
                  <VRow class="pa-0 ma-0">
                    <VCol cols="7" md="7" class="px-2 pt-0"> 
                      <div class="mt-3 ">
                        <div class="text-subtitle-2 ">
                          <b>▪ Cargo: {{ politic.office }}</b>
                        </div>
                        <div class="text-subtitle-2  d-flex justify-start align-center mt-2">
                          <b> ▪ Nacionalidad:</b>
                          <img :src="`https://flagsapi.com/${politic.nationality}/shiny/24.png`" class="ms-1">
                        </div>
                        
                      </div>
                    </VCol>
                    <VCol cols="5" md="5" class="px-1 pt-0"> 
                      <div class="mt-3">
                        <div class="text-subtitle-2 ">
                          <b> ▪ Edad: {{ politic.age }} años</b>
                        </div>
                        <div class="text-subtitle-2  mt-2">
                          <b> ▪ Desde: {{ politic.since }}</b>
                        </div>
                      </div>
                    </VCol>
                    <!-- <VCol cols="12"  class="d-flex justify-end pt-0">
                      <v-btn icon="$edit" size="small"  color="white" class="bg-primary mx-2 politics-actions" @click="shoModal(politic.id, 'update')" />
                      <v-btn icon="$delete" size="small"  color="white" class="bg-error mx-2 politics-actions" @click="shoModal(politic.id, 'delete')"/>
                    </VCol> -->
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
          <VCard class=" px-0 pb-0 pt-0  poilitic-card__image-content description elevation-24" height="540" v-else>
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
                <div class="w-100 d-flex flex-column align-center h-300 mt-8 "> 
                  <VImg 
                    class="rounded-lg"
                    cover
                    :width="250"
                    height="155"
                    :src="politic.normal_photo"
                  />
                </div>
                <div class=" w-100 px-0">
                  <div>
                    <div class="text-center mt-2">
                      <h5 class="text-h6 ">{{ politic.name }}</h5>
                    </div>
                  </div>
                  <VRow class="pa-0 ma-0" >
                      <VCol cols="12" class="px-2 pt-0"> 
                        <div class="w-100 ">
                          <h2 class="text-subtitle-1 text-center mt-1" v-if="politic.crimes.length > 0">Delitos</h2>
                        </div>
                        <div class="mt-3" v-if="politic.crimes.length > 0">
                          <div class="text-subtitle-1 d-flex align-center mt-2" v-for="(crime, index) in politic.crimes" :key="index">
                            <b> ▪ 
                              <span class="text-decoration-underline"> 
                                {{crime.title}}
                              </span>
                            </b>
                          </div>
                        </div>
                        <div v-else >
                          <h3 class="text-center text-h6 my-2">
                            No tiene delitos Registrado
                          </h3>
                        </div>
                      </VCol>
                  </VRow>
                </div>
                <div class="mt-2 w-100  d-flex justify-space-between px-8 pb-5">
                  <v-btn variant="tonal"  class="bg-error px-4 vote-buttons" >
                    No carcel
                  </v-btn>
                  <v-btn variant="tonal"  class="bg-success px-4 me-3 vote-buttons" >
                    A la carcel
                  </v-btn>
                </div>
              </div>
            </div>
          </VCard>
        </transition>
      </VCol>
    </VRow>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { GET_POLITICS, GET_POLITIC_BY_ID, STORE_POLITIC, UPDATE_POLITIC, DELETE_POLITIC } from '@/core/services/store/politic.module'
// import * as bootstrap from 'bootstrap'

export default defineComponent({
  data: () => {
    return{
      politics: [],
      selectedPolitic: {},
      dialogCreate: false,
      dialogUpdate: false,
      dialogReport: false,
      dialogDelete: false,
      newPolitic:{
        name:'',
        office:'',
        age:'',
        since:'',
        photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png',
        jail_photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'

      }
    }
  },
  methods:{
    getPolitics(){
      this.$store
      .dispatch(GET_POLITICS)
      .then((data) =>{
        this.politics = data.data
      })
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
      console.log(this.selectedPolitic)

    },
    unSelectPolictic(id){
      let politic = this.politics.find((politic) => politic.id == id);
      politic.show = false

    },
    resetForm(){
      this.newPolitic = {
        name:'',
        office:'',
        age:'',
        since:'',
        photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png',
        jail_photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'

      }
    },
  },
  mounted(){
    this.getPolitics()
  }
})
</script>

<style lang="scss" scoped>
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
    max-height: 580px;
    background: rgb(173,177,173);
    background: radial-gradient(circle, rgb(211, 211, 211) 20%, rgb(238, 240, 238) 33%, #c2c3ec 100%);
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