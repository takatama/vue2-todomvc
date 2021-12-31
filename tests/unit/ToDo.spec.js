import { shallowMount } from '@vue/test-utils'
import ToDo from '@/components/ToDo.vue'

let wrapper = null;

beforeEach(() => {
  wrapper = shallowMount(ToDo)
})

afterEach(() => {
  wrapper.destroy()
})

describe('ToDo', () => {})