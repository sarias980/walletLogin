import { Component } from '@angular/core';
import Web3 from 'web3';
import Torus, { TorusInpageProvider } from "@toruslabs/torus-embed";
import { AbstractProvider } from "web3-core";
import Fortmatic from 'fortmatic';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  web3: Web3;
  torus: Torus;
  fortmatic;

  constructor() {
    this.web3 = new Web3();
    this.torus = new Torus({});
    this.fortmatic = new Fortmatic('pk_live_13D46A6E33995083');
  }

  async openTorus() {
    try {
    console.log("TORUS");
    await this.torus.init(
      { 
        //buildEnv: 'development', // default: production
        //enableLogging: true,
        network: {
          host: 'mumbai', // optional
          chainId: 80001, // optional
        },
        showTorusButton: false // default: true
      }
    );
    //await this.torus.ethereum.enable();
    await this.torus.login(); // await torus.ethereum.enable()
    this.web3.setProvider(this.torus.provider as AbstractProvider);

    this.torus.provider.on("chainChanged", (resp) => {
      console.log(resp, "chainchanged");
      //this.chainId = parseInt(resp as string, 10);
    });

    this.torus.provider.on("accountsChanged", (accounts) => {
      console.log(accounts, "accountsChanged");
      //this.publicAddress = (Array.isArray(accounts) && accounts[0]) || "";
    });

    const accounts = await this.web3.eth.getAccounts();
    console.log("Torus accounts[0]", accounts[0]);
  } catch (error) {
    console.error(error, "caught in vue-app");
  }

  }

  async openFortmatic() {
    this.web3.setProvider(this.fortmatic.getProvider() as unknown as AbstractProvider);
    //this.web3.currentProvider.enable();
    const accounts = await this.web3.eth.getAccounts();
    console.log("Formatic accounts[0]", accounts[0]);
  }
}
