import { Address, createPublicClient, http } from "viem";
import { Chain, mainnet, sepolia, arbitrumSepolia } from "viem/chains";
import { abi } from "@/abi/abi";

export const activeChain: Chain = mainnet;

// Shalom NFT Contract
export const shalomNFTAddress: Address = "0x9dDEF4379fE19E75852CCb752d87bda1FCD9888C";
export const shalomNFTContract = {
  address: shalomNFTAddress,
  abi: abi,
} as const;

// Phoenix NFT Contract
export const phoenixNFTAddress: Address = "0x520AD4b1b5257B54f95aA86DB1761F84fCaf60d9";
export const phoenixNFTContract = {
  address: phoenixNFTAddress,
  abi: abi,
} as const;

export const transportUrl: string =
  activeChain.id === mainnet.id
    ? "https://eth-mainnet.g.alchemy.com/v2/C_avEIbU5Y2Ay7eM-HzzJFzxO3QWvHLQ"
    : "https://arb-sepolia.g.alchemy.com/v2/3d896hhwwnUzPur_UQurCLuHyURxxVT7";

export const publicClient = createPublicClient({
  chain: activeChain,
  transport: http(transportUrl),
});
