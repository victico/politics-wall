<template>
  <v-dialog
        v-model="dialogUpdate"
        max-width="50%"
      >
        <v-card
          prepend-icon="$account"
          title="Modificar Politico"
        >
          <v-card-text class="mt-5">
            <v-row dense>
              <VCol cols="12" class="px-0 "> 
                  <div class="img-content mx-auto">
                    <label for="photo_update">
                      <VImg
                        width="180"
                        height="180"
                        class="rounded"
                        :src="selectedPolitic.normal_photo"
                        style="border-radius:10%!important"
                        id="newProduct-img-content"
                      />
                      <div class="overlay-img">
                        <VIcon color="white" size="x-large" icon="$photo"/>
                      </div>
                    </label>
                    <div class="w-100 text-subtitle-2 text-center">
                      Foto
                    </div>
                    <div   class="form-group text-center ma-0 mt-0 pa-0">
                      <input type="file"  id="photo_update" ref="photoUpdate" name="photoUpdate" data-type="update" class="d-none" @change="onFileChange" >
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
                  v-model="selectedPolitic.name"
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
                  v-model="selectedPolitic.office"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="mt-5"
              >
                <v-text-field
                  label="Partido politico*"
                  required
                  v-model="selectedPolitic.political_party"
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
                  v-model="selectedPolitic.since"
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
                  v-model="selectedPolitic.nationality"
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
              @click="closeModal(); "
            ></v-btn>
  
            <v-btn
              color="primary"
              text="Modificar"
              variant="tonal"
              @click="updatePolitic()"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>
<script>
import { defineComponent } from 'vue'
import nationality from '@/core/plugins/nationalityJson'
import { UPDATE_POLITIC } from '@/core/services/store/politic.module'

export default defineComponent({
  props:[
    'dialog',
    'politic',
  ],
  data: () => {
    return {
      dialogUpdate: false,
      nationality,
      selectedPolitic:{},
    }
  },
  methods:{
    onFileChange(e) {
      const element = e.target;
      this.selectedPolitic.normal_photo = URL.createObjectURL(element.files[0]) 
      return
      
    },
    closeModal(){
      this.$emit("hideModal", 'update')
    },
    updatePolitic(){
      const data = new FormData();
      data.append('name', this.selectedPolitic.name)
      data.append('office', this.selectedPolitic.office)
      data.append('political_party', this.selectedPolitic.political_party)
      data.append('since', this.selectedPolitic.since)
      data.append('photo_update', this.$refs.photoUpdate !== null ? this.$refs.photoUpdate.files[0] : '')
      this.$store
      .dispatch(UPDATE_POLITIC, { id: this.selectedPolitic.id, data:data } )
      .then((data) =>{
        this.$emit("refresh", data.data)
        this.closeModal();
      })
      
    },
  },
  created(){
    this.selectedPolitic = this.politic
  },
  watch: {

    dialog(newQuestion, oldQuestion) {
      this.dialogUpdate = newQuestion
    },
    politic(newQuestion, oldQuestion) {
      this.selectedPolitic = Object.assign(newQuestion)
    }
  },
})
</script>