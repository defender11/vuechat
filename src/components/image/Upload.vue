<template>
  <div :class="show ? 'd-block' : 'd-none'">
    <b-overlay :show="isLoading">

        <b-button 
          @click.prevent="$refs['inputFileLoad'].click()"
          variant="primary"
        >
          <slot></slot>
        </b-button>

        <input type="file" ref="inputFileLoad" @change="imageLoad" class="d-none" />
    </b-overlay>
  </div>
</template>

<script>
import {getThumb} from '../../utils.js'

export default {
  name: "ImageUpload",
  props: {
      width: Number,
      height: Number,
      show: Boolean
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    // LOAD IMG
    imageLoad(e) {
      e.preventDefault();
      this.isLoading = true;
      const file = e.target.files[0];

      let reader = new FileReader();
      reader.onloadend = this.onImageLoad;

      reader.readAsDataURL(file.slice());
    },

    onImageLoad(e) {
      if (e.target.readyState === FileReader.DONE) {

        let img = new Image();

        img.src = e.target.result;

        img.onload = () => {
          this.isLoading = false;
          this.$emit('input', getThumb(img, this.width, this.height));
        };

        img.onerror = () => {
          this.isLoading = false;
        }

      } else {
        this.isLoading = false;
      }
    }
  }
};
</script>