import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import axios from "axios";
import { JOB_API_END_POINT } from "./utils/constant";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const Browse = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${keyword}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setJobs(res.data.jobs);
        } else {
          setError(res.data.message || "Failed to fetch jobs");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [keyword]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 my-10">
        <h1 className="font-bold text-2xl mb-8">
          Search Results for "{keyword}"
        </h1>

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : error ? (
          <div className="text-center py-20">{error}</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            No jobs found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Job job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
