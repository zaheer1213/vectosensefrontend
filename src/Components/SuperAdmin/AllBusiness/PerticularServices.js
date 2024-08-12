import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { Col, Container, Row } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { BASEURL } from "../../Commanconstans/Comman";
import { Pagination, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const PerticularServices = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [allServices, setAllServices] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [pagesCount, setPagesCount] = useState(1); // Add state to store total pages
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState(null);

  const getAllServices = async (page, limit, id) => {
    const token = localStorage.getItem("superadmin-token");
    const headers = {
      "x-access-token": token,
    };
    setLoading(true);
    await axios
      .get(
        `${BASEURL}/superadmin/business-services?business_id=${id}&page=${page}&limit=${limit}`,
        {
          headers,
        }
      )
      .then((response) => {
        const dataWithSr = response.data.rows.map((item, index) => ({
          ...item,
          sr: (page - 1) * limit + index + 1,
        }));
        console.log(response);
        setAllServices(dataWithSr);
        setPagesCount(response.data.pages_count); // Set total pages count
        setTotalPages(Math.ceil(response.data.count / limit));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleClose = () => {
    setShow(false);
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
      headerName: "Service Name",
      field: "name",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Service Image",
      field: "service_logo",
      cellRenderer: (params) => (
        <>
          {console.log(params)}
          <img
            src={BASEURL + params.data.service_logo}
            alt="service_logo"
            style={{ height: "50px", width: "50px" }}
          />
        </>
      ),
    },
    {
      headerName: "Category Name",
      field: "category_name",
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
  const handleClose1 = () => {
    setShow1(false);
  };
  useEffect(() => {
    const serviceId = location.state;
    getAllServices(page, limit, serviceId);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const onPaginationChanged = (params) => {
    if (params.newPage) {
      const { page, limit } = params.api.paginationGetCurrentPage() + 1;
      getAllServices(page, limit);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Container fluid>
        <Container className="container-center" style={{ marginTop: "50px" }}>
          <Row className="align-items-center my-3 mt-5 w-100">
            <Col>
              <img
                src="images/Frame 1321316250.png"
                onClick={() => window.history.back()}
                className="pointer mb-3"
              />
              <h2 className="table-heading">All Services</h2>
            </Col>
          </Row>
          <div
            className="ag-theme-alpine"
            style={{ height: 600, width: "100%" }}
          >
            <AgGridReact
              rowData={allServices}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={false}
              paginationPageSize={limit}
              rowSelection="multiple"
              onPaginationChanged={onPaginationChanged}
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
    </>
  );
};

export default PerticularServices;
