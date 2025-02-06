import { useState, useEffect } from "react";

import { Modal } from "react-bootstrap";
import Header from "../header";
import { toast } from "react-toastify";
import {
  UpdateContent,
  deleteContent,
  getContent,
  uploadContentFile
} from "../../../Services/Admin/contentApiCall";
import ContentHeader from "./contentHeader";

const ContentHistory = () => {
 
 const BackendFileUrl = process.env.REACT_APP_FILE_URL;
  const [contents, setContents] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  const userId = localStorage.getItem("userid");
  const [isDeleteModelOpen, setIsDeletedModelOpen] = useState(false);
  const [editingContent, setEditingContent] = useState(null);

  const [isFileUpload, setIsFileUpload] = useState(false);

  const fetchContentHistory = async () => {
    try {
      const apidata = await getContent(userId);
      if (apidata.data.data.length === 0) {
        setContents(0);
      }else{
        setContents(apidata.data.data);
        setIsFileUpload(apidata.data.data.file);
      }
    
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchContentHistory();
  }, []);

  //-----updatecontent -------------------------

  const [updateContent, setUpdateContent] = useState({
    title: "",
    description: "",
    fileUrl: null,
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [contentId, setContentId] = useState("");
  const handleEditClick = async (id, title, desc, fileUrl) => {
    setIsEditMode(true);
    setEditingContent({ id, title, desc, fileUrl });
    setContentId(id);
    setUpdateContent({
      title: title,
      description: desc,
      fileUrl: fileUrl
    });
    // Set isFileUpload based on whether the content has a file
    setIsFileUpload(!!fileUrl);

  };

  const handleChanges = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setUpdateContent({ ...updateContent, [name]: files[0] });
    } else {
      setUpdateContent({ ...updateContent, [name]: value });
    }
  };


  const saveContent = async () => {
    const newErrors = {};
    if (!updateContent.title) {
      newErrors.title = "Title is required";
    } else if (updateContent.title.length < 2) {
      newErrors.title = "Title must be at least 2 characters";
    }

    if (!isFileUpload && !updateContent.description) {
      newErrors.description = "Description is required";
    }
    if (isFileUpload && !updateContent.file && !editingContent?.fileUrl) {
      newErrors.file = "File is required";
    }

    setErrorMessages(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        let contentData = {
          title: updateContent.title,
          description: updateContent.description,
        };

        if (isFileUpload && updateContent.file) {
          const formData = new FormData();
          formData.append("files", updateContent.file);
          const uploadResponse = await uploadContentFile(formData);
          contentData.fileUrl = uploadResponse.data?.data?.filePath;
        }
        console.log("contentData", contentData);
        const response = await UpdateContent(contentId, contentData );
        if(response.data.success){
          toast.success("Content updated successfully!");
          fetchContentHistory();
          setIsEditMode(false);
          setEditingContent(null);

        }else{
          toast.error(response.data.message);
        }
        


      } catch (error) {
        console.error("Error", error);
        toast.error("Error updating content");
      }
    }
  };

  //========== deletecontent ==============
  const handleOpenDeleteModel = (id) => {
    setContentId(id);
    setIsDeletedModelOpen(true);
  };

  const handleDeleteModelClose = () => {
    setIsDeletedModelOpen(false);
  };
  const handleDeleteClick = async (e) => {
    e.preventDefault();
    try {
      await deleteContent(contentId);
      toast.success("Content deleted successfully!");
      //find the index of the deleted content and remove it from the array
      const index = contents.findIndex((item) => item?._id === contentId);
      const newContents = [...contents];
      newContents?.splice(index, 1);
      setContents(newContents);

      handleDeleteModelClose();
    } catch (error) {
      console.log("error", error);
      handleDeleteModelClose();
      toast.error("Something went wrong!");
    }
  };

  ///================ view more content ==============
  const handleToggleDescription = (contentId) => {
    setContents((prevContents) =>
      prevContents.map((item) => {
        if (item?._id === contentId) {
          return {
            ...item,
            showFullDescription: !item?.showFullDescription,

          };
        }
        return item;
      })
    );
  };

  //================== handle focus =================
  const handleFocus = (e) => {
    const { name } = e.target;
    setErrorMessages((prevMessage) => ({
      ...prevMessage,
      [name]: "",
    }));
  };

  return (
    <>
      <div>
        <Header />
        <section class="profile-page heightcontrol">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-7">
                <ContentHeader />

                {isEditMode && (
                  <div class="content-edit-box-card">
                    <div class="position-relative">
                      <input
                        type="text"
                        name="title"
                        value={updateContent.title}
                        onChange={handleChanges}
                        class="input-filed-profile"
                        onFocus={handleFocus}
                      />
                      <label for="" class="po-ab-label">Title</label>
                    </div>
                    <div style={{ height: "50px", paddingTop: "5px" }}>
                      <span style={{ color: "red", textAlign: "center" }}>
                        {errorMessages.title}
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
                      <label class="form-check-label" for="flexSwitchCheckDefault">
                        Upload File Instead of Description
                      </label>
                    </div>

                    {isFileUpload ? (
                      <>
                        <div class="position-relative">
                          <input
                            type="file"
                            name="file"
                            onChange={handleChanges}
                            class="input-filed-profile"
                            onFocus={(e) => setErrorMessages({ ...errorMessages, file: "" })}
                          />
                          {editingContent?.fileUrl && !updateContent.file && (
                            <div className="py-2">Current file: <a href={`${BackendFileUrl}${editingContent?.fileUrl}`} download style={{cursor: "pointer"}} target="_blank">Download</a> </div>
                          )}
                        </div>
                        <div style={{ height: "50px", paddingTop: "5px" }}>
                          <span style={{ color: "red", textAlign: "center" }}>
                            {errorMessages.file}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div class="position-relative">
                          <textarea
                            name="description"
                            value={updateContent.description}
                            onChange={handleChanges}
                            class="input-filed-profile text-area-heightfix"
                            onFocus={handleFocus}
                          ></textarea>
                          <label for="" class="po-ab-label sptoptextarea">Description</label>
                        </div>
                        <div style={{ height: "50px", paddingTop: "5px" }}>
                          <span style={{ color: "red", textAlign: "center" }}>
                            {errorMessages.description}
                          </span>
                        </div>
                      </>
                    )}
                    <div class="text-right">
                      <a
                        onClick={() => {setIsEditMode(false)  ; setEditingContent(null)}}

                        style={{ cursor: "pointer" }}
                        class="cancel"
                      >
                        Cancel
                      </a>{" "}
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => saveContent()}
                        class="save-changes"
                      >
                        Save Changes
                      </a>
                    </div>
                  </div>
                )}

                {contents ? (
                  contents.map((item) => (
                   
                    
                  editingContent && editingContent?.id === item?._id ? null : (
                      <>
                      <div className="content-history-card" key={item?._id}>
                      <div className="content-textb ">

                        <h5>{item?.title}</h5>
                        <div dangerouslySetInnerHTML={{
                           __html:
                           (item?.showFullDescription ? item?.description?.replace(/\n/g, '<br>') // Show full description

                            : item?.description?.replace(/\n/g, '<br>')
                                .split(" ") // Split the description into words
                                .slice(0, 25) // Show the first 20 words by default (adjust as needed)
                                .join(" ")
                           ) 

                        }} 
                           /*(item.description.replace(/\n/g, '<br>').split(" ").length > 25 ? (
                            <a
                              className={`${
                                item.showFullDescription
                                  ? "view-less-link active"
                                  : "view-more-link"
                              }`}
                              onClick={() => handleToggleDescription(item._id)}
                            >
                              {item?.showFullDescription
                                ? "...< Less "
                                : "...More >"}
                            </a>

                          ): "")*/
                        ></div>
                        {item?.description?.replace(/\n/g, '<br>').split(" ").length > 25 && (
                            <a
                              className={`${
                                item?.showFullDescription

                                  ? "view-less-link active"
                                  : "view-more-link"
                              }`}
                              onClick={() => handleToggleDescription(item?._id)}
                            >
                              {item?.showFullDescription
                                ? "...< Less "
                                : "...More >"}

                            </a>
                          )
                        }
                        {item?.fileUrl && (
                      // download file
                          <a href={`${BackendFileUrl}${item?.fileUrl}`} download style={{cursor: "pointer"}} target="_blank">
                            <i className="fa-solid fa-download"></i>
                          </a>
                        )}
                      </div>

                      <div className="content-history dropdown">
                        <a
                          className="text-graybtn"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <a
                              className="dropdown-item"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleEditClick(
                                  item._id,
                                  item.title,
                                  item.description,
                                  item.fileUrl
                                )
                              }
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item text-danger"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => handleOpenDeleteModel(item._id)}
                            >
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                      </div>
                      </>
                      )
                      
                  ))
                ) : (
                  <h1 className="no-conversation-found">No Content Found</h1>
                )}
              </div>
            </div>
          </div>
        </section>

        <Modal
          show={isDeleteModelOpen}
          onHide={handleDeleteModelClose}
          centered
          class="modal-dialog modal-dialog-centered"
        >
          <div class="modal-content">
            <div class="modal-body p-0">
              <h4 class="text-for-delete">
                Are you sure you want to delete this?
              </h4>
              <div class="d-flex">
                <button
                  type="button"
                  class="no-btn-delete"
                  onClick={handleDeleteModelClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="yes-btn-delete"
                  onClick={handleDeleteClick}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ContentHistory;
