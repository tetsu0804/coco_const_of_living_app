import { mount } from '@vue/test-utils'
import DetailsBtn from '@/components/Home/DetailsBtn'

describe('DetailsBtnのテスト', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(DetailsBtn, {
      computed: {
        lastGoods: () => {
          return '最後のお買い物はロイヤルカナン'
        }
      }
    })
  })

  it('正解に表示されているか', () => {
    let link = wrapper.find('router-link')
    expect(link.text()).toContain('最後のお買い物はロイヤルカナン')
  })

})
