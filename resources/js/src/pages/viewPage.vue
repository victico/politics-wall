<template>
  <div>
    <VRow class="pa-0 ma-0 mt-5 ">
      <VCol cols="12" md="3"  v-for="(politic, index) in politics" :key="index">
        <VCard class=" px-0 pb-0 pt-2 d-flex flex-column align-center justify-space-between position-relative poilitic-card__image-content" height="auto" v-if="moreInfo">
          <div class="w-100 d-flex flex-column align-center h-300 "> 
            
            <VImg 
              class="rounded-lg"
              cover
              :width="200"
              height="200"
              :src="politic.normal_photo"
            />
          </div>
          <div class="w-100 mt-0 h-40 px-2 bg-white description mt-5 " >
            <div class="politic-button description-politic pt-md-4 pt-5 d-flex flex-column align-center justify-space-between h-100" >
              <div class=" w-100 px-0" style="height: 150px;">
                <div>
                  <div class="text-center ">
                    <h5 class="text-h5 ">{{ politic.name }}</h5>
                  </div>
                </div>
                <VRow class="pa-0 ma-0">
                  <VCol cols="7" md="6" class="px-2 pt-0"> 
                    <div class="mt-3 ">
                      <div class="text-subtitle-1 ">
                        <b>▪ Cargo: {{ politic.office }}</b>
                      </div>
                      <div class="text-subtitle-1  d-flex justify-start align-center mt-2">
                        <b> ▪ Nacionalidad:</b>
                        <img src="https://flagsapi.com/VE/shiny/24.png" class="ms-1">
                      </div>
                      
                    </div>
                  </VCol>
                  <VCol cols="5" md="6" class="px-1 pt-0"> 
                    <div class="mt-3">
                      <div class="text-subtitle-1 ">
                        <b> ▪ Edad: {{ politic.age }} años</b>
                      </div>
                      <div class="text-subtitle-1  mt-2">
                        <b> ▪ Desde: {{ politic.since }}</b>
                      </div>
                    </div>
                  </VCol>
                  <!-- <VCol cols="12"  class="d-flex justify-end pt-0">
                    <v-btn icon="$edit" size="small"  color="white" class="bg-primary mx-2 politics-actions" @click="shoModal(politic.id, 'update')" />
                    <v-btn icon="$delete" size="small"  color="white" class="bg-error mx-2 politics-actions" @click="shoModal(politic.id, 'delete')"/>
                  </VCol> -->
                </VRow>
              </div>
              <div class="mt-2 w-100 bg-primary ">
                <div class=" more_info_btn">
                  <v-btn variant="text" class="w-100 px-0" @click="moreInfo = !moreInfo">
                    Mas información
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </VCard>

        <VCard class=" px-0 pb-0 pt-0 " height="532" v-else>
          <div class="w-100 mt-0 h-100 px-2 bg-white description ">
            <div class="politic-button description-politic pt-md-5 pt-5 d-flex flex-column align-center justify-space-between h-100"   >
              <div class=" w-100 px-0" style="">
                <div>
                  <div class="text-center ">
                    <h5 class="text-h5 ">{{ politic.name }}</h5>
                  </div>
                </div>
                <VRow class="pa-0 ma-0" >
                    <VCol cols="12" class="px-2 pt-0"> 
                      <div class="w-100 ">
                        <h2 class="text-h6 text-center">Delitos</h2>
                      </div>
                      <div class="mt-3 ">
      
                        <div class="text-subtitle-1 d-flex justify-cneter align-center mt-2">
                          <b> ▪ 
                            <span class="text-decoration-underline"> 
                              Desvió de fondos nacionales.
                            </span>
                          </b>
                        </div>
                        <div class="text-subtitle-1 d-flex justify-cneter align-center mt-2">
                          <b> ▪ 
                            <span class="text-decoration-underline"> 
                              Crimenes de lesahumanidad.
                            </span>
                          </b>
                        </div>
                        <div class="text-subtitle-1 d-flex justify-cneter align-center mt-2">
                          <b> ▪ 
                            <span class="text-decoration-underline"> 
                              Jefe del cartel de los soles.
                            </span>
                          </b>
                        </div>
                        <div class="text-subtitle-1 d-flex justify-cneter align-center mt-2">
                          <b> ▪ 
                            <span class="text-decoration-underline"> 
                              Corrupción.
                            </span>
                          </b>
                        </div>
                        <div class="text-subtitle-1 d-flex justify-cneter align-center mt-2">
                          <b> ▪ 
                            <span class="text-decoration-underline"> 
                              Enriquicimiento ilicito.
                            </span>
                          </b>
                        </div>
                      </div>
                    </VCol>
                </VRow>
              </div>
              <div class="mt-2 w-100 bg-primary ">
                <div class=" more_info_btn">
                  <v-btn variant="text" class="w-100 px-0" @click="moreInfo = !moreInfo">
                    Mas información
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </VCard>

        
      </VCol>
    </VRow>
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
              sm="6"
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
              sm="6"
              class="mt-5"
            >
              <v-text-field
                label="En el puesto desde*"
                required
                v-model="newPolitic.since"
              ></v-text-field>
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
                sm="6"
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
                sm="6"
                class="mt-5"
              >
                <v-text-field
                  label="En el puesto desde*"
                  required
                  v-model="selectedPolitic.since"
                ></v-text-field>
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
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { GET_POLITICS, GET_POLITIC_BY_ID, STORE_POLITIC, UPDATE_POLITIC, DELETE_POLITIC } from '@/core/services/store/politic.module'
// import * as bootstrap from 'bootstrap'

export default defineComponent({
  data: () => {
    return{
      moreInfo:true,
      politics: [],
      selectedPolitic: {},
      dialogCreate: false,
      dialogUpdate: false,
      dialogReport: false,
      dialogDelete: false,
      newPolitic:{
        name:'',
        office:'',
        age:'',
        since:'',
        photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png',
        jail_photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'

      }
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
    async shoModal(idPolitic, modal = ""){
      await this.getPoliticByID(idPolitic).then(() =>{
        if(modal == 'delete') this.dialogDelete = true
        if(modal == 'update') this.dialogUpdate = true
      })
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
    resetForm(){
      this.newPolitic = {
        name:'',
        office:'',
        age:'',
        since:'',
        photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png',
        jail_photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'

      }
    },
  },
  mounted(){
    this.getPolitics()
  }
})
</script>

<style lang="scss" scoped>
.description > .animate__animated{
  animation-duration: 1s;
}
.dabo{
  animation: 1s linear 0s  alternate forwards sun-rise;
}
.dabo2{
  animation: 1s linear 0s  alternate forwards sun-rise2;
}
@keyframes sun-rise {
  0%{
    /* pushes the sun down past the viewport */
    transform: rotateY(0deg);
  }
  45%{
    transform: rotateY(90deg);
  }
  98%{
    opacity: 1;
  }
  99%{
    margin-left: 0px;
    opacity: 0;
  }
  100% {
    opacity: 0!important;
    /* returns the sun to its default position */
    position: absolute!important;
    margin-left: -1000px!important;
  }
}
@keyframes sun-rise2 {
  0%{
    /* pushes the sun down past the viewport */
    opacity: 0;
    /* returns the sun to its default position */
    position: absolute;
    left: -1000px;
    
  }
  1%{
    left: 0px;
    position: relative;
    opacity: 0;
  }
  2%{
    opacity: 1;
  }
  45%{
    
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(0deg);
    
  }
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
  max-height: 532px;
  background: rgb(173,177,173);
  background: radial-gradient(circle, rgba(173,177,173,1) 16%, rgba(225,227,225,1) 33%, rgba(240,241,240,1) 100%);
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
  background: #e1e3e1;
  transition: all 0.5s ease;
  // &:hover{
  //   background: #4647e3;
  // }
  // &:hover > button > .v-btn__content{
  //   color: white!important;
  // }
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