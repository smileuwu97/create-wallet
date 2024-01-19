import { ethers } from 'ethers'
import fs from 'fs'

const password = 'input your password here'

function restore(filePaths: string[], password: string) {
  console.log('========= restore =========');

  for (let i = 0; i < filePaths.length; i++) {
    const json = fs.readFileSync(filePaths[i], 'utf8');

    const account = ethers.Wallet.fromEncryptedJsonSync(json, password);

    // console.log(`${i}: ${account.address} | ${account.privateKey}}`);
    console.log(`${i}: ${account.address}`);
  }
}

restore(
  new Array(15).fill(0).map((_, i) => `./wallets/eth-${i}.json`),
  password
);