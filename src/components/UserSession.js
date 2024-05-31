import React, { useState, useEffect } from "react";

const UserSession = () => {
    const [state, setState] = useState({
        userSessionInfo: {},
        loading: true
    });

    
  const fetchUserSessionInfo = async () => {
    const response = await fetch("bff/user", {
      headers: {
        "X-CSRF": 1,
        "X-Requested-With": XMLHttpRequest
      },
    });
    const data = await response.json();
    setState({ userSessionInfo: data, loading: false });
  }

    useEffect(() => {
        fetchUserSessionInfo();
    }, []);
}

export default UserSession