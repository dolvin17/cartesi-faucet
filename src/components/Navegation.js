import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Buttoncito } from "./Buttoncito";



export default function Navegation() {
	return (
		<div className="absolute flex w-full p-4 py-8 text-xs sm:text-lg sm:px-32">
			<div className="flex items-center justify-between w-full gap-4">
				<Link href="https://cartesi.io" className="flex flex-row items-center justify-center gap-2">
					<Image src="/ctsi.svg" alt="logo" width={40} height={40} />
					<h1 className="text-2xl font-bold">Cartesi</h1>
				</Link>
				<div className="flex items-center gap-4 ">
						<Link
							href="https://cartesiscan.io/"
							className="px-3 py-2 bg-gradient-to-l border-[1px] rounded-lg border-opacity-10 border-amber-400  from-yellow-700 via-amber-600 to-orange-400 text-transparent bg-clip-text bg-300% animate-gradient"
						>
							CartesiScan
						</Link>
				<Link
					href="https://explorer.cartesi.io/"
					className="px-3 py-2 bg-gradient-to-l border-[1px] rounded-lg border-opacity-10 border-amber-400  from-yellow-700 via-amber-600 to-orange-400 text-transparent bg-clip-text bg-300% animate-gradient"
					>
					Cartesi Explorer
				</Link>
				<Buttoncito/>
					</div>
			</div>
		</div>
	);
}
