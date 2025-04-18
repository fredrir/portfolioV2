"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import TerminalTab from "./TerminalTab";

interface Props {
  mainText: string;
  errorText: string;
}

const TerminalComponent = ({ mainText, errorText }: Props) => {
  const [text, setText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorIsFinished, setCursorIsFinished] = useState(false);

  const [isClosed, setIsClosed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    let index = 0;
    let interval: NodeJS.Timeout;
    const startTyping = () => {
      interval = setInterval(() => {
        if (index < mainText.length - 1) {
          setText((prev) => prev + mainText[index]);
          index++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setCursorIsFinished(true);
            setText((prev) => prev + errorText);
          }, 700);
        }
      }, 50);
    };
    const timer = setTimeout(startTyping, 1000);
    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (cursorIsFinished) {
      setCursorVisible(false);
      return;
    }
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 750);
    return () => clearInterval(cursorInterval);
  }, [cursorIsFinished]);

  const mainTextLength = mainText.length;

  if (isSmall) {
    return <TerminalTab setIsSmall={setIsSmall} setIsClosed={setIsClosed} />;
  }

  if (isClosed) {
    return (
      <TerminalTab
        setIsSmall={setIsSmall}
        setIsClosed={setIsClosed}
        minimized={false}
      />
    );
  }

  return (
    <div
      className={`flex flex-col pt-10 w-full pb-32 ${
        isExpanded ? "max-w-4xl" : "max-w-lg"
      }`}
    >
      <div className="bg-gray-800 flex flex-row px-3 font-mono text-sm p-1 pt-2 rounded-t-lg text-white ">
        <p className="mx-auto text-center"></p>
        <div className="flex flex-row text-end gap-2">
          <button
            className="hover:scale-110"
            onClick={() => {
              setIsSmall(true);
            }}
          >
            <div className="border-solid border-2 px-2 py-2  border-yellow-500">
              <Image
                src={"/minus-icon.svg"}
                alt={"minus icon"}
                width={12}
                height={12}
                className="relative top-1 h-1"
              />
            </div>
          </button>
          <button
            className="hover:scale-110"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <div className="border-solid border-2 px-2 py-1 border-green-500">
                <Image
                  src={"/square-icon-expanded.svg"}
                  alt={"square icon expanded"}
                  width={10}
                  height={10}
                />
              </div>
            ) : (
              <div className="border-solid border-2 px-2 py-1 border-green-500">
                <Image
                  src={"/square-icon.svg"}
                  alt={"square icon"}
                  width={11}
                  height={11}
                />
              </div>
            )}
          </button>

          <button
            className="hover:scale-110"
            onClick={() => {
              setIsClosed(true);
            }}
          >
            <div className="border-solid border-2 px-2 border-red-400 text-red-400">
              X
            </div>
          </button>
        </div>
      </div>
      {/* <div className="hidden md:flex bg-gray-900 px-3 flex flex-row gap-2 font-mono text-sm text-white">
          <p>File</p>
          <p>Edit</p>
          <p>View</p>
          <p>Search</p>
          <p>Terminal</p>
          <p>Help</p>
        </div> */}
      <div
        className={`bg-black text-green-500 font-mono p-4 rounded-b-lg shadow-lg ${
          isExpanded ? "min-h-[360px]" : "min-h-[180px]"
        }`}
      >
        <article className="whitespace-pre-wrap">
          <span className="text-white">Fredrik:~$ </span>
          <span>{text.slice(0, mainTextLength)}</span>
          <span className="text-red-500">{text.slice(mainTextLength)}</span>
          {cursorVisible && (
            <span className="border-white bg-white border border-1 text-white">
              |
            </span>
          )}
        </article>
      </div>
    </div>
  );
};

export default TerminalComponent;
