<template>
  <div>
    我来自login.vue
    <say-hi/>
  </div>
</template>
 
<script>
  import SayHi from "./view/index/index";
  export default{
    name: "App",
    components: {
      SayHi
    }
  }
</script>