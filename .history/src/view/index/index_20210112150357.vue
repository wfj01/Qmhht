<template>
  <div id="sty2">
    我来自SayHi.vue
    <p>{{ message }}</p>
    <button @click="show_my_value()">U•ェ•U</button>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      message: "Hello~俺是小许",
      my_value: "who r u?",
    };
  },
  methods: {
    show_my_value: function () {
      alert("😜" + this.my_value);
    },
  },
};
</script>

<style>
#sty2 {
  width: 150px;
  height: 100px;
  background-color: rgb(177, 120, 231);
  color: white;
}
</style>