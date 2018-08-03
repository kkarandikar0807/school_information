<template>
<div>
  <navbar></navbar>
  <div class="container-fluid">
    <notifications group="admin" />
    <div class="row"></div>
    <div class="row">
      <div class="col-md-12">
        <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th>
                    <div class="form-group">
            <label for="">Username</label>
            <input id="username" class="form-control" type="text" v-model="username" :disabled="isUserInputDisabled" autofocus>
        </div>
                  </th>
                  <th>
                    <div class="form-group">
            <label for="">Password</label>
            <input id="password" class="form-control" type="password" v-model="password">
        </div>
                  </th>
                  <th>
                    <div class="form-group">
                    <button class="btn btn-primary" :disabled="(!isUpdateButtonEnabled || (password=='')) " @click="updateUser(username, password)"> Update </button>
                    <button class="btn btn-success" :disabled="!(username!=='' && password!=='')" @click="addUser(username, password)">Add New</button>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th colspan="3">Users</th>
                </tr>
              </thead>
              <tbody>
                <tr  v-for="user in users">
                  <td colspan="3">{{user.username}}
                      <button style="float:right; margin-right: 10px;" class="btn btn-info" @click="editUser(user)" v-tooltip="'Edit User'">
                        <i class="fa fa-edit"></i>
                      </button>
                      <button class="btn btn-danger" @click="deleteUser(user)" v-tooltip="'Delete User'" style="float:right; margin-right: 10px;"><i class="fa fa-trash"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
  </div>
   
</div>

</template>

<script>
import Navbar from './Navbar.vue'
import Notifications from 'vue-notification'
import Vue from 'vue'
import { log } from 'util';
import VTooltip from 'v-tooltip'
import  * as URLConstants from '../constants/url-constants.js'
Vue.use(VTooltip)
VTooltip.options.defaultTemplate =
  '<div class="foo" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
Vue.use(Notifications)

export default {
  components: {
    navbar: Navbar
  },
  data: function () {
    return {
      users: [],
      username: '',
      password: '',
      isUpdateButtonEnabled: false,
      isUserInputDisabled: false
    }
  },
  created() {
      this.getAllUsers();
  },
  methods: {
    clearInputFields() {
      this.username = '';
      this.password = '';
    },
    notification(group, title, type, text) {
        this.$notify({
        group: group,
        title: title,
        type: type,
        text: text
        }); 
    },
    getAllUsers() {
      this.$http.get(`${URLConstants.SERVER_URL}/users`).then(response => {
        return response.json()
      }).then(data => {
        data.forEach(element => {
          this.users.push({username: element.username});
        });
      }).catch(error => {
        this.notification('admin', 'ERROR MESSAGE', 'error', 'We are experiencing errors while fetching data')
      })
    },
    editUser(user) {
      document.getElementById("password").focus();

      this.isUserInputDisabled = true;
      this.isUpdateButtonEnabled = true;
      this.username = user.username;
    },
    deleteUser(user) {
      if (user.username === 'admin') {
          this.notification('admin', 'ERROR MESSAGE', 'error', 'Admin user can never be deleted');
          return false;
      }
      if (this.users.length == 1) {
        this.notification('admin', 'ERROR MESSAGE', 'error', 'You must have at least one user');
        return false;
      }
      this.$http.delete(`${URLConstants.SERVER_URL}/users`, {body: {user: user.username}}).then(response => {
        return response.json()
      }).then(data => {
        this.notification('admin', 'SUCCESS MESSAGE','success', 'User data deleted!')
        this.users= [];
        this.getAllUsers();
      }).catch(error => {
        this.notification('admin', 'ERROR MESSAGE','error', 'Failed to delete data!')
      })
    },
    
    addUser(username, password) {
      let user = {
        username: username.trim(),
        password: password
      }
      this.$http.post(`${URLConstants.SERVER_URL}/users`, user).then(response => {
        return response.json()
      }).then(data => {
        if (data.code == 11000) {
          
           this.$notify({
          group: 'admin',
          title: 'INVALID',
          type: 'error',
          text: 'You must update the user!'
      });
          return false;
        }
        this.users = [];
        this.getAllUsers();
        this.clearInputFields();
      })
    },

    updateUser(username, password) {
      this.isUpdateButtonEnabled = false;
      this.$http.put(`${URLConstants.SERVER_URL}/users`, {username: username, password: password}).then(response => {
        return response.json()
      }).then(data => {
        this.notification('admin', 'SUCCESS MESSAGE','success', 'User data successfully updated!')
        this.users = [];
        this.getAllUsers();
        this.clearInputFields();
        this.isUserInputDisabled = false;

      }).catch(error => {
        this.notification('admin', 'ERROR MESSAGE', 'error', 'We are experiencing errors while updating users')
         this.$notify({
        group: 'admin',
        title: 'ERROR MESSAGE',
        type: 'error',
        text: 'We are experiencing errors while updating users'
        }); 
      })
      
    }
  }
    
}
</script>

<style scoped>

</style>


