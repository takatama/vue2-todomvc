<template>
  <div>
    <input class="new-todo" type="text" v-model="newTodo" @keyup.enter="addTodo"></input>
    <ul class="todo-list">
      <li class="todo" v-for="todo in todos" :key="todo.id" :class="{ completed: todo.completed }">
        <input class="toggle" type="checkbox" v-model="todo.completed" />
        <label>{{ todo.title }}</label>
        <button class="destroy" @click="removeTodo(todo)"/>
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
        id: this.uid++, title, completed: false
      })
      this.newTodo = ''
    },
    removeTodo(todo) {
      const i = this.todos.findIndex(t => t.id === todo.id)
      this.todos.splice(i, 1)
    }
  },
  data() {
    return {
      todos: [],
      newTodo: '',
      uid: 0
    }
  }
}
</script>

<style>

</style>
