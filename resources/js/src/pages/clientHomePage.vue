<template>
  <div>
    <div>
      <div id="politic-section" class=" ">
        <firstSectionClient />
        <sponsorSection />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import firstSectionClient from '@/components/clientHome/firstSection.vue'
import sponsorSection from '@/components/clientHome/sponsorSection.vue'


export default defineComponent({
  components:{
    firstSectionClient,
    sponsorSection,
  },
  data: () => {
    return {
    }
  },
  methods: {
  }
})
</script>

