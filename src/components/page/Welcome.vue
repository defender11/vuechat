<template>
  <div class="d-flex justify-content-center">
    <b-card 
      bg-variant="light"
      header="Вход в чат"
      class="w-45"
    >
      <b-card-body>
        <b-card-text>
          <b-row>
            <b-col sm="12" class="my-1 text-center">
              <image-upload
                :width="60"
                :height="60"
                :is-inline="true"
                :show="(img === '')"
                @input="updateImage"
              >
                <b-icon icon="image"></b-icon>
                <span> Загрузить фото</span>
              </image-upload>

              <b-avatar :src="img" text="A" size="6rem" :class="img === ''? 'd-none' : ''"></b-avatar>
            </b-col>
          </b-row>

          <b-form @submit.prevent="update()">
            <b-row>
              <b-col sm="12" class="my-1">
                <b-form-input
                  id="userName"
                  v-model="userName"
                  type="text"
                  :state="isFilledName"
                  placeholder="Ваше имя"
                  aria-describedby="userName userName-feedback"
                ></b-form-input>

                <b-form-invalid-feedback id="userName-feedback">Введите ваше имя</b-form-invalid-feedback>
              </b-col>

              <b-col sm="12" class="my-1">
                <b-button
                  type="submit"
                  :variant="this.hasName() ? 'success' : ''"
                  :disabled="( this.hasName() ? false : true )"
                  block
                >
                  <span>Войти</span>
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import ImageUpload from "../image/Upload.vue";

export default {
  name: "PageWelcome",
  components: {
    ImageUpload
  },
  data() {
    return {
      userName: "",
      img: "",
      isFilledName: null
    };
  },
  methods: {
    update() {
      if (!this.hasName()) {
        this.isFilledName = false;
        return false;
      }

      this.$emit("input", { id: 1, name: this.userName, img: this.img });
    },
    updateImage(img) {
      this.img = img;
    },
    hasName() {
      return this.userName !== "";
    }
  },
  watch: {
    userName() {
      this.isFilledName = this.hasName();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
