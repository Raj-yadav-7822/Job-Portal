import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { motion } from 'framer-motion';


const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    if (searchedQuery && typeof searchedQuery === "string" && searchedQuery.trim() !== "") {
      const query = searchedQuery.toLowerCase().trim();
      const filtered = allJobs.filter((job) => {
        return (
          job.title?.toLowerCase().includes(query) ||
          job.description?.toLowerCase().includes(query) ||
          job.location?.toLowerCase().includes(query)
        );
      });
      setFilterJobs(filtered);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Section */}
          <div className="w-full lg:w-[280px] lg:sticky lg:top-24 h-fit">
            <FilterCard />
          </div>

          {/* Jobs Section */}
          <div className="flex-1">
            {filterJobs.length === 0 ? (
              <div className="text-center text-slate-500 mt-10">
                No jobs found
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                 {filterJobs.map((job) => (
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
      </div>
    </div>
  );
};

export default Jobs;
