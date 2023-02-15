import { listAllFilesFromPath } from "./fs";
import { resolve } from "node:path";

describe("api", () => {
  describe("api/fs", () => {
    it("list all .ts files within a directory", () => {
      const result = listAllFilesFromPath(resolve(__dirname), [".ts"]);
      expect(Array.isArray(result)).toBe(true);

      result.forEach((filepath: string) => {
        expect(filepath).toContain(".ts");
      });
    });
  });
});
