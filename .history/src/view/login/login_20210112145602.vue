<template>
  <div id="sty1">
    我来自login.vue
    <say-hi />
  </div>
</template>
 
<script>
import SayHi from "../index/index";
export default {
  name: "App",
  components: {
    SayHi,
  },
};
</script>

<style scoped>
#sty1 {
  width: 200px;
  height: 200px;
  background-color: pink;
}
</style>