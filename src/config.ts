import { Address, createPublicClient, http } from "viem";
import { Chain, mainnet, sepolia } from "viem/chains";
import { abi } from "@/abi/abi";

export const activeChain: Chain = sepolia;

// Shalom NFT Contract
export const shalomNFTAddress: Address = "0x8eaFc3Aab073CC4CC188120D1a32c48C0147b88d";
export const shalomNFTContract = {
  address: shalomNFTAddress,
  abi: abi,
} as const;

// Phoenix NFT Contract
export const phoenixNFTAddress: Address = "0x9A82eE68A31c5567cec7E0F0E5e3FD49f7F4f27B";
export const phoenixNFTContract = {
  address: phoenixNFTAddress,
  abi: abi,
} as const;

export const transportUrl: string =
  activeChain.id === mainnet.id
    ? "https://eth-mainnet.g.alchemy.com/v2/ZL1qSMo1yKfKY7Cx3V_DqToUNO47wp9G"
    : "https://eth-sepolia.g.alchemy.com/v2/CtKV-Y_pSUCosd9il6fAQnw8Sm_yZEXv";

export const publicClient = createPublicClient({
  chain: activeChain,
  transport: http(transportUrl),
});
