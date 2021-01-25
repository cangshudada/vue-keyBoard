import { mount } from '@vue/test-utils';
import KeyBoard from "../../packages/keyBoard.vue";

describe('keyBoard.vue', () => {

  it('create', async () => {
    const wrapper = mount(KeyBoard, {
      data() {
        return {
          visible: true
        }
      }
    });
    expect(wrapper.find(".key-board").exists()).toBe(true);
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

  it('set color', async () => {
    const wrapper = mount(KeyBoard, {
      data() {
        return {
          visible: true
        }
      }
    });
    await wrapper.setProps({ color: "#ff0000" });
    expect(wrapper.find('.key-board-drag-handle').element.style.color).toBe('rgb(255, 0, 0)');
  })

  it('init modeList', async () => {
    const wrapper = mount(KeyBoard, {
      data() {
        return {
          visible: true
        }
      },
    });
    const defaultKeyBoard = wrapper.findComponent({ name: 'DefaultKeyBoard' })
    expect(defaultKeyBoard.vm.modeList).toStrictEqual(['handwrite', 'symbol']);
  })

  it('set handwrite mode', async () => {
    const wrapper = mount(KeyBoard, {
      data() {
        return {
          visible: true
        }
      },
    });
    await wrapper.setProps({ modeList: ["handwrite"] });
    const defaultKeyBoard = wrapper.findComponent({ name: 'DefaultKeyBoard' })
    expect(defaultKeyBoard.vm.modeList).toContain("handwrite");
  })

  it('set symbol mode', async () => {
    const wrapper = mount(KeyBoard, {
      data() {
        return {
          visible: true
        }
      },
    });
    await wrapper.setProps({ modeList: ["symbol"] });
    const defaultKeyBoard = wrapper.findComponent({ name: 'DefaultKeyBoard' })
    expect(defaultKeyBoard.vm.modeList).toContain("symbol");
  })

  it('blur hide', async () => {
 
  })
})
