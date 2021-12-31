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

  it('renders completed class after toggles the fisrt todo', async () => {
    expect(wrapper.findAll('.completed').length).toBe(0)

    const newTodo = wrapper.find('.new-todo')
    await newTodo.setValue('1st task')
    await newTodo.trigger('keyup.enter')
    expect(wrapper.findAll('.completed').length).toBe(0)

    const toggles = wrapper.findAll('.toggle')
    expect(toggles.length).toBe(1)
    await toggles.at(0).trigger('click')
    expect(wrapper.findAll('.completed').length).toBe(1)

    await toggles.at(0).trigger('click')
    expect(wrapper.findAll('.completed').length).toBe(0)
  })
})
