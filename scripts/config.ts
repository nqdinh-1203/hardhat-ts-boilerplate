import fs, { promises as f } from "fs";

var config: any;

export async function initConfig() {
    console.log("init");
    config = JSON.parse((await f.readFile("./constants/config.json")).toString());
    return config;
}

export function getConfig() {
    return config;
}

export function setConfig(path: string, val: string) {
    // console.log(config);
    const splitPath = path.split('.').reverse();

    var ref = config;
    while (splitPath.length > 1) {
        let key = splitPath.pop();
        if (key) {
            if (!ref[key])
                ref[key] = {};
            ref = ref[key];
        }
        else {
            return;
        }
    }

    let key = splitPath.pop();
    if (key) {
        ref[key] = val;
    }
}

export async function updateConfig() {
    // console.log("write: ", JSON.stringify(config));
    return f.writeFile('./constants/config.json', JSON.stringify(config, null, 2));
}

export async function exportAbiAndBin(foldername: string, filename: string, contractBin: any, contractABI: any) {
    var dir = __dirname + `/../constants/${foldername}`;

    console.log(dir);

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(`./constants/${foldername}/${filename}.bin`, contractBin);
    fs.writeFileSync(`./constants/${foldername}/${filename}.abi.json`, contractABI);
}