import { createWallets, dumpWallets, restoreWallets } from "./wallet";

const password = "";

async function main() {
  {
    console.log("========== create wallets");
    const wallets = createWallets(5);
    for (const wallet of wallets) {
      console.log(
        "address: %s, privateKey: %s",
        wallet.address,
        wallet.privateKey
      );
    }

    console.log("========== dump wallets");
    await dumpWallets(wallets, password, "./nft-wallets.json");
  }

  {
    console.log("========== restore wallets");
    const wallets = await restoreWallets("./nft-wallets.json", password);
    for (const wallet of wallets) {
      console.log(wallet.address, wallet.privateKey);
    }
  }
}

main();
