import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { setSerachedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    options: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    options: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    options: ["0-40k", "40k-1L", "1L-5L"],
  },
];

const FilterCard = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value || "");
  };

  useEffect(() => {
    dispatch(setSerachedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setOpen(!open)}
          className="w-full border border-slate-300 rounded-lg py-2 text-sm font-medium"
        >
          {open ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filter Content */}
      <div
        className={`bg-white rounded-xl border border-slate-200 shadow-sm p-5
        ${open ? "block" : "hidden"} lg:block`}
      >
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Filter Jobs
        </h2>

        <RadioGroup
          value={selectedValue}
          onValueChange={changeHandler}
          className="space-y-6"
        >
          {filterData.map((section, index) => (
            <div key={index}>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                {section.filterType}
              </h3>

              <div className="space-y-3">
                {section.options.map((item, idx) => {
                  const itemId = `filter-${index}-${idx}`;
                  return (
                    <div
                      key={itemId}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 transition"
                    >
                      <RadioGroupItem value={item} id={itemId} />
                      <Label
                        htmlFor={itemId}
                        className="text-slate-700 cursor-pointer w-full text-sm"
                      >
                        {item}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterCard;
