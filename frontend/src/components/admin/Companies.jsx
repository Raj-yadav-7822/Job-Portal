import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { setSearchCompanyByText } from "@/redux/companySlice";
import { useDispatch } from "react-redux";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 md:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Companies Dashboard
          </h1>
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            New Company
          </Button>
        </div>

        {/* Filter Input */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search companies by name..."
            className="flex-1 border-gray-300 shadow-sm rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Companies Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <CompaniesTable />
        </div>

      </div>
    </div>
  );
};

export default Companies;
