<template>
  <v-dialog
    v-model="dialogDelete"
    max-width="50%"
  >
    <v-card
      prepend-icon="$account"
      title="Eliminar Politico"
    >
      <v-card-text class="mt-5">
        <v-row class="w-100">
          <VCol cols="12"  class="px-2 "> 
            <div class="">
                <h3>¿Seguro que desea eliminar a {{ selectedPolitic.name }}?</h3>
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
import { DELETE_POLITIC } from '@/core/services/store/politic.module'

export default defineComponent({
  props:[
    'dialog',
    'politic',
  ],
  data: () => {
    return {
      dialogDelete: false,
      selectedPolitic:{},
    }
  },
  methods:{
    deletePolitic(){
      this.$store
      .dispatch(DELETE_POLITIC, this.selectedPolitic.id)
      .then((data) =>{
        this.$emit("refresh")
        this.closeModal();
      })
    },
    closeModal(){
      this.$emit("hideModal", 'delete')
    },

  },
  created(){
    this.selectedPolitic = this.politic
  },
  watch: {

    dialog(newQuestion, oldQuestion) {
      this.dialogDelete = newQuestion
    },
    politic(newQuestion, oldQuestion) {
      this.selectedPolitic = Object.assign(newQuestion)
    }
  },
})
</script>