import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Topbar from "../Topbar/Topbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./PerticularCategoryPage.css";
import axios from "axios";
import { BASEURL } from "../../Commanconstans/Comman";
import Loader from "../../Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";

const PerticularCategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [availableFilters, setAvailableFilters] = useState([
    "Cleaning Services",
    "Repairing Services",
    "Security Services",
    "Pest Control Services",
  ]);
  const [GenderFilter, setGenderFilter] = useState(["Male", "Female"]);
  const [DiscountFilter, setDiscountFilter] = useState([
    "60% more",
    "40% more",
    "20% more",
    "10% more",
    "5% more",
  ]);
  const [rating, setRating] = useState([
    "5⭐⭐⭐⭐⭐",
    "4⭐⭐⭐⭐",
    "3⭐⭐⭐",
    "2⭐⭐",
    "1⭐",
  ]);
  const [allServiceData, setallServiceData] = useState([]);
  const [pageLimit, setPageLimit] = useState(8); // Items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);

  const handleAddFilter = (filter) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleRemoveFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter((item) => item !== filter));
  };

  const getAllServices = async (cId) => {
    const headers = {
      "x-access-token": localStorage.getItem("client-token"),
    };
    setLoading(true);
    await axios
      .get(
        `${BASEURL}/customer/get-services/${cId}?page=${currentPage}&limit=${pageLimit}`,
        {
          headers: headers,
        }
      )
      .then((response) => {
        setallServiceData(response.data.rows);
        setTotalPages(Math.ceil(response.data.count / pageLimit)); // Assuming `count` is the total number of services
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const toggleDescription = (id) => {
    if (expandedDescriptionId === id) {
      setExpandedDescriptionId(null);
    } else {
      setExpandedDescriptionId(id);
    }
  };
  const generateRandomColor = () => {
    const letters = "F2F3F4F5F6F7F8F9FAFBFCFDFEFF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  useEffect(() => {
    const serviceId = location.state.catogaryId;
    setId(serviceId);
    if (serviceId) {
      getAllServices(serviceId);
    }
  }, [currentPage]);

  const handleCardClick = (id) => {
    navigate("/servicepage", {
      state: {
        service_id: id,
      },
    });
  };
  return (
    <>
      {loading ? <Loader /> : ""}
      <Topbar />
      <Container fluid className="searchbar-conatiner bg-filler">
        <Row>
          <Col>
            <div className="serchbar">
              <FontAwesomeIcon icon={faSearch} className="searchicon" />
              <input
                type="search"
                placeholder="Enter Service Name"
                className="search-input"
              />
              &nbsp;&nbsp;
              <div>
                <button
                  className="btn inputheight"
                  style={{ background: "#5B549E", color: "white" }}
                >
                  Search
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid className="">
        <Row>
          <Col md={3}>
            <div className="sidebar-col">
              <div className="filterrow">
                <strong>Filters</strong>
                <div>
                  <p className="pointer" onClick={() => setSelectedFilters([])}>
                    Clear all
                  </p>
                </div>
              </div>
              <div className="selected-filters">
                <div className="filter-container">
                  {selectedFilters.map((filter, index) => (
                    <div key={index} className="filter-badge">
                      {filter}
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="remove-icon"
                        onClick={() => handleRemoveFilter(filter)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <h6>Categories</h6>
              <Form>
                {availableFilters.map((filter, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={filter}
                    onChange={() => handleAddFilter(filter)}
                  />
                ))}
              </Form>
              <hr />
              <h6>Gender</h6>
              <Form>
                {GenderFilter.map((filter, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={filter}
                    onChange={() => handleAddFilter(filter)}
                  />
                ))}
              </Form>
              <hr />
              <h6>Discount</h6>
              <Form>
                {DiscountFilter.map((filter, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={filter}
                    onChange={() => handleAddFilter(filter)}
                  />
                ))}
              </Form>
              <hr />
              <h6>Customer Rating</h6>
              <Form>
                {rating.map((filter, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={filter}
                    onChange={() => handleAddFilter(filter)}
                  />
                ))}
              </Form>
            </div>
          </Col>
          <Col md={9} className="py-5">
            {allServiceData && allServiceData.length > 0 ? (
              <>
                <div className="row row-cols-1 row-cols-md-3 g-4 text-start">
                  {allServiceData &&
                    allServiceData.map((row) => (
                      <div
                        className="col-md-3"
                        key={row.id}
                        onClick={() => handleCardClick(row.id)}
                      >
                        <div className="card  pointer service-card-main">
                          <div className="card-img-top">
                            <img
                              src={BASEURL + row.service_logo}
                              className="cardimgtop"
                              alt="Service"
                            />
                          </div>

                          <div className="card-body">
                            <div className="agnetname">
                              <span>{row.agent}</span>
                            </div>
                            <div className="card-heading-para">
                              <h5
                                className="card-title text-start mt-3"
                                style={{ fontSize: "18px", fontWeight: "bold" }}
                              >
                                {row.name}
                              </h5>
                            </div>
                            <div className="mt-4">
                              <h5
                                style={{
                                  fontWeight: "bold",
                                  marginLeft: "10px",
                                }}
                              >
                                ₹ {row.price_per_hour}
                              </h5>
                            </div>
                            <div>
                              {row?.tags?.map((item, index) => {
                                const color = generateRandomColor();
                                return (
                                  <button
                                    key={index}
                                    className="btn custom-btn m-1"
                                    style={{
                                      backgroundColor: color,
                                      color: "white",
                                      opacity: "1px",
                                    }}
                                  >
                                    {item}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="d-flex justify-content-center  mb-5">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    className="custom-pagination"
                  />
                </div>
              </>
            ) : (
              <div className="text-center">No Services Found</div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PerticularCategoryPage;
