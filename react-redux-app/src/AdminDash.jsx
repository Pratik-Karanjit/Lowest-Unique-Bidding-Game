import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Content = () => {
  return (
    <div className="main-wrapper p-7">
      <div className="w-full rounded-lg p-8 bg-white shadow-sm mb-5">
        <p>Current LUB Design</p>
      </div>
      <div className="w-full rounded-lg p-8 bg-white shadow-sm">
        <h1 className="text-secondary">Table Template</h1>
        <div class="container mx-auto">
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal border rounded-md">
                <thead>
                  <tr>
                    <th class="px-5 py-5 border-b-2 border-gray-200 bg-primaryBg text-left text-sm font-semibold text-primaryDark uppercase tracking-wider">
                      Player Name
                    </th>
                    <th class="px-5 py-5 border-b-2 border-gray-200 bg-primaryBg text-left text-sm font-semibold text-primaryDark uppercase tracking-wider">
                      Amount Bid
                    </th>
                    <th class="px-5 py-5 border-b-2 border-gray-200 bg-primaryBg text-left text-sm font-semibold text-primaryDark uppercase tracking-wider">
                      Time / Date
                    </th>
                    <th class="px-5 py-5 border-b-2 border-gray-200 bg-primaryBg text-left text-sm font-semibold text-primaryDark uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div class="flex">
                        <p class="text-gray-900 whitespace-no-wrap">
                          Pratik Karanjit
                        </p>
                      </div>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap">Rs. 1.33</p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap">
                        22:02:48 04/12/24
                      </p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span class="relative inline-block px-3 py-1 font-medium text-green-900 leading-tight">
                        <span
                          aria-hidden
                          class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span class="relative">LUB</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div class="flex">
                        <p class="text-gray-900 whitespace-no-wrap">
                          Saras Karanjit
                        </p>
                      </div>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap">Rs. 2.38</p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap">
                        13:02:48 04/12/24
                      </p>
                    </td>

                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                        <span
                          aria-hidden
                          class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                        ></span>
                        <span class="relative">Not LUB</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div class="flex">
                        <p class="text-gray-900 whitespace-no-wrap">
                          Sakesh Karanjit
                        </p>
                      </div>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap">Rs. 5.99</p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap">
                        03:02:48 04/12/24
                      </p>
                    </td>

                    <td class="px-5 py-5 bg-white text-sm">
                      <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                        <span
                          aria-hidden
                          class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                        ></span>
                        <span class="relative">Was LUB</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* PAGINATION CODE */}
        <div className="flex items-center justify-between bg-white px-2 sm:px-3">
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">10</span> of{" "}
                <span className="font-medium">97</span> results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </a>
                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                <a
                  href="#"
                  aria-current="page"
                  className="relative z-10 inline-flex items-center bg-primaryDark px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative hidden items-center px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 text-sm text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                  ...
                </span>
                <a
                  href="#"
                  className="relative hidden items-center px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >
                  8
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  9
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  10
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
