import React from 'react'
import Header from './header'

const PaymentInfo = () => {
  const height = {
    height: '100vh',
  }

  return (
    <div>
      <Header />
      <section class="profile-page" style={height}>

        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="heading-payment">
                <h3>Payment Information </h3>
              </div>
            </div>
            <div class="col-lg-4">

              <div class="byline">
                <h5><span class="blue-badge">1</span> Billing Information</h5>
              </div>

              <div class="profile-card">

                <form action="" class="from-admin-pr">
                  <div class="mb-5 position-relative">
                    <select class="form-select input-filed-profile" >
                      <option selected>India</option>
                      <option value="3">UROP</option>
                    </select>
                    <label for="" class="po-ab-label">Country</label>
                    <img src="images/Vector.png" alt="" class="arrow-image" />
                  </div>
                  <div class="mb-5 position-relative">
                    <select class="form-select input-filed-profile" >
                      <option selected>Madhya Pradesh</option>
                      <option value="3">Bankock</option>
                    </select>
                    <label for="" class="po-ab-label">State/ Region</label>
                    <img src="images/Vector.png" alt="" class="arrow-image" />
                  </div>
                  <div class="mb position-relative">
                    <input type="text" id="" name="" class="input-filed-profile" placeholder="Manish Shrivasatav" />
                    <label for="" class="po-ab-label">Full Name</label>
                  </div>

                  <div class="col-12 mt-3">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                      <label class="form-check-label" for="invalidCheck">
                        Are you a company?
                      </label>
                      <div class="invalid-feedback">
                        You must agree before submitting.
                      </div>
                    </div>
                  </div>



                </form>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="byline">
                <h5><span class="blue-badge">2</span> Payment Method</h5>
              </div>
              <div class="profile-card">
                <div class="main-card-stm mb-5">
                  <div class="payment-card">
                    <div class="credite-card">
                      <div class="radio-btn">
                        <input type="radio" name="" id="" />
                        <label>Credit Card</label>
                      </div>
                      <div class="creditecard-image">
                        <img src="images/visa.png" alt="" />
                        <img src="images/master.png" alt="" />
                        <img src="images/amex.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="radio-btn padding-05">
                    <input type="radio" name="" id="" /> <label for=""><img src="images/paypal.png" alt="" class="paypal-image" /></label>
                  </div>

                </div>
                <form action="" class="from-admin-pr">
                  <div class="mb-5 position-relative">
                    <input type="text" id="" name="" class="input-filed-profile" placeholder="Manish Shrivasatav" />

                    <label for="" class="po-ab-label">Card number</label>
                    <img src="images/atm-number.png" alt="" class="card-image-nu" />
                  </div>
                  <div class="row mb-5">
                    <div class="col-lg-6 position-relative">
                      <input type="text" id="" name="" class="input-filed-profile" placeholder="" />
                      <label for="" class="po-ab-label">Expiration Date</label>
                    </div>

                    <div class="col-lg-6 position-relative">
                      <input type="text" id="" name="" class="input-filed-profile" placeholder="" />
                      <label for="" class="po-ab-label">Security code</label>
                    </div>
                  </div>
                  <div class="mb-3 position-relative">
                    <input type="text" id="" name="" class="input-filed-profile" placeholder="Manish Shrivasatav" />
                    <label for="" class="po-ab-label"> Cardholder</label>
                  </div>



                </form>

                <p class="security-text"><img src="images/security.png" alt="" class="security" /> Secure payment with SSL Encryption</p>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="byline">
                <h5><span class="blue-badge">3</span> Order Details</h5>
              </div>
              <div class="profile-card">

                <h6>Premium Plan</h6>
                <div class="d-flex justify-content-between">
                  <p class="text-normal">Annual Subscription</p>     <h6> <b><i class="fa-solid fa-indian-rupee-sign"></i> 999</b></h6>
                </div>

                <div class="d-flex justify-content-between">
                  <p class="text-normal"> VAT/GST/Tax</p> <h6><b><i class="fa-solid fa-indian-rupee-sign"></i> 999</b></h6>
                </div>
                <div class="hr-line"></div>
                <div class="d-flex justify-content-between">
                  <p> <b>Total amount</b></p> <h6 class="blue-text-normal"><i class="fa-solid fa-indian-rupee-sign"></i> 999</h6>
                </div>

                <a href="" class="confirm-paybtn">Confirm & Pay</a>

                <p class="terms-text-pro">Your subscription will automatically renew every year as one payment of 8700.00 INR on 21 Jul. Cancel it anytime from your subscription settings. By clicking "Confirm and pay" you agree to the <a href="" class="terms-link"> Terms and conditions.</a></p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PaymentInfo
