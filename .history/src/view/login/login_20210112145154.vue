<template>
  <div>
    我来自login.vue
    <say-hi/>
  </div>
</template>
 
<script>
  import SayHi from "./components/SayHi";
  export default{
    name: "App",
    components: {
      SayHi
    }
  }
</script>