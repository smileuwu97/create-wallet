import { ethers } from "ethers";
import fs from "fs";

export function createWallets(count: number): ethers.HDNodeWallet[] {
  const wallets: ethers.HDNodeWallet[] = [];
  for (let i = 0; i < count; i++) {
    wallets.push(ethers.Wallet.createRandom());
  }
  return wallets;
}

export async function dumpWallets(
  wallets: ethers.HDNodeWallet[],
  password: string,
  filePath: string
) {
  const obj = await toJsonObject(wallets, password);
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), { flag: "wx" });
}

export async function restoreWallets(
  jsonObjectOrFilePath: string | { [k: string]: string },
  password: string
) {
  let jsonObject: { [k: string]: string };
  if (typeof jsonObjectOrFilePath === "string") {
    jsonObject = JSON.parse(fs.readFileSync(jsonObjectOrFilePath, "utf8"));
  } else {
    jsonObject = jsonObjectOrFilePath;
  }

  const wallets = await fromJsonObject(jsonObject, password);
  return wallets;
}

export async function toJsonObject(
  wallets: ethers.HDNodeWallet[],
  password: string
): Promise<any> {
  const obj: any = { wallets: [] };

  for (const wallet of wallets) {
    const json = await wallet.encrypt(password);
    obj.wallets.push({
      address: wallet.address.toLowerCase(),
      json,
    });
  }

  return obj;
}

export async function fromJsonObject(
  jsonObject: any,
  password: string
): Promise<ethers.HDNodeWallet[]> {
  const wallets: ethers.HDNodeWallet[] = [];

  for (const item of jsonObject.wallets) {
    const wallet = (await ethers.Wallet.fromEncryptedJson(
      item.json,
      password
    )) as ethers.HDNodeWallet;
    wallets.push(wallet);
  }

  return wallets;
}
