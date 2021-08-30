<template>
  <div class="container">
    <Field />
    <ControlBlock />
  </div>
</template>
<script>
import ControlBlock from "../components/controlBlock.vue";
import Field from "../components/field.vue";
export default {
  components: {
    ControlBlock,
    Field
  }
};
</script>
<style lang="scss">
.container {
  display: flex;
}
</style>
