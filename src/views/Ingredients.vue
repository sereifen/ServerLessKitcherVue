<template> 
    
  <div class="wrapper">
    <h1>Actual Ingredients:</h1>
    <table v-show="actualIngredients.length > 0">
        <tr>
            <th>Name</th>
            <th>Quantity</th>
        </tr>
        <tr v-for="ingredient in actualIngredients" :key="ingredient.id" transition="fade">
            <td><strong>{{ ingredient.name }}</strong></td> 
            <td>{{ ingredient.quantity }} </td>
        </tr>
    </table>
    <p v-show="actualIngredients.length <= 0"> There isnt any ingredient</p>
    <h1>Shop Ingredients:</h1>
    <table>
        <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th></th>
        </tr>
        <tr v-for="ingredient in Ingredients"
        :key="ingredient.id">
            <td>{{ ingredient.name }}</td>
            <td><input type="number" style="width:50px"  v-model="ingredient.quantity" min=0 @change="ingredientQuantityChange(ingredient)"></td>
            <td><button v-on:click="addToCart(ingredient)"><unicon name="plus"></unicon></button></td>
        </tr>
    </table>
  </div>

  <div class="header">
    <div>
      <button @click="showCart = !showCart">
          Cart
      </button>
    </div>
  </div>
 <div class="cart" v-show="showCart">
    <div v-show="items.length > 0">
        <table>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th></th>
          </tr>
        <tr v-for="ingredient in items" :key="ingredient.id" transition="fade">
          <td><strong>{{ ingredient.name }}</strong></td> 
          <td>{{ ingredient.quantity }} </td>
          <td><button  @click="removeFromCart(ingredient)"><unicon name="trash"></unicon></button></td>
        </tr>
      </table>
      <div>
          <button @click="checkOut()">
              Check out<unicon name="shopping-cart"></unicon>
            </button>
        </div>
    </div>
    <div v-show="items.length === 0">
      <p>Your cart is empty!</p>
    </div>
  </div>
</template>

<script>

import {BackendConection} from "../components/BackendConection"

export default {
  data() {
    return {
        items: [],
        actualIngredients: [],
        showCart: false,
        };
  },
  methods: {
    addToCart(item) {
        item.quantity = parseInt(item.quantity) + 1;
        var index = this.items.indexOf(item);
        if (index > -1)
            this.items.splice(index, 1); 
        this.items.push(item);
    },
    ingredientQuantityChange(item){
        var index = this.items.indexOf(item);
        if (index > -1)
            this.items.splice(index, 1); 
        if (item.quantity > 0)
            this.items.push(item);
    },
    async checkOut(){
        await BackendConection.fillInventory(this.items);
        this.items = [];
        this.downloadActualIngredients();
        this.$router.go()
    },
    removeFromCart(item){
        item.quantity -= 1;
        if (item.quantity <= 0)
            this.items.splice(this.items.indexOf(item), 1);            
    },
    async downloadActualIngredients(){
        this.actualIngredients =await BackendConection.getInventory();
    }
  },
  mounted() {      
    this.downloadActualIngredients();
  },
  created() {
    this.Ingredients = [
      {
        id: 1,
        name: "Sugar",
        quantity : 0
      },
      {
        id: 2,
        name: "Cake mix",
        quantity : 0
      },
      {
        id: 3,
        name: "Cinnamon",
        quantity : 0
      },
      {
        id: 4,
        name: "Bun",
        quantity : 0
      },
      {
        id: 5,
        name: "Chocolate",
        quantity : 0
      },
      {
        id: 6,
        name: "Doughnut",
        quantity : 0
      },
      {
        id: 7,
        name: "Pink color",
        quantity : 0
      },
    ];
  },
};
</script>