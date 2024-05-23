<template>
  <div>
    <v-card class="px-3 py-0 page-card" title="Dasboard - Politic Walls">
  
      <v-row align="center" justify="center" dense>
        <v-col class="mt-2" cols="12" md="6">
          <v-card
            append-icon="$plus"
            class="mx-auto"
            prepend-icon="$account"
            subtitle="prepend-icon and append-icon"
            title="Icons"
          >
            <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text>
          </v-card>
        </v-col>
    
        <v-col class="mt-2" cols="12" md="6">
          <v-card
            class="mx-auto"
            subtitle="prepend and append"
            title="Icons"
          >
            <template v-slot:prepend>
              <v-icon color="primary" icon="$account"></v-icon>
            </template>
            <template v-slot:append>
              <v-icon color="success" icon="$plus"></v-icon>
            </template>
            <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text>
          </v-card>
        </v-col>
    
        <v-col class="mt-2" cols="12" md="6">
          <v-card
            append-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            class="mx-auto"
            prepend-avatar="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
            subtitle="prepend-avatar and append-avatar"
            title="Avatars"
          >
            <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text>
          </v-card>
        </v-col>
    
        <v-col class="mt-2" cols="12" md="6">
          <v-card
            class="mx-auto"
            subtitle="prepend and append"
            title="Avatars"
          >
            <template v-slot:prepend>
              <v-avatar color="blue-darken-2">
                <v-icon icon="$home"></v-icon>
              </v-avatar>
            </template>
            <template v-slot:append>
              <v-avatar size="24">
                <v-img
                  alt="John"
                  src="https://cdn.vuetifyjs.com/images/john.png"
                ></v-img>
              </v-avatar>
            </template>
            <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<style lang="scss">
  .page-card > .v-card-item{
    text-align: center;
    text-decoration: underline;
  }
</style>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const messages = [
      {
        from: 'You',
        message: `Sure, I'll see you later.`,
        time: '10:42am',
        color: 'deep-purple-lighten-1',
      },
      {
        from: 'John Doe',
        message: 'Yeah, sure. Does 1:00pm work?',
        time: '10:37am',
        color: 'green',
      },
      {
        from: 'You',
        message: 'Did you still want to grab lunch today?',
        time: '9:47am',
        color: 'deep-purple-lighten-1',
      },
    ];
    return {
      messages
    }
  },
})
</script>
