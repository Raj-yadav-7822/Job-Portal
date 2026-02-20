import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import AdminJobsTable from './AdminJobsTable'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchJobByText } from '@/redux/jobSlice'
import { ClipboardList } from 'lucide-react'

const AdminJobs = () => {
  useGetAllAdminJobs()
  const [input, setInput] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { allJobs } = useSelector(store => store.job)

  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">

        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-700 font-semibold">
            <ClipboardList className="w-6 h-6 text-indigo-500" />
            <h1 className="text-2xl md:text-3xl font-bold">Admin Jobs</h1>
          </div>
          <Button 
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md"
          >
            New Job
          </Button>
        </div>

   
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <Input
            placeholder="Search by job title, role, company..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
        </div>

     
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <p className="text-gray-500 text-sm">Total Jobs</p>
            <p className="text-xl font-bold text-gray-800">{allJobs?.length || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <p className="text-gray-500 text-sm">Active Jobs</p>
            <p className="text-xl font-bold text-gray-800">
              {allJobs?.filter(j => j.status === 'active').length || 0}
            </p>
          </div>
       
        </div>

        {/* Jobs Table */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <AdminJobsTable />
        </div>

      </div>
    </div>
  )
}

export default AdminJobs
