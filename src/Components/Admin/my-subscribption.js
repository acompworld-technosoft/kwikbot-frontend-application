import React, { useEffect, useState } from "react";
import Header from "./header";
import SubscribptionHeader from "./subscribptionHeader";
import CancelRenewal from "./cancel-renewal";
import { useNavigate } from "react-router-dom";
import { mysubscribption } from "../../Services/Admin/subscriptionApiCall";
import moment from "moment";
import FirstTimeSubscription from "./FirstTimeSubscription";

const MySubscribption = () => {
  const height = {
    height: "100vh",
  };
  const clientId = localStorage.getItem("clientId");
  const [cancelRenewalShow, setCancelRenewalShow] = useState(false);
  const [subscribptionData, setSubscribptionData] = useState([]);
  const [firstTimeSubscription, setFirstTimeSubscription] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const navigate = useNavigate();

  const handleCancelRenewal = (e) => {
    e.preventDefault();
    setCancelRenewalShow(true);
  };

  useEffect(() => {
    subcriptionData();
  }, []);

  const subcriptionData = async () => {
    try {
      const response = await mysubscribption(clientId);
      console.log(response);
      if (response.data.length > 0) {
        setSubscribptionData(response.data);
        console.log("subscription data", response.data);
      } else {
        setFirstTimeSubscription(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    setCancelRenewalShow(false);
  };

  return (
    <div>
      <Header />
      <section className="profile-page" style={height}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <SubscribptionHeader />
              {cancelRenewalShow && (
                <div className="profile-card">
                  <h5>Cancel Renewal</h5>
                  {subscribptionData.map((item, index) => {
                    return (
                      <>
                      <div key={index}>
                        <p>
                          Next payment Rs. {item.renewals[0].amount} INR on{" "}
                          {moment(item.renewals[0].nextRenewalDate).format(
                            "MMM Do YYYY"
                          )}{" "}
                          (VAT may apply)
                        </p>
                        <span className="automatic-text">
                          *Automatic Renewal every month{" "}
                        </span>
                      </div>
                      <div className="text-right">
                    {isSubscribed && (
                      <a
                        href=""
                        className="canbtn-s active"
                        onClick={handleCancelRenewal}
                      >
                        Cancel Renewal
                      </a>
                    )}
                  </div>
                  </>
                    );
                  })}

                  <div className="text-right">
                    {isSubscribed && (
                      <a
                        href=""
                        className="canbtn-s active"
                        onClick={handleCancelRenewal}
                      >
                        Cancel Renewal
                      </a>
                    )}
                  </div>
                </div>
              )}
              {cancelRenewalShow ? (
                <CancelRenewal onHide={handleBack} />
              ) : firstTimeSubscription ? (
                <FirstTimeSubscription />
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MySubscribption;
