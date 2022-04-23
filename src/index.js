const {connect, Contract, WalletAccount, keyStores, utils} = require('near-api-js');

import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'



const MONSTER_CONSTRUCTOR = require("./monster_constructor");

const monster_constructoror = new MONSTER_CONSTRUCTOR();

function getNearConfig(networkId) {
    return {
        networkId: networkId,
        nodeUrl: `https://rpc.${networkId}.near.org`,
        contractName: `dev-1650561550422-61788933866863`,
        walletUrl: `https://wallet.${networkId}.near.org`,
        helperUrl: `https://helper.${networkId}.near.org`,
    }
}
window.nearConfig = getNearConfig('testnet');

async function initContract() {
    window.near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, window.nearConfig));
  
    window.walletAccount = new WalletAccount(window.near);
  
    window.accountId = window.walletAccount.getAccountId();
  
    window.contract = new Contract(
        window.walletAccount.account(),
        window.nearConfig.contractName, {
            viewMethods: ['nft_supply_for_owner', 'nft_tokens_for_owner', 'nft_metadata', 'nft_tokens_for_owner_set', 'nft_token'],
            changeMethods: ['nft_mint', 'new_default_meta'],
        }
    );

}


async function doWork() {
    if (!window.walletAccount.isSignedIn()) {
        signedOutFlow();
    } else {
        signedInFlow();
    }
}

function signedOutFlow() {
    Array.from(document.querySelectorAll('.hide-signed-out')).forEach(el => el.style.visibility = 'hidden');

    document.getElementById('sign-in').addEventListener('click', () => {
        window.walletAccount.requestSignIn(window.nearConfig.contractName);
    });
}
  

async function signedInFlow() {
    Array.from(document.querySelectorAll('.hide-signed-out')).forEach(el => el.style.visibility = 'visible');

    document.getElementById('sign-in').innerText = window.accountId;


    send_answer_button.innerHTML = 'Create';
    send_answer_button.disabled = false;


    document.getElementById('sign-in').addEventListener('click', e => {
        e.preventDefault();
        window.walletAccount.signOut();
        window.location.replace(window.location.origin + window.location.pathname);
    });

}



const send_answer_button = document.getElementById('send_answer_button');

send_answer_button.onclick = async () => {
    send_answer_button.innerHTML = '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" style="margin-right: 5px"></span>Sending image to IPFS...';
    send_answer_button.disabled = true;

    monster_constructoror.canvas.toBlob(async (blob) => {

        const files = [
            new File([blob], `${window.accountId}.png`, { type: "image/png" })
        ]

        const client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFGM0Y0NUVDNTNFRWUxOEQ3OGQzRDk5REJlNGVjMGUwYTg3NmQ4NkMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTA1NTY2ODExOTEsIm5hbWUiOiJzcHJpbmdfbmVhcl9uZnRfbWludGVyIn0.hHCyxm3rMvmqfH65sY9H37apdfnGyrETpXJMypFiqKc' })
        const cid = await client.put(files);

        const url = `https://${cid}.ipfs.dweb.link/${window.accountId}.png`;

        await window.contract.nft_mint({
            args: {
                token_id: window.accountId,
                receiver_id: window.accountId,
                token_metadata: {

                    media: url
                }
            }, 
            gas: "300000000000000",
            amount: utils.format.parseNearAmount("1")
        });
        
    }, 'image/png');


}




window.onload = async () => {
    await monster_constructoror.load();
    await initContract();
    doWork();

    const token = await window.contract.nft_token({
        token_id: window.accountId
    });

    if(token) {


        send_answer_button.innerHTML = 'Check in wallet';
        send_answer_button.onclick = () => {
            location.href = 'https://wallet.testnet.near.org/?tab=collectibles';
        }

        document.getElementById('header').innerHTML = `Load...`;

        monster_constructoror.setToken(token);
    } else {
        monster_constructoror.draw();
    }
}