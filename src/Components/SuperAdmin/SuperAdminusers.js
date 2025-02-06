import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import FormControl from "react-bootstrap/FormControl";
import SideBarAdmin from "./side-bar";
import WizardModal from "./modal/addClientModel";
import TransactionModal from "./modal/TransactionModal";
import {
  getAllUser,
  getAllTransactionUser,
  getContent,
  getSingleClientData,
} from "../../Services/SuperAdmin/apiCall";
import { useEffect } from "react";
import Navbar from "./topNavbar";
import ClientEditModel from "./modal/clientEditModel";
import moment from "moment";
import PaginationComponent from "./PaginationComponent";

const KwikbotPdminPanel = () => {
  const navigate = useNavigate();
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
      if (!response.data) return console.log("No data found");
      const filteredData = response.data.filter((user) => {
        if (activeFilter === "active") {
          return user.isActive; // Assuming there's an 'isActive' property in the user data
        } else if (activeFilter === "inactive") {
          return !user.isActive;
        }
        return true; // 'all' mode, display all data
      });

      setAllUserData(filteredData);
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

  //------------ handle view all transaction of the client----------------

  const [transactionData, setTransactionData] = useState([]);
  const [organisationname, setOrganisationname] = useState("");
  const handleViewTransaction = async (clientId, organisationname) => {
    try {
      setOrganisationname(organisationname);
      handleShow();
      const response = await getAllTransactionUser({ clientId });
      if (response && response.data && response.data.payments) {
        // Check if payments exist and set the transaction data
        setTransactionData(response.data.payments);
      } else {
        setTransactionData([{ paymentId: "No transaction data available." }]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const noUserFound = filteredByOrgNameAndMobile.length === 0;

  ///=================pagination===================//
  // Step 1: Set Up Initial State
  const itemPerPage = 10; // Number of items per page
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

  const [clientId1, setClientId] = useState(null);
  const [editclientdata, setEditClientData] = useState({});
  const [userId, setUserId] = useState(null);

  const handleEditClick = async (userId, clientId) => {
    try {
      const res = await getSingleClientData({ clientId: userId });
      if (res.success === true) {
        setEditClientData(res.data);
        setClientId(clientId);
        setModalShow2(true);
        setUserId(userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  ///------------ handle conversation click ----------------------//

  const handleConversatonClick = async (userId, organizationName) => {
    //send user id to the conversation page
    navigate("/superadmin/customerconversation", {
      state: { userId, organizationName },
    });
  };
  function downloadObjectAsTxt(data, filename) {
    const text = data.map(item => `${item.title}\n${item.description}`).join('\n\n');
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  
    URL.revokeObjectURL(url);
  }
  
  const handleDownloadData = async (userId) => {
    try {
      // Assuming getContent(userId) fetches data correctly.
      const response = await getContent(userId);
      const data = response.data.data;
      downloadObjectAsTxt(data, "content-history.txt");
    } catch (error) {
      console.log("error", error);
    }
  };
  
  

  const handleModalHide = () => {
    setModalShow2(false); // Close the modal
    UserDataCall(); // Call your function after closing the modal
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
                <h2>User Management </h2>
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
                  <div className="position-relative">
                    <FormControl
                      type="text"
                      placeholder="Organization Name/ Contact Number/ Email"
                      className="mr-sm-2 px-5"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <div className="search-icon-topbar">
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                  </div>
                </Form>
              </Col>

              <Col xs={8}>
                <div className="text-right pe-3 me-1">
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
                <table className="table table-bordered table-striped table-responsive ">
                  <thead>
                    <tr>
                      <th scope="col">Organization Name</th>
                      <th scope="col">Contact Number</th>
                      <th scope="col">Email ID</th>
                      <th scope="col">Country</th>
                      <th scope="col">Plan</th>
                      <th scope="col">Registration Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {noUserFound ? (
                      <tr>
                        <td colSpan="9">No user found.</td>
                      </tr>
                    ) : (
                      <>
                        {currentItems &&
                          currentItems.map((user) => (
                            <tr>
                              <td>{user.organizationName}</td>
                              <td>{user.matchedUsers[0]?.phone}</td>
                              <td>{user.matchedUsers[0]?.email}</td>
                              <td>{user.matchedUsers[0]?.country}</td>
                              <td>
                                <i class="fa fa-dollar"></i>{" "}
                                {
                                  user.subscriptionPlans[
                                    user.subscriptionPlans.length - 1
                                  ]?.amount
                                }{" "}
                                /{" "}
                                {
                                  user.subscriptionPlans[
                                    user.subscriptionPlans.length - 1
                                  ]?.frequency
                                }
                              </td>
                              <td>
                                {moment(user.createdAt).format("DD-MM-YYYY")}
                              </td>
                              <td>
                                <Link
                                  to=""
                                  className="edit"
                                  onClick={() =>
                                    handleDownloadData(
                                      user.matchedUsers[0]?._id
                                    )
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

                                <a className="edit">
                                  <i
                                    onClick={() =>
                                      handleConversatonClick(
                                        user._id,
                                        user.organizationName
                                      )
                                    }
                                    className="fa-solid fa-comment-dots"
                                  ></i>
                                </a>

                                <Link
                                  className="edit"
                                  onClick={() =>
                                    handleEditClick(
                                      user._id,
                                      user.matchedUsers[0]?._id
                                    )
                                  }
                                >
                                  <i class="fa-regular fa-pen-to-square"></i>
                                </Link>
                              </td>
                            </tr>
                          ))}
                      </>
                    )}

                    {modalShow2 && (
                      <ClientEditModel
                        show2={modalShow2}
                        onHide2={handleModalHide}
                        editclientdata={editclientdata}
                        clientId1={clientId1}
                        userId={userId}
                      />
                    )}
                  </tbody>
                </table>
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </Row>
          </Col>
        </div>
      </div>


      <TransactionModal
        show={show}
        onHide={handleClose}
        organisationname={organisationname}
        transactionData={transactionData}
      />

    </div>
  );
};

export default KwikbotPdminPanel;
