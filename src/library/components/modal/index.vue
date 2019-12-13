<template>
  <transition name="bt-widget">
    <bt-masklayer v-if="show" @click="dismiss">
      <div class="bt-modal">
        <slot>
          <h3 class="bt-title" v-if="title" v-html="title" />
          <div class="bt-content" v-html="message" />
          <footer class="bt-footer" v-if="buttons.length > 0">
            <bt-button v-for="(item, idx) in buttons" :key="idx" v-bind="buttonConfig(item)" @click="item.onClick(item)">{{item.text}}</bt-button>
          </footer>
        </slot>
        <i class="bt-icon close" @click="close" v-if="close">&#xe61f;</i>
      </div>
    </bt-masklayer>
  </transition>
</template>
<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    title: { type: String },
    message: { type: String },
    close: { type: Function },
    dismiss: { type: Function, default: n => n },
    buttons: { type: Array, default: () => [] },
  },
  methods: {
    // 过滤button的属性
    buttonConfig(config) {
      const options = {};
      Object.keys(config).forEach(key => {
        if (key !== 'onClick' && key !== 'text') {
          options[key] = config[key];
        }
      });
      return options;
    },
  },
};
</script>
