<template>
  <div :class="['todo-item', {'completed': todo.isCompleted}]">
    <input type="checkbox" class='toggle' :checked='todo.isCompleted' @click.prevent="handleToggle">
    <label for="">{{todo.content}}</label>
    <button class="deleteBtn" @click='deleteTodo'></button>

  </div>
</template>

<script>
export default {
  name: "Items",
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {};
  },
  methods: {
    deleteTodo () {
      this.$emit("del", this.todo.id);
    },
    // checkbox 状态改变时
    handleToggle () {
      this.$emit('toggle', this.todo)
    }
  }
};
</script>

<style lang="stylus" scoped>
.todo-item {
  position: relative;
  background-color: #fff;
  font-size: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  .deleteBtn {
    position: absolute;
    width: 40px;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 30px;
    color: #cc9a9a;
    cursor: pointer;
    background-color: inherit;

    &:after {
      content: '';
      color: #cc9a9a;
      transition: color 0.5s linear;
    }
  }

  &:hover {
    .deleteBtn:after {
      content: 'X';
      color: red;
    }
  }

  .toggle {
    text-align: center;
    width: 40px;
    height: 40px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border: none;
    outline: none;
    margin: auto 0;

    &:after {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      background-color: #fff;
      content: url('../../assets/images/round.svg');
    }

    &:checked:after {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      background-color: #fff;
      content: url('../../assets/images/done.svg');
    }
  }

  label {
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
  }

  &.completed {
    label {
      color: #d9d9d9;
      text-decoration: line-through;
    }
  }
}
</style>
