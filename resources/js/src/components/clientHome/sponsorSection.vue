<template>
  <div id="" class=" ">
    <div class="clients overlay">
			<div class="container" style="overflow-x: hidden;">
				<div class="row">
					<div class="col-lg-12 col-md-12 col-12">
						<div class="clients-slider">
              <Carousel  v-bind="settings" :breakpoints="breakpoints">
                <Slide class="single-clients" v-for="(n, i) in logos" :key="i">
								  <img :src="n" alt="#">
                </Slide>

              </Carousel>
							

						</div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import sponsor1 from "@/assets/media/sponsors/client1.png"
import sponsor2 from "@/assets/media/sponsors/client2.png"
import sponsor3 from "@/assets/media/sponsors/client3.png"
import sponsor4 from "@/assets/media/sponsors/client4.png"
import sponsor5 from "@/assets/media/sponsors/client5.png"
// import ow from 'owl.carousel';

import { Carousel, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data: () => {
    return {
      logos: [sponsor1, sponsor2,  sponsor3, sponsor4, sponsor5,],
      settings: {
        itemsToShow: 4,
        snapAlign: 'center',
        autoplay:3500,
      },
      breakpoints: {
      // 700px and up
      700: {
        itemsToShow: 3.5,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        wrapAround:true,
        itemsToShow: 4,
        snapAlign: 'start',
        autoplay:3500,
      },
    },
    }
  },
  mounted(){
  
  },
  methods: {
  }
})
</script>
