import { mount } from '@vue/test-utils'
import AlertMessage from '@/components/Home/AlertMessage'

describe('AlertMessageコンポーネントのテスト', () => {
    let wrapper
  beforeEach(() => {
    wrapper = mount(AlertMessage, {
      propsData: {
        success_message: '',
        error_message: ''
      }
    })
  })

  describe('successとerrorと両方のテスト', () =>{

    it('successに値が入っている時', () => {
      wrapper.setProps({ success_message: 'ロイヤルカナンを追加しました'})
      wrapper.vm.$nextTick(() => {
        let findWrapper = wrapper.find('.mt-2')
        expect(findWrapper.text()).toContain('ロイヤルカナンを追加しました')
        expect(findWrapper.find('b-alert').attributes().variant).toBe('success')
        expect(findWrapper.find('b-alert').attributes().variant).not.toBe('danger')
      })
    })

    it('errorに値が入っている時', () => {
      wrapper.setProps({error_message: '不正な値がある可能性がある為失敗しました'})

      wrapper.vm.$nextTick(() => {
        let findWrapper = wrapper.find('.mt-2')
        expect(findWrapper.text()).toContain('不正な値がある可能性がある為失敗しました')
        expect(findWrapper.find('b-alert').attributes().variant).toBe('danger')
        expect(findWrapper.find('b-alert').attributes().variant).not.toBe('success')
      })
    })

  })
})
