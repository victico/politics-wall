<template>
  <div>

    <v-dialog
        v-model="dialogCreate"
        class="mxmd-50"
      >
        <v-card
          
          prepend-icon="$account"
          title="Agregar Politico"
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
                        :src="newPolitic.photo"
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
                  label="Nombre*"
                  required
                  v-model="newPolitic.name"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Cargo*"
                  persistent-hint
                  required
                  v-model="newPolitic.office"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="mt-5"
              >
                <v-text-field
                  label="Partido político*"
                  required
                  v-model="newPolitic.political_party"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="mt-5"
              >
                <v-text-field
                  label="En el puesto desde*"
                  required
                  v-model="newPolitic.since"
                />
              </v-col>
              <!-- <v-col
                cols="12"
                sm="4"
                class="mt-5"
              >
                <v-autocomplete
                  label="Nacionalidad*"
                  :items="nationality"
                  item-title="en_short_name"
                  item-value="alpha_2_code"
                  variant="outlined"
                  v-model="newPolitic.nationality"
                ></v-autocomplete>
              </v-col> -->
            </v-row>
  
            <!-- <small class="text-caption text-medium-emphasis">*indicates required field</small> -->
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
              text="Registrar"
              variant="tonal"
              @click="createPolitic()"
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
import nationality from '@/core/plugins/nationalityJson'
import { STORE_POLITIC } from '@/core/services/store/politic.module'

export default defineComponent({
  props:[
    'dialog'
  ],
  data: () => {
    return {
      dialogCreate: false,
      nationality,
      snackbarShow:false,
      snackbarType:'',
      snackbarMsg:'',
      newPolitic:{
        name:'',
        office:'',
        political_party:'',
        since:'',
        photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png',
      },
    }
  },
  methods:{
    onFileChange(e) {
      const element = e.target
      this.newPolitic.photo = URL.createObjectURL(element.files[0]) 
    },
    resetForm(){
      this.newPolitic = {
        name:'',
        office:'',
        political_party:'',
        since:'',
        photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png',
      }
    },
    createPolitic(){
      const data = new FormData();
      data.append('name', this.newPolitic.name)
      data.append('office', this.newPolitic.office)
      data.append('political_party', this.newPolitic.political_party)
      data.append('since', this.newPolitic.since)
      data.append('photo', this.$refs.photo.files[0])

      this.$store
      .dispatch(STORE_POLITIC, data)
      .then((data) =>{ 
        this.$emit("refresh", data.data)
        this.showSnack('success', 'Politico creado con exito')
        this.closeModal();
      }).catch((e) =>{
        this.showSnack('error', e)
      })
    },
    closeModal(){
      this.resetForm()
      this.$emit("hideModal", 'create')
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
    }
  },
})
</script>
