import React, { useEffect, useState } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { getSingleClientData, updateClientData } from '../../../Services/SuperAdmin/apiCall';
import { handleValidation } from "./validation";
import { toast } from "react-toastify";

const steps = ["Step 1: Add User", "Step 2: "];

const ClientEditModel = ({ show, onHide, userId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  //---- handle next and previous button==============

  const handleNext = () => {
   console.log("currentstep",currentStep)

    try {
      const isValid = handleValidation(formData, setErrorMessage);

      if (isValid) {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        }
      }
    } catch (error) {
      alert(error, "errpr in validation");
    }
  };
  const handlePrevious = () => {
    console.log("currentstep",currentStep)
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  ///================== get client data by id================
  const [clientData, setClientData] = useState([]);
  const [clientId, setClientId] = useState("");
  const getClientData = async () => {
    try {
      console.log("clientId", clientId);  
      const res = await getSingleClientData({ clientId: userId });

      console.log("res", res);  
      setClientId(res.data._id);
      const newData = { ...formData }; // Create a new copy of formData
      const clientData = res.data;

      console.log("clientData", clientData);
      newData.user.firstName = clientData.user.firstName;
      newData.user.lastName = clientData.user.lastName;
      newData.user.email = clientData.user.email;
      newData.user.phone = clientData.user.phone;
      newData.user.country = clientData.user.country;
      newData.user.password = clientData.user.password;
      newData.client.organizationName = clientData.client.organizationName;
      newData.client.industry = clientData.client.industry;
      newData.client.botCode = clientData.client.botCode;
      newData.client.websiteUrl = clientData.client.websiteUrl;
      newData.client.subscriptionPlans[0].setUpAmount =
        clientData.client.subscriptionPlans[0].setUpAmount;
      newData.client.subscriptionPlans[0].amount =
        clientData.client.subscriptionPlans[0].amount;
      newData.client.subscriptionPlans[0].frequency =
        clientData.client.subscriptionPlans[0].frequency;
      setClientData(clientData);
      setFormData(newData); // Update formData with the new copy
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClientData();
  }, []);

  ///---- Edit User form handle ------------------
  const [subscriptionPlan, setSubscriptionPlan] = useState({
    frequency: "",
    amount: "",
    setUpAmount: "",
    planName: "Basic Plan",
    currency: "USD",
    applicableTaxPercentage: 0,
    isDeleted: false,
    description: [
      {
        title: "Subscription Fee",
        amount: 0,
        isPayable: true,
      },
    ],
    renewals: [],
  });

  const [errorMessage, setErrorMessage] = useState({});
  const [formData, setFormData] = useState({
    user: {
      firstName: "",
      lastName: "",
      userType: "ClientUser",
      country: "",
      email: "",
      phone: "",
      password: "",
    },
    client: {
      organizationName: "",
      industry: "",
      subscriptionPlans: [subscriptionPlan],
      contents: [],
    },
  });

  ///---- Add User form handle  input change function ------------------

  const handleSubscriptionChanges = (e) => {
    const { name, value } = e.target;
    setSubscriptionPlan((prevPlan) => ({
      ...prevPlan,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      client: {
        ...prevFormData.client,
        subscriptionPlans: [subscriptionPlan],
      },
    }));
  }, [subscriptionPlan]);

  const handleInputChange = (event, section, field, index = null) => {
    const { value } = event.target;

    setFormData((prevFormData) => {
      const updatedSection = { ...prevFormData[section] };
      if (index !== null && updatedSection.subscriptionPlans) {
        const updatedPlans = [...updatedSection.subscriptionPlans];
        updatedPlans[index] = {
          ...updatedPlans[index],
          [field]: value,
        };
        updatedSection.subscriptionPlans = updatedPlans;
      } else {
        updatedSection[field] = value;
      }

      return {
        ...prevFormData,
        [section]: updatedSection,
      };
    });
  };

  //---- Edit  User form handle  submit  ------------------

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      console.log("formdata on submit ", formData);
      const errors = {};
      if (!formData.client.subscriptionPlans[0].setUpAmount) {
        errors.setUpAmount = " setUpAmount is required";
      }
      if (!formData.client.subscriptionPlans[0].amount) {
        errors.amount = "Amount is required";
      }
      if (!formData.client.subscriptionPlans[0].frequency) {
        errors.frequency = "Frequency is required";
      }
      setErrorMessage(errors);

      if (Object.keys(errors).length === 0) {
        try {
          const newData = formData;
          const apiResponse = await updateClientData({ newData, clientId });
          toast.success(apiResponse.message);
          console.log(apiResponse);

          setErrorMessage({});

          onHide();
          setCurrentStep(0);
        } catch (error) {
          if (error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("server error");
          }
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  ///------- Add User form handle  input focus function ------------------

  const handleInputFocus = (e) => {
    const { name } = e.target;

    setErrorMessage((prevMessage) => ({
      ...prevMessage,
      [name]: "",
    }));
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="progressBar">
              {steps.map((step, index) => (
                <div className="progressBarStep" key={index}>
                  <div
                    className={`stepCircle ${
                      index < currentStep ? "active" : ""
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < currentStep && index < steps.length - 1 && (
                    <div className="progressBarFill" />
                  )}
                </div>
              ))}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentStep === 0 && (
            <div>
              <Row className="mt-4 mb-4">
                <Col xs={6}>
                  <div className="input-topposition">
                    <input
                      type="text"
                      placeholder=""
                      className="input-model"
                      onChange={(event) =>
                        handleInputChange(event, "user", "firstName")
                      }
                      value={formData.user.firstName}
                      name="firstName"
                      onFocus={handleInputFocus}
                    />
                    <label className="toplabel">First Name </label>
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.firstName}
                    </span>
                  </div>
                </Col>

                <Col xs={6}>
                  <div className="input-topposition">
                    <input
                      type="text"
                      placeholder=""
                      className="input-model"
                      onChange={(event) =>
                        handleInputChange(event, "user", "lastName")
                      }
                      value={formData.user.lastName}
                      name="lastName"
                      onFocus={handleInputFocus}
                    />
                    <label className="toplabel">Last Name </label>
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.lastName}
                    </span>
                  </div>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col xs={6}>
                  <div className="input-topposition">
                    <input
                      type="text"
                      placeholder=""
                      className="input-model"
                      onChange={(event) =>
                        handleInputChange(event, "user", "email")
                      }
                      value={formData.user.email}
                      name="email"
                      onFocus={handleInputFocus}
                    />
                    <label className="toplabel">Email ID</label>
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.email}
                    </span>
                  </div>
                </Col>

                <Col xs={6}>
                  <div className="input-topposition">
                    <input
                      type="text"
                      placeholder=""
                      className="input-model"
                      onChange={(event) =>
                        handleInputChange(event, "user", "phone")
                      }
                      value={formData.user.phone}
                      name="phone"
                      onFocus={handleInputFocus}
                    />
                    <label className="toplabel">Phone No </label>
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.phone}
                    </span>
                  </div>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col xs={6}>
                  <div className="input-topposition">
                    <input
                      type="text"
                      placeholder=""
                      className="input-model"
                      onChange={(event) =>
                        handleInputChange(event, "client", "organizationName")
                      }
                      value={formData.client.organizationName}
                      name="organizationName"
                      onFocus={handleInputFocus}
                    />
                    <label className="toplabel">Organization name </label>
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.organizationName}
                    </span>
                  </div>
                </Col>

                <Col xs={6}>
                  <div className="input-topposition">
                    <input
                      type="text"
                      placeholder=""
                      className="input-model"
                      onChange={(event) =>
                        handleInputChange(event, "client", "industry")
                      }
                      value={formData.client.industry}
                      name="industry"
                      onFocus={handleInputFocus}
                    />
                    <label className="toplabel">Industry </label>
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.industry}
                    </span>
                  </div>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col xs={6}>
                  <div className="input-topposition">
                    <input
                      type="text"
                      placeholder=""
                      className="input-model"
                      onChange={(event) =>
                        handleInputChange(event, "user", "password")
                      }
                      value={formData.user.password}
                      name="password"
                      onFocus={handleInputFocus}
                    />
                    <label className="toplabel">Choose Password </label>
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.password}
                    </span>
                  </div>
                </Col>

                <Col xs={6}>
                  <div className="input-topposition">
                    <input
                      type="text"
                      placeholder=""
                      className="input-model"
                      onChange={(event) =>
                        handleInputChange(event, "user", "passwordrewrite")
                      }
                      value={formData.user.passwordrewrite}
                      name="passwordrewrite"
                      onFocus={handleInputFocus}
                    />
                    <label className="toplabel">Rewrite Password </label>
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.passwordrewrite}
                    </span>
                  </div>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col xs={6}>
                  <div className="input-topposition">
                    <input
                      type="text"
                      placeholder=""
                      className="input-model"
                      onChange={(event) =>
                        handleInputChange(event, "user", "country")
                      }
                      value={formData.user.country}
                      name="country"
                      onFocus={handleInputFocus}
                    />
                    <label className="toplabel">Country </label>
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.country}
                    </span>
                  </div>
                </Col>

                <Col xs={6}>
                  <div className="input-topposition">
                    <input
                      type="text"
                      placeholder=""
                      className="input-model"
                      onChange={(event) =>
                        handleInputChange(event, "client", "botCode")
                      }
                      value={formData.client.botCode}
                      name="botCode"
                      onFocus={handleInputFocus}
                    />
                    <label className="toplabel">Bot Client Code </label>
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.botCode}
                    </span>
                  </div>
                </Col>
              </Row>

              <Row className="mb-4">
              <Col xs={6}>
                  <div className="input-topposition">
                    <input
                      type="text"
                      placeholder=""
                      className="input-model"
                      onChange={(event) =>
                        handleInputChange(event, "client", "websiteUrl")
                      }
                      value={formData.client.websiteUrl}
                      name="websiteUrl"
                      onFocus={handleInputFocus}
                    />
                    <label className="toplabel">Website URL </label>
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.websiteUrl}
                    </span>
                  </div>
                </Col>

                <Col xs={6}></Col>
              </Row>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <Row className="mt-4 mb-4">
                <Col xs={6}>
                  <div className="input-topposition">
                    <input
                      type="text"
                      placeholder=""
                      className="input-model"
                      value={formData.client.subscriptionPlans[0].setUpAmount}
                      onChange={(event) => handleSubscriptionChanges(event)}
                      name="setUpAmount"
                      onFocus={handleInputFocus}
                    />
                    <label className="toplabel">Set Up Free </label>
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.setUpAmount}
                    </span>

                    <div>
                      <input
                        type="checkbox"
                        id="huey"
                        name="drone"
                        value="huey"
                      />
                      wave off set up fees for this user
                    </div>
                  </div>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col xs={6}>
                  <div className="input-topposition">
                    <input
                      type="text"
                      className="input-model"
                      name="amount"
                      value={formData.client.subscriptionPlans[0].amount}
                      onChange={(event) => handleSubscriptionChanges(event)}
                      onFocus={handleInputFocus}
                    />
                    <label className="toplabel">Subscription Amount</label>
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.amount}
                    </span>
                  </div>
                </Col>

                <Col xs={6}>
                  <div className="input-topposition">
                    <Form.Select
                      aria-label="Default select example"
                      className="input-model"
                      value={formData.client.subscriptionPlans[0].frequency}
                      onChange={(event) => handleSubscriptionChanges(event)}
                      onFocus={handleInputFocus}
                      name="frequency"
                    >
                      <option>Select Time Period</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </Form.Select>

                    <label className="toplabel">Time Period </label>
                    <span style={{ color: "red", textAlign: "center" }}>
                      {errorMessage.frequency}
                    </span>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {currentStep > 0 && (
            <Button variant="secondary" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button variant="primary" onClick={(e) => handleSaveChanges(e)}>
              Finish
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ClientEditModel;
