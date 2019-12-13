<template>
  <button class="bt-button" :class="iclass" :disabled="idisabled" @click="$emit('click', $event)">
    <template v-if="place === 'left'">
      <i class="bt-icon bt-loading" v-if="loading">&#xe644;</i>
      <i class="bt-icon" v-else-if="icon" v-html="icon"></i>
    </template>
    <span v-if="$slots.default"><slot /></span>
    <template v-if="place === 'right'">
      <i class="bt-icon bt-loading" v-if="loading">&#xe644;</i>
      <i class="bt-icon" v-else-if="icon" v-html="icon"></i>
    </template>
  </button>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
    // ICON出现在文本的左|右
    place: {
      type: String,
      default: 'left',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    // 按钮尺寸: default | xs | sm | md
    size: {
      type: String,
      default: '',
    },
  },

  computed: {
    iclass() {
      const sizeClass = this.size ? `bt-button-${this.size}` : '';
      return [{ 'bt-round': this.round, 'bt-circle': this.circle }, sizeClass];
    },
    idisabled() {
      return this.loading || this.disabled;
    },
  },
};
</script>
