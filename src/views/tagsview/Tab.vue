<template>
  <div class="tab">
    <div class="tab-header">
      <div class="tab-header-scroll">
        <div
          v-for="(tab, index) in tabs"
          :key="tab.name"
          :class="['tab-header-item', { 'tab-header-active': activeIndex === index }]"
          @click="handleChangeTab(index)"
          @contextmenu.prevent="handleShowContextMenu(index, $event)"
        >
          <span class="tab-header-title">{{ tab.title }}</span>
          <span class="tab-header-close" @click.stop="handleCloseTab(index, $event)">x</span>
        </div>
      </div>
    </div>
    <div class="tab-content" />
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleChangeTab(index) {
      this.$emit('change-tab', index)
    },
    handleCloseTab(index, event) {
      event.stopPropagation()
      this.$emit('close-tab', index)
    },
    handleShowContextMenu(index, event) {
      event.stopPropagation()
      this.$emit('show-context-menu', index, event.clientX, event.clientY)
    }
  }
}
</script>

<style>
.tab {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.tab-header {
  display: flex;
  height: 40px;
  background-color: #f7f7f7;
}
.tab-header-scroll {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
}
.tab-header-item {
  display: flex;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
}
.tab-header-active {
  color: #409eff;
}
.tab-header-close {
  margin-left: 8px;
  font-size: 12px;
  color: #ccc;
  cursor: pointer;
}
.tab-content {
  flex: 1;
  overflow: auto;
}
</style>
