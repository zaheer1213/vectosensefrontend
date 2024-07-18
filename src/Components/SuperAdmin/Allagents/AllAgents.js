import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASEURL } from "../../Commanconstans/Comman";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const AllAgents = () => {
  const navigate = useNavigate();
  const [agentData, setAgentData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);

  const columnDefs = [
    {
      headerName: "Sr No",
      field: "sr",
      sortable: true,
      filter: true,
      editable: false,
    },
    {
      headerName: "Agent Name",
      field: "username",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Email",
      field: "email",
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
      cellRenderer: (params) => (params.value ? "Active" : "Inactive"),
    },
    {
      headerName: "Action",
      cellRenderer: (params) => (
        <>
          <FontAwesomeIcon
            icon={faPenToSquare}
            title="Edit"
            onClick={() => editAgent(params.data.id)}
            className="pointer"
          />
          &nbsp;&nbsp;
          <FontAwesomeIcon
            className="pointer"
            icon={faTrashCan}
            title="Delete"
            onClick={() => handleOpenDelete(params.data.id)}
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

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);

  const getAllServices = async () => {
    const token = localStorage.getItem("superadmin-token");
    const headers = { "x-access-token": token };
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASEURL}/superadmin/agent?page=${page}&limit=${limit}`,
        { headers }
      );
      const dataWithSr = response.data.rows.map((item, index) => ({
        ...item,
        sr: (page - 1) * limit + index + 1,
      }));
      setAgentData(dataWithSr);
      setTotalPages(Math.ceil(response.data.count / limit));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const editAgent = (id) => navigate("/super-agentsedit", { state: id });

  const handleOpenDelete = (id) => {
    setId(id);
    setShow(true);
    setMessage("Are you sure you want to delete?");
  };

  const handleDelete = async () => {
    handleClose();
    setLoading(true);
    try {
      const token = localStorage.getItem("admin-token");
      const headers = { "x-access-token": token };
      const response = await axios.delete(
        `${BASEURL}/service-provider/agent/${id}`,
        { headers }
      );
      setLoading(false);
      if (response) {
        setMessage("Agent deleted successfully");
        setShow1(true);
        getAllServices();
      }
    } catch (error) {
      setShow(false);
      setMessage("Something went wrong.");
      setShow1(true);
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => setPage(value);

  useEffect(() => {
    getAllServices();
  }, [page, limit]);

  return (
    <>
      {loading && <Loader />}
      <Container fluid>
        <Container className="container-center" style={{ marginTop: "50px" }}>
          <div>
            <h1>All Agents</h1>
            <p>
              Here you can manage all your agents. Add new agents, edit existing
              details, or remove agents from your company.
            </p>
          </div>
          <Row className="align-items-center my-3 mt-5 w-100">
            <Col>
              <h2 className="table-heading">All Agents</h2>
            </Col>
            <Col className="text-end">
              <Button
                style={{ background: "#5B549E" }}
                // onClick={() => navigate("/agentregistration")}
              >
                Add Agent &nbsp; <FontAwesomeIcon icon={faUserPlus} />
              </Button>
            </Col>
          </Row>
          <div
            className="ag-theme-alpine"
            style={{ height: 600, width: "100%" }}
          >
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
      </Container>

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
    </>
  );
};

export default AllAgents;
