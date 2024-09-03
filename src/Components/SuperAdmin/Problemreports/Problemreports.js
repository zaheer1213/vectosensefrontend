import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { BASEURL } from "../../Commanconstans/Comman";
import Loader from "../../Loader/Loader";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Pagination, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useDropzone } from "react-dropzone";

const Problemreports = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [allProblems, setAllProblems] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [formData, setformData] = useState({
    subject: "",
    description: "",
    status: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [imageSrc, setImageSrc] = useState("");
  const [file, setFile] = useState(null);
  const [reportData, setReportData] = useState({});
  const [error, setError] = useState(false);
  const [id, setId] = useState(null);

  const getAllProblems = async () => {
    const token = localStorage.getItem("superadmin-token");
    const headers = {
      "x-access-token": token,
    };
    await axios
      .get(`${BASEURL}/superadmin/report-issue?page=${page}&limit=${limit}`, {
        headers,
      })
      .then((response) => {
        const dataWithSr = response.data.rows.map((item, index) => ({
          ...item,
          sr: (page - 1) * limit + index + 1,
        }));
        setAllProblems(dataWithSr);
      })
      .catch((error) => console.log(error));
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
      headerName: "User Name",
      field: "name",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "User Email",
      field: "email",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Problem Name",
      field: "subject",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Description",
      field: "description",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Status",
      field: "status",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Reported Date",
      field: "reported_at",
      sortable: true,
      filter: true,
      editable: true,
      cellRenderer: (params) => {
        return moment(params).format("DD-MM-YYYY");
      },
    },
    {
      headerName: "Action",
      field: "id",
      cellRenderer: (params) => (
        <>
          <FontAwesomeIcon
            icon={faPenToSquare}
            title="Edit"
            className="pointer"
            onClick={() => handelEdit(params.value)}
          />
          &nbsp;&nbsp;
          <FontAwesomeIcon
            icon={faTrashCan}
            title="Delete"
            onClick={() => handleOpenDelete(params.value)}
            className="pointer"
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

  const handelEdit = async (id) => {
    try {
      setShow2(true);
      const token = localStorage.getItem("superadmin-token");
      const headers = {
        "x-access-token": token,
      };
      const response = await axios.get(
        `${BASEURL}/customer/report-issue/${id}`,
        {
          headers,
        }
      );
      if (response) {
        const data = response.data.data;
        setReportData(data);
        setformData({
          subject: data.subject,
          description: data.description,
          status: data.status,
        });
        setImageSrc(BASEURL + data.doc_file);
        setId(data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenDelete = (id) => {
    setId(id);
    setShow(true);
    setMessage("Are you sure you want to delete?");
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleClose1 = () => {
    setShow1(false);
  };

  const handleClose2 = () => {
    setShow2(false);
  };

  const handleDelete = async () => {
    try {
      setShow(false);
      const token = localStorage.getItem("superadmin-token");
      const headers = {
        "x-access-token": token,
      };
      const resposnse = await axios.delete(
        `${BASEURL}/superadmin/report-issue/${id}`,
        { headers }
      );
      if (resposnse) {
        setShow1(true);
        setMessage("Record deleted successfully");
        getAllProblems();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelInputChange = (e) => {
    const { value, name } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
      setFile(file);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async () => {
    try {
      if (!formData.notes) {
        setError(true);
      } else {
        const token = localStorage.getItem("superadmin-token");
        const headers = {
          "x-access-token": token,
        };

        const data = new FormData();
        data.append("status", formData.status);
        data.append("notes", formData.notes);

        const resposnse = await axios.put(
          `${BASEURL}/superadmin/report-issue/${id}`,
          data,
          { headers }
        );
        if (resposnse) {
          handleClose2();
          setformData({
            subject: "",
            description: "",
            status: "",
          });
          setImageSrc("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProblems();
  }, [page, limit]);
  return (
    <>
      {loading && <Loader />}{" "}
      <Container style={{ marginTop: "50px" }}>
        <div>
          <h1>All Problem Reports</h1>
          <p>
            Here you can manage all your Problem Reports. Add new Problem
            Reports, edit existing details, or remove Problem Reports from your
            list.{" "}
          </p>
        </div>
        <div>
          <div
            className="ag-theme-alpine"
            style={{ height: 600, width: "100%" }}
          >
            <AgGridReact
              rowData={allProblems}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={false}
              paginationPageSize={limit}
              onPageChanged={handlePageChange}
              rowSelection="multiple"
            />
          </div>
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
      {/* Delete Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button style={{ background: "#5b549e" }} onClick={handleDelete}>
            Ok
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Success Modal */}
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* report problem */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <div className="hedingdiv">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                style={{ fontSize: "30px", color: "red" }}
              />{" "}
              &nbsp;&nbsp;
              <h3>Report a Problem</h3>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <small>
              Help Us Improve by Reporting Issues—Your Feedback Drives Our
              Solutions.
            </small>
          </div>
          <div>
            <h4>Problem Section</h4>
            <hr />
            <Form>
              <Col>
                <Form.Group className="mb-3" controlId="formBusinessName">
                  <Form.Label>Name the Problem </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a concise title for the probleme"
                    name="subject"
                    value={formData.subject}
                    onChange={handelInputChange}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Problem Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    placeholder="Provide a detailed explanation of what is happening"
                    value={formData.description}
                    onChange={handelInputChange}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formDescription">
                  <strong>Problem Status</strong>
                  <Form.Select
                    value={formData.status}
                    onChange={handelInputChange}
                    name="status"
                  >
                    <option value="new">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="notes"
                    placeholder="enter note"
                    value={formData.notes}
                    onChange={handelInputChange}
                    isInvalid={!!errors.notes}
                  />
                  {error && !formData.notes && (
                    <p style={{ color: "red" }}>Note is required</p>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Label>Upload Images</Form.Label>
                <div
                  {...getRootProps()}
                  style={{
                    border: "2px dashed #007bff",
                    borderRadius: "8px",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor: isDragActive ? "#f0f0f0" : "white",
                  }}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>Upload Images (Multiple)</p>
                  )}
                </div>
                {imageSrc && (
                  <Row className="justify-content-center mt-3">
                    <Col md={6} className="text-center">
                      <Image
                        src={imageSrc}
                        alt="Selected Image"
                        fluid
                        style={{ height: "100px", width: "100px" }}
                      />
                      <Button
                        variant="danger"
                        className="mt-3"
                        onClick={() => setImageSrc(null)}
                      >
                        Remove Image
                      </Button>
                    </Col>
                  </Row>
                )}
              </Col>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ background: "#5b549e" }} onClick={handleSubmit}>
            Edit
          </Button>
          <Button variant="secondary" onClick={handleClose2}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Problemreports;
