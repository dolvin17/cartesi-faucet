"use client";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useWriteContract, useAccount } from "wagmi";
import dynamic from "next/dynamic";
import { Fragment, useState } from "react";

const abi = require("./contract.json");
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

export default function Stage() {
  const { address } = useAccount();
  const { openChainModal = () => {} } = useChainModal();
  const { openConnectModal = openChainModal } = useConnectModal();
  const { openAccountModal = openConnectModal } = useAccountModal();
  const { writeContract, isLoading, isSucscess, isError, error } =
    useWriteContract();
  const isSuccess = false;
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
                className="sm:w-[200px] sm:h[200px]"
                src="/claim.svg"
                alt="arrow-right"
                width={100}
                height={100}
              />
            </button>
          )}
        </label>
        <SplineComponent />
      </div>
    </>
  );
}

function SplineComponent() {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

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
        className={isSplineLoaded  || "hidden"}
        onLoad={() =>  setTimeout(() => setIsSplineLoaded(true), 1500)}
        scene="https://prod.spline.design/88JJi6MLHNF7eYS3/scene.splinecode"
      />
    </Fragment>
  );
}
