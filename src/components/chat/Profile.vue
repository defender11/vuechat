<template>
  <h2>
    <div>
      <b-img v-if="user.img !== ''" :src="user.img" rounded="circle"></b-img>
      <b-icon v-else icon="person-circle" style="width: 60px; height: 60px;"></b-icon>
    </div>
    {{user.name}}
  </h2>
</template>

<script>
export default {
  name: "Profile",
  props: {
    user: Object
  }
};
</script>