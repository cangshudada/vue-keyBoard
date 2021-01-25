import {
  mount
} from '@vue/test-utils';
import KeyBoard from "../../packages/keyBoard.vue";

const _mount = (payload = {}) => mount({
  components: {
    KeyBoard,
  },
  data() {
    return {
      value: "你好",
      ...payload,
    }
  },
  template: `
    <div>
      <input data-mode v-model="value" />
      <Key-Board v-model="value" />
    </div>
  `,
})

describe('keyBoard.vue', () => {

  it('create', async () => {
    const wrapper = _mount();
    const keyBoard = wrapper.findComponent({
      name: "KeyBoard"
    });
    expect(keyBoard.vm.$data.visible).toBe(false);
  })

  it('input trigger focus event set keyboard visible true', async () => {
    const wrapper = _mount();
    const keyBoard = wrapper.findComponent({
      name: "KeyBoard"
    });
    expect(keyBoard.vm.$data.visible).toBe(false);
    await wrapper.find('input').trigger("focus");
    expect(keyBoard.vm.$data.visible).toBe(true);
  })

  it('init color', async () => {
    const wrapper = mount(KeyBoard, {
      data() {
        return {
          visible: true
        }
      }
    });
    expect(wrapper.find('.key-board-drag-handle').element.style.color).toBe('rgb(234, 160, 80)');
  })

  // it('set color', async () => {
  //   const wrapper = mount(KeyBoard, {
  //     data() {
  //       return {
  //         visible: true
  //       }
  //     }
  //   });
  //   await wrapper.setProps({
  //     color: "#ff0000"
  //   });
  //   expect(wrapper.find('.key-board-drag-handle').element.style.color).toBe('rgb(255, 0, 0)');
  // })

  // it('init modeList', async () => {
  //   const wrapper = mount(KeyBoard, {
  //     data() {
  //       return {
  //         visible: true
  //       }
  //     },
  //   });
  //   const defaultKeyBoard = wrapper.findComponent({
  //     name: 'DefaultKeyBoard'
  //   })
  //   expect(defaultKeyBoard.vm.modeList).toStrictEqual(['handwrite', 'symbol']);
  // })

  // it('set handwrite mode', async () => {
  //   const wrapper = mount(KeyBoard, {
  //     data() {
  //       return {
  //         visible: true
  //       }
  //     },
  //   });
  //   await wrapper.setProps({
  //     modeList: ["handwrite"],
  //     handApi: "https://service.chaunve.com/HandWriteRecognizerService.asmx/Command"
  //   });

  //   const defaultKeyBoard = wrapper.findComponent({
  //     name: 'DefaultKeyBoard'
  //   })

  //   defaultKeyBoard.vm.$nextTick(() => {
  //     console.log('object', defaultKeyBoard.vm.modeList, defaultKeyBoard.vm.handApi)
  //   })
  //   // await defaultKeyBoard.vm.getLine4Code();
  //   // expect(defaultKeyBoard.vm.$data.line4).toContainEqual({
  //   //   data: "",
  //   //   type: "handwrite",
  //   // });
  // })

  // it('set symbol mode', async () => {
  //   const wrapper = mount(KeyBoard, {
  //     data() {
  //       return {
  //         visible: true
  //       }
  //     },
  //   });
  //   await wrapper.setProps({
  //     modeList: ["symbol"]
  //   });
  //   const defaultKeyBoard = wrapper.findComponent({
  //     name: 'DefaultKeyBoard'
  //   })
  //   expect(defaultKeyBoard.vm.modeList).toBe(["symbol"]);
  // })

  // it('blur hide', async () => {

  // })
})