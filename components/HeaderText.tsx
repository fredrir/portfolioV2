import Link from "next/link";

interface Props {
  title: string;
  href: string;
}

const HeaderText = ({ title, href }: Props) => {
  return (
    <div className="pb-32">
      <Link href={href}>
        <div className="dark:text-white rounded-3xl px-4 py-2 mt-4 w-fit text-center border-solid border-2 border-gray-400 dark:border-gray-600">
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>
      </Link>
    </div>
  );
};

export default HeaderText;