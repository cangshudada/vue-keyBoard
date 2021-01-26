import { useDeepCopy, groupSplitArray } from "@/utils";

describe("util test", () => {
    it("deep clone", async () => {
        const targetObj = { a: 1, b: { c: 2 } };
        const targetArray = [{ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }];
        const cloneObj = useDeepCopy(targetObj);
        const cloneArray = useDeepCopy(targetArray);
        expect(cloneObj === targetObj).toBeFalsy();
        expect(cloneArray === targetArray).toBeFalsy();
        expect(cloneObj).toHaveProperty("b", { c: 2 });
        expect(cloneArray).toContainEqual({ a: 1, b: { c: 2 } });
    })

    it("group split", async () => {
        const targetArray1 = [1, 2, 3];
        const targetArray2 = [1, 2, 3, 4, 5];
        const splitArray1 = groupSplitArray(targetArray1, 3);
        const splitArray2 = groupSplitArray(targetArray2, 3);
        expect(splitArray1.length).toBe(1);
        expect(splitArray2.length).toBe(2);
    })
})