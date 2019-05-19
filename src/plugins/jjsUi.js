import numberSet from './numberSet.vue'
import advertisement from './advertisement.vue'
import selectTree from './selectTree.vue'
const JJS = {
    install:function(Vue){
        Vue.component('numberSet',numberSet);
      Vue.component('JJS-AD',advertisement);
      Vue.component('JJS-SELECT-TREE',selectTree);
    }
}
export default JJS
