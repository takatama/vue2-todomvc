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

  it('removes a todo after clicking the destroy button for it', async () => {
    await addTodo('1st task')
    expect(wrapper.findAll('.destroy').length).toBe(1)
    const destroy = wrapper.findAll('.destroy').at(0)
    await destroy.trigger('click')
    expect(wrapper.findAll('.destroy').length).toBe(0)
  })

  it('increments todo id if some todos are destroyed', async () => {
    await addTodo('1st task')
    expect(wrapper.vm.todos[0].id).toBe(0)
    await addTodo('2nd task')
    expect(wrapper.vm.todos[1].id).toBe(1)

    const destroy2nd = wrapper.findAll('.destroy').at(1)
    await destroy2nd.trigger('click')
    await addTodo('3rd task')
    expect(wrapper.vm.todos[1].id).toBe(2)
  })

  it('shows .edit and hides .view when editing todo', async () => {
    await addTodo('1st task')
    expect(wrapper.find('.view').isVisible()).toBe(true)
    expect(wrapper.find('.edit').isVisible()).toBe(false)

    const label1st = wrapper.findAll('.view label').at(0)
    await label1st.trigger('dblclick')
    expect(wrapper.find('.view').isVisible()).toBe(false)
    expect(wrapper.find('.edit').isVisible()).toBe(true)
  })

  it('renders edited todo', async () => {
    await addTodo('1st task')
    const label1st = wrapper.findAll('.view label').at(0)
    expect(label1st.text()).toEqual('1st task')

    await label1st.trigger('dblclick')
    const editInput = wrapper.findAll('.edit').at(0)
    await editInput.setValue('edited 1st task')
    await editInput.trigger('keyup.enter')
    expect(wrapper.find('.view').isVisible()).toBe(true)
    expect(wrapper.findAll('.view label').at(0).text()).toEqual('edited 1st task')
  })
})
