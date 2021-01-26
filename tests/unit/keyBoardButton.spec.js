import { mount } from '@vue/test-utils';
import KeyCodeButton from "../../packages/components/keyCodeButtton/index.vue";

describe('keyCodeButton.vue', () => {
    it('button click set value change', async () => {
        const wrapper = mount({
            components: {
                KeyCodeButton,
            },
            provide() {
                return {
                    color: "#ff0000"
                }
            },
            data() {
                return {
                    value: "",
                    type: ""
                }
            },
            methods: {
                trigger({ data, type }) {
                    this.value = data;
                    this.type = type;
                }
            },
            template: `
            <KeyCodeButton type="word" data="q" @click="trigger" />
          `,
        });
        expect(wrapper.vm.$data.value).toBe("");
        expect(wrapper.vm.$data.type).toBe("");
        const button = wrapper.findAll(".key-board-button").at(0);
        await button.trigger("click");
        expect(wrapper.vm.$data.value).toBe("q");
        expect(wrapper.vm.$data.type).toBe("word");
    })
})