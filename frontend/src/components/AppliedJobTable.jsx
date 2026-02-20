import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
console.log("Applied Jobs:", allAppliedJobs);

  const getStatusStyle = (status) => {
    if (status === "rejected") return "bg-red-100 text-red-700 border-red-200";
    if (status === "pending") return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-green-100 text-green-700 border-green-200";
  };

  const formatDate = (date) => {
    if (!date) return "NA";
    return new Date(date).toLocaleDateString();
  };

  if (!allAppliedJobs || allAppliedJobs.length === 0) {
    return (
      <div className="text-center text-slate-500 py-10">
        You have not applied to any jobs yet.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs.map((appliedJob) => (
            <TableRow key={appliedJob._id}>
              <TableCell>
                {formatDate(appliedJob?.createdAt)}
              </TableCell>

              <TableCell className="font-medium">
                {appliedJob?.job?.title || "NA"}
              </TableCell>

              <TableCell>
                {appliedJob?.job?.company?.name || "NA"}
              </TableCell>

              <TableCell className="text-right">
                <Badge
                  variant="outline"
                  className={`${getStatusStyle(appliedJob?.status)} capitalize`}
                >
                  {appliedJob?.status || "pending"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
