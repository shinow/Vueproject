<template>
  <div>
    <el-popover
      ref="pop"
      v-model="pop"
      :placement="placement"
      width="300"
      trigger="click">
      <el-row v-if="!searchMode" class="group" v-model="collapseActive">
        <el-col v-for="(item, index) in icon" :key="index" :name="index" class="class">
          <el-row class="class-row">
            <el-col class="class-col" v-for="(iconName, iconIndex) in item.icon" :key="iconIndex" :span="4" @click.native="selectIcon(iconName.font_class)">
              <i :class="'iconfont icon-' + iconName.font_class"></i>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-popover>
    <!-- 允许用户输入 -->
    <el-input
      v-if="userInput"
      v-model="currentValue"
      v-bind="bind"
      style="max-width: 240px;">
      <template v-if="value" slot="prepend">
        <i :class="'iconfont icon-' + value"></i>
      </template>
      <el-button v-popover:pop slot="append">
        <i class="'iconfont icon-' + value"></i>
      </el-button>
    </el-input>
    <!-- 不允许用户输入 -->
    <el-button v-popover:pop v-if="!userInput">
      <template v-if="value">
        <i :class="'iconfont icon-' + value"></i>
      </template>
      {{value ? value : placeholder}}
    </el-button>
  </div>
</template>

<script>
import icon from '@/assets/icon.js'
export default {
  props: {
    // 值
    value: {
      type: String,
      required: false,
      default: ''
    },
    // 占位符
    placeholder: {
      type: String,
      required: false,
      default: '请选择'
    },
    // 弹出界面的方向
    placement: {
      type: String,
      required: false,
      default: 'right'
    },
    // 是否可清空
    clearable: {
      type: Boolean,
      required: false,
      default: true
    },
    // 是否允许用户输入
    userInput: {
      type: Boolean,
      required: false,
      default: false
    },
    // 是否在选择后自动关闭
    autoClose: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      // 绑定弹出框
      pop: false,
      // 所有图标
      icon,
      // 组件内输入框的值
      currentValue: '',
      // 搜索的文字
      searchText: '',
      // 不是搜索的时候显示的折叠面板绑定的展开数据
      collapseActive: []
    }
  },
  computed: {
    // 输入框上绑定的设置
    bind () {
      return {
        placeholder: this.placeholder,
        clearable: this.clearable,
        ...this.$attrs
      }
    },
    // 是否在搜索
    searchMode () {
      return !!this.searchText
    }
  },
  watch: {
    value (value) {
      this.currentValue = value
    },
    currentValue (value) {
      this.selectIcon(value)
    }
  },
  created () {
    this.currentValue = this.value
  },
  methods: {
    selectIcon (iconName = '') {
      this.$emit('input', iconName)
      if (iconName && this.autoClose) {
        this.pop = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
// @import '~@/assets/style/public.scss';
.group {
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: scroll;
  border-top: none;
  border-bottom: none;
  .class {
    .class-title {
      line-height: 30px;
      text-align: center;
      border-radius: 4px;
      margin: 10px 0px;
    }
    .class-row {
      .class-col {
        line-height: 40px;
        text-align: center;
        .iconfont{
          font-size: 18px;
        }
      }
    }
  }
}
</style>
