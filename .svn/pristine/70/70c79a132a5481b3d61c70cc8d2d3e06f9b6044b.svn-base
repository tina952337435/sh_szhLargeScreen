import { SetNull } from "@/api/ComUnit";
import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    viewer: null,
    billboardLabel:[]
  },
  mutations: {
    initViewer(state, viewer) {
      state.viewer = viewer;
    },
    addbillboardLabel(state,billboardLabel){
      state.billboardLabel.push(billboardLabel);
    },
    removebillboardLabel(state){
      if(SetNull(state.billboardLabel)!=""){
        //让i从头开始遍历也可
        for(var num=state.billboardLabel.length-1;num>=0;num--) {
          try {
            state.billboardLabel[num].destroy();
            viewer.entities.remove(state.billboardLabel[num]);
            // delete state.billboardLabel[num];
            state.billboardLabel.splice(num, 1); 
            // num--;//在元素被移除掉后，进行索引后移
          } catch (error) {
            
          }
          
        }
        // state.billboardLabel=[];
      } 

    }
  },
});

export default store;
