import React, { useState, useEffect } from "react";
import { Pagination, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import SideBarAdmin from "./side-bar";
import Navbar from "./topNavbar";
import { getAllTransactionData } from "../../Services/SuperAdmin/apiCall";
import moment from "moment";

const Transaction = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [allTransactionData, setAllTransactionData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    handleAllTransactionData();
  }, []);

  const handleAllTransactionData = async () => {
    try {
      const response = await getAllTransactionData();
      setAllTransactionData(response.data);
      //remove the data whose transection id is null
      const traData = response.data.filter(
        (item) => item.payments[0]?.paymentId !== null
      );
      setAllTransactionData(traData);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = allTransactionData.filter((item) => {
    const transactionDate = new Date(item.payments[0]?.paymentDate);
    const lowerCaseSearchInput = searchInput.toLowerCase();

    const emailMatch = item.matchedUsers[0]?.email
      .toLowerCase()
      .includes(lowerCaseSearchInput);
    const amountMatch = item.payments[0]?.amount
      .toString()
      .toLowerCase()
      .includes(lowerCaseSearchInput);
    const paymentStatusMatch = item.payments[0]?.paymentStatus
      .toLowerCase()
      .includes(lowerCaseSearchInput);
    const paymentMethodMatch = item.payments[0]?.paymentMethod
      .toLowerCase()
      .includes(lowerCaseSearchInput);

    if (startDate && endDate) {
      return (
        transactionDate >= new Date(startDate) &&
        transactionDate <= new Date(endDate) &&
        (emailMatch || amountMatch || paymentStatusMatch || paymentMethodMatch)
      );
    } else if (startDate) {
      return (
        transactionDate >= new Date(startDate) &&
        (emailMatch || amountMatch || paymentStatusMatch || paymentMethodMatch)
      );
    } else if (endDate) {
      return (
        transactionDate <= new Date(endDate) &&
        (emailMatch || amountMatch || paymentStatusMatch || paymentMethodMatch)
      );
    } else {
      return (
        emailMatch || amountMatch || paymentStatusMatch || paymentMethodMatch
      );
    }
  });

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    handleDateSearch();
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    handleDateSearch();
  };

  const handleDateSearch = () => {
    if (startDate || endDate) {
      const filteredData = allTransactionData.filter((item) => {
        const transactionDate = new Date(item.payments[0]?.paymentDate);
        if (startDate && endDate) {
          return (
            transactionDate >= new Date(startDate) &&
            transactionDate <= new Date(endDate)
          );
        } else if (startDate) {
          return transactionDate >= new Date(startDate);
        } else {
          return transactionDate <= new Date(endDate);
        }
      });
      setAllTransactionData(filteredData);
    } else {
      handleAllTransactionData();
    }
  };

  ///=================pagination===================//
  // Step 1: Set Up Initial State
  const itemPerPage = 6; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const totalItems = filteredData.length; // Total items in your data
  const totalPages = Math.ceil(totalItems / itemPerPage); // Calculate total pages

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page
  };

  // Calculate indexes for data slicing
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <Navbar />

      <div className="admin-panel">
        <SideBarAdmin />
        <div
          className={`right-content ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          <Col xs={12} className="p-5 content">
            <Row>
              <Col>
                <h2>Transactions </h2>
              </Col>
            </Row>

            <Row>
              <Col xs={4}>
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </Form>
              </Col>

              <Col>
                <div className="d-flex justify-content-end align-items-baseline">
                  <p className="mr-3">Period From</p>
                  <input
                    type="date"
                    className="date-input mr-3"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                  <p className="mr-3">To</p>
                  <input
                    type="date"
                    className="date-input mr-3"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                  <button className="search-button" onClick={handleDateSearch}>
                    Search
                  </button>
                </div>
                <div className="text-right d-flex justify-content-end align-items-baseline mt-3">
                  <p className="mr-3">Total amount Received </p>
                  <input
                    type="text"
                    className="date-input mr-3"
                    placeholder="10000"
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <div className="table-res mt-5">
                <table className="table table-bordered table-striped ">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th scope="col">Transaction Date/Time</th>
                      <th scope="col">Transaction ID</th>
                      <th scope="col">Amount </th>
                      <th scope="col">Status</th>
                      <th scope="col">Transaction Done By</th>
                      <th scope="col">Email ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems &&
                      currentItems.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {moment(item.payments[0]?.paymentDate).format(
                              "D MMMM YYYY , h:mm a"
                            )}
                          </td>
                          <td>{item.payments[0]?.paymentId}</td>
                          <td>{item.payments[0]?.amount}</td>
                          <td>{item.payments[0]?.paymentStatus}</td>
                          <td>{item.payments[0]?.paymentMethod}</td>
                          <td>{item.matchedUsers[0]?.email}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div>
                  <div className="pagination-container">
                    <Pagination className="justify-content-center">
                      <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />
                      {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item
                          key={index + 1}
                          active={index + 1 === currentPage}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))}
                      <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      />
                    </Pagination>
                  </div>
                </div>
              </div>
            </Row>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
