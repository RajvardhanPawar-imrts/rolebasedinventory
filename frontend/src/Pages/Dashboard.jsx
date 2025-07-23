import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../Apis/axiosInstance";
import { Modal } from "antd";

const Dashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const pageButtons = [
    {
      id: "1",
      link: "/sales",
      name: "Sales Page",
    },
    {
      id: "2",
      link: "/roles",
      name: "Roles Page",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [changedFields, setChangedFields] = useState({}); // Track only changed fields
  const [selectedFile, setSelectedFile] = useState(null);
  const userID = user?.id;

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get(`user/${userID}/`);
      setUserData(response.data);
    } catch (e) {
      console.error("Cant fetch user data", e);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchUserData();
    }
  }, [userID]);

  const showModal = () => {
    setIsModalOpen(true);
    setChangedFields({}); // Reset changed fields when opening modal
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setChangedFields({}); // Reset changed fields
    // Reset form data to original userData
    if (userData) {
      setFormData(userData);
    }
  };

  const EditUserData = async () => {
    try {
      // Check if there are any changes to send
      const hasFileUpload = selectedFile !== null;
      const hasFieldChanges = Object.keys(changedFields).length > 0;

      if (!hasFileUpload && !hasFieldChanges) {
        console.log("No changes detected, skipping API call");
        return;
      }

      let payload;
      let headers = {};

      // If there's a file upload, use FormData
      if (hasFileUpload) {
        payload = new FormData();

        // Append only changed fields
        Object.keys(changedFields).forEach((key) => {
          if (changedFields[key] !== null && changedFields[key] !== undefined) {
            payload.append(key, changedFields[key]);
          }
        });

        // Append profile picture
        payload.append("user_image", selectedFile);

        headers["Content-Type"] = "multipart/form-data";
      } else {
        // If no file upload, send only changed fields as JSON
        payload = changedFields;
        headers["Content-Type"] = "application/json";
      }

      // Print payload to console
      console.log("Payload being sent:");
      if (payload instanceof FormData) {
        for (let [key, value] of payload.entries()) {
          console.log(key, value);
        }
      } else {
        console.log(payload);
      }

      const response = await axiosInstance.put(
        `update-user/${userID}/`,
        payload,
        { headers }
      );

      // Refresh user data after successful update
      await fetchUserData();
    } catch (e) {
      console.error("Can't update user data", e);
    }
  };

  const handleOk = async () => {
    await EditUserData();
    setIsModalOpen(false);
    setSelectedFile(null);
    setChangedFields({});
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only JPEG, JPG, and PNG files are allowed");
        e.target.value = "";
        return;
      }

      // Check file size (4MB = 4 * 1024 * 1024 bytes)
      const maxSize = 4 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size must be less than 4MB");
        e.target.value = "";
        return;
      }

      setSelectedFile(file);
    }
  };

  const updatedUserData = [
    { label: "Email", name: "email", value: userData?.email || "N/A" },
    {
      label: "First Name",
      name: "first_name",
      value: userData?.first_name || "N/A",
    },
    {
      label: "Last Name",
      name: "last_name",
      value: userData?.last_name || "N/A",
    },
    {
      label: "Mobile Number",
      name: "mobile_number",
      value: userData?.mobile_number || "N/A",
    },
    { label: "Country", name: "country", value: userData?.country || "N/A" },
    { label: "State", name: "state", value: userData?.state || "N/A" },
    { label: "City", name: "city", value: userData?.city || "N/A" },
    {
      label: "Postal Code",
      name: "postal_code",
      value: userData?.postal_code || "N/A",
    },
  ];

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Track only if the value is different from original userData
    if (userData && userData[name] !== value) {
      setChangedFields((prev) => ({ ...prev, [name]: value }));
    } else {
      // Remove from changed fields if value is same as original
      setChangedFields((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  return (
    <section className="px-4 py-5">
      {isAuthenticated && <h1>Welcome {user.first_name}!</h1>}
      <div className="w-full flex items-center justify-around gap-3">
        {pageButtons.map((btn) => (
          <Link to={btn.link} key={btn.id}>
            <button className="px-4 py-1 bg-black text-white">
              {btn.name}
            </button>
          </Link>
        ))}
      </div>
      <div>
        <h1 className="font-bold text-3xl mt-10 mb-4 ">User Details</h1>
        {userData && (
          <div className="space-y-2 text-gray-800 text-lg flex gap-4">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {userData.email || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Mobile Number:</span>{" "}
              {userData.mobile_number || "N/A"}
            </p>
            <p>
              <span className="font-semibold">First Name:</span>{" "}
              {userData.first_name || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Last Name:</span>{" "}
              {userData.last_name || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Country:</span>{" "}
              {userData.country || "N/A"}
            </p>
            <p>
              <span className="font-semibold">State:</span>{" "}
              {userData.state || "N/A"}
            </p>
            <p>
              <span className="font-semibold">City:</span>{" "}
              {userData.city || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Postal Code:</span>{" "}
              {userData.postal_code || "N/A"}
            </p>
            <div>
              <span className="font-semibold">User Image:</span>
              <img
                src={
                  `http://127.0.0.1:8000/${userData.user_image}` ||
                  "/default-user.png"
                }
                alt="User"
                className="w-20 h-20 rounded-full object-contain border"
              />
            </div>
          </div>
        )}
      </div>
      <button className="bg-black text-white px-4 py-1" onClick={showModal}>
        Edit user details
      </button>
      <Modal
        title="Edit User Data"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={true}
      >
        <form className="flex flex-col gap-4 mt-4">
          {updatedUserData.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-sm font-medium mb-1">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
              />
            </div>
          ))}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Profile Picture</label>
            <input
              type="file"
              accept=".jpeg,.jpg,.png"
              onChange={handleFileChange}
              className="border rounded px-3 py-2"
            />
            {selectedFile && (
              <p className="text-sm text-gray-600 mt-1">
                Selected: {selectedFile.name} (
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
        </form>

        {/* Debug info - remove in production */}
        {Object.keys(changedFields).length > 0 && (
          <div className="mt-4 p-2 bg-gray-100 rounded text-sm">
            <strong>Changed fields:</strong>{" "}
            {Object.keys(changedFields).join(", ")}
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Dashboard;
