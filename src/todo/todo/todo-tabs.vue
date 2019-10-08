<template>
    <div class="helper">
        <span class="left">{{uncompletedNum}}条未完成事务</span>
        <ul class="tabs">
            <li
                v-for="state in states"
                :key="state.id"
                :class="[state.des, {'filter': selectState==state.id}]"
                @click="toggleFilter(state.id)"
            >
                {{state.name}}
            </li>
        </ul>
        <button class="clearBtn"
            @click="clearBtn"
        >清空已完成的事务</button>
    </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Todo App Tabs Page'
  },
  name: 'TodoTabs', // 注意使用驼峰式写法，首字母大小写不明感
  props: {
    uncompletedNum: {type: Number, required: true}
  },
  data () {
    return {
      states: [
        {id: 0, des: 'all', name: '所有事务'},
        {id: 1, des: 'active', name: '未完成事务'},
        {id: 2, des: 'completed', name: '已完成事务'}
      ],
      selectState: 0
    }
  },
  methods: {
    clearBtn () {
      this.$emit('clearUncompleted')
    },
    toggleFilter (id) {
      this.$emit('showList', id)
      this.selectState = id
    }
  }
}
</script>

<style lang="stylus">
.helper {
    font-weight: 100;display: flex;justify-content: space-between;padding: 5px 0;line-height: 30px;background-color: #fff;font-size: 14px;font-smoothing: antialiased;
    .clearBtn {
        background-color: inherit;font-color: inherit;
    }
}
.left, .clearBtn, .tabs {
    padding: 0 10px;box-sizing: border-box;
}
.clearBtn, .tabs {
    cursor: pointer;
}
.tabs {
    width: 300px;display: flex;
    li {
        flex: 1;padding: 0 10px;text-align: center;border: 1px solid rgba(175,47,47,0);
        &.filter {
            border-color: rgba(175,47,47,0.4);border-radius: 5px;
        }
    }
}
</style>
