import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";


const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900">
            Latest & Top
            <span className="text-emerald-600"> Job Openings</span>
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            Explore recently posted opportunities from trusted companies
          </p>
        </div>

        {allJobs.length <= 0 ? (
          <div className="text-center text-slate-500 text-lg">
            No jobs available right now
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {allJobs.slice(0, 6).map((job) => (
              <LatestJobCard key={job._id} job={job} />
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
};

export default LatestJobs;
