import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  const version = "v2.19.0";
  const versionSlug = "2190---jan-14-2024";

  if (typeof sessionStorage !== "undefined") {
    if (!sessionStorage.getItem("version")) {
      console.log(`%c${version} (Oreki)`, `color:green`);
      sessionStorage.setItem("version", version ? version : "true");
      console.log("Version has been successfully saved to sessionStorage.");
    }
  } else {
    console.error(
      "Error: sessionStorage is not available or not defined in this browser."
    );
  }

  return (
    <footer className="text-center w-full ">
      <div className="flex justify-center items-center content-center mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <nav
            aria-label="Footer Nav"
            className="rounded-3xl border-4 border-gray-900 p-6 dark:border-gray-700"
          >
            <ul className="flex flex-wrap justify-center items-center gap-8 sm:gap-6 text-sm font-bold">
              <li>
                <Link href="/search">
                  <p className="text-gray-900 duration-300 delay-150 hover:delay-50 transition hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90">
                    Search
                  </p>
                </Link>
              </li>

              <li>
                <Link href="/quotes">
                  <p className="text-gray-900 duration-300 delay-150 hover:delay-50 transition hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90">
                    Quotes
                  </p>
                </Link>
              </li>

              <li>
                <Link href="/library">
                  <p className="text-gray-900 duration-300 delay-150 hover:delay-50 transition hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90">
                    Library
                  </p>
                </Link>
              </li>

              <li>
                <Link href="/about">
                  <p className="text-gray-900 duration-300 delay-150 hover:delay-50 transition hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90">
                    About
                  </p>
                </Link>
              </li>

              <li>
                <Link href="/contact">
                  <p className="text-gray-900 duration-300 delay-150 hover:delay-50 transition hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90">
                    Contact
                  </p>
                </Link>
              </li>

              <li>
                <Link href="/privacy">
                  <p className="text-gray-900 duration-300 delay-150 hover:delay-50 transition hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90">
                    Privacy
                  </p>
                </Link>
              </li>

              <li>
                <Link href="/disclaimer">
                  <p className="text-gray-900 duration-300 delay-150 hover:delay-50 transition hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90">
                    Disclaimer
                  </p>
                </Link>
              </li>

              <li>
                <a
                  className="text-gray-900 duration-300 delay-150 hover:delay-50 transition hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90"
                  href="#"
                  target="_self"
                  rel="noreferrer"
                >
                  Back to Top
                </a>
              </li>

              <li>
                <a
                  href={`https://github.com/PARAGDADHICH/BiblioReads/blob/main/CHANGELOG.md#${versionSlug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-900 duration-300 delay-150 hover:delay-50 transition hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90"
                >
                  {version}
                </a>
              </li>

              <li className="items-center justify-center align-middle content-center">
                <a
                  className="text-gray-900 hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90 duration-300 delay-150 hover:delay-50 transition"
                  href="https://github.com/PARAGDADHICH/BiblioReads"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <svg
                    className="h-8 w-8"
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
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
