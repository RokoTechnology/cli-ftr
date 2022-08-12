import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  LocationMarkerIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import React from "react";

const HeaderMain = () => {
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Back End Developer
        </h2>
        <div className="flex flex-col mt-1 sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
          <div className="flex items-center mt-2 text-sm text-gray-500">
            {/* <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> */}
            <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            Full-time
          </div>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            Remote
          </div>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            $120k &ndash; $140k
          </div>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            Closing on January 9, 2020
          </div>
        </div>
      </div>
      <div className="flex mt-5 lg:mt-0 lg:ml-4">
        <span className="hidden sm:block">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PencilIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            Edit
          </button>
        </span>

        <span className="hidden ml-3 sm:block">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <LinkIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            View
          </button>
        </span>

        <span className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <CheckIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            Publish
          </button>
        </span>

        <div className="relative ml-3 sm:hidden">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            id="mobile-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            More
            <ChevronDownIcon />
          </button>

          <div
            className="absolute right-0 w-48 py-1 mt-2 -mr-1 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="mobile-menu-button"
            tabIndex={-1}
          >
            <a
              href="https://google.com"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="mobile-menu-item-0"
            >
              Edit
            </a>
            <a
              href="https://google.com"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="mobile-menu-item-1"
            >
              View
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
