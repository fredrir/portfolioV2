import { journeyType } from "@/lib/types/types";

interface Props {
  journey: journeyType;
}

const JourneyCard = ({ journey }: Props) => {
  return (
    <div className="flex flex-col w-full bg-white dark:bg-gray-800 rounded-2xl py-4 border-solid border-2 border-gray-900 dark:border-white ">
      <h1 className="text-center font-bold text-xl">{journey.jobTitle}</h1>

      <p className="text-gray-800 dark:text-gray-300 text-center">
        {journey.date}
      </p>
      <h2 className="font-bold pb-4 pt-2 px-5">{journey.company}</h2>
      <div className="border-solid border-t-2 border-black dark:border-white">
        <p className="py-2 px-5">{journey.description}</p>
      </div>
    </div>
  );
};

export default JourneyCard;
