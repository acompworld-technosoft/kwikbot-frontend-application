import React, { useState } from "react";
import Header from "./header";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { passwordReset } from "../../Services/Admin/userApiCall";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Input } from "antd";

const ChangePassword = () => {
  const heigth = {
    height: "100vh",
  };
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state || {};
  const { email } = stateData;
  const [passwordError, setPasswordError] = useState("");
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const saveChange = async () => {
    const newErrors = {};
    if (!data.oldPassword) {
      newErrors.oldPassword = "Old Password is required";
    }
    if (!data.newPassword) {
      newErrors.newPassword = "New Password is required";
    } else if (data.oldPassword === data.newPassword) {
      newErrors.newPassword = "Old Password and New Password can't be same";
    } else if (data.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    } else if (data.newPassword.length > 15) {
      newErrors.newPassword = "Password must be at most 15 characters";
    } else if (!/\d/.test(data.newPassword)) {
      newErrors.newPassword = "Password must contain at least one digit";
    } else if (!/[!@#$%^&*]/.test(data.newPassword)) {
      newErrors.newPassword =
        "Password must contain at least one special character";
    }

    setPasswordError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const newData = {
        email,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };

      try {
        const response = await passwordReset(newData);

        toast.success("Password changed successfully");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  const handleInputFocus = (e) => {
    const { name } = e.target;

    setPasswordError((prevMessage) => ({
      ...prevMessage,
      [name]: "",
    }));
  };

 
  return (
    <div>
      <Header />
      <main>
        <section class="profile-page" style={heigth}>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-5">
                <div class="heading-profile">
                  <h1>Profile Settings</h1>
                </div>

                <div class="profile-card">
                  <h5>Change Password</h5>
                  <form action="" class="from-admin-pr">
                    <div class="position-relative">
                      <Input.Password
                        name="oldPassword"
                        value={data.oldPassword}
                        onChange={handleChange}
                        className="input-filed-profile"
                        placeholder="Old Password"
                        onFocus={handleInputFocus}
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />
                      <label for="" class="po-ab-label">
                        Old Password
                      </label>
                    </div>
                    <div style={{ height: "50px", paddingTop: "5px" }}>
                      <span style={{ color: "red", textAlign: "center" }}>
                        {passwordError.oldPassword}
                      </span>
                    </div>

                    <div class="position-relative">
                      <Input.Password                  
                        name="newPassword"
                        value={data.newPassword}
                        onChange={handleChange}
                        className="input-filed-profile"
                        placeholder="New Password"
                        onFocus={handleInputFocus}
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />

                      <label for="" class="po-ab-label">
                        New Password
                      </label>
                    </div>
                    <div style={{ height: "50px", paddingTop: "5px" }}>
                      <span style={{ color: "red", textAlign: "center" }}>
                        {passwordError.newPassword}
                      </span>
                    </div>

                    <div class="text-right mt-5">
                      <a
                        class="cancel"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </a>{" "}
                      <a
                        class="save-changes"
                        style={{ cursor: "pointer" }}
                        onClick={saveChange}
                      >
                        Save Changes
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ChangePassword;
