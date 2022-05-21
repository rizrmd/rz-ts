import { FingerConfig } from "./config";
import { AbsenItem } from "./kirim-absen";
import { x100c } from "./mesin/x100c";

export const bacaAbsen = async (finger: FingerConfig): Promise<AbsenItem[]> => {
  switch (finger.type) {
    case "x100c":
      return await x100c.read(finger);
  }

  return [];
};
