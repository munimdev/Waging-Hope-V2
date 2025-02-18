import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { http, WagmiProvider } from "wagmi";
import { arbitrumSepolia, mainnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { activeChain, transportUrl } from "@/config";

const config = getDefaultConfig({
  appName: "Waging Hope Collective",
  projectId: "cd12f245bd6a6075580e043613be3a13", // Get from WalletConnect
  chains: [mainnet, arbitrumSepolia],
  transports: {
    [activeChain.id]: http(transportUrl),
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
