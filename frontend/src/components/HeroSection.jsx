
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSerachedQuery } from '@/redux/jobSlice';

const HeroSection = () => {
    const [query,setQuery] = useState("");
   const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSerachedQuery(query));
        navigate("/browse");
    }
  return (
  <section className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">

        <span className="inline-block px-5 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold tracking-wide">
          India’s Smart Job Portal
        </span>

        <h1 className="mt-8 text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 leading-tight">
          Find. Apply. Get Hired.
          <br />
          <span className="text-emerald-600">Your Dream Job Starts Here</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-slate-600 text-lg">
          Discover thousands of verified jobs from top companies. One search is
          all it takes to move your career forward.
        </p>

        <div className="mt-12 flex items-center max-w-2xl mx-auto bg-white border border-slate-200 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 transition">
          <input 
          onChange={(e)=>setQuery(e.target.value)}
            type="text"
            placeholder="Search by role, skill or company"
            className="flex-1 px-6 py-4 rounded-full outline-none text-slate-700"
          />
          <Button onClick = {searchJobHandler} className="m-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-6">
            <Search className="h-5 w-5" />
          </Button>
        </div>

      </div>
    </section>
    )
  
}

export default HeroSection