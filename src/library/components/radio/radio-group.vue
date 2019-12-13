<template>
  <div class="bt-radio-group">
    <slot>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'BtRadioGroup',

  components: {},

  // 改写v-model里的input为change, 贴近用户行为
  model: {
    event: 'change',
  },

  props: {
    value: {},
    disabled: {
      type: Boolean,
    },
    shape: {
      type: String,
      default: 'circle', // checkbox、circle
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'sm', // xs,sm,md,lg
    },
    beforeChange: {
      type: Function,
      default: function() {
        return true;
      },
    },
  },

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
