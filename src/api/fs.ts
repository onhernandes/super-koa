// Copyright (c) 2023, Matheus Hernandes. All rights reserved.

import fs from "node:fs";
import { join } from "node:path";

export const listAllFilesFromPath = (
  path: string,
  acceptableFileExtensions: string[],
  files: string[] = []
): string[] => {
  const foundFiles = fs.readdirSync(path as fs.PathLike);

  foundFiles.forEach((file: string) => {
    const filePath = `${path}/${file}`;
    const isDirectory = fs.statSync(filePath);

    if (isDirectory) {
      files = listAllFilesFromPath(filePath, acceptableFileExtensions, files);
      return;
    }

    const fileExtChecks = acceptableFileExtensions.map((fileExt: string) =>
      file.includes(fileExt)
    );
    const hasValidFileExtension = fileExtChecks.some(
      (check: boolean) => check === true
    );

    if (hasValidFileExtension) {
      files.push(join(__dirname, path, "/", file));
    }
  });

  return files;
};
