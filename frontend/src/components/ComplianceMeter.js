import React from "react";
import { motion } from "framer-motion";

const ComplianceMeter = ({ percentage }) => {
  return (
    <div className="meter-container">
      <div className="meter-bg">
        <motion.div
          className="meter-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2 }}
        />
      </div>
      <p>{percentage}% Compliance</p>
    </div>
  );
};

export default ComplianceMeter;
