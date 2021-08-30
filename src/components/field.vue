<template>
  <div class="field">
    <InteractivItem />
  </div>
</template>
<script>
import InteractivItem from "./interactivItem.vue";
export default {
  components: {
    InteractivItem
  }
};
</script>
<style lang="scss">
.field {
  border: 1px solid black;
  height: 700px;
  position: relative;
  flex: 1;
  position: relative;
}
</style>
