import React from "react";
import { Linkedin, Twitter, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-slate-800 pb-10">

          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-white">
              Job<span className="text-emerald-500">Portal</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Discover opportunities, connect with top companies, and build a career you are proud of.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-3 text-sm">
            <h4 className="text-white font-medium mb-2">Quick Links</h4>
            <a href="#" className="hover:text-emerald-400 transition-colors">Home</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">  <Link to="/browse" >Browse</Link></a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Companies</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-medium mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-emerald-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-emerald-600 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://www.linkedin.com/in/rishi-yadav-7809b2328/" className="p-2 bg-slate-800 rounded-lg hover:bg-emerald-600 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 text-sm text-slate-500 text-center md:text-left gap-2 md:gap-0">
          <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
          <p>Designed for modern hiring experience.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
