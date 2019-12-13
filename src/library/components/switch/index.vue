<template>
  <div :class="['bt-switch', {'disabled': disabled, 'active': value}]" @click="onClick">
    <div class="bt-icon" :class="{'loading': loading}" v-if="loading">
      &#xe644;
    </div>
  </div>
</template>

<script>
import toPromise from '../../utils/toPromise.js';
export default {
  components: {},
  // 改写v-model里的input为change, 贴近用户行为
  model: {
    event: 'change',
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
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

  methods: {
    onClick() {
      if (this.disabled || this.loading) {
        return;
      }
      toPromise(this.beforeChange(!this.value)).then(val => {
        if (val) {
          this.$emit('change', !this.value);
        }
      });
    },
  },
};
</script>

<style scoped lang="less" style="text/less">
</style>
