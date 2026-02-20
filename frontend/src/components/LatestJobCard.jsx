import React from "react";
import { Badge } from "./ui/badge";
import { MapPin, Briefcase, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LatestJobCard = ({ job }) => {
    const navigate = useNavigate()
  return (
    <div  onClick={()=>navigate(`/description/${job._id}`)} className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">

      {/* Company */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-slate-900 font-semibold text-lg">
            {job?.company?.name}
          </h3>
          <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
            <MapPin size={14} />
            <span>India</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mt-5">
        <h2 className="text-xl font-semibold text-slate-800 group-hover:text-emerald-600 transition">
          {job?.title}
        </h2>
        <p className="text-slate-600 text-sm mt-2 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-6">
        <Badge className="bg-emerald-50 text-emerald-700 font-medium">
          {job?.position} Positions
        </Badge>

        <Badge className="bg-slate-100 text-slate-700 font-medium flex items-center gap-1">
          <Briefcase size={14} />
          {job?.jobType}
        </Badge>

        <Badge className="bg-amber-50 text-amber-700 font-medium flex items-center gap-1">
          <IndianRupee size={14} />
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;
