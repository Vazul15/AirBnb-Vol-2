import React, { useState, useEffect } from "react";
import MemberProfile from "../components/forms/MemberProfilForm";

const fetchUserData = async (token) => {
  try {
    const response = await fetch('/api/member', {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch member data:", error);
    return null;
  }
};

const ProfilViewPage = () => {
  const [memberData, setMemberData] = useState(null);
  const token = sessionStorage.getItem('accessToken');

  useEffect(() => {
    if (token) {
      const loadMemberData = async () => {
        const data = await fetchUserData(token);
        setMemberData(data);
      };
      loadMemberData();
    }
  }, [token]);

  return (
    <div>
      {memberData ? (
        <MemberProfile memberData={memberData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilViewPage;
