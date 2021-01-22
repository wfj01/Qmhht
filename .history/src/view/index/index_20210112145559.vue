<template>
  <div id="sty2">
    我来自SayHi.vue
    <p>{{ message }}</p>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      message: "Hello~俺是小许",
    };
  },
};
</script>

<style>
.sty2 {
  width: 150px;
  height: 100px;
  background-color: rgb(177, 120, 231);
  color: white;
}
</style>