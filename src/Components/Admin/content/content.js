import { useState } from "react";

import Header from "../header";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addContentapi, uploadContentFile } from "../../../Services/Admin/contentApiCall";
import ContentHeader from "./contentHeader";

const Content = () => {
  const navigate = useNavigate();
  const Heigth = {
    height: "100vh",
  };
  const [addContent, setaddContent] = useState({
    title: "",
    description: ""
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState(null);


  const [error, setError] = useState("");
  const [isFileUpload, setIsFileUpload] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
      setaddContent({ ...addContent, [name]: value });
  };


  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file ) {
        setFile(file);
        setImagePreview(URL.createObjectURL(file)); // Set image preview URL
    } else {
      toast.error("Invalid file type");
    }

  };


  const saveChange = async () => {
    const newErrors = {};
    if (!addContent.title) {
      newErrors.title = "Title is required";
    } else if (addContent.title.length < 2) {
      newErrors.title = "Title must be at least 2 characters";
    }

    if (!isFileUpload && !addContent.description) {
      newErrors.description = "Description is required";
    }
    if (isFileUpload && !file) {
      newErrors.filePath = "File is required";
    }

    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
      
        let contentData = {
          title: addContent.title,
          description: addContent.description,
        };

        if (isFileUpload && file) {
          const formData = new FormData();
          formData.append("files", file);
          const uploadResponse = await uploadContentFile(formData);
          setFilePath(uploadResponse.data?.data?.filePath);
          contentData.fileUrl = uploadResponse.data?.data?.filePath;
        }
    

        
        const response = await addContentapi( contentData );
        console.log("content added", response.data);
        toast.success("Content added successfully");



        setaddContent({
          title: "",
          description: "",
        });
        setFile(null);
        setImagePreview(null);
        setFilePath(null);
      } catch (error) {
        console.error("Error", error);
        toast.error("Error adding content");
      }
    }
  };

  return (
    <div>
      <Header />
      <main>
        <section class="profile-page" style={Heigth}>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-7">
                <ContentHeader />
                <div class="profile-card">
                  <h5>Input Content</h5>
                  <div class="position-relative">
                    <input
                      type="text"
                      name="title"
                      value={addContent.title}
                      onChange={handleChange}
                      class="input-filed-profile"
                      onFocus={(e) => setError({ ...error, title: "" })}
                    />
                    <label for="" class="po-ab-label">
                      Title
                    </label>
                  </div>
                  <div style={{ height: "50px", paddingTop: "5px" }}>
                    <span style={{ color: "red", textAlign: "center" }}>
                      {error.title}
                    </span>
                  </div>

               
                  <div class="form-check form-switch mb-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      checked={isFileUpload}
                      onChange={(e) => setIsFileUpload(e.target.checked)}
                    />

                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDefault"
                    >
                      Upload File Instead of Description
                    </label>
                  </div>

                  {isFileUpload ? (
                    <>
                      <div class="position-relative">
                        <input
                          type="file"
                          name="file"
                          onChange={handleImageSelect}
                          class="input-filed-profile"
                          onFocus={(e) => setError({ ...error, filePath: "" })}
                        />


                      </div>
                      <div style={{ height: "50px", paddingTop: "5px" }}>
                        <span style={{ color: "red", textAlign: "center" }}>
                          {error.filePath}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div class="position-relative">
                        <textarea
                          name="description"
                          value={addContent.description}
                          onChange={handleChange}
                          class="input-filed-profile text-area-heightfix"
                          onFocus={(e) =>
                            setError({ ...error, description: "" })
                          }
                        ></textarea>
                        <label for="" class="po-ab-label sptoptextarea">
                          Description
                        </label>
                      </div>
                      <div style={{ height: "50px", paddingTop: "5px" }}>
                        <span style={{ color: "red", textAlign: "center" }}>
                          {error.description}
                        </span>
                      </div>
                    </>
                  )}

                  <div class="text-right">
                    <a
                      class="save-changes"
                      style={{ cursor: "pointer" }}
                      onClick={() => saveChange()}
                    >
                      Submit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Content;
