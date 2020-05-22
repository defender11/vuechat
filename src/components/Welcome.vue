<template>
  <div class="hello">
    <h1>Авторизация</h1>

    <div class="auth">
      <form action class="auth__form" @submit.prevent="update()">
        <input type="text" v-model="userName" class="auth__name" placeholder="Имя" required />

        <image-upload 
          @input="updateImage"
          :width="60"
          :height="60"
        ></image-upload>
        
        <br>

        <button class="auth__submit" type="submit">Войти</button>
      </form>
    </div>
  </div>
</template>

<script>
import ImageUpload from "./ImageUpload.vue";

export default {
  name: "Welcome",
  components: {
    ImageUpload
  },
  data() {
    return {
      userName: "",
      img: ""
    };
  },
  methods: {
    update() {
      this.$emit("input", { id: 1, name: this.userName, img: this.img });
    },
    updateImage(img) {
      this.img = img;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.auth {
  display: flex;
  justify-content: center;

  &__form {
    padding: 10px;
    border: 1px solid;
  }
  &__name,
  &__load-image {
    display: block;
    position: relative;
    margin: 10px;
  }
  &__submit {
  }
}
</style>
