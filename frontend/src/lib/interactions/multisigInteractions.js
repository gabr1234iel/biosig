
import { ethers } from 'ethers';

export const contractAddressMI = "0xc760D8A49f1EC1e5916e795AbAC6044E0C19fdaf";
export const scrollSepoliaRpcUrl = "https://sepolia-rpc.scroll.io/";

export const MultisigABI = [
    {
      "inputs": [
        { "internalType": "address[]", "name": "owners", "type": "address[]" },
        { "internalType": "uint256", "name": "requiredSignatures", "type": "uint256" }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "to", "type": "address" },
        { "internalType": "uint256", "name": "value", "type": "uint256" },
        { "internalType": "bytes", "name": "data", "type": "bytes" }
      ],
      "name": "submitTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "uint256", "name": "transactionId", "type": "uint256" }],
      "name": "signTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "uint256", "name": "transactionId", "type": "uint256" }],
      "name": "getTransaction",
      "outputs": [
        { "internalType": "address", "name": "", "type": "address" },
        { "internalType": "uint256", "name": "", "type": "uint256" },
        { "internalType": "bytes", "name": "", "type": "bytes" },
        { "internalType": "bool", "name": "", "type": "bool" },
        { "internalType": "uint256", "name": "", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getOwners",
      "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getRequiredSignatures",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    }
  ];


async function getMultisigContract(multisigAddress) {
  const provider = new ethers.JsonRpcProvider(scrollSepoliaRpcUrl);
  return new ethers.Contract(multisigAddress, MultisigABI, provider);
}

export async function interactWithMultisig(multisigAddress) {
  try {
    const provider = new ethers.JsonRpcProvider(scrollSepoliaRpcUrl);
    const contract = new ethers.Contract(multisigAddress, MultisigABI, provider);

    // Example: Get owners of the Multisig
    const owners = await contract.getOwners();
    console.log("Owners of Multisig at", multisigAddress, ":", owners);

    // Example: Get required signatures
    const requiredSignatures = await contract.getRequiredSignatures();
    console.log("Required signatures:", requiredSignatures);

    

    // Example: Get a specific transaction (assuming transaction ID 0 exists)
    try {
      const transaction = await contract.getTransaction(0);
      console.log("Transaction 0:", transaction);
    } catch (error) {
      console.log("No transaction with ID 0 found");
    }

    // You can add more interactions here based on your needs

    return { owners, requiredSignatures };
  } catch (error) {
    console.error("Error interacting with Multisig contract:", error);
    throw error;
  }
}


export async function getOwners(multisigAddress) {
  try {
    const contract = await getMultisigContract(multisigAddress);
    const owners = await contract.getOwners();
    console.log("Owners of Multisig at", multisigAddress, ":", owners);
    return owners;
  } catch (error) {
    console.error("Error fetching owners:", error);
    throw error;
  }
}

export async function getRequiredSignatures(multisigAddress) {
  try {
    const contract = await getMultisigContract(multisigAddress);
    const requiredSignatures = await contract.getRequiredSignatures();
    console.log("Required signatures:", requiredSignatures);
    return requiredSignatures
  } catch (error) {
    console.error("Error fetching required signatures:", error);
    throw error;
  }
}

export async function getTransaction(multisigAddress, transactionId) {
  try {
    const contract = await getMultisigContract(multisigAddress);
    const transaction = await contract.getTransaction(transactionId);
    console.log(`Transaction ${transactionId}:`, transaction);
    return {
      to: transaction[0],
      value: transaction[1],
      data: transaction[2],
      executed: transaction[3],
      numConfirmations: transaction[4]
    };
  } catch (error) {
    console.error(`Error fetching transaction ${transactionId}:`, error);
    throw error;
  }
}

export async function submitTransaction(multisigAddress, to, value, data, signer) {
  try {
    const contract = await getMultisigContract(multisigAddress);
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.submitTransaction(to, value, data);
    await tx.wait();
    console.log("Transaction submitted:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Error submitting transaction:", error);
    throw error;
  }
}

export async function signTransaction(multisigAddress, transactionId, signer) {
  try {
    const contract = await getMultisigContract(multisigAddress);
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.signTransaction(transactionId);
    await tx.wait();
    console.log("Transaction signed:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Error signing transaction:", error);
    throw error;
  }
}
