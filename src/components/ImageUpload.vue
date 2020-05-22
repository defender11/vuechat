<template>
  <div>
      <div v-if="stateInProgress">
          <p>Пожалуйста, подождите</p>
      </div>
      <div v-else>
          <img :src="img" v-if="img !== ''" />
          <input type="file" @change="load" v-if="img === ''" />
      </div>
  </div>
</template>

<script>
export default {
  name: "ImageUpload",
  props: {
      width: Number,
      height: Number,
  },
  data() {
    return {
      img: '',
      stateInProgress: false
    };
  },
  methods: {
    // LOAD IMG
    load(e) {
      e.preventDefault();
      this.stateInProgress = true;
      this.selectImage(e.target.files[0]);
    },

    selectImage(file) {
      let reader = new FileReader();
      reader.onloadend = this.onImageLoad;

      var blob;

      if (file.slice) {
        blob = file.slice(0, file.size);
      } else if (file.webkitSlice) {
        blob = file.webkitSlice(0, file.size);
      } else if (file.mozSlice) {
        blob = file.mozSlice(0, file.size);
      }

      reader.readAsDataURL(blob);
    },

    onImageLoad(e) {
      let vm = this,
        img = document.createElement("img");

      img.src = e.target.result;

      if (e.target.readyState === FileReader.DONE) {
        img.onload = function() {
          vm.img = vm.getThumb(img, vm.width, vm.height);
          vm.stateInProgress = false;
          vm.$emit('input', vm.img);
        };
      }
    },

    getThumb: function(file, width, height) {
      let canvas = document.createElement("canvas"),
        new_proportion = this.getNewProportionAndOffset(file.width, file.height, width, height);

      canvas.width = width;
      canvas.height = height;

      canvas
        .getContext("2d")
        .drawImage(file,0,0,new_proportion.width,new_proportion.height);

      const dataURI = canvas.toDataURL("image/jpeg");

      return dataURI;
    },
    getNewProportionAndOffset(srcWidth, srcHeight, width, height) {
      let w = parseFloat(width),
        h = parseFloat(height),
        ratio = w / h;

      // Original image dimensions.
      let old_width = parseFloat(srcWidth),
        old_height = parseFloat(srcHeight),
        old_ratio = old_width / old_height;

      let new_width, new_height, crop_x, crop_y;

      // Determine new image dimensions to scale to.
      // Also determine cropping coordinates.
      if (ratio > old_ratio) {
        new_width = w;
        new_height = (w / old_width) * old_height;
        crop_x = 0;
        crop_y = (new_height - h) / 2;
      } else {
        new_width = (h / old_height) * old_width;
        new_height = h;
        crop_x = (new_width - w) / 2;
        crop_y = 0;
      }

      return {
        width: Number(new_width),
        height: Number(new_height),
        offset_x: Number(crop_x),
        offset_y: Number(crop_y)
      };
    }
  }
};
</script>