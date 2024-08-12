import {
  faPenToSquare,
  faTrashCan,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { BASEURL } from "../../Commanconstans/Comman";
import { Pagination, Stack } from "@mui/material";
import Loader from "../../Loader/Loader";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const AllCategory = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [categoryName, setcategoryName] = useState("");
  const [error, setError] = useState(false);
  const [editId, setEditId] = useState(null);
  const [categoryImg, setCategoryImg] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

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
      headerName: "Category Name",
      field: "category_name",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Category Image",
      field: "category_image",
      sortable: true,
      filter: true,
      editable: true,
      cellRenderer: (params) => (
        <>
          {console.log(params)}
          <div>
            <img
              src={BASEURL + params.data.category_image}
              alt="category_image"
              style={{ height: "50px", width: "50px" }}
            />
          </div>
        </>
      ),
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
            onClick={() => openEditModel(params.value)}
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
  const getAllCategory = async () => {
    const token = localStorage.getItem("superadmin-token");
    const headers = {
      "x-access-token": token,
    };
    setLoading(true);
    await axios
      .get(
        `${BASEURL}/superadmin/service-category?page=${page}&limit=${limit}`,
        {
          headers,
        }
      )
      .then((responce) => {
        const dataWithSr = responce.data.rows.map((item, index) => ({
          ...item,
          sr: (page - 1) * limit + index + 1,
        }));
        setAllCategory(dataWithSr);
        setTotalPages(Math.ceil(responce.data.count / limit));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
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
  const handleDelete = async () => {
    handleClose();
    setLoading(true);
    try {
      const headers = {
        "x-access-token": localStorage.getItem("superadmin-token"),
      };
      const response = await axios.delete(
        `${BASEURL}/superadmin/service-category/${id}`,
        { headers }
      );
      setLoading(false);
      if (response.data) {
        setMessage("Category deleted successfully");
        setShow1(true);
        getAllCategory();
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
  const handelClose2 = () => {
    setEditId(null);
    setcategoryName("");
    setShow2(false);
  };
  const handelAddCategory = async () => {
    if (!categoryName) {
      setError(true);
    } else {
      const token = localStorage.getItem("superadmin-token");
      const headers = {
        "x-access-token": token,
      };

      const formdata = new FormData();
      formdata.append("category_name", categoryName);
      if (categoryImg) {
        formdata.append("category_image", categoryImg);
      }
      if (editId) {
        setLoading(true);
        await axios
          .put(`${BASEURL}/superadmin/service-category/${editId}`, formdata, {
            headers,
          })
          .then((responce) => {
            if (responce.data) {
              setcategoryName("");
              handelClose2();
              getAllCategory();
              setEditId(null);
              setcategoryName("");
              setLoading(false);
              setCategoryImg(null);
            }
          })
          .catch((error) => console.log(error));
      } else {
        setLoading(true);
        await axios
          .post(BASEURL + "/superadmin/service-category", formdata, {
            headers,
          })
          .then((responce) => {
            if (responce.data) {
              setcategoryName("");
              handelClose2();
              getAllCategory();
              setEditId(null);
              setcategoryName("");
              setLoading(false);
              setCategoryImg(null);
            }
          })
          .catch((error) => console.log(error));
      }
    }
  };
  const openEditModel = async (id) => {
    setEditId(id);
    const token = localStorage.getItem("superadmin-token");
    const headers = {
      "x-access-token": token,
    };
    setLoading(true);
    await axios
      .get(`${BASEURL}/superadmin/service-category/${id}`, { headers })
      .then((res) => {
        if (res.data) {
          setShow2(true);
          setcategoryName(res.data.data.category_name);
          setImagePreviewUrl(BASEURL + res.data.data.category_image);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const openModel = () => {
    setEditId(null);
    setShow2(true);
  };
  useEffect(() => {
    getAllCategory();
  }, [page, limit]);
  return (
    <>
      {loading && <Loader />}

      <Container style={{ marginTop: "50px" }}>
        <div>
          <h1>Category</h1>
          <p>
            Here you can manage all your Category. Add new Category, edit
            existing details, or remove Category from your list.{" "}
          </p>
        </div>
        <Row>
          <Col className="text-end">
            <h2 className="table-heading">
              <Button
                style={{ background: "#5B549E" }}
                onClick={() => openModel()}
              >
                Add Category &nbsp; <FontAwesomeIcon icon={faUserPlus} />{" "}
              </Button>
            </h2>
          </Col>
        </Row>
        <div>
          <div
            className="ag-theme-alpine"
            style={{ height: 600, width: "100%" }}
          >
            <AgGridReact
              rowData={allCategory}
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

      {/* add / edit model */}
      <Modal show={show2} onHide={handelClose2} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit" : "Add"} Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-start">
            <label className="mb-2">Category Name</label> <br />
            <input
              type="text"
              placeholder="enter category name"
              onChange={(e) => setcategoryName(e.target.value)}
              value={categoryName}
              style={{ width: "300px" }}
            />
            {error && !categoryName && (
              <p className="text-danger m-2">please enter category name</p>
            )}
          </div>
          <div className="text-start mt-3">
            <label className="mb-2">Category Image</label> <br />
            <input type="file" onChange={handleImageChange} /> <br />
            <strong className="mt-5">Please add a high-resolution image</strong>
            {imagePreviewUrl && (
              <div className="imgCol mt-3">
                <img
                  src={imagePreviewUrl}
                  alt="Category Preview"
                  style={{ height: "100px", width: "100px" }}
                />
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ background: "#5b549e" }}
            onClick={handelAddCategory}
          >
            {editId ? "Edit" : "Add"}
          </Button>
          <Button variant="secondary" onClick={handelClose2}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllCategory;
