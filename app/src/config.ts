import { existsAsync, read, write } from "fs-jetpack";
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
  type: "x100c";
  ip: string;
  username: string;
  password: string;
  jam_kirim: string[];
};

export const prepareConfig = async () => {
  let config = null as null | Config;
  if (await existsAsync("config.json5")) {
    try {
      config = json5.parse(read("config.json5") || "");
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
        // mesin absensi yg digunakan, bisa diisi banyak mesin
        {
            lokasi: "pintu masuk",        // lokasi mesin absensi nya
            serial_number: "999999999",   // serial number mesin
            type: "x100c",                // tipe mesin: "x100c"
            ip: "192.168.1.99",           // ip mesin 
            username: "1",                // user untuk login ke url mesin
            password: "1",                // pass untuk login ke url mesin
            jam_kirim: ["07.30", "15.40"],// jam kirim ke url server
        },
    ],
}
`;
    config = json5.parse(configSource);
    write("config.json5", configSource);
  }
  return config;
};
