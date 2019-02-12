<template>
  <transition name="address-fade">
    <div
      v-show="showDialog"
      class="address">
      <div
        v-show="showDialog"
        class="address-dialog"
        @click.stop="closeAddress"
        @touchmove.prevent="noopfn"/>
      <transition name="address-slide">
        <div
          v-show="showSlide"
          class="address-wrap">
          <div class="address-tab">
            <ul class="address-tab--list">
              <li
                v-for="(item, index) in select"
                :class="{'address-tab--active': index === activeTab}"
                :key="item.code"
                @click.stop="changeTab(index)">{{ item.name }}</li>
            </ul>
          </div>
          <section
            ref="addressContent"
            class="address-content">
            <ul class="address-content--list content">
              <li
                v-for="(value, key) in showList"
                :key="key"
                :class="{'address-item--active': key === select[activeTab].code}"
                class="address-content--item"
                @click.stop="changeSelect(value, key)">{{ value }}</li>
            </ul>
          </section>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
/**
 * better-scroll版本
 */
import chinaData from './assets/china-data.js'
import BScroll from 'better-scroll'
import './assets/vue-address.css'
export default {
  name: 'VueAddress',
  model: {
    prop: 'show',
    event: 'on-change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    defaultAddress: {
      type: Array
    }
  },
  data() {
    return {
      scroll: null,
      showSlide: false,
      showDialog: false,
      activeTab: 0,
      select: [{
        name: '请选择',
        code: ''
      }]
    }
  },
  computed: {
    showList() {
      const selectItem = this.select[this.activeTab - 1]
      const code = selectItem ? selectItem.code : '86'
      return this.getListByCode(code)
    }
  },
  watch: {
    defaultAddress() {
      this.initAddress()
    },
    show(val) {
      if (val) {
        this.showDialog = val
        setTimeout(() => {
          this.showSlide = val
        }, 100)
      } else {
        this.showSlide = val
        setTimeout(() => {
          this.showDialog = val
        }, 100)
      }
    }
  },
  created() {
    this.initAddress()
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.addressContent, {
      click: true
    })
  },
  methods: {

    noopfn() { },
    refreshScroll() {
      this.scroll.refresh()
    },
    closeAddress() {
      this.$emit('on-change')
    },
    changeTab(index) {
      this.activeTab = index
      this.refreshScroll()
    },
    changeSelect(val, key) {
      const item = {
        name: val,
        code: key
      }
      this.select[this.activeTab] = item
      this.select.splice(this.activeTab + 1)
      this.activeTab += 1
      if (Object.keys(this.showList).length > 0) {
        this.select.push({
          name: '请选择',
          code: ''
        })
      } else {
        this.activeTab -= 1
        this.$emit('on-select', JSON.parse(JSON.stringify(this.select)))
        this.$emit('on-change')
      }
      this.refreshScroll()
    },
    getListByCode(code) {
      return chinaData[code] || {}
    },
    getCodeByName(name) {
      for (const x in chinaData) {
        for (const y in chinaData[x]) {
          if (name === chinaData[x][y]) {
            return y
          }
        }
      }
      return ''
    },
    getNameByCode(code) {
      for (const x in chinaData) {
        for (const y in chinaData[x]) {
          if (~~code === ~~y) {
            return chinaData[x][y]
          }
        }
      }
      return ''
    },
    initAddress() {
      if (this.defaultAddress) {
        const select = []
        this.defaultAddress.forEach(name => {
          const code = this.getCodeByName(name)
          select.push({
            name,
            code
          })
        })
        this.select = select
        this.activeTab = select.length - 1
      }
    }
  }
}
</script>

<style>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.address-fade-enter-active,
.address-fade-leave-active {
  transition: opacity 0.3s;
}
.address-fade-enter,
.address-fade-leave-to {
  opacity: 0;
}
.address-slide-enter-active,
.address-slide-leave-active {
  transition: all 0.24s ease-out;
}
.address-slide-enter,
.address-slide-leave-active {
  opacity: 0;
  transform: translate(0, 100%);
}

.address-item--acitve {
  color: #3278ee;
}
.address-tab--active {
  color: #3278ee;
  border-bottom: 1px solid #3278ee;
}
.address {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 300;
  background: rgba(0, 0, 0, 0.6);
}
.address-dialog {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 301;
}
.address-wrap {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fbfbfb;
  z-index: 302;
}
.address-tip {
  padding: 10px 0;
  font-size: 14px;
  color: #83889a;
}
.address-tab {
  border-bottom: 1px solid #eee;
}
.address-tab--list {
  display: flex;
  font-size: 12px;
}
.address-tab--list li{
  padding: 8px;
  margin-right: 10px;
}
.address-content {
  height: 300px;
  overflow: hidden;
}
.address-content--item {
  font-size: 12px;
  padding: 8px;
  text-align: left;
}
</style>
