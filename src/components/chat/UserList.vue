<template>
  <b-list-group class="mb-2">
    <b-list-group-item
      v-for="user in usersList"
      :key="user.id"
      class="d-none d-md-block"
    >{{user.name}}</b-list-group-item>
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
</style>