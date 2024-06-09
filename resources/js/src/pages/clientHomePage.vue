<template>
  <div>
    <nav style="" class="nav-bar-homepage" >
      <div class="h-100 d-flex flex-md-row flex-column w-100 align-center px-5">
        <div class="h-100 px-5 py-2 w-100 "> 
          <h1 class="text-h2 text-center" style="color:red!important">
            El Muro
          </h1>
        </div>
        <div class="w-100 mb-3 mb-md-0">
          <div class="d-flex w-100 justify-center justify-md-end ">
            <RouterLink to="/">
              <div class="text-white mx-5">Muro</div>
            </RouterLink>
            <RouterLink to="/client">
              <div class="text-white mx-5">Patrocinantes</div>
            </RouterLink>
            <RouterLink to="/admin">
              <div class="text-white mx-5">Admin</div>
            </RouterLink>
            <RouterLink to="/login">
              <div class="text-white mx-5">Login</div>
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <full-page ref="fullpage" @onLeave="lito()" :options="options" id="fullpage" >
      <div id="politic-section" class="section">
        <firstSectionClient />

      </div>
      <div id="sponsor-section" class="section ">
        <div class=" pa-5 text-center mt-0 pt-0" > 
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

    </full-page>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import firstSectionClient from '@/components/clientHome/firstSection.vue'

export default defineComponent({
  components:{
    firstSectionClient 
  },
  data: () => {
    return {
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
#politic-section {
  background: #202020
}
#sponsor-section {
  background: linear-gradient(180deg, #202020 20%, rgba(27,6,6,1) 70%, rgba(51,10,10,1) 120%);

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
  width: 100%; height: max-content; background: rgb(12, 11, 8); position: fixed; z-index: 100;
  
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