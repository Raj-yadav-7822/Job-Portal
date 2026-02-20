import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { JOB_API_END_POINT } from "../utils/constant";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 1,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    if (name === "position") {
      setInput({ ...input, position: Math.max(1, Number(value)) });
      return;
    }
    setInput({ ...input, [name]: value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany?._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.companyId) return toast.error("Please select a company");
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border">
      
          <div className="px-10 py-8 bg-gray-50 border-b">
            <h1 className="text-3xl font-bold text-gray-800">
              Post a New Job
            </h1>
            <p className="text-gray-500 mt-1">
              Fill out the details for candidates to see
            </p>
          </div>

          <form onSubmit={submitHandler}>
     
            <div className="p-10 space-y-8">
              <div className="bg-gray-50 p-8 rounded-xl border">
                <h2 className="text-xl font-semibold text-gray-700 mb-6">
                  Basic Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input
                      name="title"
                      value={input.title}
                      onChange={changeEventHandler}
                      placeholder="Frontend Developer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      name="location"
                      value={input.location}
                      onChange={changeEventHandler}
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Description</Label>
                    <textarea
                      name="description"
                      value={input.description}
                      onChange={changeEventHandler}
                      className="w-full p-3 border rounded-md resize-none h-28 focus:outline-none"
                      placeholder="Write a brief description of the job"
                    />
                  </div>
                </div>
              </div>

              {/* Job  */}
              <div className="bg-gray-50 p-8 rounded-xl border">
                <h2 className="text-xl font-semibold text-gray-700 mb-6">
                  Job Details
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Job Type</Label>
                    <Input
                      name="jobType"
                      value={input.jobType}
                      onChange={changeEventHandler}
                      placeholder="Full-time / Part-time"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Experience (Years)</Label>
                    <Input
                      type="number"
                      min={0}
                      name="experience"
                      value={input.experience}
                      onChange={changeEventHandler}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Positions</Label>
                    <Input
                      type="number"
                      min={1}
                      name="position"
                      value={input.position}
                      onChange={changeEventHandler}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Salary</Label>
                    <Input
                      type="number"
                      name="salary"
                      value={input.salary}
                      onChange={changeEventHandler}
                      placeholder="Annual salary in ₹"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Requirements</Label>
                    <textarea
                      name="requirements"
                      value={input.requirements}
                      onChange={changeEventHandler}
                      className="w-full p-3 border rounded-md h-28 resize-none focus:outline-none"
                      placeholder="Skills, tools, qualifications required"
                    />
                  </div>
                </div>
              </div>

              {/* Company */}
              {companies.length > 0 && (
                <div className="bg-gray-50 p-8 rounded-xl border">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Company
                  </h2>
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="w-full h-12 bg-white">
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem
                            key={company._id}
                            value={company.name.toLowerCase()}
                          >
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="border-t bg-white px-10 py-6 flex justify-end">
              <Button
                type="submit"
                className="px-10 h-12 text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center justify-center"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {loading ? "Publishing..." : "Publish Job"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
