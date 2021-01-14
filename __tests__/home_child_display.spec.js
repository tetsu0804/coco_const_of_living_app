import { shallowMount, createLocalVue } from '@vue/test-utils'
import HomeChildDisplay from '@/components/Home/HomeChildDisplay'
import NextPrevPriceDisplay from '@/components/Home/NextPrevPriceDisplay'
describe('HomeChildDisplayのテスト', () => {
  let wrapper
  beforeEach(() => {

    const nextPrevPriceDisplayWrapper = {
      render(h) {
        return h(NextPrevPriceDisplay, {
          props: {
            num: 0,
            nextHideOrDisplay: false,
            prevHideOrDisplay: true,
            priceMonthGoodsArray: 5000
          }
        })
      }
    }

    wrapper = shallowMount(HomeChildDisplay, {
      slots: {
        monthDisplay: '今月の合計金額',
        default: nextPrevPriceDisplayWrapper
      }
    })

  })

  describe('HomeChildDisplay', () => {
    it('slotでの適切な値が入っているか', () => {
      let selectWrapper = wrapper.find('.mt-5')
      expect(selectWrapper.text()).toContain('今月の合計金額')
    })
  })

  describe('NextPrevPriceDisplayのテスト', () => {

    it('NextPrevPriceDisplayコンポーネントが存在するのか', () => {
      expect(wrapper.find(NextPrevPriceDisplay).isVueInstance()).toBe(true)
    })

    it('適切な値が表示されているか', () => {
      let childWrapper = wrapper.findAll(NextPrevPriceDisplay)

      childWrapper.wrappers.forEach(c => {
        expect(c.vm.num).toBe(0)
        expect(c.vm.nextHideOrDisplay).toBeFalsy()
        expect(c.vm.prevHideOrDisplay).toBeTruthy()
        expect(c.vm.priceMonthGoodsArray).toBe(5000)
      })
    })
  })

})
