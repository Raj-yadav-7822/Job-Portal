import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, Menu, X, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../utils/constant";
import defaultImage from "@/assets/default.avif";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res?.status === 200) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res?.data?.message || "Logout successful");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Logout failed",
      );
    }
  };

  const NavLinks = () => (
    <>
      {user && user.role === "recruiter" ? (
        <>
          <Link to="/admin/companies" onClick={() => setOpen(false)}>Companies</Link>
          <Link to="/admin/jobs" onClick={() => setOpen(false)}>Jobs</Link>
        </>
      ) : (
        <>
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/jobs" onClick={() => setOpen(false)}>Jobs</Link>
          <Link to="/browse" onClick={() => setOpen(false)}>Browse</Link>
        </>
      )}
    </>
  );

  return (
    <div className="bg-white/80 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-semibold text-slate-800">
          Job<span className="text-emerald-600">Portal</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-600">
          <NavLinks />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-emerald-600 text-white">Signup</Button>
                </Link>
              </>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer ring-2 ring-emerald-500 ring-offset-2">
                    <AvatarImage
                      src={user?.profile?.profilePhoto || defaultImage}
                    />
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-72 p-4">
                  <div className="flex gap-3 items-center border-b pb-3">
                    <Avatar>
                      <AvatarImage
                        src={user?.profile?.profilePhoto || defaultImage}
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{user?.fullname}</h4>
                      <p className="text-sm text-slate-500">
                        {user?.profile?.bio || "No bio"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-col text-sm">
                    {user?.role === "student" && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded"
                      >
                        <User2 size={18} />
                        Profile
                      </Link>
                    )}
                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded text-left"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

       
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

     {/* responsive start */}
      {open && (
        <div className="md:hidden border-t border-slate-200 px-4 py-4 flex flex-col gap-4 text-sm font-medium text-slate-700 bg-white">
          <NavLinks />

          {!user ? (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/signup" onClick={() => setOpen(false)}>
                <Button className="w-full bg-emerald-600 text-white">Signup</Button>
              </Link>
            </>
          ) : (
            <>
              {user?.role === "student" && (
                <Link to="/profile" onClick={() => setOpen(false)}>
                  Profile
                </Link>
              )}
              <button onClick={logoutHandler}>Logout</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
