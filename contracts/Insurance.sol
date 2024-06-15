// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Insurance {
    struct Policy {
        uint id;
        address owner;
        string policyType;
        uint premium;
        bool isActive;
    }

    struct Claim {
        uint id;
        uint policyId;
        address claimant;
        string reason;
        bool isApproved;
    }

    mapping(uint => Policy) public policies;
    mapping(uint => Claim) public claims;
    uint public policyCounter;
    uint public claimCounter;

    event PolicyPurchased(uint indexed id, address indexed owner, string policyType, uint premium);
    event ClaimFiled(uint indexed id, uint indexed policyId, address indexed claimant, string reason);
    event ClaimApproved(uint indexed id, uint indexed policyId, address indexed claimant);

    function buyPolicy(string memory policyType) external payable {
        require(msg.value > 0, "Premium must be greater than zero");
        policyCounter++;
        policies[policyCounter] = Policy(policyCounter, msg.sender, policyType, msg.value, true);
        emit PolicyPurchased(policyCounter, msg.sender, policyType, msg.value);
    }

    function fileClaim(uint policyId, string memory reason) external {
        require(policies[policyId].owner == msg.sender, "Only the policy owner can file a claim");
        claimCounter++;
        claims[claimCounter] = Claim(claimCounter, policyId, msg.sender, reason, false);
        emit ClaimFiled(claimCounter, policyId, msg.sender, reason);
    }

    function approveClaim(uint claimId) external {
        require(claims[claimId].claimant != address(0), "Claim does not exist");
        claims[claimId].isApproved = true;
        emit ClaimApproved(claimId, claims[claimId].policyId, claims[claimId].claimant);
    }
}