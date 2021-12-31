<template>
  <div>
    <input class="new-todo" type="text" v-model="newTodo" @keyup.enter="addTodo"></input>
    <ul class="todo-list">
      <li class="todo" v-for="todo in todos" :key="todo.id">{{ todo.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    addTodo() {
      const title = this.newTodo.trim()
      if (!title) return
      this.todos.push({
        id: this.todos.length, title, completed: false
      })
      this.newTodo = ''
    }
  },
  data() {
    return {
      todos: [],
      newTodo: ''
    }
  }
}
</script>

<style>

</style>
