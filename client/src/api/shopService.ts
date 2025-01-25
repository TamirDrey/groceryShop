import axios from "axios";
import { Report } from "../types/report";

const BASE_URL = "http://localhost:5295/Shop";

export const shopService = {
  async getAllReports(fromDate: string, toDate: string): Promise<Report[]> {
    try {
      const response = await axios.get<Report[]>(BASE_URL, {
        params: {
          from: fromDate,
          to: toDate,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching grocery items:", error);
      throw error;
    }
  },
};
