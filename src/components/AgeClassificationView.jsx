import React from "react";

export default function AgeClassificationView({ ageClassification }) {
  return (
    <div
      className=" absolute w-10 h-10 flex items-center justify-center right-[1rem] top-[1rem] rounded-sm"
      style={{
        zIndex: 2,
        backgroundColor: ageClassification?.bgColor,
        color: ageClassification?.textColor,
        borderRadius: 4,
      }}
    >
      <p className=" font-semibold text-[0.725rem] mb-0">
        {ageClassification?.label}
      </p>
    </div>
  );
}
