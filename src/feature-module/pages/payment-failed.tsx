import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'

interface JwtPayload {
  first_name: string;
}

export default function PaymentFailed() {

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
            <br /><br />
             <img src="assets/img/paymentfailed.png" alt='payment'/>
            <h2 style={{ color: 'red' }} className='mt-3'>! Failed</h2>
            <h3>Dear,{userData?.first_name}</h3>
            <p style={{ fontSize: '20px', color: '#5C5C5C' }}>Your Payment failed</p>
            <br /><br />
          </div>
        </div>
      </div>
    </div>
  )
}

