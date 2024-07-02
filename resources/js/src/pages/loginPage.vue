<template>
  <div class="body h-screen d-flex  align-center pa-8">
  <VRow class="justify-end">
    <VCol cols="5">

      <VCard class="elevation-24 "> 
        <v-form class="px-16 my-16" id="loginForm">
          <div  class="my-8">
            <h1 class="text-h4">
              Hola 👋🏻 
              Bienvenido!
            </h1>
          </div>
           <v-alert
           v-model="display.show"
           :text="display.message"
           closable
            border="start"
            :type="display.type" 
            variant="tonal"
            :icon="`$display_${display.type}`"
            :class="`bg-${display.type}`"
          />
          
          <v-container class="my-8">

            <v-row>
              <v-col
                cols="12"
                class="form-group "
              >
                <v-text-field
                  label="Usuario"
                  variant="outlined"
                  name="username"
                  placeholder="Usuario"
                  v-model="user.email"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                class="mt-2 form-group "
              >
                <v-text-field
                  label="Contraseña"
                  variant="outlined"
                  name="password"
                  placeholder="Contraseña"
                  v-model="user.password"
                  type="password"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-2 d-flex justify-end">
                <v-btn elevation="24" size="x-large" color="terciary" id="login_button" disabled type="submit"> 
                  <p class="text-secondary">Ingresar</p> 
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </VCard>
    </VCol>
  </VRow>
  </div>
</template>
<style lang="scss" scoped>
  .body{
    background: rgb(214, 214, 214)!important;
  }
  .v-btn--disabled.v-btn--variant-elevated{
    opacity: 0.26!important;
  }
  .v-alert__content{
    color: white!important;
  }
</style>
<style lang="scss" >

  .fv-plugins-icon{
    transform: translateY(-50%);
  }
  .v-alert__content{

    color: white!important;
    opacity: 1!important;
  }
  .v-alert .v-icon__svg {
    fill: white!important;
  }
  
</style>
<script>
import { defineComponent } from 'vue'
import { LOGIN } from '@/core/services/store/auth.module'
import formValidation from "@/plugins/formvalidation/dist/es6/core/Core";
import "@/plugins/formvalidation/dist/css/formValidation.min.css";
import Trigger from "@/plugins/formvalidation/dist/es6/plugins/Trigger";
import Bootstrap from "@/plugins/formvalidation/dist/es6/plugins/Bootstrap";
import Icon from "@/plugins/formvalidation/dist/es6/plugins/Icon";
import SubmitButton from "@/plugins/formvalidation/dist/es6/plugins/SubmitButton";

export default defineComponent({
  setup() {
    
  },
  data: () => {
    return {
      user:{
        email:'',
        password:'',
      },
      button:'',
      form:'',
      display:{
        message: '',
        show: false,
        type:'success',
      }
    }
  },
  methods: {
    login(){
      this.display.show = false
      this.disabledButton('Cargando...')
      this.$store.dispatch(LOGIN, this.user)
      .then((data) => {
        // console.log(data)
        if(data.code !== 200){
          this.activeButton()
          this.showDisplay('error', data.error.message)
          return
        }
        this.disabledButton('Listo!')
        this.showDisplay('success', 'Has ingresado de forma correcta, seras redirigido al Dashboard.')
        setTimeout(() => {
          this.$router.push('/admin')
          // this.$router.replace({ path: '/admin' })

        }, 2000);
        
      })
    },
    validateForm(){
      this.form= formValidation(document.getElementById('loginForm'), {
        fields: {
          username: {
            validators: {
              notEmpty: {
                message: "El nombre de usuario es necesario"
              },
              regexp: {
                regexp: /^[A-Za-z0-9À-ÿ.*-+,/@$_ñ]+$/i,
                message: 'No debe contener los siguientes caracteres: "[]{}!¡¿?=()|;',
              },
            }
          },
          password: {
            validators: {
              notEmpty: {
                message: "La contraseña es necesaria"
              },
              regexp: {
                regexp: /^[A-Za-z0-9À-ÿ.*-+/@,$_ñ]+$/i,
                message: 'No debe contener los siguientes caracteres: "[]{}!¡¿?=()|;',
              },
            }
          },
        },
        plugins: {
          trigger: new Trigger(),
          bootstrap: new Bootstrap(),
          icon: new Icon({
            valid: 'fa fa-check',
            invalid: 'fa fa-times',
            validating: 'fa fa-refresh'
          }),
          submitButton: new SubmitButton(),
        },
      });
      this.form.on("core.form.valid", () => {
        this.login()

      }).on("core.field.valid", () => {
        this.activeButton()
      }).on("core.form.invalid", () => {
        this.disabledButton()

      }).on("core.field.invalid", () => {
        this.disabledButton()

      });
    },
    disabledButton(text = 'Ingresar'){
      this.button.disabled = true
      this.button.classList.add('v-btn--disabled')
      this.button.innerHTML = text
    },
    activeButton(){
      this.button.disabled = false
      this.button.classList.remove('v-btn--disabled')
      this.button.innerHTML = 'Ingresar'
    },
    showDisplay(type, message ){
      this.display.show = true
      this.display.type = type
      this.display.message = message
    },

  },
  mounted(){
    this.button = document.getElementById('login_button')
    this.validateForm()
  },
  
})
</script>
