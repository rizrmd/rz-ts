import { readFile, pathExists, writeJson, writeFile } from "fs-extra";
import json5 from "json5";

export type Config = {
  bcn: string;
  url: string;
  auth: {
    username: string;
    password: string;
  };
  mesin: FingerConfig[];
};

export type FingerConfig = {
  lokasi: string;
  serial_number: string;
  type: "h-101";
  url: string;
  username: string;
  password: string;
  jam_kirim: string[];
};

export const prepareConfig = async () => {
  let config = null as null | Config;
  if (await pathExists("config.json5")) {
    try {
      config = json5.parse(await readFile("config.json5", "utf-8"));
    } catch (e) {
      console.log("Failed to parse config.json5");
    }
  }

  if (config === null) {
    const configSource = `\
{
    url: "",                          //contoh: ms.class.id
    auth: {
        username: "",                 //user admin yg digunakan untuk mengirim
        password: "",                 //password user nya
    },
    mesin: [
        // mesin absensi yg digunakan, bisa diisi banyak mesin,
        // copy terus di kasih koma (,)
        {
            lokasi: "pintu masuk",        // lokasi mesin absensi nya
            serial_number: "999999999",   // serial number mesin
            type: "h-101",                // "h-101" atau "h-104"
            url: "",                      // url admin mesin 
            username: "1",                // user untuk login ke url mesin
            password: "1",                // pass untuk login ke url mesin
            jam_kirim: ["15.30", "08.40"],// jam kirim ke url server
        },
    ],
}
`;
    config = json5.parse(configSource);
    await writeFile("config.json5", configSource);
  }
  return config;
};
