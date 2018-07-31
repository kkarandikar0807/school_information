<template>
<div class="container">
    <div class="col-xs-12 col-sm-8 com-sm-offset-2 col-md-6 col-md-offset-3">
        <div class="form-group">
            <label for="">Username</label>
            <input class="form-control" type="text" v-model = user.username>
        </div>
        <div class="form-group">
            <label for="">Password</label>
            <input class="form-control" type="text" v-model = user.password>
        </div>
        <button class="btn btn-primary" @click="login"> Submit </button>
    </div>
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
            this.$http.post('http://localhost:4000/login', this.user).then(response => {
                console.log(response);
            }, error => {
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>

</style>


