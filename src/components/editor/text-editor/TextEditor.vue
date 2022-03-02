<template lang="pug">
.vue-html5-editor(:class="{'full-screen':fullScreen}" :style="{'z-index':zIndex}")
  .toolbar(:style="{'z-index':zIndex+1}" ref='toolbar')
    ul
      template(v-for='module in modules')
        li(:title='locale[module.i18n]' @click='activeModule(module)')
          span.icon(:class='module.icon')
          template(v-if='showModuleName === undefined ? true : showModuleName')
            | {{locale[module.i18n]}}
    .dashboard(v-show='dashboard' ref='dashboard')
      keep-alive
        div(v-show='dashboard' :is='dashboard')
  .content(ref='content' :style='contentStyle' contenteditable='' @click='toggleDashboard(dashboard)')

</template>

<script>
import RangeHandler from './range/handler'

export default {
  props: {
    content: {
      type: String,
      required: true,
      default: ''
    },
    height: {
      type: Number,
      default: 300,
      validator(val){
        return val >= 100
      }
    },
    zIndex: {
      type: Number,
      default: 1000
    },
    autoHeight: {
      type: Boolean,
      default: true
    },
    showModuleName: {},
  },
  data(){
    return {
      fullScreen: false,
      dashboard: null,
      modules: []
    }
  },
  watch: {
    content(val) {
      const content = this.$refs.content.innerHTML
      if (val !== content) {
        this.$refs.content.innerHTML = val
      }
      this.$emit('update:content', val)
    },
    fullScreen(val){
      const component = this
      if (val) {
        component.parentEl = component.$el.parentNode
        component.nextEl = component.$el.nextSibling
        document.body.appendChild(component.$el)
        return
      }
      if (component.nextEl) {
        component.parentEl.insertBefore(component.$el, component.nextEl)
        return
      }
      component.parentEl.appendChild(component.$el)
    }
  },
  computed: {
    contentStyle(){
      const style = {}
      if (this.fullScreen) {
        style.height = `${window.innerHeight - this.$refs.toolbar.clientHeight - 1}px`
        return style
      }
      if (!this.autoHeight) {
        style.height = `${this.height}px`
        return style
      }
      style['min-height'] = `${this.height}px`
      return style
    }
  },
  methods: {
    toggleFullScreen(){
      this.fullScreen = !this.fullScreen
    },
    enableFullScreen(){
      this.fullScreen = true
    },
    exitFullScreen(){
      this.fullScreen = false
    },
    focus(){
      this.$refs.content.focus()
    },
    toggleDashboard(dashboard){
      this.dashboard = this.dashboard === dashboard ? null : dashboard
    },
    execCommand(command, arg){
      this.restoreSelection()
      if (this.range) {
        new RangeHandler(this.range).execCommand(command, arg)
      }
      this.toggleDashboard()
      this.$emit('change', this.$refs.content.innerHTML)
    },
    getCurrentRange(){
      return this.range
    },
    saveCurrentRange(){
      const selection = window.getSelection ? window.getSelection() : document.getSelection()
      if (!selection.rangeCount) {
        return
      }
      const content = this.$refs.content
      for (let i = 0; i < selection.rangeCount; i++) {
        const range = selection.getRangeAt(0)
        let start = range.startContainer
        let end = range.endContainer
        // for IE11 : node.contains(textNode) always return false
        start = start.nodeType === Node.TEXT_NODE ? start.parentNode : start
        end = end.nodeType === Node.TEXT_NODE ? end.parentNode : end
        if (content.contains(start) && content.contains(end)) {
          this.range = range
          break
        }
      }
    },
    restoreSelection(){
      const selection = window.getSelection ? window.getSelection() : document.getSelection()
      selection.removeAllRanges()
      if (this.range) {
        selection.addRange(this.range)
      } else {
        const content = this.$refs.content
        const div = document.createElement('div')
        const range = document.createRange()
        content.appendChild(div)
        range.setStart(div, 0)
        range.setEnd(div, 0)
        selection.addRange(range)
        this.range = range
      }
    },
    activeModule(module){
      if (typeof module.handler === 'function') {
        module.handler(this)
        return
      }
      if (module.hasDashboard) {
        this.toggleDashboard(`dashboard-${module.name}`)
      }
    }
  },
  created(){
    this.modules.forEach((module) => {
      if (typeof module.init === 'function') {
        module.init(this)
      }
    })
  },
  mounted(){
    const content = this.$refs.content
    content.innerHTML = this.content
    content.addEventListener('mouseup', this.saveCurrentRange, false)
    content.addEventListener('keyup', () => {
      this.$emit('change', content.innerHTML)
      this.saveCurrentRange()
    }, false)
    content.addEventListener('mouseout', (e) => {
      if (e.target === content) {
        this.saveCurrentRange()
      }
    }, false)
    this.touchHandler = (e) => {
      if (content.contains(e.target)) {
        this.saveCurrentRange()
      }
    }

    window.addEventListener('touchend', this.touchHandler, false)
  },
  updated(){
    if (this.$refs.dashboard){
      this.$refs.dashboard.style.maxHeight = `${this.$refs.content.clientHeight}px`
    }
  },
  beforeUnmount(){
    window.removeEventListener('touchend', this.touchHandler)
    this.modules.forEach((module) => {
      if (typeof module.destroyed === 'function') {
        module.destroyed(this)
      }
    })
  }
}
</script>

<style scoped lang="stylus">
.vue-html5-editor {
  font-size: 14px;
  line-height: 1.5;
  background-color: white;
  color: var(--color);
  border: 1px solid var(--border-color);
  text-align: left;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-sizing: border-box;

  & * {
    box-sizing: border-box;
  }

  &.full-screen {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    bottom: 0 !important;
    right: 0 !important;
    border-radius: 0;
  }

  & > .toolbar {
    position: relative;
    background-color: inherit;

    & > ul {
      list-style: none;
      padding: 0;
      margin: 0;
      border-bottom: 1px solid var(--border-color);

      & > li {
        display: inline-block;
        cursor: pointer;
        text-align: center;
        line-height: 36px;
        padding: 0 10px;
        & .icon {
          height: 16px;
          width: 16px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }

    & > .dashboard {
      background-color: inherit;
      border-bottom: 1px solid var(--border-color);
      padding: 10px;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      overflow: auto;

      & input[type='text'], & input[type='number'], & select {
        padding: 6px 12px;
        color: inherit;
        background-color: transparent;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);

        &:hover {
          border-color: color(var(--border-color) blackness(30%));
        }

        &[disabled], &[readonly] {
          background-color: #eee;
          opacity: 1;
        }

        &[disabled] {
          cursor: not-allowed;
        }
      }

      & button {
        color: inherit;
        background-color: inherit;
        padding: 6px 12px;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        margin-right: 4px;
        margin-bottom: 4px;

        &:hover {
          border-color: color(var(--border-color) blackness(30%));
        }

        &[disabled] {
          cursor: not-allowed;
          opacity: .68;
        }

        &:last-child {
          margin-right: 0;
        }
      }

      & input, button, select {
        line-height: normal;
      }

      & label {
        font-weight: bolder;
      }

    }

  }
  & > .content {
    overflow: auto;
    padding: 10px;

    &:focus {
      outline: 0;
    }

  }

}

@media (max-width: 767px) {
  .vue-html5-editor {
    .dashboard {
      label, input[type='text'], input[type='number'], button, select {
        display: block;
        margin-bottom: 5px;
        width: 100% !important;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .vue-html5-editor {
    .dashboard {
      label, input, button, select {
        display: inline-block;
        margin-right: 4px;
        max-width: 100%;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}



</style>
