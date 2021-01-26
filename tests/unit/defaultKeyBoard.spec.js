import { mount } from '@vue/test-utils';
import { NUMBER_CODE, SYMBOL_CODE } from "@/constants/key_code";
import DefaultKeyBoard from "../../packages/components/default/index.vue";
import pinyin_dict_note from '@/constants/pinyin_dict_note';

describe('defaultKeyBoard.vue', () => {
    it('init default keyboard without handApi', async () => {
        const closeKeyBoard = jest.fn()
        const wrapper = mount({
            components: {
                DefaultKeyBoard,
            },
            provide() {
                return {
                    color: "#eaa050",
                    modeList: ["handwrite", "symbol"],
                    handApi: "",
                    closeKeyBoard
                }
            },
            template: `
            <DefaultKeyBoard />
          `,
        });

        expect(wrapper.findComponent({ name: "DefaultKeyBoard" }).vm.$data.line4).not.toContainEqual({
            data: "",
            type: "handwrite",
        });
    })

    it('set handApi can show handWrite mode', async () => {
        const closeKeyBoard = jest.fn()
        const wrapper = mount({
            components: {
                DefaultKeyBoard,
            },
            provide() {
                return {
                    color: "#eaa050",
                    modeList: ["handwrite", "symbol"],
                    handApi: "https://xxxx",
                    closeKeyBoard
                }
            },
            template: `
            <DefaultKeyBoard />
          `,
        });

        expect(wrapper.findComponent({ name: "DefaultKeyBoard" }).vm.$data.line4).toContainEqual({
            data: "",
            type: "handwrite",
        });
    })

    it('trigger keyboard close', async () => {
        const closeKeyBoard = jest.fn()
        const wrapper = mount({
            components: {
                DefaultKeyBoard,
            },
            provide() {
                return {
                    color: "#eaa050",
                    modeList: ["handwrite", "symbol"],
                    handApi: "",
                    closeKeyBoard
                }
            },
            template: `
            <DefaultKeyBoard />
          `,
        });

        const keyCodeButton = wrapper.findComponent({ name: "DefaultKeyBoard" }).findAll(".key-board-button");
        const closeButton = keyCodeButton.at(keyCodeButton.length - 1);
        await closeButton.trigger("click");
        expect(closeKeyBoard).toHaveBeenCalled();
    })

    it('trigger keyboard upper mode', async () => {
        const closeKeyBoard = jest.fn()
        const wrapper = mount({
            components: {
                DefaultKeyBoard,
            },
            provide() {
                return {
                    color: "#eaa050",
                    modeList: ["handwrite", "symbol"],
                    handApi: "",
                    closeKeyBoard
                }
            },
            template: `
            <DefaultKeyBoard />
          `,
        });

        expect(wrapper.findComponent({ name: "DefaultKeyBoard" }).vm.$data.isUpper).toBe(false);
        const keyCodeButton = wrapper.findComponent({ name: "DefaultKeyBoard" }).findAll(".key-board-button");
        const upperButton = keyCodeButton.at(19);
        await upperButton.trigger("click");
        expect(wrapper.findComponent({ name: "DefaultKeyBoard" }).vm.$data.isUpper).toBe(true);
    })

    it('trigger keyboard language mode', async () => {
        const closeKeyBoard = jest.fn()
        const wrapper = mount({
            components: {
                DefaultKeyBoard,
            },
            provide() {
                return {
                    color: "#eaa050",
                    modeList: ["handwrite", "symbol"],
                    handApi: "",
                    closeKeyBoard
                }
            },
            template: `
            <DefaultKeyBoard />
          `,
        });

        expect(wrapper.findComponent({ name: "DefaultKeyBoard" }).vm.$data.isCn).toBe(true);
        const keyCodeButton = wrapper.findComponent({ name: "DefaultKeyBoard" }).findAll(".key-board-button");
        const languageButton = keyCodeButton.at(29);
        await languageButton.trigger("click");
        expect(wrapper.findComponent({ name: "DefaultKeyBoard" }).vm.$data.isCn).toBe(false);
    })

    it('trigger keyboard number mode', async () => {
        const closeKeyBoard = jest.fn()
        const wrapper = mount({
            components: {
                DefaultKeyBoard,
            },
            provide() {
                return {
                    color: "#eaa050",
                    modeList: ["handwrite", "symbol"],
                    handApi: "",
                    closeKeyBoard
                }
            },
            template: `
            <DefaultKeyBoard />
          `,
        });

        expect(wrapper.findComponent({ name: "DefaultKeyBoard" }).vm.$data.isNum).toBe(false);
        expect(wrapper.findComponent({ name: "DefaultKeyBoard" }).vm.$data.lineList).not.toContainEqual(NUMBER_CODE.line3);
        const keyCodeButton = wrapper.findComponent({ name: "DefaultKeyBoard" }).findAll(".key-board-button");
        const numberButton = keyCodeButton.at(28);
        await numberButton.trigger("click");
        expect(wrapper.findComponent({ name: "DefaultKeyBoard" }).vm.$data.isNum).toBe(true);
        expect(wrapper.findComponent({ name: "DefaultKeyBoard" }).vm.$data.lineList).toContainEqual(NUMBER_CODE.line3);
    })

    it('trigger keyboard symbol mode', async () => {
        const closeKeyBoard = jest.fn()
        const wrapper = mount({
            components: {
                DefaultKeyBoard,
            },
            provide() {
                return {
                    color: "#eaa050",
                    modeList: ["handwrite", "symbol"],
                    handApi: "",
                    closeKeyBoard
                }
            },
            template: `
            <DefaultKeyBoard />
          `,
        });

        expect(wrapper.findComponent({ name: "DefaultKeyBoard" }).vm.$data.isSymbol).toBe(false);
        expect(wrapper.findComponent({ name: "DefaultKeyBoard" }).vm.$data.lineList).not.toContainEqual(SYMBOL_CODE.line1);
        const numberButton = wrapper.findComponent({ name: "DefaultKeyBoard" }).findAll(".key-board-button").at(28);
        await numberButton.trigger("click");
        const symbolButton = wrapper.findComponent({ name: "DefaultKeyBoard" }).findAll(".key-board-button").at(19);
        await symbolButton.trigger("click");
        expect(wrapper.findComponent({ name: "DefaultKeyBoard" }).vm.$data.isSymbol).toBe(true);
        expect(wrapper.findComponent({ name: "DefaultKeyBoard" }).vm.$data.lineList).toContainEqual(SYMBOL_CODE.line3);
    })

    it('trigger keyboard handwrite mode', async () => {
        const closeKeyBoard = jest.fn();
        const wrapper = mount({
            components: {
                DefaultKeyBoard,
            },
            data() {
                return {
                    data: "",
                    type: ""
                }
            },
            provide() {
                return {
                    color: "#eaa050",
                    modeList: ["handwrite", "symbol"],
                    handApi: "https://xxxx",
                    closeKeyBoard
                }
            },
            methods: {
                trigger({
                    data,
                    type,
                }) {
                    this.data = data;
                    this.type = type;
                }
            },
            template: `
            <DefaultKeyBoard @trigger="trigger"/>
          `,
        });

        expect(wrapper.vm.$data.data).toBe("");
        expect(wrapper.vm.$data.type).toBe("");
        const keyCodeButton = wrapper.findComponent({ name: "DefaultKeyBoard" }).findAll(".key-board-button");
        const handwriteButton = keyCodeButton.at(30);
        await handwriteButton.trigger("click");
        expect(wrapper.vm.$data.data).toBe("");
        expect(wrapper.vm.$data.type).toBe("handwrite");
    })

    it('trigger keyboard delete', async () => {
        const closeKeyBoard = jest.fn();
        const wrapper = mount({
            components: {
                DefaultKeyBoard,
            },
            data() {
                return {
                    value: "hi girl!"
                }
            },
            provide() {
                return {
                    color: "#eaa050",
                    modeList: ["handwrite", "symbol"],
                    handApi: "https://xxxx",
                    closeKeyBoard
                }
            },
            methods: {
                trigger({
                    type,
                }) {
                    if (type === "delete") {
                        this.value = this.value.substr(0, this.value.length - 1)
                    }
                }
            },
            template: `
            <DefaultKeyBoard @trigger="trigger"/>
          `,
        });

        expect(wrapper.vm.$data.value).toBe("hi girl!");
        const keyCodeButton = wrapper.findComponent({ name: "DefaultKeyBoard" }).findAll(".key-board-button");
        const deleteButton = keyCodeButton.at(27);
        await deleteButton.trigger("click");
        expect(wrapper.vm.$data.value).toBe("hi girl");
    })

    it('type word', async () => {
        const closeKeyBoard = jest.fn();
        const wrapper = mount({
            components: {
                DefaultKeyBoard,
            },
            data() {
                return {
                    value: ""
                }
            },
            provide() {
                return {
                    color: "#eaa050",
                    modeList: ["handwrite", "symbol"],
                    handApi: "https://xxxx",
                    closeKeyBoard
                }
            },
            methods: {
                translate(value) {
                    this.value = pinyin_dict_note[value];
                }
            },
            template: `
            <DefaultKeyBoard @translate="translate"/>
          `,
        });

        expect(wrapper.vm.$data.value).toBe("");
        const keyCodeButton = wrapper.findComponent({ name: "DefaultKeyBoard" }).findAll(".key-board-button");
        const deleteButton = keyCodeButton.at(2);
        await deleteButton.trigger("click");
        expect(wrapper.vm.$data.value).toBe("额阿俄恶鹅遏鄂厄饿峨扼娥鳄哦蛾噩愕讹锷垩婀鹗萼谔莪腭锇颚呃阏屙苊轭");
    })
})