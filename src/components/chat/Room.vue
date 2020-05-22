<template>
  <div class="room">
    <ul class="room__histories">
      <template v-if="!hasHistory">
        <li>История пуста, напишите сообщение ...</li>
      </template>
      <template v-else>
        <li 
          v-for="(item, i) in list" 
          class="users__item" 
          :key="i"
          v-html="showMsg(item)"
        ></li>
      </template>
    </ul>

    <form action @submit.prevent="send">
      <input
        type="text"
        v-model="text"
        class="room__input"
        placeholder="Напишите сообщение ..."
        required
      />
      <button type="submit">Отправить</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Room",
  props: {
    history: Array,
    ownerId: Number,
    users: Array
  },
  data() {
    return {
      text: null
    };
  },
  methods: {
    send() {
      this.$emit("input", { userID: this.ownerId, text: this.text });
      this.text = "";
    },
    showMsg(item) {
      let content = `<div>
                        <img src="${item.img}" alt=""> <b>${item.userName}</b>
                        <p><span>${item.text}</span></p>
                      </div>`;

      // !ownerMsg
      if (!item.ownerMsg) {
        content = `<div>
                    <b>${item.userName}</b> <img src="${item.img}" alt="">
                    <p><span>${item.text}</span></p>
                  </div>`;
      }

      return content;
    }
  },
  computed: {
    hasHistory() {
      return this.history.length;
    },
    list() {
      return this.history.map(item => {
        item.ownerMsg = item.userID === this.ownerId;

        const user = this.users.find(user => user.id === item.userID);
        item.userName = user.name;
        item.img = user.img;

        return item;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.room {
  text-align: left;

  &__history {
    height: 90%;
  }
}
</style>