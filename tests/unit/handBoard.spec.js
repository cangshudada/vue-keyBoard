import { mount } from '@vue/test-utils';
import PaintPart from "../../packages/components/handBoards/index.vue";
import PaintBoard from "../../packages/components/handBoards/paintBoard.vue";

describe("paintPart", () => {
    it("trigger back button", async () => {
        const closeKeyBoard = jest.fn();
        const changeDefaultBoard = jest.fn();
        const wrapper = mount({
            components: {
                PaintPart,
            },
            provide() {
                return {
                    color: "#ff0000",
                    closeKeyBoard,
                    changeDefaultBoard
                }
            },
            template: `
            <PaintPart />
          `,
        });

        const keyCodeButton = wrapper.findComponent({ name: "PaintPart" }).findAll(".key-board-button");
        const backButton = keyCodeButton.at(1);
        await backButton.trigger("click");
        expect(changeDefaultBoard).toHaveBeenCalled();
    })

    it("trigger close button", async () => {
        const closeKeyBoard = jest.fn();
        const changeDefaultBoard = jest.fn();
        const wrapper = mount({
            components: {
                PaintPart,
            },
            provide() {
                return {
                    color: "#ff0000",
                    closeKeyBoard,
                    changeDefaultBoard
                }
            },
            template: `
            <PaintPart />
          `,
        });

        const keyCodeButton = wrapper.findComponent({ name: "PaintPart" }).findAll(".key-board-button");
        const closeButton = keyCodeButton.at(3);
        await closeButton.trigger("click");
        expect(closeKeyBoard).toHaveBeenCalled();
    })

    it("change handwrite language", async () => {
        const closeKeyBoard = jest.fn();
        const changeDefaultBoard = jest.fn();
        const wrapper = mount({
            components: {
                PaintPart,
            },
            provide() {
                return {
                    color: "#ff0000",
                    closeKeyBoard,
                    changeDefaultBoard
                }
            },
            template: `
            <PaintPart />
          `,
        });

        const paintPart = wrapper.findComponent({ name: "PaintPart" });
        expect(paintPart.vm.$data.isCn).not.toBeFalsy();
        const languageButton = wrapper.findComponent({ name: "PaintPart" }).findAll(".key-board-button").at(0);
        await languageButton.trigger("click");
        expect(paintPart.vm.$data.isCn).toBeFalsy();
    })

    it('trigger delete button', async () => {
        const closeKeyBoard = jest.fn();
        const changeDefaultBoard = jest.fn();
        const wrapper = mount({
            components: {
                PaintPart,
            },
            data() {
                return {
                    value: "hi girl!"
                }
            },
            provide() {
                return {
                    color: "#ff0000",
                    closeKeyBoard,
                    changeDefaultBoard
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
            <PaintPart @trigger="trigger"/>
          `,
        });

        expect(wrapper.vm.$data.value).toBe("hi girl!");
        const keyCodeButton = wrapper.findComponent({ name: "PaintPart" }).findAll(".key-board-button");
        const deleteButton = keyCodeButton.at(2);
        await deleteButton.trigger("click");
        expect(wrapper.vm.$data.value).toBe("hi girl");
    })

    it("create handPaint board", async () => {
        const closeKeyBoard = jest.fn();
        const changeDefaultBoard = jest.fn();
        const wrapper = mount({
            components: {
                PaintPart,
            },
            provide() {
                return {
                    color: "#ff0000",
                    closeKeyBoard,
                    changeDefaultBoard
                }
            },
            template: `
            <PaintPart />
          `,
        });

        const paintPart = wrapper.findComponent({ name: "PaintPart" });
        expect(paintPart.find("canvas").exists()).toBe(true);
    })

    it("trigger handPaint mouseDown mouseMove and mouseUp", async () => {
        const closeKeyBoard = jest.fn();
        const changeDefaultBoard = jest.fn();
        const wrapper = mount({
            components: {
                PaintPart,
            },
            provide() {
                return {
                    color: "#ff0000",
                    closeKeyBoard,
                    changeDefaultBoard
                }
            },
            template: `
            <PaintPart />
          `,
        });

        const paintPart = wrapper.findComponent({ name: "PaintPart" });
        const paintBoard = paintPart.findComponent({ name: "PaintBoard" });
        const paintBoardDom = paintBoard.find("canvas");
        expect(paintBoard.vm.$data.isMouseDown).toBeFalsy();
        await paintBoardDom.trigger("mousedown");
        expect(paintBoard.vm.$data.isMouseDown).toBeTruthy();
        expect(paintBoard.vm.$data.clickX.length).toBe(0);
        await paintBoardDom.trigger("mousemove");
        expect(paintBoard.vm.$data.clickX.length).not.toBe(0);
        await paintBoardDom.trigger("mouseup");
        expect(paintBoard.vm.$data.isMouseDown).toBeFalsy();
    })

    it("trigger handPaint touchstart touchmove and touchend", async () => {
        const closeKeyBoard = jest.fn();
        const changeDefaultBoard = jest.fn();
        const wrapper = mount({
            components: {
                PaintPart,
            },
            provide() {
                return {
                    color: "#ff0000",
                    closeKeyBoard,
                    changeDefaultBoard
                }
            },
            template: `
            <PaintPart />
          `,
        });

        const paintPart = wrapper.findComponent({ name: "PaintPart" });
        const paintBoard = paintPart.findComponent({ name: "PaintBoard" });
        const paintBoardDom = paintBoard.find("canvas");
        expect(paintBoard.vm.$data.isMouseDown).toBeFalsy();
        await paintBoardDom.trigger("touchstart");
        expect(paintBoard.vm.$data.isMouseDown).toBeTruthy();
        expect(paintBoard.vm.$data.clickX.length).toBe(0);
        await paintBoardDom.trigger("touchmove");
        expect(paintBoard.vm.$data.clickX.length).not.toBe(0);
        await paintBoardDom.trigger("touchend");
        expect(paintBoard.vm.$data.isMouseDown).toBeFalsy();
    })
})