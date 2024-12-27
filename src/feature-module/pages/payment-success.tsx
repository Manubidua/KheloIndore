// import { jwtDecode } from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'

interface JwtPayload {
  first_name: any;
}

export default function PaymentSuccess() {

  const [userData, setUserData] = useState<JwtPayload | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const getTokenFromStorage = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode<JwtPayload>(token);
        setUserData(decodedToken);
      } else {
        return;
      }
    };
    getTokenFromStorage();
  }, []);


  return (
    <div>
      <div className="container">
        <div className="row text-center">
          <div className="col-sm-6 col-lg-12 col-sm-offset-3">
            <br />
            <br />
            <img src="assets/img/payment-success.png" alt="payment" />
            <h2 style={{ color: "#0fad00" }}>Success</h2>
            <h3>
              {/* Dear, {localStorage.getItem('userName')} */}
               Dear, {userData?.first_name}
            </h3>
            <p style={{ fontSize: "20px", color: "#5C5C5C" }}>
              Thank you for booking! Your payment was successful. We appreciate
              your business and look forward to serving you again. Please feel
              free to book more services with us in the future.
            </p>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  )
}
