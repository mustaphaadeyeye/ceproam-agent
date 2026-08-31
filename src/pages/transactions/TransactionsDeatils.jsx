import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TRANSACTIONS, formatNaira } from "../transactions/Transactionsdata";
import Wrapper from "../../components/Wrapper";
import { fontSize, fontWeight, fontFamily, textColor } from "../../styles/theme";

const TransactionsDeatils = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const transaction = TRANSACTIONS.find((tx) => tx.id === id);

  if (!transaction) {
    return (
      <Wrapper>
        <div className="py-10 px-4">
          <p className="mb-4 text-sm text-gray-500">
            We couldn't find a transaction with reference "{id}".
          </p>

          <button
            onClick={() => navigate("/transactions")}
            className="cursor-pointer rounded-md bg-indigo-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-900"
          >
            Back to transactions
          </button>
        </div>
      </Wrapper>
    );
  }

  const cleanDate = transaction.date.replace(
    /(\d+)(st|nd|rd|th)/,
    "$1"
  );

  return (
    <Wrapper>
      <div className={`w-full px-4 sm:px-10 lg:px-20 xl:px-30 pt-6 sm:pt-10 ${fontFamily.main} xl:mt-0 lg:mt-0 mt-12`}>
        {/* Heading */}
        <h1 className="mb-5 text-xl font-bold text-gray-900">
          Transaction Details
        </h1>

        {/* Details */}
        <div className="">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-gray-100">
            {/* Transaction Type */}
            <div className="border-b border-gray-100 py-3">
              <p className=" font-medium text-gray-400">
                Transaction Type
              </p>

              <p className=" text-gray-800">
                {transaction.type}
              </p>
            </div>

            {/* Amount */}
            <div className="border-b border-gray-100 py-3">
              <p className=" font-medium text-gray-400">
                Amount
              </p>

              <p className=" text-gray-800">
                {formatNaira(transaction.amount)}
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Date */}
            <div className="border-b border-gray-100 py-3">
              <p className=" font-medium text-gray-400">
                Date
              </p>

              <p className=" text-gray-800">
                {cleanDate}
              </p>
            </div>

            {/* Status */}
            <div className="border-b border-gray-100 py-3">
              <p className=" font-medium text-gray-400">
                Status
              </p>

              <p className=" text-gray-800">
                {transaction.status}
              </p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Notes */}
            <div className="border-b border-gray-100 py-3">
              <p className=" font-medium text-gray-400">
                Notes
              </p>

              <p className=" text-gray-800">
                {transaction.notes}
              </p>
            </div>

            {/* Reference */}
            <div className="border-b border-gray-100 py-3">
              <p className=" font-medium text-gray-400">
                Reference
              </p>

              <p className=" text-gray-800">
                {transaction.id}
              </p>
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-12 flex justify-center sm:justify-end">
          <button
            onClick={() => navigate("/transactions")}
            className="cursor-pointer rounded-md bg-indigo-950 px-4 py-2  font-semibold text-white transition hover:bg-indigo-900 w-full sm:w-auto"
          >
            Back to Transaction
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default TransactionsDeatils;