<template>
  <!-- begin:: Header -->
  <div>
    <nav
      class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme "
      id="kt_header" ref="kt_header" 
      :style="{ backgroundImage: `url('media/backgrounds/bg-blanco.jpg')` }"
      
    >
      <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
          <i class="ti ti-menu-2 ti-sm"></i>
        </a>
      </div>

      <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                <!-- Search -->
        <div class="navbar-nav align-items-center">
          <div class="nav-item navbar-search-wrapper mb-0">
  
              <!-- <span class="d-none d-md-inline-block text-muted">Abiertos 9:00AM a 7:00PM</span> -->
                    
          </div>
        </div>
          <!-- /Search -->

        <ul class="navbar-nav flex-row align-items-center ms-auto">
            <!-- Quick links -->
            <!-- User -->
          <li class="nav-item navbar-dropdown dropdown-user dropdown">
              <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                <div  class="avatar avatar-online">
                  {{ 'A' }}
                </div>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <router-link 
                  :to="{ path: `/config`}" 
                   
                  v-slot="{ href, navigate}"
                >
                  <li >
                    <a class="dropdown-item px-2" :href="href"  @click="navigate">
                      <div class="d-flex align-items-center justify-content-between w-100">
                        <div class="flex-shrink-0 me-3">
                          <div class="avatar avatar-online">
                            <div  class="avatar avatar-online">
                              {{ 'A' }}
                            </div>
                          </div>
                        </div>
                        <div class="flex-grow-1">
                          <span class="fw-semibold d-block">Admin</span>
                        </div>
                        <div class="flex-grow-1 text-end ms-3">
                          <h5 class="mb-0"><i class="fa-solid fa-gear"></i></h5>
                        </div>
                      </div>
                    </a>
                  </li>
                </router-link>
                <li>
                  <div class="dropdown-divider"></div>
                </li>
                <li>
                  <a class="dropdown-item cursor-pointer" @click="onLogout()">
                    <i class="ti ti-logout me-2 ti-sm"></i>
                    <span class="align-middle">Cerrar sesion</span>
                  </a>
                </li>
              </ul>
          </li>
            <!--/ User -->
        </ul>
      </div>
      <!-- Search Small Screens -->
    </nav>

    
  </div>


  <!-- end:: Header -->
</template>

<script>
import { LOGOUT } from "@/core/services/store/auth.module";
import { bootstrap } from "@/concept/bootstrap";
// import notificationTone from "@/assets/audio/notification.mp3";

export default {
  name: "KTHeader",

  data(){
    return{
      
    }
  },
  methods:{
    onLogout() {
      this.$store.dispatch(LOGOUT).then(() => this.$router.push({ path: "/" }));
    },

  },
  mounted() {

  },
  created(){
  },
};
</script>
