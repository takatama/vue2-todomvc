<template>
  <div>
    <input class="new-todo" type="text" v-model="newTodo" @keyup.enter="addTodo"></input>
    <ul class="todo-list">
      <li class="todo" v-for="todo in todos" :key="todo.id" :class="{ completed: todo.completed }">
        <input class="toggle" type="checkbox" v-model="todo.completed" />
        <label>{{ todo.title }}</label>
        <button class="destroy "/>
      </li>
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
