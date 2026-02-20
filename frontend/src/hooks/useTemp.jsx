import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/components/utils/constant";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const url = `${JOB_API_END_POINT}/get`; 
        console.log("Fetching jobs from:", url);

        const res = await axios.get(url, { withCredentials: true });

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          console.error("Backend returned error:", res.data.message);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data || error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    fetchAllJobs();
  }, [dispatch]);
};

export default useGetAllJobs;
