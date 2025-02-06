import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx"; // Import xlsx library
import Header from "../header";
import { getLeadData } from "../../../Services/Admin/leadApiCall";
import moment from "moment";
import { Link } from "react-router-dom";

const Lead = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [leadData, setLeadData] = useState([]);

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const response = await getLeadData({ botCode: localStorage.getItem("botCode") });
        console.log("API Response:", response?.data);

        if (Array.isArray(response?.data?.data)) {
          setLeadData(response.data.data); // Correctly accessing the array
        } else {
          setLeadData([]); // Handle unexpected response
        }
      } catch (error) {
        console.error("Error fetching lead data:", error);
        setLeadData([]);
      }
    };

    fetchLeadData();
  }, []);

  // Pagination Calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leadData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((leadData.length || 0) / itemsPerPage);

  // Handle Page Change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Export Data to Excel
  const exportToExcel = () => {
    if (!leadData.length) {
      alert("No data available to export!");
      return;
    }

    // Map data for better column structure
    const formattedData = leadData.map(({ _id, name, email, phone, interestArea, details, createdAt }) => ({
      ID: _id,
      Name: name,
      Email: email,
      Phone: phone,
      Interest_Area: interestArea,
      Details: details,
      Created_At: moment(createdAt).format("DD-MM-YYYY HH:mm:ss"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    // Download the Excel file
    XLSX.writeFile(workbook, "LeadData.xlsx");
  };

  return (
    <div>
      <Header />
      <main>
        <section className="profile-page" style={{ height: "100vh" }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="heading-profile d-flex justify-content-between">
                  <h2>Lead</h2>
                  <div>
                    <button className="btn btn-primary mt-3" onClick={exportToExcel}>
                      Export to Excel
                    </button>
                  </div>
                </div>

                <table className="table table-bordered">
                  <thead>
                  <tr>
                      <th>Conversation Id</th>
                      <th>Name</th>  
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Interest Area</th>
                      <th>Created At</th>
                      <th>Conversation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((item, index) => (
                        <tr key={item._id}>
                        <td><Link to={`/admin/conversation/${item._id}`}>{item.conversationId}</Link></td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.interestArea}</td>

                        <td>{moment(item.createdAt).format("DD-MM-YYYY hh:mm a")}</td>
                        <td><Link to={`/admin/conversation/${item._id}`}><button className="btn btn-sm btn-primary">View</button></Link></td>
                      </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No Leads Available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>

                      {[...Array(totalPages)].map((_, index) => (
                        <li
                          key={index}
                          className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                        >
                          <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                          </button>
                        </li>
                      ))}

                      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Lead;
