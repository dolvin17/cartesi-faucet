"use client";
import {
	useConnectModal,
	useAccountModal,
	useChainModal,
} from "@rainbow-me/rainbowkit";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import { useWriteContract, useAccount } from "wagmi";

const abi = require("./contract.json");

export default function Stage() {
	const { address } = useAccount();
	const { openChainModal = () => {} } = useChainModal();
	const { openConnectModal = openChainModal } = useConnectModal();
	const { openAccountModal = openConnectModal } = useAccountModal();
	const { writeContract, isLoading, isSuccess, isError, error } =
		useWriteContract();

	const claim = async () => {
		if (!address) {
			openAccountModal?.();
			return;
		}
		try {
			await writeContract?.({
				address: "0x6865a2AC53a4D94E94B5334dcF6833CF0b882553",
				abi,
				functionName: "claim",
			});
		} catch (error) {
			console.error("Error claiming CTSI", error);
		}
	};

	return (
		<>
			<div className="static flex items-center justify-center h-[900px] ">
				<label
					className={`absolute cursor-pointer flex flex-col items-center justify-center gap-4 pl-1 ${
						isSuccess && "bg-black"
					} rounded-full ml-9 ${
						isSuccess && "border-2 border-red-500/90"
					} opacity-85 backdrop-blur-3xl size-[380px]`}
				>
					{isSuccess ? (
						<div>
							<p className="flex items-center justify-center w-full gap-2 text-3xl text-center text-white">
								<span className="w-26">Claimed</span>
								<Image
									src="/ctsi.svg"
									alt="arrow-right"
									width={35}
									height={35}
								/>
							</p>
							<p className="inline-block text-lg text-amber-500 animate-jump-in">
								Success
							</p>
						</div>
					) : (
						<button
							className="flex items-center justify-center w-full gap-2 text-4xl text-center text-white rounded-full sm:w-fit "
							onClick={claim}
						>
							<span className="text-black w-26">Claim</span>
							<Image
								src="/ctsisun.svg"
								alt="arrow-right"
								width={35}
								height={35}
							/>
						</button>
					)}
				</label>
				<Spline scene="https://prod.spline.design/88JJi6MLHNF7eYS3/scene.splinecode" />
			</div>
		</>
	);
}
