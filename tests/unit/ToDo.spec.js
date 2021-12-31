import { shallowMount } from '@vue/test-utils'
import ToDo from '@/components/ToDo.vue'

let wrapper = null;

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
    await wrapper.vm.addTodo('1st task')
    const todos1 = wrapper.findAll('.todo')
    expect(todos1.length).toBe(1)

    await wrapper.vm.addTodo('2nd task')
    const todos2 = wrapper.findAll('.todo')
    expect(todos2.length).toBe(2)
  })
})
