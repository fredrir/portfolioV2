import React from "react";
import Image from "next/image";
import TerminalComponent from "../Terminal";

const LandingComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-32 px-10 min-h-[700px]">
      <div className="rounded-full overflow-hidden w-52 h-52 ">
        <Image
          src={"/Fredrik_Hansteen.jpeg"}
          alt={"Portret of Fredrik Hansteen"}
          width={200}
          height={200}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="bg-white dark:bg-gray-900 dark:text-white rounded-3xl px-4 py-2 mt-4">
        <h1 className="text-2xl font-bold text-center">
          {"Hi, I'm <Fredrik/>"}
        </h1>
      </div>
      <div className="pt-10 w-full max-w-lg">
        <TerminalComponent />
      </div>
    </div>
  );
};

export default LandingComponent;