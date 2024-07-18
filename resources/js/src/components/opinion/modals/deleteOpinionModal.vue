<template>
  <v-dialog
    v-model="dialogDelete"
    class="mxmd-50"
  >
    <v-card
      prepend-icon="$account"
      title="Eliminar Politico"
    >
      <v-card-text class="mt-5">
        <v-row class="w-100">
          <VCol cols="12"  class="px-2 "> 
            <div class="">
                <h5 class="font-weight-medium">¿Seguro que desea eliminar la opinion de <span class="font-weight-bold">{{ selectedOpinion.author }}</span>?</h5>
            </div>
          </VCol>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Cerrar"
          variant="plain"
          @click="closeModal()"
        ></v-btn>

        <v-btn
          color="error"
          text="Eliminar"
          variant="tonal"
          @click="deletePolitic()"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { defineComponent } from 'vue'
import { DELETE_OPINION } from '@/core/services/store/opinion.module'

export default defineComponent({
  props:[
    'dialog',
    'opinion',
  ],
  data: () => {
    return {
      dialogDelete: false,
      selectedOpinion:{},
    }
  },
  methods:{
    deletePolitic(){
      this.$store
      .dispatch(DELETE_OPINION, this.selectedOpinion.id)
      .then((data) =>{
        this.$emit("refresh", data.data)
        this.closeModal();
      })
    },
    closeModal(){
      this.$emit("hideModal", 'delete')
    },

  },
  created(){
    this.selectedOpinion = this.opinion
  },
  watch: {

    dialog(newQuestion, oldQuestion) {
      this.dialogDelete = newQuestion
    },
    opinion(newQuestion, oldQuestion) {
      this.selectedOpinion = Object.assign(newQuestion)
    }
  },
})
</script>
<style lang="scss" scoped>
.mxmd-50{
  max-width:70%;
}
@media screen and (max-width: 780px){
  .mxmd-50{
    max-width:100%!important;
  }
}
</style>