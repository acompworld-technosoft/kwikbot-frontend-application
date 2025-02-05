import React from 'react'
import Header from './header'

const Confirm = () => {


  return (
    <div>
      <Header />
      <main>
        <section class="confirm-message-section">
          <div class="confirm-message">
            <h3>Congratulations!!</h3>
            <p>Your payment is Successful</p>

            <div class="go-back">
              <a href="" class="go-back">Go Back</a>
            </div>

          </div>

        </section>
      </main>
    </div>
  )
}

export default Confirm
