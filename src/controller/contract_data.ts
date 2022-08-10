import { ethers } from 'ethers';
import { provider } from '../utils/rpc_connection';

const ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function decimals() view returns (uint8)",
]

/**
 * It gets the contract address, creates a new contract instance, and then gets the contract name,
 * symbol, total supply, and decimals.
 */
export const getContractData = async (address:string) => {
    const contract = new ethers.Contract(address, ABI, provider);

    const name = await contract.name();
    const symbol = await contract.symbol();
    const total_supply = await contract.totalSupply();
    const decimal = await contract.totalSupply();

    return {
        name,
        symbol,
        total_supply,
        decimal
    }
}
