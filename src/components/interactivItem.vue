<template>
  <div class="box" id="box" :style="boxStyles">
    <div
      v-for="controlKey in this.controls"
      :key="controlKey"
      :class="['control', `control-${controlKey}`]"
      @mousedown.prevent="handleDown(controlKey, $event)"
    />
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { getElementPosition, checkBounds } from "../utils";
export default {
  data() {
    return {
      minimumSize: 10,
      currentControl: null
    };
  },
  methods: {
    ...mapMutations([
      "changePosition",
      "setMouseClickPosition",
      "resetMouseState",
      "setParentSize"
    ]),

    handleResize(e) {
      const { mouseX, mouseY } = this.mouseClickPosition;
      const deltaX = e.pageX - mouseX;
      const deltaY = e.pageY - mouseY;

      const newPosition = getElementPosition(
        this.mouseClickPosition,
        [deltaX, deltaY],
        this.currentControl,
        this.minimumSize
      );

      const validatedPosition = checkBounds(newPosition, this.bounds);
      this.changePosition(validatedPosition);
    },
    handleUp() {
      this.currentControl = null;
      this.resetMouseState();
      document.removeEventListener("mousemove", this.handleResize);
    },
    handleDown(control, e) {
      const position = this.position;
      this.currentControl = control;

      this.setMouseClickPosition({
        ...position,
        mouseX: e.pageX,
        mouseY: e.pageY
      });

      document.addEventListener("mousemove", this.handleResize);
      document.addEventListener("mouseup", this.handleUp);
    }
  },
  computed: {
    ...mapState({
      position: state => state.position,
      controls: state => state.controls,
      parentSize: state => state.parentSize,
      mouseClickPosition: state => state.mouseClickPosition
    }),
    ...mapGetters(["boxStyles", "bounds"])
  },
  mounted() {
    const { parentElement } = this.$el;
    if (parentElement) {
      this.setParentSize({ width: parentElement.clientWidth, height: parentElement.clientHeight });
    }
  }
};
</script>
<style lang="scss">
.box {
  position: relative;
  background-color: #7dfed3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control {
  width: 15px;
  height: 7px;
  box-sizing: border-box;
  position: absolute;
  background-color: red;
  border: 1px solid #333;
  cursor: pointer;

  &-top {
    top: -5px;
    left: 50%;
    margin-left: -7px;
    cursor: n-resize;
  }
  &-center {
    position: unset;
    width: 10px;
    height: 10px;
  }
  &-right,
  &-left {
    transform: rotate(90deg);
  }
  &-right {
    top: 50%;
    margin-top: -3px;
    right: -5px;
    cursor: e-resize;
  }
  &-bottom {
    bottom: -5px;
    left: 50%;
    margin-left: -7px;
    cursor: s-resize;
  }
  &-left {
    top: 50%;
    margin-top: -3px;
    left: -7px;

    cursor: w-resize;
  }
}
</style>
