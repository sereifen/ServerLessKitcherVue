<template>
  <div class="home">
    <button  @click="ping()">Ping<unicon name="wifi"></unicon></button>
    <br>
    <br>
    <button  @click="clear()">Clear<unicon name="file-times-alt"></unicon></button>
    <br>
    <br>
    <button  @click="optimizeWaste()">Optimize Waste<unicon name="sorting"></unicon></button>
    <br>
    <br>
    <button  @click="optimizeCount()">Optimize Count<unicon name="sorting"></unicon></button>
    <br>
    <br>
    <button  @click="countByRecipe()">Count by recipe<unicon name="sorting"></unicon></button>
  </div>
</template>

<script>

import {BackendConection} from "../components/BackendConection"

export default {
  name: 'Home',
  methods : {
    ping(){
      BackendConection.ping()
    },
    clear(){
      BackendConection.clear()
    },
    optimizeWaste(){
      BackendConection.optimizeWaste()
    },
    optimizeCount(){
      BackendConection.optimizeCount()
    },
    countByRecipe(){
      BackendConection.countByRecipe()
    }
  },
  components: {
    
  }
}
</script>
