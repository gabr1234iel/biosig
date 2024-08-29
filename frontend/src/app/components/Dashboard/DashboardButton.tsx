import React from "react";

const DashboardButton = ({ text }: { text: string }) => {
  return (
    <>
      <li className="hidden lg:block">
        <form action="" method="POST">
          <div className="relative w-full max-w-[300px]">
            <button className="w-full rounded-full border border-stroke bg-gray-2 py-3 pl-5 pr-5 text-dark focus:border-primary focus:outline-none dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:focus:border-primary xl:w-[240px]">
              {text}
            </button>
          </div>
        </form>
      </li>
    </>
  );
};

export default DashboardButton;