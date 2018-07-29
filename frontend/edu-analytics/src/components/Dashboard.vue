
<template>
    <div>
        <navbar></navbar>
        Dashboard Working
    </div>
</template>
<script>
import Navbar from './Navbar.vue'
export default {
  components: {
    navbar: Navbar
  },
  beforeMount() {
          this.$http.get('http://localhost:4000/schools').then(response => console.log(response.json()));
      }
}
</script>
<style scoped>
</style>