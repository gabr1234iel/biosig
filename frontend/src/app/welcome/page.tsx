import React from "react";
import Link from "next/link";
import Image from "next/image";

interface TagProps {
  label: string;
}

const tagList = [
  {
    label: "Stealth security with multiple signers",
  },
  {
    label: "Biometric authentication",
  },
  {
    label: "Gasless transactions",
  },
  {
    label: "Multichain support",
  },
];

const Tag = ({ label }: TagProps) => {
  return (
      <div
          className={`flex items-center justify-start gap-2.5 text-sm font-medium hover:bg-opacity-90 bg-dark rounded-[5px] text-white py-[14px] px-6`}
      >
        <svg
            className="fill-current"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.9987 2.521C6.31578 2.521 2.51953 6.31725 2.51953 11.0002C2.51953 12.3578 2.8381 13.6391 3.40393 14.7751C3.63103 15.231 3.71848 15.7762 3.57519 16.3118L3.02922 18.3523C2.92895 18.7271 3.2718 19.0699 3.64657 18.9696L5.6871 18.4237C6.22262 18.2804 6.76783 18.3678 7.22378 18.5949C8.3598 19.1608 9.64106 19.4793 10.9987 19.4793C15.6816 19.4793 19.4779 15.6831 19.4779 11.0002C19.4779 6.31725 15.6816 2.521 10.9987 2.521ZM1.14453 11.0002C1.14453 5.55786 5.55639 1.146 10.9987 1.146C16.441 1.146 20.8529 5.55786 20.8529 11.0002C20.8529 16.4425 16.441 20.8543 10.9987 20.8543C9.42358 20.8543 7.93293 20.4843 6.61075 19.8257C6.41345 19.7274 6.21199 19.7066 6.0425 19.7519L4.00197 20.2979C2.60512 20.6717 1.3272 19.3937 1.70094 17.9969L2.24692 15.9564C2.29227 15.7869 2.27142 15.5854 2.17315 15.3881C1.5146 14.0659 1.14453 12.5753 1.14453 11.0002ZM14.2348 8.68069C14.5033 8.94918 14.5033 9.38448 14.2348 9.65296L10.5682 13.3196C10.3035 13.5843 9.87588 13.5886 9.60592 13.3294L7.77258 11.5694C7.49867 11.3065 7.48979 10.8713 7.75274 10.5974C8.0157 10.3235 8.45091 10.3146 8.72481 10.5775L10.0722 11.871L13.2626 8.68069C13.531 8.41221 13.9663 8.41221 14.2348 8.68069Z"
              fill=""
          />
        </svg>
        {label}
      </div>
  );
};


const WelcomePage: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="mt-10 w-11/12 rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              <div className="flex flex-col items-center justify-center">
                  <h1 className="mb-4 flex w-full items-center text-5xl justify-center gap-3.5 font-semibold">Get Started</h1>
                  <p className="flex w-full items-center justify-center gap-3.5">
                    Connect your wallet to create a new BioSig Account or
                  </p>
                  <p className="mb-10 flex w-full items-center justify-center gap-3.5">open an existing one.</p>
                <div>
                  <Link
                    href="/multisig"
                    className="flex w-64 items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-[15px] font-medium hover:bg-opacity-50 dark:border-dark-3 dark:bg-dark dark:hover:bg-opacity-50"
                  >
                    Create an account
                  </Link>
                </div>
                <div className="my-4 flex items-center justify-center">
                  <div className="block w-full min-w-fit bg-white text-center font-medium dark:bg-gray-dark">
                    Or
                  </div>
                </div>
                <div>
                  <Link
                    href="/welcome/accounts/view-existing"
                    className="flex w-64 items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray-2 p-[15px] font-medium hover:bg-opacity-50 dark:border-dark-3 dark:bg-dark-2 dark:hover:bg-opacity-50"
                  >
                    View my accounts
                  </Link>
                </div>

                <div>
                  {/*<SigninWithPassword />*/}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
              <Link className="mb-10 inline-block" href="/">
                <Image
                    className="hidden dark:block"
                    src={"/biosig_logo.png"}
                    alt="Logo"
                    width={150}
                    height={150}
                />
              </Link>
              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                Multisig wallet with Biometric AA and Multichain Support
              </h1>
              <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                A multisig wallet that uses biometric authentication to enable seedless interactions and secure asset transfers across multiple chains.
              </p>
              <div className="mt-14 mb-60">
                <div className="grid grid-cols-2 gap-4">
                  {tagList.map((tag, index) => (
                      <Tag key={index} label={tag.label} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
