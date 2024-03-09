"use client";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useWriteContract, useAccount } from "wagmi";
import dynamic from "next/dynamic";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link"

const abi = require("./contract.json");
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

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
      <div className="static flex items-center justify-center min-h-[700px] h-[calc(100vh-6rem)] sm:h-screen">
        <label
          className={`absolute cursor-pointer flex flex-col items-center justify-center gap-4 pl-1 ${
            isSuccess && "bg-black"
          } rounded-full ml-9 ${
            isSuccess && "border-2 border-red-500/90"
          } size-[400px]`}
        >
          {isSuccess ? (
            <div>
              <p className="flex items-center justify-center w-full gap-2 text-3xl text-center text-white">
                <span className="w-26 animate-pulse animate-twice">
                  Claimed
                </span>
                <Image
                  className="animate-alternate-reverse animate-spin animate-twice "
                  src="/ctsi.svg"
                  alt="arrow-right"
                  width={35}
                  height={35}
                />
              </p>
              <p className="inline-block animate-pulse animate-twice text-l text-amber-500 ">
                Success
              </p>
            </div>
          ) : (
            <button
              className="flex items-center justify-center rounded-full sm:w-fit "
              onClick={claim}
            >
              <Image
                className="sm:w-[200px] invert sm:invert-0 sm:h[200px]"
                src="/claim.svg"
                alt="arrow-right"
                width={100}
                height={100}
              />
            </button>
          )}
          {isError && (
            <p className="text-xl subpixel-antialiased font-semibold text-transparent bg-transparent animate-gradient bg-clip-text bg-gradient-to-b from-amber-400 via-yellow-100 to-amber-400">
              {"You claimed 100 CTSI already today"}
            </p>
          )}
        </label>
        <SplineComponent />
      </div>

      <footer className="sm:hidden p-4 flex items-center justify-center gap-4">
        <Link
          href="https://cartesiscan.io/"
          className="px-3 py-2 text-amber-400"
        >
          CartesiScan
        </Link>
        <Link
          href="https://explorer.cartesi.io/"
          className="px-3 py-2 text-amber-400"
        >
          Cartesi Explorer
        </Link>
      </footer>
    </>
  )
}

function SplineComponent() {
  const [isMobile, setIsMobile] = useState(true);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  },[]);

  if (isMobile) return null;

  return (
    <Fragment>
      {!isSplineLoaded && (
        <Image
          className="animate-alternate-reverse animate-spin animate-infinite"
          src="/ctsi.svg"
          alt="arrow-right"
          width={50}
          height={50}
        />
      )}

      <Spline
        className={isSplineLoaded || "hidden"}
        onLoad={() =>  setTimeout(() => setIsSplineLoaded(true), 1500)}
        scene="https://prod.spline.design/88JJi6MLHNF7eYS3/scene.splinecode"
      />
    </Fragment>
  );
}
