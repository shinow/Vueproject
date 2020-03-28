<template>
  <div class="tags-container">
    <!-- tag盒子 -->
    <div class="tags-box" ref="tagBox">
      <div class="tags-list" ref="tagsList" @mousewheel="hadelMousewheel">
        <div ref="tagsPageOpened" @mouseover="tagsShow" class="tag-item" :class="{'is-active':item.close}" :name="item.value" v-for="(item,index) in tagList" :key="index" @click="openUrl(item)">
          <i class="iconfont icon-shouyeon2x" v-if="index == 0"></i>
          <span class="tag-text">{{item.label}}</span>
          <i v-show="show" class="el-icon-circle-close-outline" @click.stop="closeTag(item)" v-if="item.close && (index !== 0)"></i>
        </div>
      </div>
      <el-dropdown class="tags-menu pull-right">
        <el-button type="primary" size="mini">
          更多
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="closeOthersTags">关闭其他</el-dropdown-item>
          <el-dropdown-item @click.native="closeAllTags">关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      tagBodyLeft: 0,
      show: true
    }
  },
  methods: {
    init () {
      this.refsTag = this.$refs.tagsPageOpened
      setTimeout(() => {
        this.refsTag.forEach((item, index) => {
          if (this.tagCurrent.value === item.attributes.name.value) {
            let tag = this.refsTag[index]
            this.moveToView(tag)
          }
        })
      }, 1)
    },
    // 鼠标悬浮到标签上
    tagsShow () {
      // item.close = true
    },
    openUrl (item) {
      this.$router.push({path: item.value, query: item.query})
    },
    hadelMousewheel (e) {
      const step = 0.8 * 100 // 一个tag长度
      const boundarystart = 0
      const boundaryend = this.$refs.tagsList.offsetWidth - this.$refs.tagBox.offsetWidth + 100
      // Y>0向左滑动
      if (e.deltaY > 0 && this.tagBodyLeft >= -boundaryend) {
        this.tagBodyLeft = this.tagBodyLeft - step
        // Y<0向右滑动
      } else if (e.deltaY < 0 && this.tagBodyLeft < boundarystart) {
        this.tagBodyLeft = this.tagBodyLeft + step
      }
    },
    moveToView (tag) {
      if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + 10
      } else if (
        tag.offsetLeft + 10 > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth <
          -this.tagBodyLeft + this.$refs.tagBox.offsetWidth
      ) {
        // 标签在可视区域
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (this.$refs.tagBox.offsetWidth - 100 - tag.offsetWidth) + 20)
      }
    },
    eachTag (tag) {
      for (var key in this.tagList) {
        if (this.tagList[key].value == tag.value) {
          return key
        }
      }
      return -1
    },
    closeTag (item) {
      const key = this.eachTag(item)
      let tag
      this.$store.commit('DEL_TAG', item)
      if (item.value == this.tagCurrent.value) {
        tag = this.tagList[key == 0 ? key : key - 1]
        this.openUrl(tag)
      } else {
        this.tagsShow(tag)
      }
    },
    closeOthersTags () {
      if (this.$store.state.tag.tagList.length !== 1) {
        this.$store.commit('DEL_TAG_OTHER')
      }
    },
    closeAllTags () {
      this.$store.commit('DEL_ALL_TAG')
      this.$router.push({
        path: '/index'
      })
    }
  },
  watch: {
    $route (to) {
      this.$store.commit('ADD_TAG', {
        label: to.meta.title,
        value: to.path
      })
    },
    tagList () {
    },
    tagBodyLeft (value) {
      this.$refs.tagsList.style.left = value + 'px'
    }
  },
  computed: {
    ...mapState({
      tagList: state => state.tag.tagList,
      tagCurrent: state => state.tag.tagCurrent
    })
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less">
.tags-breadcrumb{
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 50px;
}
.tags-breadcrumb-list{
  padding: 0 15px;
}
.tag-collapse{
  font-size: 36px !important;
}
.tag-collapse.tag-collapse_right {
  transform: rotate(90deg);
}
.tags-container {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  box-sizing: border-box;
  .tags-box{
    position: relative;
    box-sizing: border-box;
    padding-right: 106px;
    width: 100%;
    height: 41px;
    background: #f5f5f5;
  }
  .tags-list{
    position: absolute;
    padding: 2px 10px;
    overflow: visible;
    white-space: nowrap;
    transition: left .3s ease;
  }
  .tag-item-icon{
    color: #eee;
    font-size: 11px !important;
  }
  .tag-item {
    position: relative;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    margin: 2px 4px 2px 0;
    padding: 0 10px;
    border: 1px solid  rgba(10, 71, 98, 1);
    border-radius: 3px;
    background: #f5f5f5;
    color: rgba(56, 71, 98, 1);
    font-size: 12px;
    vertical-align: middle;
    opacity: 1;
    overflow: hidden;
    cursor: pointer;
    animation: tag 800ms ease;
    transition: all 200ms ease;
    &.is-active{
      .tag-item-icon{
        color: #fff;
      }
      color: #fff;
    background: rgba(56, 71, 98, 1);
    }
    &:hover{
      color: #fff;
       background: rgba(56, 71, 98, 1);
    }
  }
  .tag-text{
    padding: 0px 8px;
  }
  .tag-close{
    margin-left: 8px;
  }
  .tag-item:hover {
    opacity: .85;
  }
  .tags-menu{
   position: absolute;
   top:0;
   right: 0;
   display: flex;
   align-items: center;
   padding: 0 15px;
   height: 100%;
   box-sizing: border-box;
   background-color: #f5f5f5;
   box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
   .el-button--primary{
     background: #367be4;
     border-color: #367be4
   }
  }
}
.contextmenu {
  margin: 0;
  background: #fff;
  top:64px;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    height: 32px;
    line-height: 32px;
    padding: 0 15px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
