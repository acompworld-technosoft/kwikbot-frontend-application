import React from "react";
import Header from "./header";

const Faqs = () => {
  return (
    <div>
      <Header />
      <div className="container mt-5 pt-5">
        <div className="faqs">
          <ul>
            <li
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Generate More Leads, Increase Conversions, and Delight Customers!
              Book a Demo{" "}
              <span>
                {" "}
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </li>
            <div class="collapse" id="collapseExample">
              <div class="card card-body">
                Some placeholder content for the collapse component. This panel
                is hidden by default but revealed when the user activates the
                relevant trigger.
              </div>
            </div>

            <li
              data-bs-toggle="collapse"
              href="#collapseExample02"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample02"
            >
              How does the AI chatbot work with daycare centers?{" "}
              <span>
                {" "}
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </li>
            <div class="collapse" id="collapseExample02">
              <div class="card card-body">
                Some placeholder content for the collapse component. This panel
                is hidden by default but revealed when the user activates the
                relevant trigger.
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
