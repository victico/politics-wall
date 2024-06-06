<template>
    <v-dialog
        v-model="dialogCreate"
        max-width="50%"
      >
        <v-card
          prepend-icon="$account"
          title="Agregar Politico"
        >
          <v-card-text class="mt-5">
            <v-row dense>
              <VCol cols="12" md="6" class="px-0 "> 
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
                    <div class="w-100 text-subtitle-2 text-center">
                      Foto
                    </div>
                    <div   class="form-group text-center ma-0 mt-0 pa-0">
                      <input type="file"  id="photo" ref="photo" name="photo" data-type="new" class="d-none" @change="onFileChange" >
                    </div>
                  </div>
              </VCol>
              <VCol cols="12" md="6" class="px-0 "> 
                <div class="img-content mx-auto">
                  <label for="jail_photo">
                    <VImg
                      width="180"
                      height="180"
                      class="rounded"
                      :src="newPolitic.jail_photo"
                      style="border-radius:10%!important"
                      id="newProduct-img-content"
                    />
                    <div class="overlay-img">
                      <VIcon color="white" size="x-large" icon="$photo"/>
                    </div>
                  </label>
                  <div class="w-100 text-subtitle-1 text-center">
                    Foto en la carcel
                  </div>
                  <div   class="form-group text-center ma-0 mt-0 pa-0">
                    <input type="file"  id="jail_photo" ref="jailPhoto" name="jail_photo" data-type="new" class="d-none" @change="onFileChange" >
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
                ></v-text-field>
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
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="mt-5"
              >
                <v-text-field
                  label="Edad*"
                  required
                  v-model="newPolitic.age"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="mt-5"
              >
                <v-text-field
                  label="En el puesto desde*"
                  required
                  v-model="newPolitic.since"
                ></v-text-field>
              </v-col>
              <v-col
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
              </v-col>
            </v-row>
  
            <!-- <small class="text-caption text-medium-emphasis">*indicates required field</small> -->
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              text="Cerrar"
              variant="plain"
              @click="dialogCreate = false; resetForm()"
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
</template>
<script>
import { defineComponent } from 'vue'
import nationality from '@/core/plugins/nationalityJson'
export default defineComponent({
  props:[
    'dialog'
  ],
  data: () => {
    return {
      dialogCreate: false,
      nationality,
      newPolitic:{
        name:'',
        office:'',
        age:'',
        nationality:'PE',
        since:'',
        photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png',
        jail_photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'

      },
    }
  },
  methods:{
    onFileChange(e) {
      const element = e.target;

      element.id == 'jail_photo' 
      ? this.newPolitic.jail_photo = URL.createObjectURL(element.files[0])
      : this.newPolitic.photo = URL.createObjectURL(element.files[0]) 
      
    },
  },
  mounted(){
    console.log('abusooo')
  }
})
</script>
