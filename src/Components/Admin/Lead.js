import React, { useState, useEffect } from "react";
import Header from "./header";
import { getLeadData } from "../../Services/Admin/userApiCall";
import moment from "moment";
import { Link } from "react-router-dom";

const Lead = () => {
  const botCode = localStorage.getItem("botCode");

  ///======== conversation data   =========//
  const [leadData, setLeadData] = useState([]);

  useEffect(() => {
    handleLeadData();
  }, []);

  const handleLeadData = async () => {
    try {
      const response = await getLeadData(botCode);
      console.log("response", response);
      setLeadData(response.data.reverse());
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <section class="profile-page">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12">
              <div class="heading-profile">
                <h2>Leads </h2>
              </div>

              <div class="table-responsive">
                <table class="table table-bordered">
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
                    {leadData.map((item) => (
                      <tr key={item._id}>
                        <td><Link to={`/admin/conversation/${item._id}`}>{item.conversationId}</Link></td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.interestArea}</td>
                        <td>{moment(item.createdAt).format("DD-MM-YYYY hh:mm a")}</td>
                        <td><Link to={`/admin/conversation/${item._id}`}><button className="btn btn-sm btn-primary">View</button></Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lead;
