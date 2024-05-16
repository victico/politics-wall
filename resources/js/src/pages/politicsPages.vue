<template>
  <v-card
    class="py-2 text-center px-4 politics"
    elevation="12"
    rounded="lg"
    width="100%"
    title="Listado de politicos"
  >
  <div>
    <v-btn prepend-icon="$plus" variant="tonal">
      Agregar Politico
    </v-btn>
  </div>
  </v-card>
  <v-sheet
    class="pa-4 text-center mx-auto mt-2"
    elevation="12"
    max-width="600"
    rounded="lg"
    width="100%"
    title="hola"
  >
    <v-icon
      class="mb-5"
      color="success"
      icon="mdi-check-circle"
      size="112"
    ></v-icon>

    <h2 class="text-h5 mb-6">You reconciled this account</h2>

    <p class="mb-4 text-medium-emphasis text-body-2">
      To see a report on this reconciliation, click <a class="text-decoration-none text-info" href="#">View reconciliation report.</a>

      <br>

      Otherwise, you're done!
    </p>
    <v-divider class="mb-4"></v-divider>
    <div class="text-end">
      <v-btn
        class="text-none"
        color="success"
        variant="flat"
        width="90"
        rounded
      >
        Done
      </v-btn>
    </div>
  </v-sheet>
</template>
<style lang="scss">
.politics {
  .v-card-item{
    padding-top: 0px;
  }
}
</style>