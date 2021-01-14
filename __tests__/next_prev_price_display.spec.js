import { mount, createLocalVue } from '@vue/test-utils'
import NextPrevPriceDisplay from '@/components/Home/NextPrevPriceDisplay'
import Vuex from 'vuex'

let localVue = createLocalVue()
localVue.use(Vuex)

describe('NextPrevPriceDisplayのテスト', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(NextPrevPriceDisplay, {localVue,
      computed: {
        monthPrice: () => {
          return 5000
        },
        prevBtn: () => {
          return true
        },
        nextBtn: () => {
          return false
        }
      }
    })
  })

  describe('適切な値が入っているか', () => {
    it('nextHideOrDisplay:falseの場合', () => {
      let priceDisplay = wrapper.find('b-col.display-2')
      expect(priceDisplay.text()).toContain('5000円')
    })

    it('prevHideOrDisplayがtrueなので表示されていてnextHideOrDisplayが非表示', () => {
      let iconBtn = wrapper.find('b-icon')
      expect(iconBtn.attributes().icon).toBe('arrow-right-circle-fill')
      expect(iconBtn.attributes().icon).not.toBe('arrow-left-circle-fill')
    })
  })
})
