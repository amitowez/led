<template>
  <div class="control-block">
    <ControlItem v-for="param in inputControls" :param="param" :key="param.key" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ControlItem from "../components/controlItem.vue";
export default {
  components: {
    ControlItem
  },
  computed: {
    ...mapGetters(["inputControls"])
  },
  props: ["param"]
};
</script>
<style lang="scss">
.control-block {
  padding-left: 20px;
}
</style>
