import React, { useEffect, useCallback, useMemo } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "./utils/constant";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";
import defaultLogo from "@/assets/default.avif";

const JobDescription = () => {
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const fetchJob = useCallback(async () => {
    try {
      const res = await axios.get(
        `${JOB_API_END_POINT}/get/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setSingleJob(res.data.job));
      }
    } catch (error) {
      console.log(error);
    }
  }, [jobId, dispatch]);

  useEffect(() => {
    if (jobId) {
      fetchJob();
    }
  }, [fetchJob, jobId]);

  const isApplied = useMemo(() => {
    if (!singleJob?.applications || !user?._id) return false;

    return singleJob.applications.some((app) => {
      const applicantId =
        typeof app.applicant === "object"
          ? app.applicant?._id
          : app.applicant;

      return applicantId?.toString() === user._id.toString();
    });
  }, [singleJob, user]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchJob();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  if (!singleJob) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div className="bg-slate-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">

          <div className="bg-white rounded-xl border shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14 border">
                  <AvatarImage
                    src={singleJob.company?.logo || defaultLogo}
                  />
                </Avatar>

                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {singleJob.title}
                  </h1>

                  <p className="text-sm text-slate-500 mt-1">
                    {singleJob.company?.name} • {singleJob.location}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge>{singleJob.jobType}</Badge>
                    <Badge>{singleJob.salary} LPA</Badge>
                    <Badge>{singleJob.experienceLevel} yrs exp</Badge>
                  </div>
                </div>
              </div>

              <Button
                onClick={applyJobHandler}
                disabled={isApplied}
                className={`h-11 px-8 text-base ${
                  isApplied
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

            <div className="bg-white rounded-xl border shadow-sm p-6 space-y-3 h-fit">
              <h2 className="font-semibold text-slate-800">Job Overview</h2>

              <p className="text-sm text-slate-600">
                <span className="font-medium">Position:</span>{" "}
                {singleJob.position}
              </p>

              <p className="text-sm text-slate-600">
                <span className="font-medium">Posted:</span>{" "}
                {singleJob.createdAt?.split("T")[0]}
              </p>

              <p className="text-sm text-slate-600">
                <span className="font-medium">Applicants:</span>{" "}
                {singleJob.applications?.length || 0}
              </p>
            </div>

            <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Job Description
              </h2>

              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {singleJob.description}
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescription;