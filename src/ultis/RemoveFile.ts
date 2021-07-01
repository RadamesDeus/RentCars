import fs from "fs";
import path from "path";

import UploadConfig from "../config/upload";
import AppError from "../errors/AppError";

export const RemoveFile = async (filename: string): Promise<void> => {
  const filePath = path.resolve(UploadConfig.pathTmp, filename);

  try {
    await fs.promises.stat(filePath);
    await fs.promises.unlink(filePath);
  } catch {
    throw new AppError("Couldn't remove the file");
  }
};
/*

export default class RemoveFile {
  static async execute(filename: string): Promise<void> {
    const filePath = path.resolve(UploadConfig.pathTmp, filename);
    console.log("RemoveFile filePath", filePath);

    try {
      await fs.promises.stat(filePath);
      await fs.promises.unlink(filePath);
    } catch {
      throw new AppError("Couldn't remove the file");
    }
  }
}
*/
