declare let window:any
import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { FormControl, FormGroup } from "@angular/forms";

import addresses from "../../environment/contract-address.json";
// import abi's => json representation of our SM, so this abi tells ether how to interact with SM through api
import Bank from "../../blockchain/artifacts/blockchain/contracts/Bank.sol/Bank.json";
import Token from "../../blockchain/artifacts/blockchain/contracts/Token.sol/Token.json";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// declare some state variables
export class AppComponent implements OnInit {
  title = 'decentralized-bank';

  public depositForm: FormGroup;
  public withdrawForm: FormGroup;

  public signer: any;

  public bankContract: any;
  public tokenContract: any;

  public userTotalAssets: any;
  public userTotalToken: any;
  public totalAssets: any;
  public signerAddress: any;

  constructor(){
    this.depositForm = new FormGroup({
      DepositAmount: new FormControl()
    });
    this.withdrawForm = new FormGroup({
      WithdrawAmount: new FormControl()
    });
  }

  // ngOnInit is an angular function, when the page gets initialised, then ngOnInit function is called
  // async ngOnInit(): void {
    async ngOnInit() {
      // const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // await provider.send('eth_requestAccounts', []); // <- this promps user to connect metamask

      // here user switches between networks, then page reloads.
      provider.on("network", (newNetwork: any, oldNetwork: any) => {
        if(oldNetwork){
          window.location.reload();
        }
      });

      this.signer = provider.getSigner();

      //       Instead of using provider.getSigner() to initialize the kyber contract, I used a Wallet object and grabbed the signer from there:

      // const wallet = new ethers.Wallet(ethPrivkey, provider);
      // const signer = wallet.provider.getSigner(wallet.address);

      // const kyber = new ethers.Contract(
      //     kyberNetworkProxyAddress,
      //     kyberABI.kyberNetworkProxy,
      //     signer
      // );

      // if(await this.signer.getChainId() !== 80001){
        if(await this.signer.getChainId() !== 5){
        alert("Please change your network to goerelli testnet!");
      } 

      this.bankContract = new ethers.Contract(addresses.bankcontract, Bank.abi, this.signer);
      this.tokenContract = new ethers.Contract(addresses.tokencontract, Token.abi, this.signer);

      // formatEther => converts a big hexadecimal numbers like 1.00000004 (which basically contains 18 zeros) ethers into ethers, into human readable format like 1.0
      this.userTotalAssets = ethers.utils.formatEther((await this.bankContract.accounts(await this.signer.getAddress())));
      this.userTotalToken = ethers.utils.formatEther((await this.bankContract.totalAssets()));
      this.totalAssets = ethers.utils.formatEther((await this.tokenContract.balanceOf(await this.signer.getAddress())));
      this.signerAddress = await this.signer.getAddress();
  }

  async deposit(){
    try {

      console.log("deposit called");
      const tx = await this.bankContract.deposit(
        {value: ethers.utils.parseEther(this.depositForm.value.DepositAmount.toString())}
      );
      await tx.wait();

      this.depositForm.reset();
      window.location.reload();

    } catch (err) {
      console.log("error in deposit: ",err);

    }
  
  }

  async withdraw(){
    try {
      console.log("withdraw called");
      const tx = await this.bankContract.withdraw(
        ethers.utils.parseEther(this.withdrawForm.value.WithdrawAmount.toString()),
        addresses.tokencontract
      )
      await tx.wait();

      this.withdrawForm.reset();
      window.location.reload();
      
    } catch (err) {
      console.log("error in withdraw: ",err);
    }
  }
}
