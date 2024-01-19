import { ethers } from 'ethers'
import fs from 'fs'

const password = 'input your password here'

function generate(count: number) {
  fs.mkdirSync('./wallets', { recursive: true });

  for (let i = 0; i < count; i++) {
    const account = ethers.Wallet.createRandom();
    // console.log(account.address, '|', account.privateKey);
    console.log(account.address);

    const json = account.encryptSync(password);
    fs.writeFileSync(`./wallets/eth-${i}.json`, json, { flag: 'wx' });
  }
}

generate(15);
