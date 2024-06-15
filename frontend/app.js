document.addEventListener('DOMContentLoaded', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
  
        const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';  // Contract address
        const contractABI = [
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "policyId",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "claimant",
                "type": "address"
              }
            ],
            "name": "ClaimApproved",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "policyId",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "claimant",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "reason",
                "type": "string"
              }
            ],
            "name": "ClaimFiled",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "policyType",
                "type": "string"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "premium",
                "type": "uint256"
              }
            ],
            "name": "PolicyPurchased",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "claimId",
                "type": "uint256"
              }
            ],
            "name": "approveClaim",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "policyType",
                "type": "string"
              }
            ],
            "name": "buyPolicy",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "claimCounter",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "claims",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "policyId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "claimant",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "reason",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "isApproved",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "policyId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "reason",
                "type": "string"
              }
            ],
            "name": "fileClaim",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "policies",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "policyType",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "premium",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "policyCounter",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ]  // Contract ABI
  
        const insuranceContract = new web3.eth.Contract(contractABI, contractAddress);
  
        document.getElementById('connectMetamaskBtn').addEventListener('click', async () => {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            console.log('Connected account:', accounts[0]);
        });
  
        document.getElementById('buyPolicyBtn').addEventListener('click', async () => {
            const policyType = document.getElementById('policyType').value;
            const premiumAmount = document.getElementById('premiumAmount').value;
            const accounts = await web3.eth.getAccounts();
            await insuranceContract.methods.buyPolicy(policyType).send({ from: accounts[0], value: web3.utils.toWei(premiumAmount, 'ether') });
            document.getElementById('output').innerText = `Policy purchased: Type = ${policyType}, Premium Amount = ${premiumAmount} ETH`;
        });
  
        document.getElementById('fileClaimBtn').addEventListener('click', async () => {
            const policyId = document.getElementById('claimPolicyId').value;
            const reason = document.getElementById('claimReason').value;
            const accounts = await web3.eth.getAccounts();
            await insuranceContract.methods.fileClaim(policyId, reason).send({ from: accounts[0] });
            document.getElementById('output').innerText = `Claim filed: Policy ID = ${policyId}, Reason = ${reason}`;
        });
  
        document.getElementById('approveClaimBtn').addEventListener('click', async () => {
            const claimId = document.getElementById('approveClaimId').value;
            const accounts = await web3.eth.getAccounts();
            await insuranceContract.methods.approveClaim(claimId).send({ from: accounts[0] });
            document.getElementById('output').innerText = `Claim approved: Claim ID = ${claimId}`;
        });
  
    } else {
        console.log('MetaMask is not installed');
    }
  });
