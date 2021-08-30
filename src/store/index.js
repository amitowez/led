import Vue from "vue";
import Vuex from "vuex";
import { getBounds } from "../utils";

Vue.use(Vuex);

const defaultMouseState = { mouseX: 0, mouseY: 0, width: 0, height: 0, top: 0, left: 0 };

export default new Vuex.Store({
  state: {
    parentSize: {
      width: 0,
      height: 0
    },
    controls: ["top", "right", "bottom", "left", "center"],
    position: {
      top: 50,
      left: 50,
      height: 100,
      width: 100
    },
    mouseClickPosition: defaultMouseState
  },
  mutations: {
    changePosition(state, newPosition) {
      state.position = { ...state.position, ...newPosition };
    },
    setMouseClickPosition(state, newPosition) {
      Vue.set(state, "mouseClickPosition", newPosition);
    },
    resetMouseState(state) {
      Vue.set(state, "mouseClickPosition", defaultMouseState);
    },
    maxPosition(state) {
      let maxTop = state.position.top - state.position.height / 2;
      let maxLeft = state.position.left - state.position.width / 2;
      return maxTop, maxLeft;
    },
    setParentSize(state, newSize) {
      Vue.set(state, "parentSize", newSize);
    }
  },
  actions: {},
  modules: {},
  getters: {
    inputControls: state => Object.entries(state.position).map(([key, value]) => ({ key, value })),
    bounds: state => getBounds(state.parentSize, state.position),
    boxStyles: state =>
      Object.entries(state.position).reduce(
        (previousValue, [key, value]) => ({
          ...previousValue,
          [key]: `${value}px`
        }),
        {}
      )
  }
});
