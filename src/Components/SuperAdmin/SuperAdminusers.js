import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
//importing form
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import FormControl from "react-bootstrap/FormControl";
import SideBarAdmin from "./side-bar";
import WizardModal from "./modal/addClientModel";
import Modal from "react-bootstrap/Modal";
import {
  getAllUser,
  getAllTransaction,
  getUserById,
} from "../../Services/SuperAdmin/apiCall";
import { useEffect } from "react";
import Navbar from "./topNavbar";
import { toast } from "react-toastify";
import ClientEditModel from "./modal/clientEditModel";
import Pagination from "react-bootstrap/Pagination";
import moment from "moment";

const KwikbotPdminPanel = () => {
  // Step 2: Set Up Initial State
  const [activeButton, setActiveButton] = useState(null);

  // Step 3: Define Click Handler
  const handleClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [allUserData, setAllUserData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("active");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    UserDataCall();
  }, [activeFilter]);

  const UserDataCall = async () => {
    try {
      const response = await getAllUser();
      const filteredData = response.data.filter((user) => {
        if (activeFilter === "active") {
          return user.isActive; // Assuming there's an 'isActive' property in the user data
        } else if (activeFilter === "inactive") {
          return !user.isActive;
        }
        return true; // 'all' mode, display all data
      });

      setAllUserData(filteredData);
      console.log("response", filteredData);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  //========= search by org name and mobile number  =========//

  const filteredByOrgNameAndMobile = allUserData.filter((user) => {
    const orgNameMatch = user.organizationName
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const mobileMatch =
      user.matchedUsers[0]?.phone &&
      user.matchedUsers[0]?.phone.includes(searchInput);
    const emailMatch =
      user.matchedUsers[0]?.email &&
      user.matchedUsers[0]?.email.includes(searchInput);

    return orgNameMatch || mobileMatch || emailMatch;
  });

  console.log("allUserData", allUserData);

  //------------ handle view all transaction of the client----------------

  const [transactionData, setTransactionData] = useState([]);
  const [organisationname, setOrganisationname] = useState("");

  const handleViewTransaction = async (clientId, organisationname) => {
    try {
      setOrganisationname(organisationname);
      handleShow();
      const response = await getAllTransaction({ clientId });

      // Set transactionData to the array of payments from the response
      setTransactionData(response.data[0]?.payments || []);
    } catch (error) {
      toast.error("Server error: " + error.response.data.message);
    }
  };

  ///=================pagination===================//
  // Step 1: Set Up Initial State
  const itemPerPage = 6; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const totalItems = filteredByOrgNameAndMobile.length; // Total items in your data
  const totalPages = Math.ceil(totalItems / itemPerPage); // Calculate total pages

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page
  };

  // Calculate indexes for data slicing
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = filteredByOrgNameAndMobile.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  ///================== handle edit click ===================//

  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleEditClick = (userId) => {
    setSelectedUserId(userId);
    setModalShow2(true);
  };

  //=============== handle download the file ================//

  ///----------- data is downloading in csv formatb fuction ----------------------

  function downloadObjectAsJson(jsonData, filename) {
    const json = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  }
  const handleDownloadData = async (userId) => {
    try {
      const response = await getUserById({ userid: userId });
      console.log("response", response);
      const data = response.data;
      downloadObjectAsJson(data, "user.json");
    } catch (error) {
      console.log(error);
    }
  };
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
          <Col xs={12} className="pt-5">
            <Row>
              <Col xs={9}>
                <h2>User management </h2>
              </Col>
              <Col xs={3}>
                <ul className="active-inactive">
                  <li>
                    <Link
                      onClick={() => setActiveFilter("active")}
                      className={activeFilter === "active" ? "bgactive" : ""}
                    >
                      Active
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setActiveFilter("inactive")}
                      className={activeFilter === "inactive" ? "bgactive" : ""}
                    >
                      Inactive
                    </Link>
                  </li>
                </ul>
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
                <div className="text-right pr-3">
                  <Link
                    to=""
                    className="add-user"
                    onClick={() => setModalShow(true)}
                  >
                    Add user
                  </Link>
                  <WizardModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    data={UserDataCall}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <div className="table-res mt-5">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Company Name</th>
                      <th scope="col">Contact Number</th>
                      <th scope="col">Email ID</th>
                      <th scope="col">Country</th>
                      <th scope="col">Plan</th>
                      <th scope="col">Status</th>
                      <th scope="col">Registration Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems &&
                      currentItems.map((user) => (
                        <tr>
                          <td>{user.organizationName}</td>
                          <td>{user.matchedUsers[0]?.phone}</td>
                          <td>{user.matchedUsers[0]?.email}</td>
                          <td>{user.matchedUsers[0]?.country}</td>
                          <td>{user.subscriptionPlans[0]?.planName}</td>
                          <td>
                            {user?.isActive === true ? "Active" : "Inactive"}
                          </td>
                          <td>
                           
                            {moment(user.createdAt).format("DD-MM-YYYY")}
                          </td>
                          <td>
                            <Link
                              to=""
                              className="edit"
                              onClick={() =>
                                handleDownloadData(user.matchedUsers[0]?._id)
                              }
                            >
                              <i class="fa-solid fa-download"></i>
                            </Link>
                            <Link
                              to=""
                              className="edit"
                              onClick={() =>
                                handleViewTransaction(
                                  user._id,
                                  user.organizationName
                                )
                              }
                            >
                              <i class="fa-solid fa-circle-dollar-to-slot"></i>
                            </Link>
                            <Link
                              to="/superadmin/customerconversation"
                              className="edit"
                            >
                              <i class="fa-solid fa-comment-dots"></i>
                            </Link>

                            <Link
                              className="edit"
                              onClick={() =>
                                handleEditClick(user.matchedUsers[0]?._id)
                              }
                            >
                              <i class="fa-regular fa-pen-to-square"></i>
                            </Link>
                            {modalShow2 && (
                              <ClientEditModel
                                show={modalShow2}
                                onHide={() => setModalShow2(false)}
                                userId={user._id}
                              />
                            )}
                          </td>
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

      <Modal show={show} onHide={handleClose} animation={true} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{organisationname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Transaction ID</th>
                <th scope="col">Amount</th>
                <th scope="col">Free Type</th>
                <th scope="col">Status</th>
                <th scope="col">Method</th>
              </tr>
            </thead>
            <tbody>
              {transactionData.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.paymentDate}</td>
                  <td>{payment.paymentId}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.paymentStatus}</td>
                  <td>{payment.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default KwikbotPdminPanel;
