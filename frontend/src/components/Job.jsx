import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
 
  const daysAgo = (time) => {
    const createdAt = new Date(time);
    const now = new Date();
    const diff = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "Today" : `${diff} days ago`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Top Row */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-slate-500">{daysAgo(job?.createdAt)}</span>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bookmark className="h-4 w-4 text-slate-500" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="h-12 w-12 border border-slate-200">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>

        <div>
          <h3 className="text-base font-semibold text-slate-800">
            {job?.company?.name}
          </h3>
          <p className="text-sm text-slate-500">India</p>
        </div>
      </div>

      {/* Job Info */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900 mb-1">
          {job?.title}
        </h2>
        <p className="text-sm text-slate-600 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        <Badge variant="secondary" className="font-medium">
          {job?.position} Positions
        </Badge>
        <Badge variant="secondary" className="font-medium">
          {job?.jobType}
        </Badge>
        <Badge variant="secondary" className="font-medium">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full"
        >
          View Details
        </Button>
        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
          Save Job
        </Button>
      </div>
    </div>
  );
};

export default Job;
