<template>
  <div>

    <v-dialog
        v-model="dialogCreate"
        class="mxmd-50"
      >
        <v-card
          
          prepend-icon="$account"
          title="Agregar Opinión"
        >
          <v-card-text class="mt-5">
            <v-row dense>
              <VCol cols="12"  class="px-0 "> 
                  <div class="img-content mx-auto">
                    <label for="photo">
                      <VImg
                        width="180"
                        height="180"
                        class="rounded"
                        :src="createOpinion.photo"
                        style="border-radius:10%!important"
                        id="newProduct-img-content"
                      />
                      <div class="overlay-img">
                        <VIcon color="white" size="x-large" icon="$photo"/>
                      </div>
                    </label>
                    <div class="w-100 text-subtitle-2 text-center politic__photo--description">
                      Foto
                    </div>
                    <div   class="form-group text-center ma-0 mt-0 pa-0">
                      <input type="file"  id="photo" ref="photo" name="photo" data-type="new" class="d-none" @change="onFileChange" >
                    </div>
                  </div>
              </VCol>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Titulo*"
                  persistent-hint
                  required
                  v-model="createOpinion.title"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Author*"
                  required
                  v-model="createOpinion.author"
                />
              </v-col>
              <v-col
                cols="12"
                class="mt-5"
              >
                <v-text-field
                  label="Institución*"
                  required
                  v-model="createOpinion.institution"
                />
              </v-col>
              <v-col
                cols="12"
                class="mt-5"
              >
                <v-textarea 
                  label="Opinión*"
                  variant="outlined"
                  required
                  v-model="createOpinion.opinion"
                />
              </v-col>
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
              color="primary"
              :text="Object.values(opinion).length == 0 ? 'Registrar' : 'Guardar'"
              variant="tonal"
              @click="sendAction()"
            ></v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbarShow"
      :color="snackbarType"
      :timeout="3000"
    >
      <div class="text-white font-weight-bold text-center">
        {{ snackbarMsg }}
      </div>
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbarShow = false"
          color="white"
        >
          <span class="text-white">Cerrar</span>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<style lang="scss" scoped>
  .politic__photo--description{
    transform: translateY(-20px);
  }
</style>
<script>
import { defineComponent } from 'vue'
import { STORE_OPINION, UPDATE_OPINION } from '@/core/services/store/opinion.module'

export default defineComponent({
  props:[
    'dialog',
    'opinion'
  ],
  data: () => {
    return {
      dialogCreate: false,
      snackbarShow:false,
      snackbarType:'',
      snackbarMsg:'',
      createOpinion:{
        institution:'',
        title:'',
        author:'',
        opinion:'',
        photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'
      },
    }
  },
  methods:{
    onFileChange(e) {
      const element = e.target
      this.createOpinion.photo = URL.createObjectURL(element.files[0]) 
    },
    sendAction(){
      if(Object.values(this.opinion).length == 0) this.storeOpinion()
      else this.updateOpinion()      
    },
    storeOpinion(){
      const data = new FormData();
      data.append('institution', this.createOpinion.institution)
      data.append('title', this.createOpinion.title)
      data.append('author', this.createOpinion.author)
      data.append('opinion', this.createOpinion.opinion)
      data.append('photo', this.$refs.photo.files[0])

      this.$store
      .dispatch(STORE_OPINION, data)
      .then((data) =>{ 
        this.$emit("refresh", data.data)
        this.showSnack('success', 'Opinion creado con exito')
        this.closeModal();
      }).catch((e) =>{
        this.showSnack('error', e)
      })
    },
    updateOpinion(){
      const data = new FormData();
      data.append('institution', this.createOpinion.institution)
      data.append('title', this.createOpinion.title)
      data.append('author', this.createOpinion.author)
      data.append('opinion', this.createOpinion.opinion)
      data.append('photo', this.$refs.photo !== null ? this.$refs.photo.files[0] : '')


      this.$store
      .dispatch(UPDATE_OPINION, {id: this.opinion.id, data})
      .then((data) =>{ 
        this.$emit("refresh", data.data)
        this.showSnack('success', 'Opinion actualizada con exito')
        this.closeModal();
      }).catch((e) =>{
        this.showSnack('error', e)
      })
    },
    closeModal(){
      // this.resetForm()
      this.$emit("hideModal")
    },
    showSnack(type, text){
      this.snackbarType = type;
      this.snackbarMsg  = text;
      this.snackbarShow = true;
    }
  },
  mounted(){
  },
  watch: {
    // whenever question changes, this function will run
    dialog(newQuestion, oldQuestion) {
      // console.log('ooo')
      this.dialogCreate = newQuestion
    },
    opinion(newQuestion, oldQuestion) {
      this.createOpinion = Object.values(newQuestion).length > 0 
      ? Object.assign(newQuestion) 
      : {
        institution:'',
        title:'',
        name:'',
        opinion:'',
        photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'
      }

    }
  },
})
</script>
<style lang="scss" scoped>
.mxmd-50{
  max-width:50%;
}
@media screen and (max-width: 780px){
  .mxmd-50{
    max-width:100%!important;
  }
}
</style>
