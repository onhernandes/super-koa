import { mergeSuperKoaContexts } from ".";
import { PartialSuperKoaContext } from "../types/SuperKoaContext";

describe("helpers", () => {
  describe("mergeSuperKoaContexts", () => {
    it("merges with only one filled ctx", () => {
      const first: PartialSuperKoaContext = {
        middlewares: {
          auth: {
            test() {
              return true;
            },
          },
        },
      };
      const second: PartialSuperKoaContext = {};
      const result = mergeSuperKoaContexts(first, second);
      expect(result?.middlewares?.auth.test).toBeTruthy();
    });

    it("merges middlewares in both inputs", () => {
      const first: PartialSuperKoaContext = {
        middlewares: {
          auth: {
            test() {
              return true;
            },
          },
        },
      };
      const second: PartialSuperKoaContext = {
        middlewares: {
          auth: {
            otherTest() {
              return true;
            },
          },
        },
      };
      const result = mergeSuperKoaContexts(first, second);
      expect(result?.middlewares?.auth.test).toBeTruthy();
      expect(result?.middlewares?.auth.otherTest).toBeTruthy();
    });
  });
});
