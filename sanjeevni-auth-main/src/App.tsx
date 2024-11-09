import { useState, useEffect } from "react";
import {
  ParticleAuthModule,
  ParticleProvider,
} from "@biconomy/particle-auth";
import { IPaymaster, BiconomyPaymaster } from '@biconomy/paymaster'
import { IBundler, Bundler } from '@biconomy/bundler'
import { BiconomySmartAccountV2, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account"
import { ethers } from 'ethers';
import { DEFAULT_ECDSA_OWNERSHIP_MODULE, ECDSAOwnershipValidationModule } from "@biconomy/modules";
import { Web3Storage } from "web3.storage";
import { sha256 } from "ethers/lib/utils";

const particle = new ParticleAuthModule.ParticleNetwork({
  projectId: "dc8fc110-da0e-4b55-b4c6-04af3aa9cb99",
  clientKey: "cZmQiTMX9UJdPf7Dw9aA65d7skboxDqOAJXzzepq",
  appId: "d461bb0f-9ddb-4f26-981e-a82f574d11af",
  chainName: "Ethereum",
  chainId: 5,
  wallet: {
    displayWalletEntry: true,
    defaultWalletEntryPosition: ParticleAuthModule.WalletEntryPosition.BR,
    uiMode: "dark",
    supportChains: [
      { id: 5, name: "Ethereum Goerli" },
    ],
    customStyle: {},
  },
});


const bundler: IBundler = new Bundler({
  bundlerUrl: 'https://bundler.biconomy.io/api/v2/5/P7mvTn_r9.01a23e06-c742-4288-8611-0c09c2414b7e',     
  chainId: 5,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
})


const paymaster: IPaymaster = new BiconomyPaymaster({
paymasterUrl: 'https://paymaster.biconomy.io/api/v1/5/P7mvTn_r9.01a23e06-c742-4288-8611-0c09c2414b7e' 
})

const storage = new Web3Storage({ token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDVkZWViZDlBYUNjZGYwZGQ5YmY4ZTg2ODBCMzE2Nzg0NWZlMDk5ZWMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTg1NTIxMDQyODYsIm5hbWUiOiJIVE0ifQ.SId4_xU-jEUwJPQXwBFCgcoiqPVZapV5w1WqVH1z5Ro` });


export default function App() {
  const [account, setAccount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [address, setAddress] = useState("");

  const connect = async () => {
    try {
      const userInfo = await particle.auth.login();
      console.log("Logged in user:", userInfo);
      const particleProvider = new ParticleProvider(particle.auth);
      const web3Provider = new ethers.providers.Web3Provider(
        particleProvider,
        "any"
      );
  
      const module = await ECDSAOwnershipValidationModule.create({
        signer: web3Provider.getSigner(),
        moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE,
      });
  
      let biconomySmartAccount = await BiconomySmartAccountV2.create({
        chainId: 5,
        bundler: bundler,
        paymaster: paymaster,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
        defaultValidationModule: module,
        activeValidationModule: module,
      });
  
      const address = await biconomySmartAccount.getAccountAddress();
      console.log(address);
  
      const data = { address: address };
      const finalContent = JSON.stringify(data);
      const encoder = new TextEncoder();
      const dataAsBytes = encoder.encode(finalContent);
      const file = new File([finalContent], await sha256(dataAsBytes), {
        type: "text/plain",
      });
      const cid = await storage.put([file]);
  
      if (cid) {
        const web3ResponseObject = await storage.get(cid);
  
        if (web3ResponseObject) {
          const files = await web3ResponseObject.files();
          console.log(files[0].cid);
        } else {
          console.error("web3ResponseObject is null");
        }
      } else {
        console.error("CID is null");
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    // Reset txHash when the account state changes
    setTxHash("");
  }, [account]);

  return (
    <main className="App">
      <h1>Biconomy ↔ Particle Auth</h1>
      <button onClick={connect}>
        {!account ? "Login" : "Logout"}
      </button>

      <h1>{address}</h1>
    </main>
  );
};