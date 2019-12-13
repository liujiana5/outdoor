<template>
  <div id="">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BtCheckboxGroup',
  components: {},

  // 改写v-model里的input为change, 贴近用户行为
  model: {
    event: 'change',
  },

  props: {
    value: Array,
    disabled: {
      type: Boolean,
    },
    shape: {
      type: String,
      default: 'checkbox', // checkbox、circle、button
    },
    vertical: {
      type: Boolean,
      default: false, // 垂直
    },
    size: {
      type: String,
      default: 'default', // xs,sm,md,lg,【lg，暂未开发】，对shape=button有效
    },
    max: Number,
    beforeChange: {
      type: Function,
      default: function() {
        return true;
      },
    },
  },

  // watch: {
  //   value(val) {
  //     this.$emit('change', val);
  //   },
  // },

  data() {
    return {};
  },

  computed: {},

  mounted() {},

  methods: {},
};
</script>

<style scoped lang="less" style="text/less">
</style>
