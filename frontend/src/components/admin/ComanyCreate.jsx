import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "../utils/constant";

const ComanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Please enter company name");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);

        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto py-16 px-6 sm:px-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Create Your Company
          </h1>
          <p className="mt-2 text-gray-500 sm:text-lg">
            Enter your company name. You can change it later if needed.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-lg rounded-xl p-8 sm:p-12 border border-gray-200">
          <label className="block text-gray-700 font-medium mb-2">Company Name</label>
          <Input
            type="text"
            placeholder="JobHunt, Microsoft etc."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mb-6 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-400 shadow-sm"
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>

            <Button
              onClick={registerNewCompany}
              disabled={!companyName.trim() || loading}
              className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              {loading ? "Please wait..." : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComanyCreate;
