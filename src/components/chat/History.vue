<template>
  <div>
    <ul class="list-unstyled history mb-0 d-block" ref="history">
      <template v-if="!history.length">
        <li>
          <small class="text-muted">
            История пуста,
            <br />напишите сообщение ...
          </small>
        </li>
      </template>
      <template v-else>
        <li v-for="(item, i) in list" :key="i">
          <div :class="(item.userID !== ownerId) ? 'text-left ': 'text-right'">
            <b-media left-align class="my-4" tag="li">
              <h5 class="mt-0 mb-1">
                <span>{{getUserName(item.userID)}}</span>
              </h5>
              
              <small class="text-muted">{{item.dateCreate}}</small><br />
              <p
                class="mb-0 rounded d-inline-block px-4 word-break"
                :class="(item.userID !== ownerId) ? 'float-left bg-info ': 'float-right bg-warning'"
                v-html="showTextMsg(item.text)"
              ></p>
                
            </b-media>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import {nl2br} from '../../utils.js';

export default {
  name: "History",
  props: {
    history: Array,
    ownerId: Number,
    users: Array
  },
  methods: {
    setPositionToLastMsg() {
      // переместим фокус в истории сообщений вниз
      this.$refs["history"].scrollTop = this.$refs["history"].scrollHeight;
    },
    getUserName(id) {
      const user = this.users.find(user => user.id === id);
      return user.name;
    },
    showTextMsg(text) {
      return nl2br(text);
    }
  },
  computed: {
    list() {
      return this.history;
    }
  },
  updated: function() {
    this.$nextTick(function(e) {
      // Код, который будет запущен только после
      // обновления всех представлений

      this.setPositionToLastMsg();
    });
  },
  mounted() {
    this.setPositionToLastMsg();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.history {
  height: 80vh;
  overflow-y: auto;

  @media (max-width: 540px) {
    height: 40vh;
  }
}
.word-break {
  word-break: break-word;
}
</style>