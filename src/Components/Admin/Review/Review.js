import {
  faPenToSquare,
  faTrashCan,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AgGridReact } from "ag-grid-react";
import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BASEURL } from "../../Commanconstans/Comman";
import Modal from "react-bootstrap/Modal";
import Loader from "../../Loader/Loader";
import { Pagination, Stack } from "@mui/material";

function Review() {
  const [agentData, setAgentData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const [categoryImg, setCategoryImg] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [totalPages, setTotalPages] = useState(5);
  const [loading, setLoading] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    note: "",
    rating: "",
    serviceID: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [deleteModel, setDeleteModel] = useState(null);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [id]: false,
    }));
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => {
    setShow2(false);
  };
  const handleClose1 = () => {
    setShow1(false);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImg(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const columnDefs = [
    {
      headerName: "Sr No",
      field: "sr",
      sortable: true,
      filter: true,
      editable: false,
    },
    {
      headerName: "Customer Name",
      field: "name",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "User Image",
      field: "user_image",
      sortable: true,
      filter: true,
      editable: true,
      cellRenderer: (params) => (
        <img
          src={BASEURL + params.value}
          alt="User"
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            padding: "10px",
          }}
        />
      ),
    },
    {
      headerName: "Message",
      field: "message",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Rating",
      field: "rating",
      sortable: true,
      filter: true,
      editAgent: true,
    },
    {
      headerName: "Action",
      cellRenderer: (params) => (
        <>
          <FontAwesomeIcon
            icon={faPenToSquare}
            title="Edit"
            onClick={() => editReview(params.data.id)}
            className="pointer"
          />
          &nbsp;&nbsp;
          <FontAwesomeIcon
            className="pointer"
            icon={faTrashCan}
            title="Delete"
            onClick={() => openDeleteModel(params.data.id)}
            style={{ color: "red" }}
          />
        </>
      ),
    },
  ];
  const defaultColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const getAllReviews = async () => {
    const token = localStorage.getItem("admin-token");
    const headers = { "x-access-token": token };
    await axios
      .get(`${BASEURL}/service-provider/review?page=${page}&limit=${limit}`, {
        headers,
      })
      .then((responce) => {
        if (responce) {
          const dataWithSr = responce.data.rows.map((item, index) => ({
            ...item,
            sr: (page - 1) * limit + index + 1,
          }));
          setAgentData(dataWithSr);
          setTotalPages(Math.ceil(responce.data.count / limit));
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const addReview = async () => {
    const { name, serviceID, rating, note } = formData;
    let errors = {};

    // Validate name
    if (name.trim() === "") {
      errors.name = true;
    }

    // Validate note
    if (note.trim() === "") {
      errors.note = true;
    }

    // Validate serviceID
    if (!serviceID || serviceID.trim() === "") {
      errors.serviceID = true;
    }

    // Validate rating
    if (!rating) {
      errors.rating = true;
    }

    // Validate image
    if (!editId && !categoryImg) {
      errors.categoryImg = true;
    }

    // If there are any errors, set the form errors and return
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // If there are no errors, proceed with the form submission
    const token = localStorage.getItem("admin-token");
    const headers = { "x-access-token": token };
    const form = new FormData();

    form.append("name", formData.name);
    if (categoryImg) {
      form.append("user_image", categoryImg);
    }
    form.append("message", formData.note);
    form.append("rating", formData.rating);
    form.append("service", formData.serviceID);
    setLoading(true);

    if (editId) {
      await axios
        .put(`${BASEURL}/service-provider/review/${editId}`, form, {
          headers,
        })
        .then((responce) => {
          setShow(false);
          setLoading(false);
          getAllReviews();
        })
        .catch((error) => console.log(error));
    } else {
      await axios
        .post(`${BASEURL}/service-provider/review`, form, { headers })
        .then((res) => {
          if (res) {
            setShow(false);
            setFormData({
              name: "",
              note: "",
              rating: "0",
              serviceID: "",
            });
            setCategoryImg(null);
            setLoading(false);
            getAllReviews();
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const editReview = async (id) => {
    setEditId(id);
    const token = localStorage.getItem("admin-token");
    const headers = {
      "x-access-token": token,
    };
    setLoading(true);
    await axios
      .get(`${BASEURL}/service-provider/review/${id}`, {
        headers,
      })
      .then((response) => {
        if (response) {
          setLoading(false);
          const allData = response.data.data;
          setFormData({
            name: allData.name,
            rating: allData.rating,
            note: allData.message,
            serviceID: allData.service,
          });
          setImagePreviewUrl(BASEURL + allData.user_image);
          setShow(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const openDeleteModel = (id) => {
    setDeleteModel(id);
    setMessage("Are you sure you want to delete?");
    setShow1(true);
  };
  const deleteReview = async () => {
    setShow1(false);
    const token = localStorage.getItem("admin-token");
    const headers = {
      "x-access-token": token,
    };
    setLoading(true);
    await axios
      .delete(`${BASEURL}/service-provider/review/${deleteModel}`, {
        headers,
      })
      .then((responce) => {
        if (responce) {
          setLoading(false);
          setMessage("Record Deleted Successfully");
          setShow2(true);
          getAllReviews();
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const getAllServices = async () => {
    const token = localStorage.getItem("admin-token");
    const headers = {
      "x-access-token": token,
    };
    setLoading(true);
    await axios
      .get(
        `${BASEURL}/service-provider/all-services?page=${page}&limit=${limit}`,
        {
          headers,
        }
      )
      .then((response) => {
        const dataWithSr = response.data.rows.map((item, index) => ({
          ...item,
          sr: (page - 1) * limit + index + 1,
        }));
        setServiceData(dataWithSr);
        setTotalPages(Math.ceil(response.data.count / limit));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  useEffect(() => {
    getAllReviews();
    getAllServices();
  }, [page, limit]);
  return (
    <>
      {" "}
      {loading && <Loader />}
      <Container className="container-center" style={{ marginTop: "50px" }}>
        <div>
          <h1>Manage Review</h1>
          <p>
            Here you can manage all your Review. Add new Review, edit existing
            details, or remove Review from your company.
          </p>
        </div>
        <Row className="align-items-center my-3 mt-5 w-100">
          <Col>
            <h2 className="table-heading">All Reviews</h2>
          </Col>
          <Col className="text-end">
            <Button
              style={{ background: "#5B549E" }}
              onClick={() => handleShow()}
            >
              Add Review &nbsp; <FontAwesomeIcon icon={faUserPlus} />
            </Button>
          </Col>
        </Row>
        <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
          <AgGridReact
            rowData={agentData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={false}
            paginationPageSize={limit}
            rowSelection="multiple"
          />
        </div>
        <div className="mt-4 d-flex justify-content-center">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              className="custom-pagination"
            />
          </Stack>
        </div>
      </Container>
      {/* form */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit" : "Add"} Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="serviceID">
              <Form.Label>Service</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={handleChange}
                isInvalid={formErrors.serviceID}
                value={formData.serviceID}
              >
                <option>Open this select Services</option>
                {serviceData &&
                  serviceData.map((row) => (
                    <option key={row.id} value={row.id}>
                      {row.name}
                    </option>
                  ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please Select Service Name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={formErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={formData.rating}
                onChange={handleChange}
                isInvalid={formErrors.rating}
              >
                <option>Open this select menu</option>
                <option value={1}>⭐</option>
                <option value={2}>⭐⭐</option>
                <option value={3}>⭐⭐⭐</option>
                <option value={4}>⭐⭐⭐⭐</option>
                <option value={5}>⭐⭐⭐⭐⭐</option>{" "}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please Select Rating.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>User Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                isInvalid={formErrors.categoryImg}
              />
              <Form.Control.Feedback type="invalid">
                Please Select Image.
              </Form.Control.Feedback>
              {imagePreviewUrl && (
                <div className="imgCol mt-3">
                  <img
                    src={imagePreviewUrl}
                    alt="Category Preview"
                    style={{ height: "100px", width: "100px" }}
                  />
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="note">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter message"
                value={formData.note}
                onChange={handleChange}
                isInvalid={formErrors.note}
              />
              <Form.Control.Feedback type="invalid">
                Please Enter Message.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button style={{ background: "#5b549e" }} onClick={addReview}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal */}
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button style={{ background: "#5b549e" }} onClick={deleteReview}>
            Ok
          </Button>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Success Modal */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Review;
