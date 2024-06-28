<template>
  <div>
    <v-card class="px-3 pb-12 page-card" title="">
  
      <v-row align="center" justify="center" dense>
        <v-col class="mt-2" cols="12" md="6">
          <v-card
            append-icon="$plus"
            class="mx-auto"
            prepend-icon="$account"
            subtitle="Agrega de forma rapida un nuevo politico"
            title="Agregar politicos"
          >
            <template v-slot:append>
              <v-btn icon="$plus" color="white" variant="tonal" size="small"></v-btn>
            </template>
          </v-card>
        </v-col>
    
        <v-col class="mt-2" cols="12" md="6">
          <v-card
            class="mx-auto"
            prepend-icon="$listCrime"
            subtitle="Selecciona al politico y agrega un crimen"
            title="Agregar crimen"
          >
            <template v-slot:append>
              <v-btn icon="$plus" color="white" variant="tonal" size="small"></v-btn>
            </template>
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
