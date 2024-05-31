import React from 'react'
import useClaims from "../../../services/claims";

function Home() {
    const { data: claims, isLoading } = useClaims();
    let logoutUrl = claims?.find(claim => claim.type === 'bff:logout_url') 
    let nameDict = claims?.find(claim => claim.type === 'name') ||  claims?.find(claim => claim.type === 'sub');
    let username = nameDict?.value;
    
    if(isLoading)
    return <div>Loading...</div>

    return (
        <div>
      {
        !username ? (
          <a 
            href="/bff/login?returnUrl=/"
            className="loginButton"
          >
            Login
          </a>
        ) : (
          <div className="flex-shrink-0 block">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="block text-base font-medium text-blue-500 md:text-sm">{`Hi, ${username}!`}</p>
                <a 
                  href={logoutUrl?.value}
                  className="loginButton"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        )
      }
    </div>
    )
}

export { Home }