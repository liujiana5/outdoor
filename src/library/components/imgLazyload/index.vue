<template>
  <div
    :style="{'width': `${width}px`, 'height': `${height}px`}"
    class="imgContainer"
    ref="imgContainer">
    <img

      :style="{'maxWidth': `${width}px`, 'maxHeight': `${height}px`}"
      :src="actualImgSrc">
  </div>
</template>
<script>
export default {
  props: {
    imgSrc: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 0,
    },
    loadingSrc: {
      type: String,
      default: '',
    },
    errorSrc: {
      type: String,
      default: '',
    },
  },
  data: function() {
    return {
      imgError: false,
      actualImgSrc: this.loadingSrc,
      filteredImgSrc: this.imgSrc,
    };
  },
  mounted() {
    this.handleSize();

    this.imgInit();

    if (this.$refs.imgContainer.querySelector('img').src !== this.filteredImgSrc) {
      window.addEventListener('scroll', this.handleScroll);
    }

    // 错误处理
    let that = this;
    this.$refs.imgContainer.querySelector('img').addEventListener(
      'error',
      function(e) {
        if (!that.imgError) {
          if (e.target.nodeName == 'IMG') {
            e.target.src = that.errorSrc;
            // 如果加参数true的话，会跳出所有的index
            // console.log(e.target)
            // console.log('errorSrc:', that.index);
            that.imgError = true;
          }
        }
      },
      true
    );
  },
  methods: {
    getPosition(element) {
      let xPosition = 0;
      let yPosition = 0;

      while (element) {
        xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
        yPosition += element.offsetTop - element.scrollTop + element.clientTop;
        element = element.offsetParent;
      }

      return { x: xPosition, y: yPosition };
    },
    imgInit() {
      let scrollHeightEnd = window.scrollY + window.innerHeight;

      let offsetTop = this.getPosition(this.$refs.imgContainer).y;

      if (offsetTop < scrollHeightEnd) {
        this.actualImgSrc = this.filteredImgSrc;
      }
    },
    handleSize() {
      if (this.size > 0) {
        let src = this.filteredImgSrc;
        let mySizes = this.size;
        let n = src.lastIndexOf('/');
        let start = src.substr(0, n);
        let format = 'jpg';
        if (
          src.substr(n).split('.')[1] &&
          new RegExp(/^png|jpeg$/).test(
            src
              .substr(n)
              .split('.')[1]
              .toLowerCase()
          )
        ) {
          format = src.substr(n).split('.')[1];
        }
        let end = `${src.substr(n).split('.')[0]}_${mySizes}.${format}`;
        src = start + end;

        this.filteredImgSrc = src;
      }
    },
    handleScroll() {
      let scrollHeightEnd = window.scrollY + window.innerHeight;
      let offSet = this.getPosition(this.$refs.imgContainer);
      if (offSet.y <= scrollHeightEnd) {
        this.actualImgSrc = this.filteredImgSrc;
        // 赋值完成后，取消事件绑定
        // 去除裂图带来的诡异问题
        window.removeEventListener('scroll', this.handleScroll);
        // 调试用
        console.log('load:', this.index, offSet.y, scrollHeightEnd);
      }
    },
  },
};
</script>
<style lang="less" scoped>
div.imgContainer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
