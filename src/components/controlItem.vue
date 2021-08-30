<template>
  <div class="control-item">
    <label :for="param.key" class="description">{{ this.param.key }}</label>
    <input :id="param.key" class="input" :value="param.value" @input="inptChange" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { checkBounds } from "../utils";
export default {
  props: ["param"],
  methods: {
    inptChange(e) {
      const validatedPosition = checkBounds({ [this.param.key]: e.target.value }, this.bounds);
      this.$store.commit("changePosition", validatedPosition);
    }
  },
  computed: {
    ...mapGetters(["bounds"])
  }
};
</script>
<style lang="scss">
.control-item {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}
</style>
