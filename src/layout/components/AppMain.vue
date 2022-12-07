<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables';

.app-main {
  position: relative;
  width: 100%;

  /* 50 = navbar  */
  min-height: 100vh;
  padding-top: 50px;
  padding-left: $sideBarWidth;
  overflow: hidden;
}
</style>
