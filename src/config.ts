import { Address, createPublicClient, http } from "viem";
import { Chain, mainnet, sepolia } from "viem/chains";
import { abi } from "@/abi/abi";

export const activeChain: Chain = sepolia;
export const contractAddressNFT: Address =
  "0x8eaFc3Aab073CC4CC188120D1a32c48C0147b88d";

export const nftContract = {
  address: contractAddressNFT,
  abi: abi,
} as const;

export const contractAddressToken: Address =
  "0x8f9d888e96A969eed16Ea151AAa50f41371F98B3";

export const transportUrl: string =
  activeChain.id === mainnet.id
    ? "https://eth-mainnet.g.alchemy.com/v2/ZL1qSMo1yKfKY7Cx3V_DqToUNO47wp9G"
    : "https://eth-sepolia.g.alchemy.com/v2/CtKV-Y_pSUCosd9il6fAQnw8Sm_yZEXv";

export const publicClient = createPublicClient({
  chain: activeChain,
  transport: http(transportUrl),
});
