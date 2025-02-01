import { Card } from "flowbite-react";

const Pricing = () => {
  return (
    <div className="w-11/12 mx-auto rounded-3xl bg-white py-12 mb-12">
      <div className="text-center">
        <p className="text-black font-bold uppercase text-sm">Pricing Plan</p>
        <h1 className="text-3xl text-nav capitalize font-bold py-6">
          Find the Perfect Plan four you need
        </h1>
        <p className="text-sm text-center px-4 text-black">
        Flexible plans for teams of all sizes. Choose the perfect package and start optimizing your asset management today!
        </p>
      </div>
      <div className="pt-12 flex justify-center items-center mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <Card className="max-w-sm bg-nav">
          <h5 className="mb-4 text-xl  text-white font-bold">
            StartUp plan
          </h5>
          <div className="flex items-baseline text-gray-900 dark:text-white">
            <span className="text-3xl font-semibold text-white">$</span>
            <span className="text-5xl font-extrabold tracking-tight text-white">5</span>
            <span className="ml-1 text-xl font-normal text-white">
              /5 Employees
            </span>
          </div>
          <ul className="my-7 space-y-5">
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Perfect for small teams and startups.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Manage up to 5 employees effortlessly.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Essential tools for tracking both returnable and non-returnable assets.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Affordable entry-level plan for businesses.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Easy onboarding for new employees.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Real-time notifications for asset requests and approvals.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Simple and user-friendly dashboard.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Flexible enough for businesses just starting out.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Simple and user-friendly dashboard.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Secure data storage for small-scale operations.
              </span>
            </li>
            
          </ul>
        </Card>
        <Card className="max-w-sm bg-nav">
          <h5 className="mb-4 text-xl  text-white font-bold">
            Mid-Level plan
          </h5>
          <div className="flex items-baseline text-gray-900 dark:text-white">
            <span className="text-3xl font-semibold text-white">$</span>
            <span className="text-5xl font-extrabold tracking-tight text-white">8</span>
            <span className="ml-1 text-xl font-normal text-white">
              /10 Employees
            </span>
          </div>
          <ul className="my-7 space-y-5">
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Ideal for medium-sized teams.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Manage up to 10 employees with ease.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Enhanced tools for streamlined asset oversight.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Great value for growing businesses.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Customizable employee profiles and permissions.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Access insightful asset usage reports.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Scalable for teams planning to expand.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Advanced notifications for better team coordination.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Secure platform with mobile-friendly access.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Excellent balance of features and affordability.
              </span>
            </li>
            
          </ul>
        </Card>
        <Card className="max-w-sm bg-nav">
          <h5 className="mb-4 text-xl  text-white font-bold">
            Large Team plan
          </h5>
          <div className="flex items-baseline text-gray-900 dark:text-white">
            <span className="text-3xl font-semibold text-white">$</span>
            <span className="text-5xl font-extrabold tracking-tight text-white">15</span>
            <span className="ml-1 text-xl font-normal text-white">
              /20 Employees
            </span>
          </div>
          <ul className="my-7 space-y-5">
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Designed for larger teams and organizations.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Manage up to 20 employees effortlessly.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Comprehensive tools for large-scale asset management.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Advanced analytics for decision-making.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Best choice for scaling businesses.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Supports multiple team collaborations.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Real-time inventory and asset tracking.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Unlimited updates and responsive support.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Robust security measures for data safety.
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-white">
              Ultimate plan for maximizing efficiency and productivity.
              </span>
            </li>
            
          </ul>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
