import { Component } from '@angular/core';
import Web3 from 'web3';
import Torus from '@toruslabs/torus-embed';
import Fortmatic from 'fortmatic';
import {AbstractProvider} from "web3-core";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  web3 = null;
  formaticProvider = new Fortmatic('pk_live_13D46A6E33995083');

  constructor() {}

  async openTorus() {
    const torus = new Torus();
    await torus.init({
      buildEnv: 'development', // default: production
      enableLogging: true,
      network: {
        host: 'mumbai', // optional
        chainId: 80001, // optional
      },
      showTorusButton: true // default: true
    });
    await torus.ethereum.enable();
    this.web3 = new Web3(torus.provider as AbstractProvider);
  }

  async openFortmatic() {
    const fortmatic = this.formaticProvider;
    this.web3 = new Web3(fortmatic.getProvider() as unknown as AbstractProvider);
    this.web3.currentProvider.enable();
  }
}
