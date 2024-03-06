"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { WagmiProvider } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { goerli, sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
	appName: "My RainbowKit App",
	projectId: "449f2fcb77536fe10ddf235f81039e79",
	chains: [goerli, sepolia],
});

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<WagmiProvider config={config}>
					<QueryClientProvider client={queryClient}>
						<RainbowKitProvider>{children}</RainbowKitProvider>
					</QueryClientProvider>
				</WagmiProvider>
			</body>
		</html>
	);
}
