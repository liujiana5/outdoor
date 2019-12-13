<template>
  <div class="swipe">
    <div class="roller" ref="roller" :style="style">
      <div class="slider" v-for="(item, idx) in list" :key="idx" :style="getOffset(idx)" @click="onClick(idx)">
        <div class="frame"><img :src="source(item)" /></div>
      </div>
    </div>
    <ul class="decorators" v-if="decorators && list.length > 1">
      <li class="item" v-for="(item, idx) in list" :key="idx" :class="{active: idx == index}" @click="slide.go(idx)" />
    </ul>
    <div class="controls" v-if="!touch && direction">
      <a class="prev" @click="slide.prev()"><i class="bt-icon">&#xe60e;</i></a>
      <a class="next" @click="slide.next()"><i class="bt-icon">&#xe61a;</i></a>
    </div>
  </div>
</template>
<script>
import Env from '../../utils/env';
import Emitter from '../../utils/emitter';
class Slide extends Emitter {
  constructor(params) {
    super();
    this.index = 0;
    this.TIMER = 4000;
    this.roller = params.roller;
    this.autoplay = params.autoplay;
    this.autopause = params.autopause;
    this.width = this.roller.offsetWidth;
    this.frames = params.roller.children;

    if (this.autoplay) {
      this.timer = setInterval(this.timerTask, this.TIMER);
      if (!this.autopause) {
        this.roller.addEventListener('mouseenter', this.pause, Env.passive(false));
        this.roller.addEventListener('mouseleave', this.restart, Env.passive(false));
      }
    }
  }

  // 释放绑定
  release() {
    clearInterval(this.timer);
    this.roller.removeEventListener('mouseenter', this.pause, Env.passive(false));
    this.roller.removeEventListener('mouseleave', this.restart, Env.passive(false));
  }

  // 抛出事件
  animate(offset, transition = '300ms') {
    const transform = `translate3d(${offset}%, 0px, 0px)`;
    this.emit('next', { index: this.index, transform, transition });
  }

  // 自动播放
  timerTask = () => {
    this.index += 1;
    if (this.index >= this.frames.length) {
      this.index = 0;
    }
    this.animate(-this.index * 100);
  };

  // 定位跳转
  go(index) {
    this.index = index;
    this.animate(-this.index * 100);

    // 重新计时
    clearTimeout(this.timer);
    if (this.autoplay) {
      this.timer = setInterval(this.timerTask, this.TIMER);
    }
  }

  prev() {
    const index = this.index - 1;
    this.go(index >= 0 ? index : this.frames.length - 1);
  }

  next() {
    const index = this.index + 1;
    this.go(index >= this.frames.length ? 0 : index);
  }

  // 暂停
  pause = () => {
    clearTimeout(this.timer);
  };

  // 重启
  restart = () => {
    this.timer = setInterval(this.timerTask, this.TIMER);
  };
}

export default {
  props: {
    list: { type: Array, default: () => [] },
    autoplay: { type: Boolean, default: true },
    autopause: { type: Boolean, default: true },
    decorators: { type: Boolean, default: true },
    direction: { type: Boolean, default: false },
  },
  data() {
    return {
      index: 0,
      touch: Env.supportTouch,
      style: { transition: '0ms', transform: 'translate3d(0%, 0px, 0px)' },
    };
  },
  watch: {
    list() {
      this.start();
    },
  },
  mounted() {
    this.start();
  },
  destoryed() {
    if (this.slide) {
      this.slide.release();
    }
  },
  methods: {
    start() {
      this.index = 0;
      this.style = { transition: '0ms', transform: 'translate3d(0%, 0px, 0px)' };
      this.$emit('change', 0);

      if (this.list.length <= 1) {
        return;
      }
      if (this.slide) {
        this.slide.release();
      }
      this.slide = new Slide({
        autoplay: this.autoplay,
        roller: this.$refs.roller,
      }).on('next', e => {
        this.index = e.index;
        this.style = { transform: e.transform, transition: e.transition };
        this.$emit('change', e.index);
      });
    },
    source(item) {
      return typeof item === 'string' ? item : item.src;
    },
    getOffset(index) {
      return {
        backgroundColor: this.list[index].fill || 'transparent',
        transform: `translate3d(${index * 100}%, 0px, 0px)`,
      };
    },
    onClick(index) {
      const item = this.list[index];
      if (item.onClick) {
        item.onClick(item, index);
      }
    },
  },
};
</script>
