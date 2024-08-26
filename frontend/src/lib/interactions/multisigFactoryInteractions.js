import { ethers } from "ethers";

export const contractAddress = "0x96f45a38490D74FE6c34aEeE06c1098d5dA287d6";
export const MultisigFactoryABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_deployer",
        type: "address",
      },
      { indexed: false, internalType: "string", name: "_name", type: "string" },
      {
        indexed: false,
        internalType: "address",
        name: "_deployedContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_implementation",
        type: "address",
      },
    ],
    name: "ContractDeployed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_caller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_implementation",
        type: "address",
      },
    ],
    name: "ImplementationUpdated",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "_deployer", type: "address" }],
    name: "countDeployed",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "deployContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllDeployedContracts",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_deployer", type: "address" }],
    name: "getDeployed",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_name", type: "string" }],
    name: "getDeployedAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_wallet", type: "address" }],
    name: "getName",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "implementation",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_implementation", type: "address" },
    ],
    name: "setImplementation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Scroll Sepolia RPC URL
export const scrollSepoliaRpcUrl = "https://sepolia-rpc.scroll.io/";

export async function getFactoryContract() {
  const provider = new ethers.JsonRpcProvider(scrollSepoliaRpcUrl);
  return new ethers.Contract(contractAddress, MultisigFactoryABI, provider);
}


export async function getAllDeployedContracts() {
  try {
    const provider = new ethers.JsonRpcProvider(scrollSepoliaRpcUrl);
    const contract = new ethers.Contract(
      contractAddress,
      MultisigFactoryABI,
      provider
    );
    const deployedContracts = await contract.getAllDeployedContracts();
    console.log("Deployed Contracts:", deployedContracts);
    return deployedContracts;
  } catch (error) {
    console.error("Error fetching deployed contracts:", error);
    throw error;
  }
}

export async function getName(address) {
  try {
    const provider = new ethers.JsonRpcProvider(scrollSepoliaRpcUrl);
    const contract = new ethers.Contract(
      contractAddress,
      MultisigFactoryABI,
      provider
    );
    const contractName = await contract.getName(address);
    return contractName
  } catch (error) {
    console.error("Error fetching name from contract", error);
    throw error;
  }
}

export async function countDeployed(deployer) {
  try {
    const contract = await getFactoryContract();
    const count = await contract.countDeployed(deployer);
    return count.toNumber();
  } catch (error) {
    console.error("Error counting deployed contracts:", error);
    throw error;
  }
}

export async function getDeployed(deployer) {
  try {
    const contract = await getFactoryContract();
    const deployed = await contract.getDeployed(deployer);
    return deployed;
  } catch (error) {
    console.error("Error fetching deployed contracts for deployer:", error);
    throw error;
  }
}

export async function getDeployedAddress(name) {
  try {
    const contract = await getFactoryContract();
    const address = await contract.getDeployedAddress(name);
    return address;
  } catch (error) {
    console.error("Error fetching deployed address for name:", error);
    throw error;
  }
}

export async function getOwner() {
  try {
    const contract = await getFactoryContract();
    const owner = await contract.owner();
    return owner;
  } catch (error) {
    console.error("Error fetching owner address:", error);
    throw error;
  }
}
