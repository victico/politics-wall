<template>
  <v-dialog
    v-model="dialogView"
    class="mxmd-50"
  >
    <v-card
      prepend-icon="$account"
      title="Ver opinión"
    >
      <v-card-text class="mt-0">
        <v-row class="w-100">
          <VCol cols="12"  class="px-2 "> 
            <div class="">
              <div class="mt-4 d-flex align-center">
                <div>
                  <VImg :src="opinion.photo" height="60" width="60" class="rounded-circle opinion__img"/>
                </div>
                <div class="ms-2">
                  <div class="text-body-1	"> {{ opinion.author }} </div>
                  <div class="text-body-2	"> {{ opinion.institution }} </div>
                </div>
              </div>
            </div>
          </VCol>

        </v-row>
      </v-card-text>
      <v-card-text class="mt-0 mb-0 pt-0"  style="height: max-content; max-height:400px; overflow-y: auto;">
        <v-row class="w-100">
          <VCol cols="12"  class="px-2 "> 
            <div class="">
              <div class="mt-4 d-flex align-center">
                <div class="ms-2">
                  <div class="text-body-1	" v-html="opinion.opinion.replace(/\n/gi, '<br>')" />
                </div>
              </div>
            </div>
          </VCol>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="Cerrar"
          variant="plain"
          @click="closeModal()"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props:[
    'dialog',
    'opinion',
  ],
  data: () => {
    return {
      dialogView: false,
      selectedOpinion:{},
    }
  },
  methods:{
    closeModal(){
      this.$emit("hideModal")
    },

  },
  created(){
    this.selectedOpinion = this.opinion
  },
  watch: {
    dialog(newQuestion, oldQuestion) {
      this.dialogView = newQuestion
    },
    opinion(newQuestion, oldQuestion) {
      this.selectedOpinion = Object.assign(newQuestion)
    }
  },
})
</script>
<style lang="scss" scoped>
.mxmd-50{
  max-width:80%;
}
@media screen and (max-width: 780px){
  .mxmd-50{
    max-width:100%!important;
  }
}
</style>