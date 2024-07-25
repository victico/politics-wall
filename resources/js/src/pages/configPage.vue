<template>
  <div>
    <v-card
      class="pt-6 text-center px-4 politics w-100"
      elevation="12"
      rounded="lg"
      title="Configuración de perfil"
    >
    </v-card>
    <VCard class="pa-16 mt-4">
      <VRow>
        <v-col
          cols="12"
          md="6"
          class="mt-2 form-group "
        >
          <v-text-field
            label="Contraseña actual"
            variant="outlined"
            name="password"
            placeholder="Contraseña"
            v-model="password.current"
            :type=" isPass.current ? 'password' : 'text'"
            :append-inner-icon="isPass.current ? '$eyeClose' : '$eye'"
            @click:append-inner="onClick('current')"
          ></v-text-field>
        </v-col>
      </VRow>
      <VRow>
        <v-col
          cols="12"
          md="6"
          class="mt-2 form-group "
        >
          <v-text-field
            label="Nueva contraseña"
            variant="outlined"
            name="password"
            placeholder="Contraseña"
            v-model="password.new"
            :type=" isPass.new ? 'password' : 'text'"
            :append-inner-icon="isPass.new ? '$eyeClose' : '$eye'"
            @click:append-inner="onClick('new')"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="mt-2 form-group "
        >
          <v-text-field
            label="Repetir contraseña"
            variant="outlined"
            name="password"
            placeholder="Contraseña"
            v-model="password.repeat"
            :type=" isPass.repeat ? 'password' : 'text'"
            :append-inner-icon="isPass.repeat ? '$eyeClose' : '$eye'"
            @click:append-inner="onClick('repeat')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="mt-2 d-flex justify-end">
          <v-btn elevation="24"  size="x-large" color="primary"  @click="updatePassword"> 
            <p class="text-white mt-3">Actualizar</p> 
          </v-btn>
        </v-col>
      </VRow>
    </VCard>
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

<script>
import { defineComponent } from 'vue'
import { CHANGE_PASSWORD } from '@/core/services/store/user.module'


export default defineComponent({
  setup() {
    
  },
  data: () => {
    return {
      password:{
        current: '',
        new: '',
        repeat: '',
      },

      isPass: {
        current: true,
        new: true,
        repeat: true,
      },
      snackbarShow:false,
      snackbarType:'',
      snackbarMsg:'',
    }
  },
  methods:{
    onClick(index){
      this.isPass[index] = !this.isPass[index]
    },
    updatePassword(){
      if (!this.validate()) return
      this.$store
      .dispatch(CHANGE_PASSWORD, this.password)
      .then((data) =>{
        if(!data.code) throw data
        // console.log(data)
        this.showSnack('success', 'Contraseña creada exitosamente')
        this.resetForm()
      }).catch((e) => {
        this.showSnack('error', e.error)
      })
    },
    showSnack(type, text){
      this.snackbarType = type;
      this.snackbarMsg  = text;
      this.snackbarShow = true;
    },
    resetForm(){
      this.password = {
        current: '',
        new: '',
        repeat: '',
      }
    },
    validate(){
      if(this.password.current.trim().length == 0 || this.password.new.trim().length == 0 || this.password.repeat.trim().length == 0) {
        this.showSnack('error', 'No deben quedar campos vacios')
        return false
      }
      if(this.password.new !== this.password.repeat ) {
        this.showSnack('error', 'Contraseñas no coinciden')
        return false
      }
      return true
    }
  }
})
</script>