"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useLocale } from "next-intl";
import { getSession, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { usePathname, useRouter } from "next/navigation";

const Header: React.FC = () => {
  const lang = useLocale();
  const session = useSession();
  const [mobileNav, setMobileNav] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLang: any) => {
    // console.log("Language selected", lang.target.value);
    newLang = newLang.target.value;
    // setSelectedLanguage(newLang);
    console.log("handle change");

    let path = pathname?.replace(`/${lang}`, `/${newLang}`) || null;

    if (path) router.push(path);
  };

  useEffect(() => {
    if (mobileNav) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [mobileNav]);

  return (
    <>
      <header className="p-4 dark:bg-[#881133] text-gray-900 dark:text-gray-100/90 border-b-2 dark:border-b-0 border-rose-300">
        <div className="flex justify-between lg:justify-evenly items-center h-16">
          <div className="flex">
            <a href={"/" + lang + "/"} aria-label="Back to homepage">
              <img src="/logo.svg" alt="" width="64" height="64" />
            </a>
          </div>
          <div>
            <ul className="items-stretch hidden space-x-3 md:flex">
              <li className="flex">
                <Link href={"/" + lang + "/quotes"}>
                  <p
                    className="flex items-center px-4 -mb-1 border-b-2 border-rose-400 hover:border-rose-600 dark:hover:border-white/90 transition duration-300 delay-150 hover:delay-50 dark:border-gray-300/90 hover:text-rose-900 dark:hover:text-white/90"
                    aria-hidden="true"
                  >
                    Quotes
                  </p>
                </Link>
              </li>
              <li className="flex">
                <Link href={"/" + lang + "/library"}>
                  <p className="flex items-center px-4 -mb-1 border-b-2 border-rose-400 hover:border-rose-600 dark:hover:border-white/90 transition duration-300 delay-150 hover:delay-50 dark:border-gray-300/90 hover:text-rose-900 dark:hover:text-white/90">
                    Library
                  </p>
                </Link>
              </li>
              <li className="flex">
                <Link href={"/" + lang + "/blogs"}>
                  <p className="flex items-center px-4 -mb-1 border-b-2 border-rose-400 hover:border-rose-600 dark:hover:border-white/90 transition duration-300 delay-150 hover:delay-50 dark:border-gray-300/90 hover:text-rose-900 dark:hover:text-white/90">
                    Blogs
                  </p>
                </Link>
              </li>
              <li className="flex">
                <Link href={"/" + lang + "/about"}>
                  <p className="flex items-center px-4 -mb-1 border-b-2 border-rose-400 hover:border-rose-600 dark:hover:border-white/90 transition duration-300 delay-150 hover:delay-50 dark:border-gray-300/90 hover:text-rose-900 dark:hover:text-white/90">
                    About
                  </p>
                </Link>
              </li>

              <li className="flex">
                <Link href={"/" + lang + "/privacy"}>
                  <p className="flex items-center px-4 -mb-1 border-b-2 border-rose-400 hover:border-rose-600 dark:hover:border-white/90 transition duration-300 delay-150 hover:delay-50 dark:border-gray-300/90 hover:text-rose-900 dark:hover:text-white/90">
                    Privacy
                  </p>
                </Link>
              </li>
              <li className="hidden lg:flex">
                <a
                  className="ml-2 mt-0.5 h-full w-8 text-gray-900 hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90 duration-300 delay-150 hover:delay-50 transition"
                  href="https://github.com/PARAGDADHICH/BiblioReads"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <ul className="flex">
            <li className="flex items-center justify-center align-middle content-center mr-4">
              <Link href={"/" + lang + "/search"}>
                <p
                  className="mt-0.5 text-gray-900 hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90 duration-300 delay-150 hover:delay-50 transition"
                  aria-label="Search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    className="h-7 w-7"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
                  </svg>
                </p>
              </Link>
            </li>
            <li>
              <ThemeToggle />
            </li>
            <div className="inline-flex items-center px-1 md:ml-3">
              <div className="relative inline-block">
                <label htmlFor="language-select" className="sr-only">
                  Select Language
                </label>
                <select
                  className="cursor-pointer border rounded-md py-2 px-2 text-center bg-blue-gray-100 dark:bg-red-800 text-black dark:text-white"
                  onChange={handleLanguageChange}
                  value={lang}
                >
                  <option value="en">English</option>
                  <option value="vi">Vietnamese</option>
                  <option value="ja">Japanese</option>
                </select>
              </div>
            </div>
            <div
              onClick={() => setMobileNav(!mobileNav)}
              className="md:hidden flex flex-col justify-center gap-y-1 ms-5 cursor-pointer"
            >
              <div className="w-8 h-1 rounded bg-black dark:bg-white"></div>
              <div className="w-8 h-1 rounded bg-black dark:bg-white"></div>
              <div className="w-8 h-1 rounded bg-black dark:bg-white"></div>
            </div>
          </ul>

          <div className="hidden md:flex">
            {(session.data?.user && (
              <div className="relative inline-block align-middle">
                <div className="flex flex-col space-y-2 items-center justify-center align-middle">
                  <div
                    className="flex space-x-1 items-center focus:outline-none "
                    id="user-menu"
                    aria-expanded="true"
                    aria-haspopup="true"
                  >
                    {session?.data?.user?.image && (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={
                          session?.data.user?.image ||
                          "/default-profile-icon.jpg"
                        }
                        alt="User Profile"
                      />
                    )}
                    <span>{`${session?.data.user.email}`}</span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="  ont-semibold text-md text-gray-900 dark:text-gray-100/90 bg-rose-500 dark:bg-[#a22045] ring ring-rose-600 dark:ring-rose-700 ring-offset-2 ring-offset-rose-100  px-5 rounded-xl shadow-lg shadow-rose-500 hover:shadow-xl hover:bg-rose-600 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )) || (
              <div className="flex gap-1 lg:gap-4 items-center">
                <Link href={"/" + lang + "/login"}>
                  <button className="  font-semibold text-md text-gray-900 dark:text-gray-100/90  hover:ring hover:ring-rose-600 dark:hover:ring-rose-700 ring-offset-2 hover:ring-offset-rose-100 py-2 px-5 rounded-xl hover:shadow-xl hover:bg-rose-600 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40">
                    Login
                  </button>
                </Link>
                <Link href={"/" + lang + "/signup"}>
                  <button className="  font-semibold text-md text-gray-900 dark:text-gray-100/90 bg-rose-500 dark:bg-[#a22045] ring ring-rose-600 dark:ring-rose-700 ring-offset-2 ring-offset-rose-100 py-2 px-2 lg:px-5 rounded-xl shadow-lg shadow-rose-500 hover:shadow-xl hover:bg-rose-600 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      {mobileNav && (
        <div className=" dark:bg-rose-300 bg-[#881133] absolute z-50 md:hidden right-0 h-screen w-64  transition-all duration-300 ease-in-out transform ">
          <nav className="flex flex-col p-4 space-y-4 dark:text-gray-900 text-gray-100/90">
            {session.data?.user && (
              <>
                <div className="flex space-y-2 items-center justify-between align-middle">
                  {session?.data?.user?.image && (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={
                        session?.data.user?.image || "/default-profile-icon.jpg"
                      }
                      alt="User Profile"
                    />
                  )}
                  {`${session?.data.user.email}`}
                </div>
                <div className="border-b dark:border-black border-white w-full my-2"></div>
              </>
            )}

            <Link href={"/" + lang + "/quotes"}>
              <p className="font-semibold text-md ">Quotes</p>
            </Link>
            <div className="border-b dark:border-black border-white w-full my-2"></div>

            <Link href={"/" + lang + "/library"}>
              <p className="font-semibold text-md ">Library</p>
            </Link>
            <div className="border-b dark:border-black border-white w-full my-2"></div>
            <Link href={"/" + lang + "/blogs"}>
              <p className="font-semibold text-md ">Blogs</p>
            </Link>
            <div className="border-b dark:border-black border-white w-full my-2"></div>
            <Link href={"/" + lang + "/about"}>
              <p className="font-semibold text-md ">About</p>
            </Link>
            <div className="border-b dark:border-black border-white w-full my-2"></div>
            <Link href={"/" + lang + "/privacy"}>
              <p className="font-semibold text-md ">Privacy</p>
            </Link>
            <div className="border-b dark:border-black border-white w-full my-2"></div>

            {(session.data?.user && (
              <>
                <p
                  onClick={() => signOut()}
                  className="dark:hover:text-rose-900 hover:text-white/90 font-bold dark:text-gray-900 text-gray-100/90"
                >
                  Logout
                </p>
              </>
            )) || (
              <>
                <Link href={"/" + lang + "/login"}>
                  <button className="  font-semibold text-md dark:text-gray-900 text-gray-100/90 ">
                    Login
                  </button>
                </Link>
                <div className="border-b dark:border-black border-white w-full my-2"></div>
                <Link href={"/" + lang + "/signup"}>
                  <button className="font-semibold text-md dark:text-gray-900 text-gray-100/90 ">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
