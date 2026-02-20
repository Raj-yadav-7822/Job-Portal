import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import defaultImage from "@/assets/default.avif";

const Profile = () => {
  useGetAppliedJobs();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const hasResume = Boolean(user?.profile?.resume);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mt-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">

          {/* Top Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={user?.profile?.profilePhoto || defaultImage}
                  alt="profile"
                />
              </Avatar>

              <div>
                <h1 className="text-xl font-semibold text-slate-800">
                  {user?.fullname}
                </h1>
                <p className="text-slate-600 text-sm mt-1">
                  {user?.profile?.bio || "No bio added"}
                </p>
              </div>
            </div>

            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="w-full md:w-auto"
            >
              <Pen size={16} className="mr-2" />
              Edit Profile
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-6 space-y-3 text-slate-700 text-sm">
            <div className="flex items-center gap-3">
              <Mail size={16} />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Contact size={16} />
              <span>{user?.phoneNumber || "Not provided"}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h2 className="font-semibold text-slate-800 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-slate-500 text-sm">No skills added</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-6">
            <Label className="font-semibold text-slate-800">Resume</Label>
            {hasResume ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 text-sm mt-2 hover:underline break-all"
              >
                {user.profile.resumeOriginalName || "View Resume"}
              </a>
            ) : (
              <p className="text-slate-500 text-sm mt-2">No resume uploaded</p>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mt-8 mb-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-lg text-slate-800 mb-6">
            Applied Jobs
          </h2>
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
