<template>
  <div class="bt-page">
    <ul>
      <li :class="prevClass" @click="prev"><i class="bt-icon">&#xe60e;</i></li>

      <li v-if="curp > 1" @click="goto(1)">1</li>
      <li v-if="curp - 5 >= 1" class="bt-jump" @click="goto(curp - 5)"><i class="bt-icon">&#xe60c;</i></li>
      <!-- <li v-if="curp - 3 > 1" @click="goto(curp - 3)">{{curp - 3}}</li> -->
      <li v-if="curp - 3 == 2" @click="goto(curp - 3)">{{curp - 3}}</li>
      <li v-if="curp - 2 > 1" @click="goto(curp - 2)">{{curp - 2}}</li>
      <li v-if="curp - 1 > 1" @click="goto(curp - 1)">{{curp - 1}}</li>
      <li class="bt-active">{{curp}}</li>
      <li v-if="curp + 1 < maxp" @click="goto(curp + 1)">{{curp + 1}}</li>
      <li v-if="curp + 2 < maxp" @click="goto(curp + 2)">{{curp + 2}}</li>
      <li v-if="curp + 3 === maxp - 2" @click="goto(curp + 3)">{{curp + 3}}</li>
      <!-- <li v-if="curp + 3 < maxp" @click="goto(curp + 3)">{{curp + 3}}</li> -->
      <li v-if="curp + 5 <= maxp" class="bt-jump" @click="goto(curp + 5)"><i class="bt-icon">&#xe60f;</i></li>
      <li v-if="curp < maxp" @click="goto(maxp)">{{maxp}}</li>

      <li :class="nextClass" @click="next"><i class="bt-icon">&#xe61a;</i></li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 10,
    },
  },
  data() {
    // 当前页码
    return { curp: this.page };
  },
  computed: {
    // 最大页码
    maxp() {
      return Math.max(0, Math.ceil(this.total / this.size));
    },
    prevClass() {
      return {
        disabled: this.curp <= 1,
      };
    },
    nextClass() {
      return {
        disabled: this.curp >= this.maxp,
      };
    },
  },
  watch: {
    page(newVal) {
      if (this.curp !== newVal) {
        this.goto(newVal);
      }
    },
    total(newVal) {
      const max = Math.ceil(newVal / this.size);
      if (max > 0 && max < this.curp) {
        this.goto(max);
      }
    },
  },
  methods: {
    prev() {
      if (this.curp > 1) {
        this.goto(this.curp - 1);
      }
    },
    next() {
      if (this.curp < this.maxp) {
        this.goto(this.curp + 1);
      }
    },
    goto(page) {
      if (this.curp !== page) {
        this.curp = page;
        this.$emit('change', page);
      }
    },
  },
};
</script>
