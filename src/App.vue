<template >
  <div  id="app">
    <div  class="container-fluid">
      <menu-tag></menu-tag>
    </div>
    <div class="container">
      <div class="col-sm col-md col-xs">
        <router-view/>

      </div>

    </div>
  </div>
</template>

<script>
import menu from '../src/components/menu'
export default {
  name: 'App',
  components: {
    'menu-tag': menu
  }
}
</script>

<style>
</style>
