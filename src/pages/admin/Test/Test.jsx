// import React, { useContext } from 'react'

// import { AuthContext, AuthProvider, TAuthConfig } from "react-oauth2-code-pkce"

// const authConfig = {
//     clientId: 'myClientID',
//     authorizationEndpoint: 'https://myAuthProvider.com/auth',
//     tokenEndpoint: 'https://myAuthProvider.com/token',
//     redirectUri: 'http://localhost:3000/',
//     scope: 'someScope openid',
// }

// const Test = () => {
//     const { token, tokenData } = useContext(AuthContext);

//     return (
//         <>
//             <h4>Access Token</h4>
//             <pre>{token}</pre>
//             <h4>User Information from JWT</h4>
//             <pre>{JSON.stringify(tokenData, null, 2)}</pre>
//         </>
//     )
// }

// export default Test