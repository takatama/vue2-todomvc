<template>
  <ul class="todo-list">
    <li class="todo" v-for="todo in todos" :key="todo.id">{{ todo.title }}</li>
  </ul>
</template>

<script>
export default {
  methods: {
    addTodo(title) {
      this.todos.push({
        id: this.todos.length, title, completed: false
      })
    }
  },
  data() {
    return {
      todos: []
    }
  }
}
</script>

<style>

</style>
