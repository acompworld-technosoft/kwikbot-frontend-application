import React  from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import swal from "sweetalert";
import { completeSubscription } from "../../../Services/Admin/subscriptionApiCall";
import { useNavigate } from "react-router-dom";

const PayPalButton = ({ planId }) => {
  const navigate = useNavigate();
  const onSuccess = async (details, data) => {
  
    try {
      if (details.subscriptionID && details.orderID) {
        const subdata = {
          subscriptionID: details.subscriptionID,
          orderID: details.orderID,
          clientId: localStorage.getItem("clientId"),
        };
        await completeSubscription(subdata);
        navigate("/admin/confirm");

       
      } else {
        console.error("Missing subscriptionID or orderID in onSuccess data");
        swal("Oops...", "Something went wrong. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error completing subscription:", error);
      swal("Oops...", "Something went wrong. Please try again.", "error");
    }
  };

  const initialOptions = {
    "client-id":
      "ARu1RMS9PGNw2XNx4GFhf-rZ52gWTLuVF1bNBVifyefMu4VEpOq0W7LuBFi3ep_-x0l2K-vFo0pA0a2b",
    intent: "subscription",
    vault: true,
  };

  const handleSubscriptionError = (errorMessage, error) => {
    console.error(errorMessage, error);
    swal("Oops...", "Something went wrong. Please try again.", "error");
  };
  
  return (
    <div>
      <div>
        {planId ? (
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              createSubscription={(data, actions) => {

                return actions.subscription.create({
                  plan_id: planId,
                });
              }}
              onApprove={(data, actions) => onSuccess(data, actions)}
              onCancel={(data) => {
                console.log("Subscription cancelled!", data);
                swal(
                  "Oops...",
                  "Something went wrong. Please try again.",
                  "error"
                );
              }}
               onError={(err) => {
              console.log("Subscription error!", err);
              handleSubscriptionError("Subscription error!", err);
            }}
            />
          </PayPalScriptProvider>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default PayPalButton;


