import React, { useEffect, useState } from "react";
import "./services.css";
import axios from "axios";
import { BASEURL } from "../../Commanconstans/Comman";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";
import { Container } from "react-bootstrap";
import ServicesCarousel from "../ServicesCarousel/ServicesCarousel";
import Pagination from "@mui/material/Pagination";

const Services = ({ search }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allservicedata, setAllservicedata] = useState([]);
  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);
  const [pageLimit, setPageLimit] = useState(8); // Items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllServices = async () => {
    const headers = {
      "x-access-token": localStorage.getItem("client-token"),
    };
    setLoading(true);
    await axios
      .get(`${BASEURL}/customer/service`, {
        params: {
          page: currentPage,
          limit: pageLimit,
          search: search,
        },
        headers: headers,
      })
      .then((response) => {
        setAllservicedata(response.data.rows);
        setTotalPages(Math.ceil(response.data.count / pageLimit)); // Assuming `count` is the total number of services
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const generateRandomColor = () => {
    const letters = "F2F3F4F5F6F7F8F9FAFBFCFDFEFF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleCardClick = (id) => {
    navigate("/servicepage", {
      state: {
        service_id: id,
      },
    });
  };

  const toggleDescription = (id) => {
    if (expandedDescriptionId === id) {
      setExpandedDescriptionId(null);
    } else {
      setExpandedDescriptionId(id);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getAllServices();
  }, [search, currentPage]);

  return (
    <>
      {loading ? <Loader /> : ""}
      <Container  className="">
        <div className="container py-5">
          <h3 className="mt-3">Services</h3>
          <hr />
          {allservicedata && allservicedata.length > 0 ? (
            <>
              <div className="row row-cols-1 row-cols-md-3 g-4 text-start">
                {allservicedata &&
                  allservicedata.map((row) => (
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
                            <p className="card-text text-start">
                              {expandedDescriptionId === row.id
                                ? row.description
                                : `${row.description.substring(0, 60)}... `}
                              {row.description.length > 60 && (
                                <span
                                  onClick={() => toggleDescription(row.id)}
                                  style={{
                                    color: "blue",
                                    cursor: "pointer",
                                    marginLeft: "5px",
                                  }}
                                >
                                  {expandedDescriptionId === row.id
                                    ? "Read less"
                                    : "Read more"}
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="mt-4">
                            <h5
                              style={{ fontWeight: "bold", marginLeft: "10px" }}
                            >
                              $ {row.price_per_hour}
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
        </div>
      </Container>
      <ServicesCarousel />
      <Footer />
    </>
  );
};

export default Services;
