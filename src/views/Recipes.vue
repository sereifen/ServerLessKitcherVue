<template>
  <div class="Actual recipes">
    <h2> Actual recipes</h2>
    <table v-show="actualRecipes.length > 0">
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Instructions</th>
            <th>Make</th>
            <th>Delete</th>
        </tr>
        <tr v-for="recipe in actualRecipes" :key="recipe.id" transition="fade">
            <td><strong>{{ recipe.id }}</strong></td> 
            <td>{{ recipe.name }} </td>
            <td>{{ recipe.instructions }} </td>
            <td><button @click="cookRecipe(recipe.id)"><unicon name="restaurant"></unicon></button></td>
            <td><button @click="deleteRecipe(recipe.id)"><unicon name="trash"></unicon></button></td>
        </tr>
    </table>
    <p v-show="actualRecipes.length <= 0"> There isnt any recipe</p>
  </div>
  <div class="Create Recipe">
      <button v-show="!showCreateRecipe" @click="showCreateRecipe = !showCreateRecipe">Create Recipe</button>
        <h2 v-show="showCreateRecipe"> Create recipe:</h2>
        <div v-show="showCreateRecipe">
            <p>Name: <input v-model="recipename" placeholder="Name"></p>
            <p>Instructions: <input v-model="instructions" placeholder="Instructions"></p>
            <p>Ingredients: </p>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                </tr>
                <tr v-for="ingredient in Ingredients"
                :key="ingredient.id">
                    <td>{{ ingredient.name }}</td>
                    <td><input type="number" style="width:50px"  v-model="ingredient.quantity" min=0></td>
                </tr>
            </table>
            <button @click="summitRecipe(recipename,instructions)">summit</button>
        </div>
  </div>
</template>

<script>

import {BackendConection} from "../components/BackendConection"

export default {
  data() {
      return {
        actualRecipes: [],
        showCreateRecipe: false
        };
  },
  methods: {      
    async downloadActualRecipes(){
        this.actualRecipes =await BackendConection.getRecies();
    },
    async summitRecipe(name,instructions){
        var ingredients = []
        for (var j = 0; this.Ingredients.length> j; j++) {
            if (this.Ingredients[j].quantity > 0)
                ingredients.push({"name" : this.Ingredients[j].name,"quantity":this.Ingredients[j].quantity})
        }
        var recipe = {"name": name,"instructions":instructions,"ingredients": ingredients};
        console.log(recipe)
        if (ingredients.length<=0)
            window.alert("the recipe need atleast 1 ingredient");
        else {
            await BackendConection.postRecipe(recipe);
            await this.downloadActualRecipes();
            this.$router.go()
        }
    },
    async cookRecipe(id){
        var result = await BackendConection.makeRecipe(id)
            .catch(error => {
                if(error.response.status == 400)
                    window.alert("there is not enought ingredients");
            } );
        if (result == "Yummy!")
            window.alert("Yummy!")
    },
    async deleteRecipe(id){
        await BackendConection.deleteRecipe(id);
        await this.downloadActualRecipes();
    }
  },
  mounted() {      
    this.downloadActualRecipes();
  },
  created()  {
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
  }
}
</script>