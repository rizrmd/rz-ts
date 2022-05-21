import { prepareConfig } from "./config";
import { CronJob } from "cron";
import { kirimAbsen } from "./kirim-absen";
import { bacaAbsen } from "./baca-absen";
export const main = async () => {
  const config = await prepareConfig();
  const crons = {} as Record<string, CronJob[]>;

  if (config) {
    for (let m of config.mesin) {
      for (let c of m.jam_kirim) {
        if (!crons[m.serial_number]) {
          crons[m.serial_number] = [];
        }
        const cur = crons[m.serial_number];
        const jam = c.split(".").shift() || 0 * 1;
        const menit = c.split(".").pop() || 0 * 1;
        cur.push(
          new CronJob(`${menit} ${jam} * * *`, async () => {
            const proses = async () => {
              const absensi = await bacaAbsen(m);
              await kirimAbsen(m, absensi);
            };

            // coba lagi ketika gagal
            try {
              proses();
            } catch (e) {
              console.error("Gagal mengirim absen:", e);
              try {
                proses();
              } catch (e) {
                console.error("Gagal mengirim absen:", e);
              }
            }
          })
        );
      }
    }
  } else {
    console.log("Error: gagal membaca file config.json5");
  }
};
