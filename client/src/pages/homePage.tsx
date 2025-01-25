import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import ChartComponent from "../components/chart";
import { shopService } from "../api/shopService";
import { Report } from "../types/report";

const HomePage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFilter = async (fromDate: string, toDate: string) => {
    setLoading(true);
    try {
      const reports = await shopService.getAllReports(fromDate, toDate);
      setReports(reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFilter("2021-06-01", "2021-12-31");
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onFilter={handleFilter} />
      <main className="flex-grow p-4">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <ChartComponent reports={reports} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
