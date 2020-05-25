<template>
  <form action @submit.prevent="send">
    <b-row>
      <b-col cols="12" md="7">
        <b-form-textarea
          id="inputMsg"
          type="text"
          v-model.trim="inputMsg"
          :state="isFilledInputMsg"
          placeholder="Написать сообщение ..."
          aria-describedby="inputMsg inputMsg-feedback"
          rows="1"
          max-rows="3"
          @keypress.ctrl.enter="send"
        ></b-form-textarea>

        <b-form-invalid-feedback id="inputMsg-feedback">Введите текст</b-form-invalid-feedback>

        <div class="text-left">
          <small class="text-left text-muted">Ctrl + Enter отправить сообщение</small>
        </div>
      </b-col>
      <b-col cols="5" class="d-none d-md-block">
        <b-button type="submit" variant="primary" class="text-center">
          отправить
        </b-button>
      </b-col>
    </b-row>
  </form>
</template>

<script>
import { getDateTimeNow } from "../../utils.js";

export default {
  name: "FormMsg",
  props: {
    ownerId: Number
  },
  data() {
    return {
      inputMsg: '',
      isFilledInputMsg: null
    };
  },
  methods: {
    send() {

      if (!this.hasInputMsg()) {
        this.isFilledInputMsg = false;
        return false;
      }

      const msg = {
        userID: this.ownerId,
        text: this.inputMsg,
        dateCreate: getDateTimeNow()
      };

      this.$emit("input", msg);
      this.isFilledInputMsg = null;
      this.inputMsg = "";
      return false;
    },
    hasInputMsg() {
      return (this.inputMsg !== '' ? true : false);
    }
  }
};
</script>