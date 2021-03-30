
import axios from 'axios'

const configUrl = "https://serverless-api.3rik.se/kitchen";
export class BackendConection {
    constructor() {}
    static async ping(){
        return (await axios.get(configUrl+ "/ping")).data;
    }

    static clear(){
        axios.post(configUrl+ "/clear")
            .then(response => (console.log(response.data)))
            .catch(error => console.log(error));
    }

    static async getRecies(){
        return (await axios.get(configUrl+ "/recipes")).data;
    }

    static async postRecipe(recipe){
        await axios.post(configUrl+ "/recipes/create",recipe)
            .then(response => (console.log(response.data)))
            .catch(error => console.log(error));           
    }

    static async getRecipe(id){
        return (await axios.get(configUrl+ "/recipes/"+id)).data;
        
    }

    static async deleteRecipe(id){
        return (await axios.delete(configUrl+ "/recipes/"+id)).data
    }

    static patchRecipe(recipe){
        axios.patch(configUrl+ "/recipes/"+recipe.id,recipe)
            .then(response => (console.log(response.data)))
            .catch(error => console.log(error));        
    }

    static async makeRecipe(id){
        return (await axios.post(configUrl+ "/recipes/"+id+"/make")).data;
    }

    static async getInventory(){
        return (await axios.get(configUrl+ "/inventory")).data;
    }

    static async fillInventory(inventory){        
        await axios.post(configUrl+ "/inventory/fill", inventory)
            .then(response => (console.log(response.data),inventory = response.data))
            .catch(error => console.log(error));
    }

    static optimizeWaste(){
        axios.get(configUrl+ "/recipes/optimize-total-waste")
            .then(response => (console.log(response.data)))
            .catch(error => console.log(error));
    }

    static optimizeCount(){
        axios.get(configUrl+ "/recipes/optimize-total-count")
            .then(response => (console.log(response.data)))
            .catch(error => console.log(error));
    }
    
    static countByRecipe(){
        axios.get(configUrl+ "/recipes/get-count-by-recipe")
            .then(response => (console.log(response.data)))
            .catch(error => console.log(error));
    }
}