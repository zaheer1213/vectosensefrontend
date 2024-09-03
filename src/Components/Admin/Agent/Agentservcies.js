import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Modal, Table } from "react-bootstrap";
import { BASEURL } from "../../Commanconstans/Comman";
import Loader from "../../Loader/Loader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Agentservcies = () => {
  const [servicetData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState("");
  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

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
      field: "agent",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Service Name",
      field: "name",
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
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
  };
  const getAllServices = async () => {
    const token = localStorage.getItem("Agent-token");
    const headers = {
      "x-access-token": token,
    };
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASEURL}/agent/service?page=${page}&limit=${limit}`,
        { headers }
      );
      const dataWithSr = response.data.rows.map((item, index) => ({
        ...item,
        sr: (page - 1) * limit + index + 1,
      }));
      setServiceData(dataWithSr);
      setLoading(false);
      setTotalPages(Math.ceil(response.data.count / limit));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handlePageChange = (event, value) => {
    setPage(value);
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
      const token = localStorage.getItem("Agent-token");
      const headers = {
        "x-access-token": token,
      };
      const response = await axios.delete(`${BASEURL}/agent/service/${id}`, {
        headers,
      });
      setLoading(false);
      if (response) {
        setMessage("Service deleted successfully");
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
  useEffect(() => {
    getAllServices();
  }, [limit, page]);
  return (
    <>
      {loading ? <Loader /> : ""}
      <Container fluid className="bg-filler" style={{ minHeight: "80vh" }}>
        <Container
          className="container-center py-3"
          style={{ marginTop: "50px" }}
        >
          <div className="heading-and-table">
            <div>
              <h1>All Services</h1>
            </div>
            <div
              className="ag-theme-alpine"
              style={{ height: 600, width: "100%" }}
            >
              <AgGridReact
                rowData={servicetData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={limit}
                onPageChanged={handlePageChange}
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

export default Agentservcies;
