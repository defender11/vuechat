<template>
  <div id="app">
    <Welcome v-if="startInProgress" @input="updateUser" />

    <div v-if="!startInProgress">
      <Chat 
        v-for="user in users"
        :history="history"
        :users="users"
        :owner-id="user.id"
        :key="user.id" 

        @input="updateHistory"
      ></Chat>
    </div>
  </div>
</template>

<script>
import Welcome from "./components/Welcome.vue";
import Chat from "./components/chat/Chat.vue";
import {testUser} from "./user";

export default {
  name: "App",
  components: {
    Welcome,
    Chat
  },
  data() {
    return {
      startInProgress: true,
      users: [],
      history: [
        { userID: 1, text: "Привет, как дела ?" },
        { userID: 2, text: "Привет, нормально. Чем занимаешься ?" },
        { userID: 2, text: "Чего молчишь ?" },
        { userID: 1, text: "Чат пишу :)" },
        { userID: 2, text: "Получается ?))" },
      ]
    };
  },
  methods: {
    updateUser(user) {
      this.startInProgress = false;
      this.users.push(user, testUser);
    },

    updateHistory(data) {
      this.history.push(data);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
