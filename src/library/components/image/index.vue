<template>
  <img ref="image" :src="source" />
</template>
<script>
import { getOffset } from '../../utils/helper';
export default {
  props: {
    src: { type: String, default: '' },
    mark: { type: String, default: 'https://dn-bitmain-cdn.qbox.me/common-layout/beta/holder.png?_=2' },
    thumb: { type: Number, default: 0 },
  },
  data() {
    return {
      source: this.mark,
    };
  },
  mounted() {
    // TODO: 每个元素都绑定时间 效率比较低 考虑批量处理
    if (this.src) {
      window.addEventListener('scroll', this.handler);
      this.handler();
    }
  },
  watch: {
    src() {
      window.addEventListener('scroll', this.handler);
      this.handler();
    },
  },
  destroyed() {
    this.release();
  },
  methods: {
    release() {
      clearTimeout(this.timer);
      window.removeEventListener('scroll', this.handler);
    },

    // 缩减帧率
    frameReduce(fn) {
      clearTimeout(this.timer);
      // 首次计算不做延迟
      this.timer = setTimeout(fn, this.timer ? 300 : 0);
    },

    getThumb() {
      if (this.thumb > 0) {
        const src = this.src;
        const index = src.lastIndexOf('/');
        const prefix = src.substring(0, index);
        const suffix = src.substring(index);

        let format = '.jpg';
        const reg = /\.(png|jpg|jpeg)$/;
        const matches = src.match(reg);
        if (matches) {
          format = matches[0];
        }

        return src.replace(reg, '') + `_${this.thumb}${format}`;
      }
      return this.src;
    },

    handler() {
      this.frameReduce(() => {
        const TH = 300; // 阈值
        const image = this.$refs.image;
        const BD = document.body;
        const DE = document.documentElement;
        const ST = Math.max(BD.scrollTop, DE.scrollTop); // scrollTop
        const CH = Math.min(BD.clientHeight, DE.clientHeight); // clientHeight
        const ET = getOffset(image, BD).top; // 图片上边缘坐标
        const EB = ET + image.offsetHeight; // 图片下边缘坐标
        // 图片需要刚好落在视口范围内(这里有个假定是图片不会比容器的可视高度还高)
        // 图片上沿 <= 滚动距离 + 容器可视高度 + 阈值 && 图片下沿 >= 滚动距离 - 阈值
        if (ET <= ST + CH + TH && EB >= ST - TH) {
          // 先清理监听
          this.release();

          let preload = new Image();
          preload.onload = () => {
            this.source = preload.src;
          };
          if (this.thumb) {
            let count = 0;
            preload.src = this.getThumb();
            preload.onerror = () => {
              if (count >= 1) {
                preload = null;
              } else {
                count += 1;
                preload.src = this.src;
              }
            };
          } else {
            preload.src = this.src;
          }
        }
      });
    },
  },
};
</script>
