import { Component } from '@angular/core';
import Neon from '@cityofzion/neon-js';
import {wallet,api} from '@cityofzion/neon-js';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  constructor() {
  }
  /*
    http://cityofzion.io/neon-js/wallet.html
    Wallet ~ Account
  */
  testNeo() {
    console.log(Neon);
    
    const privateKey = Neon.create.privateKey()
    const wif = Neon.get.WIFFromPrivateKey(privateKey)
    const account = Neon.create.account(privateKey)

    let publicKey = account.publicKey
    let address = account.address
    const balance = new wallet.Balance({net: 'TestNet', address: address})

    let obj = {
      net: "TestNet",
      address: address,
      privateKey: privateKey,
      publicKey: publicKey,
      url: "https://seed1.neo.org:20332",
      balance: balance
    }
    // We get a useful balance that can be used to fill a transaction through api
    // 得到可用的余额
    let filledBalance:any; 
    api.getBalanceFrom(obj, api.neonDB).then(data => {
      filledBalance = data;
      // This contains all symbols of assets available in this balance
      //  查找这个账户可用的所有的资产符号
      const symbols = filledBalance.balance.assetSymbols
      // We retrieve the unspent coins from the assets object using the symbol
      // 未用的NEO
      const neoCoins = filledBalance.balance.assets['NEO'].unspent
    })  
  }
}
