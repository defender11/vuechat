<template>
  <div class="users">
    <h2>
      <div>
        <img :src="user.img" alt="">
      </div>
      {{user.name}}
    </h2>
    <hr>
    <ul class="users__list">
      <li v-for="user in usersList" class="users__item" :key="user.id">
        {{user.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
props: {
    user: Object,
    users: Array,
  },
  computed: {
    usersList() {
      return this.users.filter(user => user.id !== this.user.id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.users {
  border-right: 1px solid;

  &__list {
    text-align: left;
  }
}
</style>