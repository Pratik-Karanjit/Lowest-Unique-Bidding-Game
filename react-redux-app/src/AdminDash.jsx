import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { selectLubEntries, setLub } from "./features/lubSlice";
import { useNavigate } from "react-router-dom";
import { loginAdmin, logoutAdmin } from "./features/userSlice";
import axios from "axios";

const AdminDash = () => {
  //All states are extracted from lubSlice
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const admin = useSelector((state) => state.user.admin?.token);

  const lubName = useSelector((state) => state.lub?.lub?.user);
  const lubAmount = useSelector((state) => state.lub?.lub?.amount);
  const lubTime = useSelector((state) => state.lub?.lub?.time);
  const lubStatus = useSelector((state) => state.lub?.lub?.status);
  const lubEntries = useSelector(selectLubEntries);

  // State for pagination
  const [page, setPage] = useState(1);
  const pageSize = 10; // Number of items per page

  // Calculate the start and end index for the current page
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageEntries = lubEntries.slice(startIndex, endIndex);

  // console.log(lubName);
  // console.log(lubAmount);
  // console.log(lubTime);
  // console.log(lubStatus);

  //For mapping all rows dynamically
  // const lubData = useSelector((state) => [
  //   {
  //     name: state.lub?.lub?.userName,
  //     amount: state.lub?.lub?.amount,
  //     time: state.lub?.lub?.time,
  //     status: state.lub?.lub?.status,
  //   },
  // ]);

  //All the data that were set in logging in and Game.jsx are extracted here to set it to the redux
  //This is needed as redux states are refreshed so I have set it to local Storage and got it back using getItem
  // useEffect(() => {
  //   const storedUserName = localStorage.getItem("userName");
  //   const storedAmount = localStorage.getItem("amount");
  //   const storedTime = localStorage.getItem("time");
  //   const storedStatus = localStorage.getItem("status");

  //   if (storedUserName) {
  //     dispatch(
  //       setLub({
  //         userName: storedUserName,
  //         amount: storedAmount,
  //         time: storedTime,
  //         status: storedStatus,
  //       })
  //     );
  //   }
  // }, [dispatch]);

  useEffect(() => {
    // Retrieve Lub entries array from localStorage
    const storedEntries = JSON.parse(localStorage.getItem("lubEntries"));

    // If there are stored entries, dispatch them to the Redux store
    if (storedEntries && storedEntries.length > 0) {
      storedEntries.forEach((entry) => {
        dispatch(setLub(entry));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    const role = localStorage.getItem("adminRole");
    const token = localStorage.getItem("adminToken");

    if (role) {
      dispatch(loginAdmin({ role: role, token: token }));
    }
  }, [dispatch]);

  let _logoutAdmin = async () => {
    try {
      await axios({
        url: `http://localhost:8000/users/logoutAdmin?token=${admin}`,
        method: "delete",
      });
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminRole");
      dispatch(logoutAdmin());

      navigate(`/adminLogin`);
    } catch (error) {
      console.log("Unable to Logout");
    }
  };

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
                  {currentPageEntries.map((rowData, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {rowData.user}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Rs. {rowData.amount}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {rowData.time}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                          className={`relative inline-block px-3 py-1 font-semibold ${
                            rowData.status === "Not LUB"
                              ? "text-red-900"
                              : "text-green-900"
                          } leading-tight`}
                        >
                          <span
                            aria-hidden
                            className={`absolute inset-0 ${
                              rowData.status === "Not LUB"
                                ? "bg-red-200"
                                : "bg-green-200"
                            } opacity-50 rounded-full`}
                          ></span>
                          <span className="relative">{rowData.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
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
              {/* **Pagination concept starts from here** */}
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => {
                    if (page <= 1) {
                      setPage(1);
                    } else {
                      setPage(page - 1);
                    }
                  }}
                  disabled={page === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {Array.from({
                  length: Math.ceil(lubEntries.length / pageSize),
                }).map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setPage(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm ${
                      page === index + 1
                        ? "bg-primaryDark text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => {
                    if (page === Math.ceil(lubEntries.length / pageSize)) {
                      setPage(Math.ceil(lubEntries.length / pageSize));
                    } else {
                      setPage(page + 1);
                    }
                  }}
                  disabled={page === Math.ceil(lubEntries.length / pageSize)}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <button
        class="mt-7 px-7 py-4 w-fit bg-primary rounded-md cursor-pointer font-medium text-white"
        onClick={(e) => {
          navigate("/adminPanel");
        }}
      >
        Add Product
      </button>
      <button
        class="mt-7 ml-2 px-7 py-4 w-fit bg-primary rounded-md cursor-pointer font-medium text-white"
        onClick={() => {
          _logoutAdmin();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDash;
