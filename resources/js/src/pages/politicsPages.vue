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
        <v-btn prepend-icon="$plus" variant="tonal" @click="dialog = true">
          Agregar Politico
        </v-btn>
      </div>
      </v-card>
    </div>
    <VRow class="pa-0 ma-0 mt-5">
      <VCol cols="12" md="3"  v-for="(politic, index) in politics" :key="index">
        <VCard class="pa-2 d-flex flex-column align-center" height="480">
          <VImg 
            class="rounded-lg"
            cover
            :width="200"
            height="200"
            :src="politic.normal_photo"
          />
          <div class="mt-5 w-100 px-2">
            <div class="text-center">
              <h5 class="text-h5">{{ politic.name }}</h5>
            </div>
            <VRow class="pa-0 ma-0">
              <VCol cols="12" md="6" class="px-0 "> 
                <div class="mt-3">
                  <div class="text-subtitle-1">
                    - Cargo: <b>{{ politic.office }}</b>
                  </div>
                  <div class="text-subtitle-1">
                    - Edad: <b>{{ politic.age }}</b>
                  </div>
                  <div class="text-subtitle-1">
                    - Desde: <b>{{ politic.since }}</b>
                  </div>
                </div>
              </VCol>
              <VCol cols="12" md="6" class="px-0  "> 
                <div class="mt-3">
                  <div class="text-subtitle-1">
                    - Votos carcel: <b>{{ politic.vote_jail }}</b>
                  </div>
                  <div class="text-subtitle-1">
                    - Votos no carcel: <b>{{ politic.vote_no_jail }}</b>
                  </div>
                </div>
              </VCol>
              <VCol cols="12"  class="d-flex justify-end pt-0">
                <v-btn icon="$edit" size="small"  color="white" class="bg-primary mx-2 politics-actions" @click="selectOrder(politic.id)" />
                <v-btn icon="$delete" size="small"  color="white" class="bg-error mx-2 politics-actions"/>
              </VCol>
            </VRow>
          </div>
        </VCard>
      </VCol>
    </VRow>
    <v-dialog
      v-model="dialog"
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
                    <input type="file"  id="photo" ref="photo" name="photo" class="d-none" @change="onFileChange" >
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
                    <input type="file"  id="jail_photo" ref="jailPhoto" name="jail_photo" class="d-none" @change="onFileChange" >
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
            @click="dialog = false; resetForm()"
          ></v-btn>

          <v-btn
            color="primary"
            text="Registrar"
            variant="tonal"
            @click="dialog = false;  createPolitic()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { GET_POLITICS, GET_POLITIC_BY_ID, STORE_POLITIC } from '@/core/services/store/politic.module'
// import * as bootstrap from 'bootstrap'

export default defineComponent({
  data: () => {
    return{
      politics: [],
      selectedPolitic: {},
      dialog:false,
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
    // async selectOrder(idAccount){
    selectOrder(idPolitic){
      this.$store
        .dispatch(GET_POLITIC_BY_ID, idPolitic)
        .then((response) => {
          console.log(response)
          // this.selectedOrder = Object.assign({}, response.data);
          // setTimeout(() => {
          //   console.log(this.selectedOrder)
            
          //   // return new Promise((resolve) => {
          //   //     resolve(response.data);
          //   // });
          // }, 700);
        })
        .catch((err) => {
          console.log(err)
          return new Promise((resolve) => {
            resolve(false);
          });
        });
    },
    onFileChange(e) {
      const element = e.target;

      return element.id == 'jail_photo' 
      ? this.newPolitic.jail_photo = URL.createObjectURL(element.files[0])
      : this.newPolitic.photo = URL.createObjectURL(element.files[0]) 
      
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
    createPolitic(){
      const data = new FormData();
      data.append('name', this.newPolitic.name)
      data.append('office', this.newPolitic.office)
      data.append('age', this.newPolitic.age)
      data.append('since', this.newPolitic.since)
      data.append('photo', this.$refs.photo.files[0])
      data.append('jail_photo', this.$refs.jailPhoto.files[0])

      this.$store
      .dispatch(STORE_POLITIC, data)
      .then((data) =>{
        this.getPolitics();
        this.resetForm();
      })
    }
  },
  mounted(){
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