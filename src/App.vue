<template>
  <div id="app">
    <b-container fluid >
      <PageWelcome v-if="startInProgress" @input="updateUser" />

      <div v-else>

        <b-row>
          <b-col xs="12" md="6">
            <!-- Client 1 -->
            <ChatClient 
              :history="history"
              :users="users"
              :owner-id="users[0].id"
              :key="users[0].id" 

              @input="updateHistory"
            ></ChatClient>
          </b-col>
          
          <b-col xs="12" md="6">
            <!-- Client 2 -->
            <ChatClient 
              :history="history"
              :users="users"
              :owner-id="users[1].id"
              :key="users[1].id" 

              @input="updateHistory"
            ></ChatClient>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import PageWelcome from "./components/page/Welcome.vue";
import ChatClient from "./components/chat/ChatClient.vue";
import {testUsers, fakeHistory} from "./fakeData.js";
import {DEBUG} from "./config.js";

export default {
  name: "App",
  components: {
    PageWelcome,
    ChatClient
  },
  data() {
    return {
      startInProgress: true,
      users: [],
      history: DEBUG ? fakeHistory : []
    };
  },
  methods: {
    updateUser(user) {
      this.startInProgress = false;
      this.users.push(user);

      if (DEBUG) {
        testUsers.forEach(testUser => {
          this.users.push(testUser);
        });
      }
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
  margin-top: 10px;
}
</style>
