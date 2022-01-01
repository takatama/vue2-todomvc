import { shallowMount } from '@vue/test-utils'
import ToDo from '@/components/ToDo.vue'

let wrapper = null;

const addTodo = async (title) => {
  const newTodo = wrapper.find('.new-todo')
  await newTodo.setValue(title)
  await newTodo.trigger('keyup.enter')
}

beforeEach(() => {
  wrapper = shallowMount(ToDo)
})

afterEach(() => {
  wrapper.destroy()
})

describe('ToDo', () => {
  it('renders a todo-list', () => {
    expect(wrapper.find('.todo-list').exists()).toBe(true)
  })

  it('renders todos after calling addTodo()', async () => {
    await addTodo('1st task')
    const todos1 = wrapper.findAll('.todo')
    expect(todos1.length).toBe(1)
    expect(wrapper.find('.new-todo').element.value).toBe('')

    await addTodo('2nd task')
    const todos2 = wrapper.findAll('.todo')
    expect(todos2.length).toBe(2)
    expect(wrapper.find('.new-todo').element.value).toBe('')
  })

  it('renders completed class after toggles the fisrt todo', async () => {
    await addTodo('1st task')
    expect(wrapper.findAll('.completed').length).toBe(0)

    const toggles = wrapper.findAll('.toggle')
    expect(toggles.length).toBe(1)
    await toggles.at(0).trigger('click')
    expect(wrapper.findAll('.completed').length).toBe(1)

    await toggles.at(0).trigger('click')
    expect(wrapper.findAll('.completed').length).toBe(0)
  })

  it('renders destroy button for each todo', async () => {
    expect(wrapper.findAll('.destroy').length).toBe(0)
    await addTodo('1st task')
    expect(wrapper.findAll('.destroy').length).toBe(1)
    await addTodo('2nd task')
    expect(wrapper.findAll('.destroy').length).toBe(2)
  })
})
