<template>
  <section class="app-main">
    <!-- <tab :tabs="tabs" :active-index="activeIndex" @change-tab="handleChangeTab" @close-tab="handleCloseTab" @show-context-menu="handleShowContextMenu" /> -->
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
// import Tab from '@/views/tagsview/Tab.vue'
export default {
  name: 'AppMain',
  // components: {
  //   Tab
  // },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
