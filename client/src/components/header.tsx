import React, { useState } from "react";

interface HeaderProps {
  onFilter: (fromDate: string, toDate: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onFilter }) => {
  const [fromDate, setFromDate] = useState("2021-06-01");
  const [toDate, setToDate] = useState("2021-12-31");

  const handleFilter = () => {
    onFilter(fromDate, toDate);
  };

  return (
    <header className="p-4 bg-blue-500 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <div className="flex items-center space-x-2">
        <label htmlFor="fromDate">From:</label>
        <input
          type="date"
          id="fromDate"
          className="text-black rounded"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
        <label htmlFor="toDate">To:</label>
        <input
          type="date"
          id="toDate"
          className="text-black rounded"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
      <button
        className="mt-2 sm:mt-0 bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        onClick={handleFilter}
      >
        Filter
      </button>
    </header>
  );
};

export default Header;
