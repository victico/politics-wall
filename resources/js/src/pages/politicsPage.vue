<template>
  <div>
    <div class="d-flex w-100 justify-center">
      <v-card
        class="py-2 text-center px-4 politics w-100-50"
        elevation="12"
        rounded="lg"
        title="Listado de politicos"
      >
      <div>
        <v-btn prepend-icon="$plus" variant="tonal" @click="dialogCreate = true">
          Agregar Politico
        </v-btn>
      </div>
      </v-card>
    </div>
    <VRow class="pa-0 ma-0 mt-5">
      <VCol cols="12" md="3"  v-for="(politic, index) in politics" :key="index">
        <VCard class=" px-0 pb-0 pt-2 d-flex flex-column align-center justify-space-between position-relative poilitic-card__image-content elevation-24" height="auto" v-if="!politic.show">
            <div class="w-100 d-flex flex-column align-center h-300 "> 
              <VImg 
                class="rounded-lg"
                cover
                :width="250"
                height="100"
                :src="politic.normal_photo"
              />
            </div>
            <div class="w-100 mt-0 h-40 px-2 bg-white description mt-5 " >
              <div class="politic-button description-politic pt-md-4 pt-5 d-flex flex-column align-center justify-space-between h-100" >
                <div class=" w-100 px-0 mb-4" style="height: 150px;">
                  <div>
                    <div class="text-center ">
                      <h5 class="text-h5 ">{{ politic.name }}</h5>
                    </div>
                  </div>
                  <VRow class="pa-0 ma-0">
                    <VCol cols="7" md="7" class="px-2 pt-0"> 
                      <div class="mt-3 ">
                        <div class="text-subtitle-2 ">
                          <b>▪ Cargo: {{ politic.office }}</b>
                        </div>
                        <div class="text-subtitle-2  d-flex justify-start align-center mt-2">
                          <b> ▪ Nacionalidad:</b>
                          <img :src="`https://flagsapi.com/${politic.nationality}/shiny/24.png`" class="ms-1">
                        </div>
                        
                      </div>
                    </VCol>
                    <VCol cols="5" md="5" class="px-1 pt-0"> 
                      <div class="mt-3">
                        <div class="text-subtitle-2 ">
                          <b> ▪ Edad: {{ politic.age }} años</b>
                        </div>
                        <div class="text-subtitle-2  mt-2">
                          <b> ▪ Desde: {{ politic.since }}</b>
                        </div>
                      </div>
                    </VCol>
                    <VCol cols="12"  class="d-flex justify-end pt-2">
                      <v-btn icon="$edit" size="small"  color="white" class="bg-primary mx-2 politics-actions" @click="showModal(politic.id, 'update')" />
                      <v-btn icon="$listCrime" size="small"  color="white" class="bg-terciary mx-2 politics-actions" @click="showModal(politic.id, 'crimes')"/>
                      <v-btn icon="$delete" size="small"  color="white" class="bg-error mx-2 politics-actions" @click="showModal(politic.id, 'delete')"/>
                    </VCol>
                  </VRow>
                </div>
              </div>
            </div>
          </VCard>
      </VCol>
    </VRow>
    <v-dialog
      v-model="dialogCreate"
      max-width="100%"
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
    <div v-if=" Object.values(selectedPolitic).length > 1">
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
              <VCol cols="12" md="6" class="px-0 "> 
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
              <VCol cols="12" md="6" class="px-0 "> 
                <div class="img-content mx-auto">
                  <label for="jail_photo_update">
                    <VImg
                      width="180"
                      height="180"
                      class="rounded"
                      :src="selectedPolitic.jail_photo"
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
                    <input type="file"  id="jail_photo_update" ref="jailPhotoUpdate" name="jail_photo" data-type="update" class="d-none"  @change="onFileChange" >
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
                  v-model="selectedPolitic.office"
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
                  v-model="selectedPolitic.age"
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
                  v-model="selectedPolitic.since"
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
                  v-model="selectedPolitic.nationality"
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
              @click="dialogUpdate = false; "
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
      <v-dialog
        v-model="dialogDelete"
        max-width="50%"
      >
        <v-card
          prepend-icon="$account"
          title="Eliminar Politico"
        >
          <v-card-text class="mt-5">
            <v-row dense>
              <VCol cols="12" md="6" class="px-0 "> 
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
              @click="dialogDelete = false;"
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
      <v-dialog
        v-model="dialogCrimes"
        max-width="50%"
      >
        <v-card
          prepend-icon="$listCrime"
          title="Listado de delitos"
        >
          <v-card-text class="mt-5">
            <div class="w-100 d-flex justify-end">
              <v-btn prepend-icon="$plus" variant="tonal" @click="showInternalModal('createCrimes')">
                Agregar delito
              </v-btn>
            </div>
            <VRow class="pa-0 ma-0 mt-2" >
              <VCol cols="12" class="px-2 py-2" v-if="selectedPolitic.crimes.length > 0" > 
                <div class="mt-3 d-flex align-center" v-for="(crime, index) in selectedPolitic.crimes" :key="index" >
                  <div class="text-subtitle-1 d-flex align-center mt-2 w-75">
                    <b> ▪ 
                      <span class="text-decoration-underline"> 
                        {{crime.title}}
                      </span>
                    </b>
                  </div>
                  <div class="d-flex justify-end w-25">
                    <v-btn icon="$edit" size="x-small"  color="white" class="bg-primary mx-2 politics-actions" @click="showModal(politic.id, 'update')" />
                    <v-btn icon="$delete" size="x-small"  color="white" class="bg-error mx-2 politics-actions" @click="showModal(politic.id, 'crimes')"/>
                  </div>
                </div>
              </VCol>
              <VCol cols="12" class="px-2 mt-8" v-else> 
                <div class="">
                  <div class="text-h4 d-flex align-center w-100 justify-center mt-0">
                    No se han cargado delitos
                  </div>
                </div>
              </VCol>
            </VRow>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              text="Cerrar"
              variant="outlined"
              color="terciary"
              @click="dialogCrimes = false; "
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialogCreateCrimes"
        max-width="50%"
      >
        <v-card
          prepend-icon="$listCrime"
          title="Creacion de delitos"
        >
          <v-card-text class="mt-5">
            <v-row dense>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Titulo del delito*"
                  required
                  v-model="createCrime.title"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                
              >
                <v-text-field
                  label="Fecha*"
                  required
                  v-model="createCrime.date"
                />
              </v-col>
              <v-col
                cols="12"
                class="mt-5"
              >
                <v-textarea 
                  label="Descripción del caso*"
                  variant="outlined"
                  required
                  v-model="createCrime.description"
                />
              </v-col>
              
              <v-col
                cols="12"
                class="mt-5"
              >
                <v-textarea 
                  label="Link de referencias*"
                  variant="outlined"
                  required
                  v-model="createCrime.references"
                />
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
              @click="hideInternalModal('createCrimes') "
            ></v-btn>
  
            <v-btn
              color="primary"
              text="Crear"
              variant="tonal"
              @click="createCrimes()"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { GET_POLITICS, GET_POLITIC_BY_ID, STORE_POLITIC, UPDATE_POLITIC, DELETE_POLITIC } from '@/core/services/store/politic.module'
// import * as bootstrap from 'bootstrap'
import nationality from '@/core/plugins/nationalityJson'
export default defineComponent({
  data: () => {
    return{
      politics: [],
      selectedPolitic: {},
      dialogCreate: false,
      dialogUpdate: false,
      dialogReport: false,
      dialogDelete: false,
      dialogCreateCrimes: false,
      dialogCrimes: false,
      dialogCrimesUpdate: true,
      dialogCrimesDelete: true,
      newPolitic:{
        name:'',
        office:'',
        age:'',
        nationality:'PE',
        since:'',
        photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png',
        jail_photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'

      },
      createCrime:{
        title: '',
        description: '',
        date: '',
        references: '',
      },
      nationality,
    }
  },
  methods:{
    getPolitics(){
      this.$store
      .dispatch(GET_POLITICS)
      .then((data) =>{
        this.politics = data.data
      })
    },
    async showModal(idPolitic, modal = ""){
      await this.getPoliticByID(idPolitic).then(() =>{
        if(modal == 'delete') this.dialogDelete = true
        if(modal == 'update') this.dialogUpdate = true
        if(modal == 'crimes') this.dialogCrimes = true
      })
    },
    showInternalModal( modal = ""){
      if(modal == 'createCrimes') this.dialogCreateCrimes = true
      if(modal == 'delete') this.dialogCrimesDelete = true
      if(modal == 'update') this.dialogCrimesUpdate = true
      
    },
    hideInternalModal(modal){
      if(modal == 'createCrimes') this.dialogCreateCrimes = false
      if(modal == 'delete') this.dialogCrimesDelete = false
      if(modal == 'update') this.dialogCrimesUpdate = false
      this.dialogCrimes = true
    },
    getPoliticByID(idPolitic){
      return new Promise( (resolve) => {
        this.$store
          .dispatch(GET_POLITIC_BY_ID, idPolitic)
          .then((response) => {
            // console.log(response)
            this.selectedPolitic = Object.assign({}, response.data);
            setTimeout(() => {
              
              resolve(response.data);
            }, 700);
          })
      }).catch((err) => {
          console.log(err)
          return new Promise((resolve) => {
            resolve(false);
          });
      });
    },
    onFileChange(e,) {
      const element = e.target;
      if(element.dataset.type != 'new'){
        element.id == 'jail_photo_update' 
        ? this.selectedPolitic.jail_photo = URL.createObjectURL(element.files[0])
        : this.selectedPolitic.normal_photo = URL.createObjectURL(element.files[0]) 
        return
      }

      element.id == 'jail_photo' 
      ? this.newPolitic.jail_photo = URL.createObjectURL(element.files[0])
      : this.newPolitic.photo = URL.createObjectURL(element.files[0]) 
      
    },
    resetForm(){
      this.newPolitic = {
        name:'',
        office:'',
        age:'',
        nationality:'PE',
        since:'',
        photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png',
        jail_photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'

      }
    },
    createPolitic(){
      const data = new FormData();
      data.append('name', this.newPolitic.name)
      data.append('office', this.newPolitic.office)
      data.append('age', this.newPolitic.age)
      data.append('nationality', this.newPolitic.nationality)
      data.append('since', this.newPolitic.since)
      data.append('photo', this.$refs.photo.files[0])
      data.append('jail_photo', this.$refs.jailPhoto.files[0])

      this.$store
      .dispatch(STORE_POLITIC, data)
      .then((data) =>{
        this.getPolitics();
        this.dialogCreate = false; 
        this.resetForm();
      })
    },
    updatePolitic(){
      const data = new FormData();
      data.append('name', this.selectedPolitic.name)
      data.append('office', this.selectedPolitic.office)
      data.append('age', this.selectedPolitic.age)
      data.append('nationality', this.selectedPolitic.nationality)
      data.append('since', this.selectedPolitic.since)
      data.append('photo_update', this.$refs.photoUpdate !== null ? this.$refs.photoUpdate.files[0] : '')
      data.append('jail_photo_update', this.$refs.jailPhotoUpdate !== null ? this.$refs.jailPhotoUpdate.files[0] : '')
      this.$store
      .dispatch(UPDATE_POLITIC, { id: this.selectedPolitic.id, data:data } )
      .then((data) =>{
        this.getPolitics();
        this.dialogUpdate = false; 
      })
      
    },
    deletePolitic(){
      this.$store
      .dispatch(DELETE_POLITIC, this.selectedPolitic.id)
      .then((data) =>{
        console.log(data)
        this.getPolitics();
        this.dialogDelete = false; 
      })
    },
    createCrimes(){
      alert('quevisaje')
    }
  },
  mounted(){
    // console.log(this.nationality)
    this.getPolitics()
  }
})
</script>

<style lang="scss">
.politics {
  .v-card-item{
    padding-top: 0px;
  }
}
.v-overlay__scrim{
  opacity: .9!important;
}
.politics-actions {
  &:hover{
    opacity: 0.9;
    transform: scale(1.1);
  }
  & path{
    color: white!important;
  }
} 
.w-100-50{
  width: 50%;
}
.img-content{
  position:relative;
  width: auto;
  max-width: fit-content;
  border-radius: 10px;
  &:hover > label > .overlay-img{
    opacity: 1;
    transform: scale(1);
  }
  & path{
    color: white!important;
  }
}
.overlay-img{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #3f3f3f70;
  border-radius: 20px;
  opacity: 0;
  transform: scale(0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in;
}
@media screen and (max-width: 780px){
  .w-100-50{
    width: 100%;
  }
}
</style>
<style lang="scss" scoped>
  .animate__animated{
    animation-duration: 0.8s;
  }
  .back-section_card{
    height: 25px;
    cursor: pointer;
  }
  .h-300{
    height: 300px;
  }
  .h-60{
    height: 58.5%;
  }
  .h-40{
    height: 40%;
  }
  .politic-button{
    margin:0px -8px;
  }
  .poilitic-card__image-content{
    max-height: 580px;
    background: rgb(173,177,173);
    background: radial-gradient(circle, rgb(211, 211, 211) 20%, rgb(238, 240, 238) 33%, #c2c3ec 100%);
  }
  .description-politic{
    box-shadow: 0px 0px 11px 0px #00000057;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  .description{
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  .more_info_btn{
    background: rgb(161 161 161);
    transition: all 0.5s ease;
  }
  .text-decoration-underline{
    cursor: pointer;
  }
  .politics {
    .v-card-item{
      padding-top: 0px;
    }
  }
  .v-overlay__scrim{
    opacity: .9!important;
  }
  .politics-actions {
    &:hover{
      opacity: 0.9;
      transform: scale(1.1);
    }
    & path{
      color: white!important;
    }
  } 
  .w-100-50{
    width: 50%;
  }
  .img-content{
    position:relative;
    width: auto;
    max-width: fit-content;
    border-radius: 10px;
    &:hover > label > .overlay-img{
      opacity: 1;
      transform: scale(1);
    }
    & path{
      color: white!important;
    }
  }
  .overlay-img{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #3f3f3f70;
    border-radius: 20px;
    opacity: 0;
    transform: scale(0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in;
  }
  @media screen and (max-width: 780px){
    .w-100-50{
      width: 100%;
    }
  }
</style>