import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './header';
import SubscribptionHeader from './subscribptionHeader';

const FirstTimeLogin = () => {
    const navigate = useNavigate()
    
    const handleSubscription = () => {
        navigate("/admin/paymentinfo")
    }
   
    return (

        
       
                            <div class="profile-card">
                                <h5>My Subscription</h5>
                                <form action="" class="from-admin-pr">
                                    <div class="d-flex justify-content-between">
                                        <p class="text-login">Initial setup and training</p>  <p class="line-throght"><b>$499</b></p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <p class="text-login">Ongoing charges</p>  <p class="blue-text-b">$99 Monthly</p>
                                    </div>


                                    <div class="text-right mt-5">
                                        <a href="" class="subscribe-kwikbot" onClick={handleSubscription} >Subscribe to kwikbot</a>
                                    </div>
                                </form>
                            </div>
                    
    )
}

export default FirstTimeLogin
