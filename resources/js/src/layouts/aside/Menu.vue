<template>
  <ul class="menu-inner py-4">
    <!-- Dashboards -->
    <li class="menu-item" aria-haspopup="true" data-menu-toggle="hover">

      <router-link to="/dashboard" v-slot="{ href, navigate, isActive, isExactActive }">
        <li class="menu-item" aria-haspopup="true" data-menu-toggle="hover"  :class="[isActive && 'active', isExactActive && 'active']" >
          <a  :href="href" class="menu-link" @click="navigate">
            <i class="fa-solid fa-house"></i>
            <div class="">&nbsp; &nbsp;Inicio</div>
          </a>
        </li>
      </router-link>
     </li>
    <!-- Operations page (client) -->
    <li class="menu-item mt-2" aria-haspopup="true" data-menu-toggle="hover">
      <router-link to="/politics" v-slot="{ href, navigate, isActive, isExactActive }">
        <li class="menu-item" aria-haspopup="true" data-menu-toggle="hover" :class="[isActive && 'active', isExactActive && 'active']" >
          <a  :href="href" class="menu-link " @click="navigate">
            <i class="fa-solid fa-file-lines"></i>
            <div class="">&nbsp; &nbsp;Politicos</div>
          </a>
        </li>
      </router-link>
    </li>
    <li class="menu-item mt-2" aria-haspopup="true" data-menu-toggle="hover">
      <router-link to="/opinion" v-slot="{ href, navigate, isActive, isExactActive }">
        <li class="menu-item" aria-haspopup="true" data-menu-toggle="hover" :class="[isActive && 'active', isExactActive && 'active']" >
          <a  :href="href" class="menu-link " @click="navigate">
            <i class="fa-solid fa-user"></i>
            <div class="">&nbsp; &nbsp;Opiniones</div>
          </a>
        </li>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "KTMenu",
  data() {
    return {
      isAdmin: false,
      loadSend: false,
      currentAccount:'',
      personalAccounts: [],
      companyAccounts: [],
      activeAccountType: null,
      activeAccountId: null,
      role: 0
    }
  },
  
  methods: {
    activeChildren(){
      setTimeout(()=>{
        const child = document.querySelector('.menu-item.active');
        
        try{
          const father = child.closest('.menu-father');
          father.classList.add("open","active");
        } catch {
          
        }
        
      }, 200)
    },
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    },

    getIsAdmin() {
      this.isAdmin = window.localStorage.getItem("is_admin") == "true" ? true : false;
    },

  },
  mounted() {
    this.activeChildren();
  },
  created() {
  }
};
</script>
<style lang="scss" scoped>
.menu-item.active{
  & div {
    color: white!important;
  }
  & i {
    color: white!important;
  }
}
</style>
