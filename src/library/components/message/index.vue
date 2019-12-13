<template>
  <transition name="bt-widget">
    <div class="bt-message" v-if="show">
      <span :class="type" v-if="icon">
        <i class="bt-icon" v-html="icon" />
      </span>

      <div class="text" v-html="message"></div>

      <span class="close" v-if="close" @click="close">
        <i class="bt-icon">&#xe61f;</i>
      </span>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    type: { type: String, default: 'message' },
    message: { type: String },
    close: { type: Function },
  },
  computed: {
    icon() {
      const ICONS = {
        success: '&#xe620;',
        failure: '&#xe61f;',
        warning: '&#xe610;',
        message: '&#xe615;',
        loading: '&#xe644;',
      };
      return ICONS[this.type] || null;
    },
  },
};
</script>
