<template>
  <div>
    <input class="new-todo" type="text" v-model="newTodo" @keyup.enter="addTodo" />
    <ul class="todo-list">
      <li class="todo" v-for="todo in todos" :key="todo.id" :class="{ completed: todo.completed, editing: todo == editedTodo }">
        <div class="view" v-show="todo != editedTodo">
          <input class="toggle" type="checkbox" v-model="todo.completed" />
          <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
          <button class="destroy" @click="removeTodo(todo)" />
        </div>
        <input class="edit" type="text" v-model="todo.title" v-show="todo == editedTodo" @keyup.enter="doneEdit(todo)" @blur="doneEdit(todo)" @keyup.esc="cancelEdit(todo)">
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
    },
    editTodo(todo) {
      this.editedTodo = todo
      this.beforeEditCache = todo.title
    },
    doneEdit(todo) {
      this.editedTodo = ''
    },
    cancelEdit(todo) {
      todo.title = this.beforeEditCache
      this.editedTodo = ''
    }
  },
  data() {
    return {
      todos: [],
      newTodo: '',
      uid: 0,
      editedTodo: ''
    }
  }
}
</script>

<style>

</style>
