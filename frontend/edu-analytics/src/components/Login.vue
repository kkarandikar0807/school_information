<template>
<div class="container-fluid center_div">
   
        <div class="form-group">
            <label for="">Username</label>
            <input class="form-control" type="text" v-model = user.username required autofocus>
        </div>
        <div class="form-group">
            <label for="">Password</label>
            <input class="form-control" type="password" v-model = user.password required>
        </div>
        <button class="btn btn-primary" @click="login" type="submit"  :disabled="!(user.username!=='' && user.password!=='')"> Login </button>
    
</div>
    
</template>

<script>
export default {
    data: function() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            this.$http.post('https://testing-app.cfapps.io/login', this.user).then(response => {
                return response.json()
            }).then(data => {
                if (data.isLoggedIn) {
                    window.sessionStorage.setItem('isLoggedIn', true);
                    this.$router.push('/dashboard');
                } else {
                    this.$router.push('/accessdenied');
                }
            })
        }
    }
}
</script>

<style scoped>
.center_div{
    width: 50%;
    height: 50%;
    
    position: absolute;
    top: 50%;
    left: 50%;
     margin-left:-25%;/* half width*/
    margin-top:-12.5%;
  
    /* margin: 0 auto; */
    /* value of your choice which suits your alignment */
}
</style>


