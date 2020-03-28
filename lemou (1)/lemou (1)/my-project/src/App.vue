<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
  components: {}
};
</script>

<style lang="scss">
img[src=""],
img:not([src]) {
  opacity: 0;
}
.tail{
  z-index:555 !important;
}
header{
  z-index: 55;
}
</style>
