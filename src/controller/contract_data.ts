import { ethers } from "ethers";
import { provider } from "../utils/rpc_connection";

const ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function decimals() view returns (uint8)",

  "function transfer(address to, uint amount)",

  "event Transfer(address indexed from, address indexed to, uint amount)"
];

/**
 * It gets the contract address, creates a new contract instance, and then gets the contract name,
 * symbol, total supply, and decimals.
 */
export const getContractData = async (address: string) => {
  const contract = new ethers.Contract(address, ABI, provider);

  const name = await contract.name();
  const symbol = await contract.symbol();
  const total_supply = await contract.totalSupply();
  const decimal = await contract.decimals();
  return {
    name,
    symbol,
    total_supply,
    decimal,
  };
};

export const getLogs = async (contractAddress: string, fromAddress: string) => {
  const contract = new ethers.Contract(contractAddress, ABI, provider);
  const filterFrom = await contract.filters.Transfer(fromAddress, null);
  // Search for transfers *from* me in the last 2048 blocks
  const logsFrom = await contract.queryFilter(filterFrom, -2048, "latest");
  return logsFrom;
};

