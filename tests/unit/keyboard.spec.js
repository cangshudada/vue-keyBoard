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
}, {
  attachTo: document.querySelector("body")
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

  it('input trigger blur event set keyboard visible false', async () => {
    const wrapper = _mount();
    const keyBoard = wrapper.findComponent({
      name: "KeyBoard"
    });
    await wrapper.find('input').trigger("focus");
    expect(keyBoard.vm.$data.visible).toBe(true);
    await wrapper.find('input').trigger("blur");
    expect(keyBoard.vm.$data.visible).toBe(false);
  })

  it('Setting blurHide to false causes the input to not disappear even when the input box is blurred', async () => {
    const wrapper = mount({
      components: {
        KeyBoard,
      },
      data() {
        return {
          value: "你好",
        }
      },
      template: `
        <div>
          <input data-mode v-model="value" />
          <Key-Board v-model="value" :blurHide="false"/>
        </div>
      `,
    }, {
      attachTo: document.querySelector("body")
    });

    const keyBoard = wrapper.findComponent({
      name: "KeyBoard"
    });
    await wrapper.find('input').trigger("focus");
    expect(keyBoard.vm.$data.visible).toBe(true);
    await wrapper.find('input').trigger("blur");
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

  it('set color', async () => {
    const wrapper = mount(KeyBoard, {
      data() {
        return {
          visible: true
        }
      }
    });
    await wrapper.setProps({
      color: "#ff0000"
    });
    expect(wrapper.find('.key-board-drag-handle').element.style.color).toBe('rgb(255, 0, 0)');
  })

  it('set keyboard mode', async () => {
    const wrapper = mount({
      components: {
        KeyBoard,
      },
      data() {
        return {
          value: "你好",
        }
      },
      template: `
        <div>
          <input data-mode="handwrite" v-model="value" />
          <Key-Board v-model="value" handApi="https://xxx" />
        </div>
      `,
    }, {
      attachTo: document.querySelector("body")
    });
    const keyBoard = wrapper.findComponent({
      name: 'KeyBoard'
    })
    await wrapper.find('input').trigger("focus");
    expect(keyBoard.vm.$data.showMode).toBe("handwrite");
  })

  it('cannot show handwrite mode without handApi', async () => {
    const wrapper = mount({
      components: {
        KeyBoard,
      },
      data() {
        return {
          value: "你好",
        }
      },
      template: `
        <div>
          <input data-mode="handwrite" v-model="value" />
          <Key-Board v-model="value" />
        </div>
      `,
    }, {
      attachTo: document.querySelector("body")
    });
    const keyBoard = wrapper.findComponent({
      name: 'KeyBoard'
    })
    await wrapper.find('input').trigger("focus");
    expect(keyBoard.vm.$data.showMode).toBe("default");
  })

  it('set default modeList', async () => {

    const wrapper = mount(KeyBoard, {
      data() {
        return {
          visible: true
        }
      },
    });

    expect(wrapper.vm.modeList).toStrictEqual(["handwrite", "symbol"])

    await wrapper.setProps({
      modeList: ["handwrite"]
    });

    expect(wrapper.vm.modeList).toStrictEqual(["handwrite"])

    await wrapper.setProps({
      modeList: ["symbol"]
    });

    expect(wrapper.vm.modeList).toStrictEqual(["symbol"])
  })

  it('dragHandleBar exist when showHandleBar is true', async () => {
    const wrapper = _mount();
    const keyBoard = wrapper.findComponent({
      name: "KeyBoard"
    });
    await wrapper.find('input').trigger("focus");
    expect(keyBoard.find(".key-board-drag-handle").exists()).toBe(true);
  })

  it('dragHandleBar does not exist when showHandleBar is false', async () => {
    const wrapper = mount({
      components: {
        KeyBoard,
      },
      data() {
        return {
          value: "你好",
        }
      },
      template: `
        <div>
          <input data-mode v-model="value" />
          <Key-Board v-model="value" :showHandleBar="false"/>
        </div>
      `,
    }, {
      attachTo: document.querySelector("body")
    });
    const keyBoard = wrapper.findComponent({
      name: "KeyBoard"
    });
    await wrapper.find('input').trigger("focus");
    expect(keyBoard.find(".key-board-drag-handle").exists()).toBe(false);
  })

  it('dragHandleText can set dragHandle DOM innerText', async () => {
    const wrapper = mount({
      components: {
        KeyBoard,
      },
      data() {
        return {
          value: "你好",
        }
      },
      template: `
        <div>
          <input data-mode v-model="value" />
          <Key-Board v-model="value" dargHandleText="你好"/>
        </div>
      `,
    }, {
      attachTo: document.querySelector("body")
    });
    const keyBoard = wrapper.findComponent({
      name: "KeyBoard"
    });
    await wrapper.find('input').trigger("focus");
    expect(keyBoard.find(".key-board-drag-handle").text()).toBe("你好");
  })

  it('modal wrapper will disappear when model set false and input focus', async () => {
    const wrapper = mount({
      components: {
        KeyBoard,
      },
      data() {
        return {
          value: "你好",
        }
      },
      template: `
        <div>
          <input data-mode v-model="value" />
          <Key-Board />
        </div>
      `,
    }, {
      attachTo: document.querySelector("body")
    });
    wrapper.findComponent({
      name: "KeyBoard"
    });
    await wrapper.find('input').trigger("focus");
    expect(document.querySelector(".key-board-modal")).toBeNull();
  })

  it('modal wrapper will exist when model set true and input focus', async () => {
    const wrapper = mount({
      components: {
        KeyBoard,
      },
      data() {
        return {
          value: "你好",
        }
      },
      template: `
        <div>
          <input data-mode v-model="value" />
          <Key-Board modal />
        </div>
      `,
    }, {
      attachTo: document.querySelector("body")
    });
    wrapper.findComponent({
      name: "KeyBoard"
    });
    await wrapper.find('input').trigger("focus");
    expect(document.querySelector(".key-board-modal")).not.toBeNull();
  })

  it('modal wrapper will disappear when closeOnClickModal set true and modal wrapper click', async () => {
    const wrapper = mount({
      components: {
        KeyBoard,
      },
      data() {
        return {
          value: "你好",
        }
      },
      template: `
        <div>
          <input data-mode v-model="value" />
          <Key-Board :blurHide="false" modal />
        </div>
      `,
    }, {
      attachTo: document.querySelector("body")
    });
    wrapper.findComponent({
      name: "KeyBoard"
    });
    const modalWrapper = document.querySelector(".key-board-modal");
    await wrapper.find('input').trigger("focus");
    expect(modalWrapper).not.toBeNull();
    await modalWrapper.dispatchEvent(new Event("click"));
    expect(modalWrapper.getAttribute("style")).toBe("display: none;");
  })

  it('modal wrapper will still exist when closeOnClickModal set false and modal wrapper click', async () => {
    const wrapper = mount({
      components: {
        KeyBoard,
      },
      data() {
        return {
          value: "你好",
        }
      },
      template: `
        <div>
          <input data-mode v-model="value" />
          <Key-Board modal :blurHide="false" :closeOnClickModal="false"/>
        </div>
      `,
    }, {
      attachTo: document.querySelector("body")
    });
    wrapper.findComponent({
      name: "KeyBoard"
    });
    const modalWrapper = document.querySelector(".key-board-modal");
    await wrapper.find('input').trigger("focus");
    expect(modalWrapper).not.toBeNull();
    await modalWrapper.dispatchEvent(new Event("click"));
    expect(modalWrapper.getAttribute("style")).toBe("display: block;");
  })

  it('modalClick event will trigger when model set true and model click', async () => {
    const modalClickEvnet = jest.fn();
    const wrapper = mount({
      components: {
        KeyBoard,
      },
      data() {
        return {
          value: "你好",
        }
      },
      methods: {
        modalClick() {
          modalClickEvnet();
        }
      },
      template: `
        <div>
          <input data-mode v-model="value" />
          <Key-Board modal @modalClick="modalClick"/>
        </div>
      `,
    }, {
      attachTo: document.querySelector("body")
    });
    wrapper.findComponent({
      name: "KeyBoard"
    });
    const modalWrapper = document.querySelector(".key-board-modal");
    await wrapper.find('input').trigger("focus");
    await modalWrapper.dispatchEvent(new Event("click"));
    expect(modalClickEvnet).toHaveBeenCalled();
  })
})