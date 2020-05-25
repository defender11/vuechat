<template>
  <b-jumbotron class="p-4 mx-0 mb-5">
    <b-row>
      <b-col xs="12" md="4">

        <Profile :user="user" />

        <UserList 
          :owner-id="user.id"
          :users="users"
        />

      </b-col>
      <b-col xs="12" md="8">

        <b-row>
          <b-col>
            <History
              :history="history" 
              :users="users"
              :owner-id="user.id"
            />

          </b-col>
        </b-row>
        <hr  class="mt-0">
        <Form-msg 
          :owner-id="user.id"
          @input="update" 
        />
      </b-col>
    </b-row>
  </b-jumbotron>
</template>

<script>
import Profile from "./Profile";
import UserList from "./UserList";
import History from "./History";
import FormMsg from "./FormMsg";

export default {
  name: "ChatClient",
  components: {
    Profile,
    UserList,
    History,
    FormMsg
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

</style>
