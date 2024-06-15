# Insurance Policy
This fullstack code is made to buy, claim and approve insurance policy. Through this, user can easily buy insurance policy, claim inusrance policy and approve insurance policy.
## Description
### Smart contract part
This contract is written in Solidity language, a programming language used for developing smart contracts on the Ethereum blockchain. In smart contract first we have struct policy to store user details. Then we have struct claim which contains details about each insurance claim filed by a policy owner. Then, there is a mapping "policies" that associates each policy ID with its corresponding "Policy" struct. Another mapping "claims" associates each claim ID with its corresponding "Claim" struct. Now, there is a function named "buyPolicy", which ensures that users can purchase insurance policies by paying a premium, and it updates the state variables accordingly. There is another function named "fileClaim" which ensures that only the owner of the policy can file a claim. And at last, there is a function named "approveClaim" which ensures that only valid claims can be approved.
### Front end part
```index.html``` and ```styles.css``` is used to create and design the structure and look of the front end and script.js is used for the logic purpose. In js file we have Contract Address and Contract ABI. Then ```connectMetamaskBtn``` is used to connect the wallet. and rest all the functions are connected with the solidity functions. ```fileClaimBtn``` is used to file claim of insurance policy from blockchain and ```approveClaimBtn``` is used to approve the insurance policy.  

## Getting Started

### Executing program

To run this program, First create a directory , switch to that directory and open it in vs code.
1) Run ```npm install --save hardhat``` to install the hardhat.
2) Now open two more terminals.
3) In the second terminal, run ```npx hardhat node```.
4) In the third terminal, run ```npx hardhat run --network localhost scripts/deploy.js```.
5) Now, go on ```index.html``` page and run that page with live server.
6) After this, the project will be running on localhost. Typically at http://127.0.0.1:5500/frontend/index.html
7) Now, you can buy, claim and approve policy after connecting metamask wallet.

## Authors

Srijan Kumar  
[@Srijan](srijankumar11627@gmail.com)


## License

This Insurance policy contract is licensed under the MIT License 
