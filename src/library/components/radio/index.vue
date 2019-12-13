/** 
* 增加change之前的拦截方法beforeChange，有props传入。
*/
<template>

  <label class="bt-radio"  @click="onClick"
    :class="[{
        'is-checked': label === myActiveValue,
        'is-disabled': isDisabled,
        'is-block': isVertical,
        'button': myShape === 'button'
      }, mySize]"
  >

    <span class="bt-radio_input" >
      <i class="bt-radio_icon circle" v-if="myShape === 'circle'"></i>
      <i class="bt-radio_icon bt-icon checkbox " v-if="myShape === 'checkbox'"><b>&#xe620;</b></i>
    </span>

    <span class="bt-radio__label" >
      <slot></slot>
      <!-- 没有插槽，使用label属性 -->
      <template v-if="!$slots.default">{{label}}</template>
    </span>

  </label>
</template>

<script>
import findParent from '../../mixins/find-parent';
import toPromise from '../../utils/toPromise.js';
export default {
  name: 'BtRadio',

  mixins: [findParent],

  components: {},

  // 改写v-model里的input为change, 贴近用户行为
  model: {
    event: 'change',
  },

  props: {
    label: {}, // 每个单选按钮的值, 对应原生里每个radio的value
    value: {}, // 选中的值, 照顾v-model
    disabled: {
      type: Boolean,
    },
    shape: {
      type: String,
      default: 'circle', // checkbox、circle、button
    },
    vertical: {
      type: Boolean,
      default: false, // 垂直
    },
    size: {
      type: String,
      default: 'default', // xs,sm,md,lg,【lg，暂未开发】，对shape=button有效
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

  computed: {
    myActiveValue() {
      return this.parent ? this.parent.value : this.value;
    },
    isVertical() {
      return this.parent ? this.parent.vertical : this.vertical;
    },
    isDisabled() {
      return this.parent ? this.parent.disabled || this.disabled : this.disabled;
    },
    myShape() {
      return this.parent ? this.parent.shape : this.shape;
    },
    mySize() {
      return this.parent ? this.parent.size : this.size;
    },
  },

  watch: {},

  created() {
    this.findParent('BtRadioGroup');
  },

  mounted() {},

  methods: {
    onClick() {
      if (this.isDisabled) {
        return;
      }
      toPromise((this.parent || this).beforeChange(this.label)).then(val => {
        if (val) {
          (this.parent || this).$emit('change', this.label);
        }
      });
    },
  },
};
</script>

<style scoped lang="less" style="text/less">
</style>
