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
    const input = wrapper.find('.new-todo')
    await input.setValue('1st task')
    await input.trigger('keyup.enter')

    const todos1 = wrapper.findAll('.todo')
    expect(todos1.length).toBe(1)
    expect(input.element.value).toBe('')

    await input.setValue('2nd task')
    await input.trigger('keyup.enter')

    const todos2 = wrapper.findAll('.todo')
    expect(todos2.length).toBe(2)
    expect(input.element.value).toBe('')
  })
})
