<template>
  <header class="header" >
			<!-- Topbar -->
			
			<!-- End Topbar -->
			<!-- Header Inner -->
			<div class="header-inner " :style="{ backgroundImage: `url(${background})` }">
				<div class="container">
					<div class="inner">
						<div class="row">
							<div class="col-lg-3 col-md-3 col-12">
								<!-- Start Logo -->
								<div class="logo">
									<router-link to="/home">
										<img :src="Logo" alt="#">
									</router-link>
								</div>
								<!-- End Logo -->
								<!-- Mobile Nav -->
								<div class="mobile-nav"></div>
								<!-- End Mobile Nav -->
							</div>
							<div class="col-lg-7 col-md-9 col-12">
								<!-- Main Menu -->
								<div class="main-menu">
									<nav class="navigation">
										<ul class="nav menu">

											<router-link to="/home" v-slot="{ href, navigate, isActive, isExactActive }">
												<li :class="[isActive && 'active', isExactActive && 'active']">
													<a :href="href" @click="navigate" class="font-weight-medium text-subtitle-1">Inicio</a>
												</li>
											</router-link>
											<!-- <router-link to="/opinion_client" v-slot="{ href, navigate, isActive, isExactActive }"> -->
											
											<router-link to="/about_us" v-slot="{ href, navigate, isActive, isExactActive }">
												<li :class="[isActive && 'active', isExactActive && 'active']">
													<a :href="href" @click="navigate" class="font-weight-medium text-subtitle-1">Nosotros</a>
												</li>
											</router-link>
											<!-- </router-link> -->
											<router-link to="/opinion_client" v-slot="{ href, navigate, isActive, isExactActive }">
												<li :class="[isActive && 'active', isExactActive && 'active']">
													<a :href="href" @click="navigate" class="font-weight-medium text-subtitle-1">Soluciones</a>
												</li>
											</router-link>
										</ul>
										
									</nav>
								</div>
								<!--/ End Main Menu -->
							</div>
							<div class="col-lg-2 col-12 d-none d-md-flex">
								<div class="get-quote">
									<router-link to="/login" >
										<a  class="btn text-white py-4 px-9">ingreso</a>
									</router-link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--/ End Header Inner -->
		</header>
</template>
<script>
import { defineComponent } from 'vue'
import Logo from "@/assets/media/logos/logo.png"
import background from "@/assets/media/background/bgtop.jpg"
import '@/assets/js/components/jquery.min'
import '@/assets/js/components/jquery.nav'
import '@/assets/js/components/slicknav.min'
export default defineComponent({

  data: () => {
    return {
      Logo,
      background,
    }
  },
  methods: {
		
  },
	mounted(){
		$('.menu').slicknav({
			prependTo:".mobile-nav",
			duration: 300,
			closeOnClick:true,
		});
	}
})
</script>
<style>

@media screen and (max-width: 780px){
	.header-inner{
		background: white!important;
	}
}

</style>