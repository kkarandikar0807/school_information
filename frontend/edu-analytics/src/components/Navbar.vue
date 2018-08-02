<template>
    <div>
      <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        
      <!-- <a class="navbar-brand col-sm-3 col-md-2 mr-0">Education Analytics</a> -->
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <router-link to="/dashboard" class="nav-link"> Education Analytics </router-link>
        </li>
      </ul>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <router-link to="/adminportal" class="nav-link"> Admin Portal </router-link>
        </li>
      </ul>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" @click="logout()">Sign out</a>
        </li>
      </ul>
    </nav>
    </div>
    
</template>
<script>
    export default {
      methods: {
        logout() {
          window.sessionStorage.clear();
          this.$router.push('/');
        }
      }
    }
</script>
<style scoped>

</style>

