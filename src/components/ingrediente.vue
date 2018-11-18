<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">nutritionix</th>
            </thead>
            <tbody>
              <tr v-for="(ingrediente, index) in ingredientes" :key="index">
                <td>{{ingrediente.id}}</td>
                <td>{{ingrediente.name}}</td>
                <td>{{ingrediente.nutritionix}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ingrediente',
  data () {
    return {
      url: 'http://v2.comoquiero.cl/api/',
      items: [],
      ingredientes: [],
      name_producto: ''
    }
  },
  methods: {

    listadoIngredientes: function () {
      this.axios.get(this.url + 'items').then(response => {
        this.ingredientes = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.listadoIngredientes()
  }
}
</script>
