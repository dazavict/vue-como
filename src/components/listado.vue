<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Formato</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Precio</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td>{{item.id}}</td>
                <td>{{item.brand}}</td>
                <td>{{item.format}}</td>
                <td>{{item.quantity}}</td>
                <td>{{item.price}}</td>
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
  name: 'listado',
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
        console.log(this.ingredientes)
      }).catch(error => {
        console.log(error)
      })
    },
    listadoProductos: function () {
      this.axios.get(this.url + 'products?supermarket=elsuper' + this.name_producto).then(response => {
        this.items = response.data
        console.log(this.items)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.listadoIngredientes()
    this.listadoProductos()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
