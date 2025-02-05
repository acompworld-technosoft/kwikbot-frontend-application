import React, { useState, useEffect } from "react";
import Header from "./header";
import { getConversationData } from "../../Services/Admin/userApiCall";
import moment from "moment";
import { useParams } from "react-router-dom";

const Coversation = () => {
  const clientId = localStorage.getItem("clientId");
  const { id } = useParams();
  ///======== conversation data   =========//
  const [conversationData, setConversationData] = useState([]);
  const [visitorConversation, setVisitorConversation] = useState([]);
  const [visitorId, setVisitorId] = useState("");
  const [conversationDate, setConversationDate] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interestArea, setInterestArea] = useState("");
  const [organization, setOrganization] = useState("");

  useEffect(() => {
    handleConversationData();
  }, []);

  const handleConversationData = async () => {
    try {
      const response = await getConversationData(clientId);
      setConversationData(response.data);

      console.log("id", id);

      if (response.data.length > 0) {

        if(id){
          const parsedData = response.data.filter((item) => item._id === id);
          console.log("parsedData", parsedData);
          setVisitorConversation(parsedData[0].conversation);
          setVisitorId(parsedData[0].visitorId);
          setEmail(parsedData[0].email);
          setName(parsedData[0].name);
          setPhone(parsedData[0].phone);
          setInterestArea(parsedData[0].interestArea);
          setOrganization(parsedData[0].organization);
          setConversationDate(parsedData[0].createdAt);
        }
        else{
          const parsedData = response.data[0].conversation;
          console.log("parsedData", parsedData);
          setVisitorConversation(response.data[0].conversation);
          setVisitorId(response.data[0].visitorId);
          setEmail(response.data[0].email);
          setName(response.data[0].name);
          setPhone(response.data[0].phone);
          setInterestArea(response.data[0].interestArea);
          setOrganization(response.data[0].organization);
          setConversationDate(response.data[0].createdAt);
        }
      } else if (response.data.length === 0) {
        setVisitorConversation([]);
        setVisitorId("");
        setEmail("");
        setName("");
        setPhone("");
        setInterestArea("");
        setOrganization("");
        setConversationDate("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  ////======== conversation throught id   =========//
  const handleShowConversation = async (id, visId, date, email, name, phone, interestArea, organization) => {
    setVisitorId(visId);
    setConversationDate(date);
    setEmail(email);
    setName(name);
    setPhone(phone);
    setInterestArea(interestArea);
    setOrganization(organization);

    try {
      console.log("id", id);
      console.log("visId", visId);
      console.log("date", date);
      const response = conversationData.filter((item) => item._id === id);

      console.log("response", response);

      if (response.length > 0) {
        setVisitorConversation(response[0].conversation);
      } else {
        console.log("No matching conversation found.");
      }
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
                <h2>Conversation </h2>
              </div>

              <div class="d-flex">
                <div class="first-conversation-list">
                  <div class="coversation-heading">Visitors</div>

                  {conversationData.map((item) => (
                    <div
                      class="padding-namedate d-flex justify-content-between"
                      style={{ cursor: "pointer", backgroundColor: item.visitorId === visitorId ? "#f5f5f5" : "white" }}
                      onClick={() =>
                        handleShowConversation(
                          item._id,
                          item.visitorId,
                          item.createdAt,
                          item.email,
                          item.name,
                          item.phone,
                          item.interestArea,
                          item.organization
                        )
                      }
                      key={item._id}
                    >
                      <div class="name-date-conversation">
                        <h6>{item.visitorId}</h6>
                        <p className="text-muted">{item.email}</p>
                      </div>
                      <div class="date-conversation">
                        <p>{moment(item.createdAt).format(" D MMM hh:mm a")}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div class="conversation-chat">
                  <div class="conversation-chat-heading">
                    {name==null ? <h4>{visitorId}</h4> : <h4>{name} {organization==null ? "" : "(" + organization + ")"}</h4>}
                    <p className="text-muted">{email}</p>         
                  </div>
                  {visitorConversation.map((rec, index) => {
                    const isBot = rec.isBot;
                    {/* const Date = moment(
                      conversationDate
                    ).format("Do MMM ");
                    const Time = moment(
                      conversationDate
                    ).format("h:mm A"); // You can adjust this as needed */}

                    return (
                      <div className="chat-name" key={index}>
                        <div className={isBot ? "ai-chatvisitor" : ""}>
                          {isBot ? (
                            <img src="/images/al-image.png" alt="" />
                          ) : (
                            <h6>Visitor</h6>
                          )}
                        </div>
                        <div className="chat-content-box">
                          <p>{rec.message}</p>
                          {/* <span>{Date}, {Time}</span> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Coversation;
