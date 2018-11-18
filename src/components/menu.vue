<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Logo</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <router-link class="nav-link" to="/">Producto <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item active">
            <router-link class="nav-link" to="/ingrediente">Ingrediente <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item active">
            <router-link class="nav-link" to="/recipe">Recipe <span class="sr-only">(current)</span></router-link>
        </li>

      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'menu-tag',
  template: 'template'
}
</script>
