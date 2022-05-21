import { FingerConfig } from "../config";
import { AbsenItem } from "../kirim-absen";
import { CookieJar } from "tough-cookie";
import cheerio from "cheerio";
const cookieJar = new CookieJar();
export const x100c = {
  login: async (finger: FingerConfig) => {
    await got.get(`http://${finger.ip}`, { cookieJar });
    await got.post(`http://${finger.ip}/csl/check`, {
      cookieJar,
      form: {
        username: "1",
        userpwd: "1",
      },
    });
  },
  read: async (finger: FingerConfig): Promise<AbsenItem[]> => {
    await x100c.login(finger);

    const report = await got.get(
      `http://${finger.ip}/csl/report?first=0&last=10000`,
      {
        cookieJar,
      }
    );

    const $ = cheerio.load(report.body);
    const dt = Math.round(new Date().getTime() / 1000);

    const rows = $("#cc tr");
    const result = [] as {
      dept: string;
      id: string;
      name: string;
      card: string;
      group: string;
      role: string;
    }[];
    for (const row of rows) {
      result.push({
        dept: $(row).find("td:eq(1)").text(),
        id: $(row).find("td:eq(2)").text(),
        name: $(row).find("td:eq(3)").text(),
        card: $(row).find("td:eq(4)").text(),
        group: $(row).find("td:eq(5)").text(),
        role: $(row).find("td:eq(6)").text(),
      });
    }
    return result.map((e) => {
      return [finger.serial_number, e.id, dt, 1];
    });
  },
};
