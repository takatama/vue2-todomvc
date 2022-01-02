import { shallowMount } from '@vue/test-utils'
import ToDo from '@/components/ToDo.vue'

let wrapper = null;

const addTodo = async (title) => {
  const newTodo = wrapper.find('.new-todo')
  await newTodo.setValue(title)
  await newTodo.trigger('keyup.enter')
}

beforeEach(() => {
  wrapper = shallowMount(ToDo, {
    attachTo: document.body
  })
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

  it('renders edited todo when blur', async () => {
    await addTodo('1st task')
    const label1st = wrapper.findAll('.view label').at(0)
    expect(label1st.text()).toEqual('1st task')

    await label1st.trigger('dblclick')
    const editInput = wrapper.findAll('.edit').at(0)
    await editInput.setValue('edited 1st task')
    await editInput.trigger('blur')
    expect(wrapper.find('.view').isVisible()).toBe(true)
    expect(wrapper.findAll('.view label').at(0).text()).toEqual('edited 1st task')
  })

  it('renders original todo if editing is canceled', async () => {
    await addTodo('1st task')
    await wrapper.find('label').trigger('dblclick')
    const editInput = wrapper.find('.edit')
    await editInput.setValue('edited 1st task')
    await editInput.trigger('keyup.esc')
    expect(wrapper.find('label').text()).toEqual('1st task')
  })

  it('gets focus to editing input when start editing', async () => {
    expect(document.activeElement.className).not.toBe('edit')
    await addTodo('1st task')
    await wrapper.find('label').trigger('dblclick')
    expect(document.activeElement.className).toBe('edit')
  })

  it('renders filtered todos based on visilibity', async () => {
    await addTodo('1st task')
    await addTodo('2nd task')
    await addTodo('3rd task')
    expect(wrapper.findAll('.todo').length).toBe(3)

    await wrapper.find('.toggle').trigger('click')
    expect(wrapper.findAll('.todo').length).toBe(3)

    await wrapper.setData( { visibility: 'completed' })
    expect(wrapper.findAll('.todo').length).toBe(1)
    expect(wrapper.findAll('.todo').at(0).text()).toBe('1st task')

    await wrapper.setData( { visibility: 'active' })
    expect(wrapper.findAll('.todo').length).toBe(2)
    expect(wrapper.findAll('.todo').at(0).text()).toBe('2nd task')

    await wrapper.setData( { visibility: 'all' })
    expect(wrapper.findAll('.todo').length).toBe(3)
    expect(wrapper.findAll('.todo').at(0).text()).toBe('1st task')
  })

  it('fires hashchange', async () => {
    await addTodo('1st task')
    await addTodo('2nd task')
    await addTodo('3rd task')
    expect(wrapper.findAll('.todo').length).toBe(3)

    await wrapper.find('.toggle').trigger('click')
    expect(wrapper.findAll('.todo').length).toBe(3)

    window.location.hash = '/completed'
    await window.dispatchEvent(new Event('hashchange'))
    expect(wrapper.vm.visibility).toBe('completed')
    expect(wrapper.findAll('.todo').length).toBe(1)
    expect(wrapper.findAll('.todo').at(0).text()).toBe('1st task')

    window.location.hash = '/active'
    await window.dispatchEvent(new Event('hashchange'))
    expect(wrapper.vm.visibility).toBe('active')
    expect(wrapper.findAll('.todo').length).toBe(2)
    expect(wrapper.findAll('.todo').at(0).text()).toBe('2nd task')

    window.location.hash = '/all'
    await window.dispatchEvent(new Event('hashchange'))
    expect(wrapper.vm.visibility).toBe('all')
    expect(wrapper.findAll('.todo').length).toBe(3)
    expect(wrapper.findAll('.todo').at(0).text()).toBe('1st task')
  })

  it('renders toggle-all checkbox', async () => {
    expect(wrapper.find('.toggle-all').exists()).toBe(true)
    expect(wrapper.find('.toggle-all').element.checked).toBe(true)

    await addTodo('1st task')
    expect(wrapper.find('.toggle-all').element.checked).toBe(false)

    await wrapper.find('.toggle').trigger('click')
    expect(wrapper.find('.toggle-all').element.checked).toBe(true)

    await addTodo('2nd task')
    expect(wrapper.find('.toggle-all').element.checked).toBe(false)

    await wrapper.find('.toggle-all').trigger('click')
    expect(wrapper.find('.toggle-all').element.checked).toBe(true)
    expect(wrapper.findAll('.completed').length).toBe(2)
  })
})
