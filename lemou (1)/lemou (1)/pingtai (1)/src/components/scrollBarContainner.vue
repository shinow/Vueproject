<template>
  <div ref="BscrollBar" class="BscrollBar">
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {}
  },
  methods: {
    _initScroll () {
      let options = {
        mouseWheel: true,
        scrollbar: {
          interactive: true
        },
        click: true
      }
      this.$nextTick(() => {
        this.mainScroll = new BScroll(this.$refs.BscrollBar, options)
      })
    }
  },
  mounted () {
    // this._initScroll()
  }
}
</script>
<style scoped>
.BscrollBar{
  position: absolute;
  overflow: hidden;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
</style>
