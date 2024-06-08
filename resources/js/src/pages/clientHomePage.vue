<template>

  <div>

    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section">
        <firstSectionClient />

      </div>
      <div id="secondPage" class="section">First section ...</div>
      <div class="section">thirth section ...</div>

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
        anchors: ['page1', 'page2', 'page3'],
        sectionsColor: ['#202020', '#ff5f45', '#0798ec'],
        credits: { enabled: false, label: '', position: 'left'},
      },
    }
  }
})
</script>
<style scoped lang="scss">

</style>