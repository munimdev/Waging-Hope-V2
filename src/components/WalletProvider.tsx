import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { http, WagmiProvider } from "wagmi";
import { arbitrumSepolia, mainnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "Waging Hope Collective",
  projectId: "cd12f245bd6a6075580e043613be3a13", // Get from WalletConnect
  chains: [mainnet, arbitrumSepolia],
  transports: {
    [mainnet.id]: http("https://eth-mainnet.g.alchemy.com/v2/C_avEIbU5Y2Ay7eM-HzzJFzxO3QWvHLQ"),
    [arbitrumSepolia.id]: http("https://arb-sepolia.g.alchemy.com/v2/3d896hhwwnUzPur_UQurCLuHyURxxVT7"),
  },
});

const queryClient = new QueryClient();

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
