import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Pagination, Stack } from "@mui/material";
import axios from "axios";
import { BASEURL } from "../../Commanconstans/Comman";
import { useNavigate } from "react-router-dom";

const Allpromotionalservices = () => {
  const [promotionalServices, setPromotionalServices] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState(null);
  const [show1, setShow1] = useState(false);

  const navigate = useNavigate();

  const columnDefs = [
    {
      headerName: "Sr No",
      field: "sr",
      sortable: true,
      filter: true,
      editable: false,
    },
    {
      headerName: "Service Name",
      field: "title",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Service Image",
      field: "banner_image",
      editable: true,
      cellRenderer: (params) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={BASEURL + params.data.banner_image}
              alt={params.value}
              style={{ width: 40, height: 40, marginRight: 10 }}
            />
          </div>
        );
      },
    },
    {
      headerName: "Promotional Parameter",
      field: "promotional_parameter",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Start Date",
      field: "start_date",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "End Date",
      field: "end_date",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Purchase Amount",
      field: "purchase_amount",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Action",
      cellRenderer: (params) => (
        <>
          <FontAwesomeIcon
            icon={faPenToSquare}
            title="Edit"
            onClick={() => editService(params.data.id)}
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

  const editService = (id) => {
    navigate("/super-promotionalservices", { state: id });
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
        "x-access-token": localStorage.getItem("superadmin-token"),
      };
      const response = await axios.delete(
        `${BASEURL}/superadmin/promotional-service/${id}`,
        { headers }
      );
      setLoading(false);
      if (response.data) {
        setMessage("Service deleted successfully");
        setShow1(true);
        allPromotionlServices();
      }
    } catch (error) {
      setShow(false);
      setMessage("Something went wrong.");
      setShow1(true);
      setLoading(false);
    }
  };
  const allPromotionlServices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("superadmin-token");
      const headers = { "x-access-token": token };
      const response = await axios.get(
        `${BASEURL}/superadmin/promotional-service?page=${page}&limit=${limit}`,
        { headers }
      );
      if (response.data) {
        setLoading(false);
        const dataWithSr = response.data.rows.map((item, index) => ({
          ...item,
          sr: (page - 1) * limit + index + 1,
        }));
        setPromotionalServices(dataWithSr);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => setPage(value);
  useEffect(() => {
    allPromotionlServices();
  }, [page, limit]);
  return (
    <>
      {loading && <Loader />}
      <Container fluid>
        <Container className="container-center" style={{ marginTop: "50px" }}>
          <div>
            <h1>All Promotional Services</h1>
            <p>
              Here you can manage all your Promotional Services. Add new
              Promotional Services, edit existing details, or remove Promotional
              Services from your company.
            </p>
          </div>
          <Row className="align-items-center my-3 mt-5 w-100">
            <Col>
              <h2 className="table-heading">Promotional Services</h2>
            </Col>
            <Col className="text-end">
              <Button
                style={{ background: "#5B549E" }}
                onClick={() => navigate("/super-promotionalservices")}
              >
                Add Service &nbsp; <FontAwesomeIcon icon={faUserPlus} />
              </Button>
            </Col>
          </Row>
          <div
            className="ag-theme-alpine"
            style={{ height: 600, width: "100%" }}
          >
            <AgGridReact
              rowData={promotionalServices}
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

export default Allpromotionalservices;
