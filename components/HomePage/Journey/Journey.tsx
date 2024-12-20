import React from "react";
import JourneyCard from "./JourneyCard";
import JourneyDescriptions from "@/lib/descriptions/JourneyDescriptions";
import Image from "next/image";
import JourneyImage from "./JourneyImage";
import JourneyImageMobile from "./JourneyMobile";
import Link from "next/link";
import HeaderText from "@/components/HeaderText";

const Journey = () => {
  return (
    <div className="flex flex-col items-center justify-center pb-32">
      <HeaderText title="My Journey" href="#journey" />
      <div
        id="journey"
        className="hidden md:flex flex flex-col justify-center mt-4 gap-20 items-center max-w-5xl border-solid rounded-2xl overflow-hidden"
      >
        {JourneyDescriptions.map((journey, index) => (
          <div key={journey.id} className="flex items-center w-full">
            {index % 2 !== 0 && (
              <div className="flex-1 flex justify-end pr-8">
                <JourneyCard journey={journey} />
              </div>
            )}
            <JourneyImage journey={journey} />
            {index % 2 === 0 && (
              <div className="flex-1 flex justify-start pl-24">
                <JourneyCard journey={journey} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="md:hidden flex flex-col justify-center mt-4 gap-20 items-center max-w-4xl border-solid rounded-2xl overflow-hidden">
        {JourneyDescriptions.map((journey, index) => (
          <div
            key={journey.id}
            className="flex flex-col gap-4 items-center w-full"
          >
            <JourneyImageMobile journey={journey} />

            <div className="">
              <JourneyCard journey={journey} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journey;
