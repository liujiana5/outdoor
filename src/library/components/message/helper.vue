<template>
  <section>
    <bt-message :show="show" :type="type" :message="message" :close="handleClose" />
  </section>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      message: '',
      type: 'message',
      duration: 3000,
      close: null,
    };
  },
  computed: {
    handleClose() {
      return this.close && this.closeComponent;
    },
  },
  mounted() {
    this.timer = setTimeout(this.closeComponent, this.duration);
  },
  destroyed() {
    clearTimeout(this.timer);
    this.$el.removeEventListener('transitionend', this.destroyComponent);
    this.$el.parentNode.removeChild(this.$el);
  },
  methods: {
    closeComponent() {
      this.show = false;
      this.$el.addEventListener('transitionend', this.destroyComponent);
      if (this.close) {
        this.close();
      }
    },
    destroyComponent() {
      this.$destroy();
    },
  },
};
</script>
