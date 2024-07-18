import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Modal, Pagination, Stack } from "react-bootstrap";
import { BASEURL } from "../../Commanconstans/Comman";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const AllBuiness = () => {
  const navigate = useNavigate();
  const [agentData, setAgentData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState(null);

  const getAllBuiness = async () => {
    const token = localStorage.getItem("superadmin-token");
    const headers = { "x-access-token": token };
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASEURL}/superadmin/business?page=${page}&limit=${limit}`,
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
  const columnDefs = [
    {
      headerName: "Sr No",
      field: "sr",
      sortable: true,
      filter: true,
      editable: false,
    },
    {
      headerName: "Buiness Name",
      field: "business_name",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Email",
      field: "business_email",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Phone",
      field: "business_no",
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
  const editAgent = (id) => {
    navigate("/super-businessedit", { state: { buinessID: id } });
  };
  const handleOpenDelete = (id) => {
    setId(id);
    setShow(true);
    setMessage("Are you sure you want to delete?");
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleClose1 = () => {
    setShow1(false);
  };
  const handleDelete = async () => {
    handleClose();
    setLoading(true);
    try {
      const headers = {
        "x-access-token": localStorage.getItem("admin-token"),
      };
      const response = await axios.delete(
        `${BASEURL}/superadmin/service/${id}`,
        { headers }
      );
      setLoading(false);
      if (response.data) {
        setMessage("Buiness deleted successfully");
        setShow1(true);
        getAllBuiness();
      }
    } catch (error) {
      setShow(false);
      setMessage("Something went wrong.");
      setShow1(true);
      setLoading(false);
    }
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    getAllBuiness();
  }, []);
  return (
    <>
      <Container fluid>
        <Container className="container-center" style={{ marginTop: "50px" }}>
          <div>
            <h1>All Business </h1>
            <p>
              Here you can manage all your Business. Add new agents, edit
              existing details, or remove Business from your company.
            </p>
          </div>
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
    </>
  );
};

export default AllBuiness;
