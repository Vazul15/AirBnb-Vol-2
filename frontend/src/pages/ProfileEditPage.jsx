import React, { useState, useEffect } from "react";
import MemberProfileEdit from "../components/forms/MemberProfileEditForm";
import { useAuth } from "../components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const fetchDeleteUser = async (token) => {
  try {
    const response = await fetch('/api/member', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return true;
  } catch (error) {
    console.error("Failed to delete user:", error);
    return false;
  }
};

const fetchUserData = async ( token) => {
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

const fetchUpdateUser = async (token, updatedUserData) => {
  try {
    const response = await fetch('/api/member', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUserData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update user data:", error);
    return null;
  }
};

const ProfileEditPage = () => {
  const [userData, setUserData] = useState(null);
  const { userEmail, updateEmail, logout } = useAuth();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      const loadMemberData = async () => {
        const data = await fetchUserData(token);
        setUserData(data);
      };
      loadMemberData();
    }
  }, [token]);

  const handleUpdate = async ( updatedUserData) => {
    const data = await fetchUpdateUser(token, updatedUserData);
    setUserData(data);
    logout()
    navigate("/")
    if (updatedUserData.email !== userEmail) {
      updateEmail(updatedUserData.email);
    }
    return data;
  };

  const handleDelete = async () => {
    const success = await fetchDeleteUser(token);
    if (success) {
      logout();
      navigate("/");
    } else {
      alert("Failed to delete profile");
    }
  };

  return (
    <div>
      {userData ? (
        <MemberProfileEdit
          memberData={userData}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileEditPage;