<template>
  <div class="chat">
    <Users 
      :users="users"
      :user="user"
    ></Users>

    <Room 
      :history="history" 
      :users="users"
      :owner-id="user.id"

      @input="update"
    ></Room>
  </div>
</template>

<script>
import Room from "./Room";
import Users from "./Users";

export default {
  name: "Chat",
  components: {
    Room,
    Users
  },
  props: {
    history: Array,
    users: Array,
    ownerId: Number,
  },
  data() {
    return {
      user: {}
    }
  },
  methods: {
    getOwnerUser(list) {
      return list.find(user => user.id === this.ownerId);
    },
    // Обновим историю чата
    update(data) {
      this.$emit("input", data);
    }
  },
  created() {
    // получить владельца чата
    this.user = this.getOwnerUser(this.users);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.chat {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-flow: row wrap;
  border: 1px solid;
  margin: 5px;
}
</style>
