<template>
  <div class="todo-app">
    <input class="toggle-all" type="checkbox" v-model="allDone" />
    <input class="new-todo" type="text" v-model="newTodo" @keyup.enter="addTodo" />
    <section class="main" v-show="todos.length > 0">
      <ul class="todo-list">
        <li class="todo" v-for="todo in filteredTodos" :key="todo.id" :class="{ completed: todo.completed, editing: todo == editedTodo }">
          <div class="view" v-show="todo != editedTodo">
            <input class="toggle" type="checkbox" v-model="todo.completed" />
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)" />
          </div>
          <input class="edit" type="text" v-model="todo.title" v-show="todo == editedTodo" @keyup.enter="doneEdit(todo)" @blur="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" v-todo-focus="todo == editedTodo">
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length > 0">
      <span class="todo-count">{{ remining }} {{ remining | pluralize }} left</span>
      <ul class="filters">
        <li>
          <a href="#/all" :class="{ selected: visibility == 'all' }">All</a>
        </li>
        <li>
          <a href="#/active" :class="{ selected: visibility == 'active' }">Active</a>
        </li>
        <li>
          <a href="#/completed" :class="{ selected: visibility == 'completed' }">Completed</a>
        </li>
      </ul>
      <button class="clear-completed" @click="removeCompleted" />
    </footer>
    <footer class="info">
      <p>Double-click to edit a todo</p>
    </footer>
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
    },
    removeCompleted() {
      this.todos = this.filter.active()
    }
  },
  data() {
    return {
      todos: [],
      newTodo: '',
      uid: 0,
      editedTodo: '',
      visibility: 'all'
    }
  },
  directives: {
    "todo-focus": (el, binding) => {
      if (binding.value) {
        el.focus()
      } 
    }
  },
  computed: {
    filteredTodos() {
      return this.filter[this.visibility]()
    },
    allDone: {
      get() {
        return this.filter.active().length === 0
      },
      set(value) {
        this.todos.forEach(todo => todo.completed = value)
      }
    },
    remining() {
      return this.filter.active().length
    }
  },
  created() {
    this.filter = {
      completed: () => {
        return this.todos.filter(todo => todo.completed)
      },
      active: () => {
        return this.todos.filter(todo => !todo.completed)
      },
      all: () => {
        return this.todos
      }
    }
    this.onHashChange = () => {
      let visibility = window.location.hash.replace(/#\/?/, '')
      if (!this.filter[visibility]) {
        visibility = 'all'
        window.location.hash = ''
      }
      this.visibility = visibility
    }
    window.addEventListener('hashchange', this.onHashChange)
    this.onHashChange()
  },
  destroyed() {
    window.removeEventListener('hashchange', this.onHashChange)
  },
  filters: {
    pluralize: function(n) {
      return n > 1 ? 'items' : 'item'
    }
  }
}
</script>

<style>

</style>
