import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Unicon from 'vue-unicons'
import { uniTrash,uniShoppingCart,uniWifi, uniSorting, uniFileTimesAlt,uniRestaurant  } from 'vue-unicons/dist/icons'

Unicon.add([uniTrash,uniShoppingCart,uniWifi, uniSorting, uniFileTimesAlt,uniRestaurant ])


createApp(App).use(router).use(VueAxios, axios).use(Unicon).mount('#app')
