import React from "react";
import { useAuth } from "./AuthContext"; // Import the useAuth hook

const Greeting = () => {
  const { user } = useAuth(); // Access the user data from the AuthContext

  if (user) {
    // Check if the user is logged in
    return (
      <div>
        <h1>Welcome, {user.result.id}!</h1>
      </div>
    );
  } else {
    // User is not logged in
    return <div>Hey! Welcome Guest</div>;
  }
};

export default Greeting;