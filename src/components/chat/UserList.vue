<template>
  <b-list-group>
    <b-list-group-item
      v-for="user in usersList"
      :key="user.id"
    >
      <div class="d-flex justify-content-start align-items-center">
        <b-icon icon="dot" font-scale="2" class="user__online"></b-icon> 
        <span>{{user.name}}</span>
      </div>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  name: "UserList",
  props: {
    ownerId: Number,
    users: Array
  },
  computed: {
    usersList() {
      return this.users.filter(user => user.id !== this.ownerId);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .user__online {
    color: greenyellow;
  }  
  .user__offline {
    color: grey;
  }
</style>