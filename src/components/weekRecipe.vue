<template>

  <div class="container">
    <div class="ventana">
     <div class="loading" id="ventana"><img src="../assets/spinner.gif" alt="loading" /><br/>Un momento, por favor...</div>
    </div>

    <div class="mt-12"  style="margin-top:20px;"  v-show="productos && productos.length > 0">
      <v-table
        :columns="columns"
        :rows="items"
        :search-options="options"
        :pagination-options="{
            enabled: true,
            mode: 'pages'
          }"
        >
          <div slot="emptystate">
            No se encontraron registros
          </div>
        </v-table>
    </div>
    <div class="mt-lg-12" style="margin-top:20px;" v-show="items && items.length > 0">
      <v-table
        :columns="columns2"
        :rows="productos"
        :search-options="options2"
        :pagination-options="{
          enabled: true,
          mode: 'pages'
        }">
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'id'">
            {{props.row.producto.id}}
          </span>
          <span v-else-if="props.column.field == 'title'">
            {{props.row.producto.title}}
          </span>
          <span v-else-if="props.column.field == 'tags'">
            <span v-if="props.row.producto.tags && props.row.producto.tags.indexOf(',') > -1 && props.row.producto.tags.split(',')" >
              <span v-for="(tag, d) in props.row.producto.tags.split(',')" :key="d" class="badge badge-info">
                {{tag}}
              </span>
            </span>
            <span v-else-if='props.row.producto.tags' class="badge badge-info">
              {{props.row.producto.tags }}
            </span>
          </span>
          <span v-else-if="props.column.field == 'people'">
            {{props.row.producto.people}}
          </span>
          <span v-if="props.column.field == 'accion'">
            <button class="btn btn-primary " @click="modalIngrediente(props.index)"  data-toggle="modal" data-target="#modalIngredientes" title="Ingredientes">
              <font-awesome-icon icon="book" />
            </button>
          </span>
        </template>
        <div slot="emptystate">
          No se encontraron registros
        </div>
      </v-table>

    </div>
    <!-- The Modal -->
    <div class="modal" id="modalIngredientes">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Ingredientes</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="container">
              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">nutritionix</th>
                    <th scope="col">conversion</th>
                  </thead>
                  <tbody>
                    <tr v-for="(ingrediente, index) in ingredientes" :key="index">
                      <td>{{ingrediente.id}}</td>
                      <td>{{(ingrediente.nombre && ingrediente.nombre.name)? ingrediente.nombre.name:'N/A'}}</td>
                      <td>{{(ingrediente.nombre && ingrediente.nombre.nutritionix)? ingrediente.nombre.nutritionix:'N/A'}}</td>
                      <td>
                        <ul v-if='ingrediente.nombre'>
                          <li v-for="(conversa, d) in ingrediente.nombre.conversions" :key="d">
                            {{conversa.quantity}} {{conversa.name}} {{conversa.unit_product}}
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.ventana {
  position: relative;
  top: 50%;
  left: 50%
}
.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>

<script>
import { VueGoodTable } from 'vue-good-table'

export default {
  name: 'recipe',
  data () {
    return {
      url: 'http://v2.comoquiero.cl/api/',
      recipes: [],
      productos: [],
      ingredientes: [],
      items: [],
      cargando: false,
      input: null,
      columns: [
        {
          label: 'id',
          field: 'id',
          type: 'number'
        },
        {
          label: 'Nombre',
          field: 'brand',
          type: 'string'
        },
        {
          label: 'Formato',
          field: 'format',
          type: 'string'
        },
        {
          label: 'Cantidad',
          field: 'quantity',
          type: 'number'
        },
        {
          label: 'Precio',
          field: 'price',
          type: 'number'
        }
      ],
      columns2: [
        {
          label: 'id',
          field: 'id',
          type: 'number'
        },
        {
          label: 'Titulo',
          field: 'title',
          type: 'string'
        },
        {
          label: 'Tag',
          field: 'tags',
          type: 'string'
        },
        {
          label: 'Cantidad',
          field: 'people',
          type: 'number'
        },
        {
          label: 'Acción',
          field: 'accion',
          type: 'string'
        }
      ],
      options: {
        enabled: true,
        trigger: 'keyup',
        skipDiacritics: false,
        searchFn: this.myFunc,
        placeholder: 'Buscar'
      },
      options2: {
        enabled: true,
        trigger: 'enter',
        skipDiacritics: true,
        searchFn: this.buscar2,
        placeholder: 'Buscar'
      }
    }
  },
  components: {
    'v-table': VueGoodTable
  },
  methods: {
    myFunc: function (row, col, cellValue, searchTerm) {
      return cellValue === searchTerm
    },
    buscar2: function (row, col, cellValue, searchTerm) {
      return cellValue === searchTerm
    },
    listadoIngredientes: function () {
      return this.axios.get(this.url + 'items')
    },
    listadoRecipesWeek: function (ingredientes, productos) {
      return new Promise((resolve, reject) => {
        this.axios.get(this.url + 'weekRecipes/2502').then(weekRecipe => {
          this.recipes = weekRecipe.data
          this.recipes.forEach((recipe) => {
            this.listadoRecipes(recipe.recipe_id).then(res => {
              res.data.recipe_ingredients.map(ingrediente => {
                ingredientes.filter(ingredienteB => {
                  if (ingrediente.item_id === ingredienteB.id) {
                    ingrediente['nombre'] = ingredienteB
                  }
                })
              })
              this.productos.push({ producto: res.data, recipe: recipe })
            }).catch(error => {
              console.log(error)
            })
          })
        })
        if (this.recipes && this.productos && this.recipes.length === this.productos.length) {
          resolve(this.productos)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    listadoRecipes: function (recipe) {
      return this.axios.get(this.url + 'recipes/' + recipe)
    },
    ventana: function () {
      var body
      body = document.querySelector('#ventana')
      if (this.cargando) {
        body.style.display = 'none'
        this.cargando = false
      } else {
        this.cargando = true
      }
    },
    modalIngrediente: function (index) {
      this.ingredientes = this.productos[index].producto.recipe_ingredients
    },
    listadoProductos: function () {
      return this.axios.get(this.url + 'products?supermarket=elsuper')
    }
  },
  mounted () {
    this.listadoIngredientes().then(data => {
      this.ventana()
      this.ingredientes = data.data
      return this.listadoProductos()
    }).then(productos => {
      this.items = productos.data
      return this.listadoRecipesWeek(this.ingredientes, productos.data)
    }).then(data => {
      this.ingredientes = []
      this.ventana()
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
