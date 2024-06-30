<template>
  <div>
    <nav style="" class="nav-bar-homepage" >
      <div class="h-100 d-flex flex-md-row flex-column w-100 align-center px-5">
        <div class="h-100 px-5 py-2 w-100 d-flex justify-center justify-md-start"> 
          <img :src="Logo" alt="" height="120">
        </div>
        <div class="w-100 mb-3 mb-md-0">
          <div class="d-flex w-100 justify-center justify-md-end ">
            <a href="#page1">
              <div class="text-white font-weight-bold mx-5">Muro</div>
            </a>
            <a href="#page2">
              <div class="text-white font-weight-bold mx-5">Patrocinantes</div>
            </a>
            <RouterLink to="/admin">
              <div class="text-white font-weight-bold mx-5">Admin</div>
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
 
    <!-- <full-page ref="fullpage" @onLeave="lito()" :options="options" id="fullpage" > -->
      <div>
        <div id="politic-section" class="section">
          <firstSectionClient />
  
        </div>
        <div id="sponsor-section" class="section ">
          <div class=" pa-5 text-center pt-12 mt-0" > 
            <h1 class="text-h3" style="color:red!important">
              Patrocinantes
            </h1>
          </div>
          <div class="mt-16">
            <div class="d-flex w-100 justify-center px-1 px-md-10">
              <div v-for="i in 3" :key="i" class="d-flex justify-center align-center mx-3 mx-md-10" style=" height: 100px; width: 100px; border-radius: 50%; " >
                <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" width="90px" height="90px" >
              </div>
            </div>
            <div class="d-flex w-100 justify-center px-1 px-md-10 mt-8">
              <div v-for="i in 3" :key="i" class="d-flex justify-center align-center mx-3 mx-md-10" style=" height: 100px; width: 100px; border-radius: 50%; " >
                <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" width="90px" height="90px" >
              </div>
            </div>
          </div>
        </div>
      </div>

    <!-- </full-page> -->
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import firstSectionClient from '@/components/clientHome/firstSection.vue'
import Logo from "@/assets/media/logos/logo.jpg"

export default defineComponent({
  components:{
    firstSectionClient 
  },
  data: () => {
    return {
      Logo,
      options: {
        navigation:true,
        v2compatible: false,
        anchors: ['page1', 'page2'],
        credits: { enabled: true , position: 'left'},
        onSlideLeave: function(origin, destination, direction, trigger) {
          console.log('papitaasss')
        },
      },
    }
  },
  methods: {
    lito(){
      console.log('0abejaaa')
    }
  }
})
</script>
<style scoped lang="scss">
.text-white{
  color: white!important;
}
#politic-section {
  background: #474747;
  z-index: 3;
}
#sponsor-section {
  background: linear-gradient(180deg, #474747 10%, rgb(65, 32, 32) 60%, rgba(51,10,10,1) 100%);

  & img{
    filter: contrast(0.1);
    transition: all 1s;
    &:hover{
      transform: scale(1.01);
      filter: contrast(.5);
    }
  }
}
#footer-section {
  background: rgb(42,9,9);
  background: linear-gradient(180deg, rgba(42,9,9,1) 22%, rgba(74,7,7,1) 57%, rgba(128,0,0,1) 88%);
}
@import url('https://fonts.googleapis.com/css2?family=Honk&display=swap');
.nav-bar-homepage{
  width: 100%; 
  height: max-content; 
  background: #fd2a2a; 
  position: fixed; 
  z-index: 2;
  
}
.text-h2, .text-h3, .text-h4{
  font-family: "Honk", system-ui;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings:
    "MORF" 15,

    "SHLN" 50;
}
</style>
<style lang="scss">
#sponsor-section {

  & .fp-overflow{
    height: 60%;
  }
}
</style>