import { FingerConfig } from "./config";

export type AbsenItem = [
  serial_number: string,
  nip_nis_nim: string,
  php_datetime: number,
  inode: number
];

export const kirimAbsen = async (
  finger: FingerConfig,
  absensi: AbsenItem[]
) => {};
