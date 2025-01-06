import React from "react";
import DataTable from "./DataTable";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-5">
        <DataTable />
      </div>
    </>
  );
};

export default Dashboard;
