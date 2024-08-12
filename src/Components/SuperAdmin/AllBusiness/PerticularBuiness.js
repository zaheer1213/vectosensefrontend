import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import "./PerticularBuiness.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { all } from "axios";
import { BASEURL } from "../../Commanconstans/Comman";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PerticularBuiness = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [buinessData, setBuinessData] = useState({});
  const [imgPath, setImgPath] = useState(null);
  const [dynamicData, setDynamicData] = useState({});
  const [serviceData, setServiceData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const getBuinessDetils = async (buinessID) => {
    try {
      const headers = {
        "x-access-token": localStorage.getItem("superadmin-token"),
      };
      const responce = await axios.get(
        `${BASEURL}/superadmin/business/${buinessID}`,
        { headers }
      );
      if (responce) {
        const allData = responce.data;
        setImgPath(allData.data.business_logo);
        setBuinessData(allData.data);
        setDynamicData(allData.dynamic_data);
        console.log(allData.data.id, "allData");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getServicesData = async (id) => {
    try {
      const headers = {
        "x-access-token": localStorage.getItem("superadmin-token"),
      };
      const response = await axios.get(
        `${BASEURL}/superadmin/business-services?business_id=${id}&page=${page}&limit=${limit}`,
        { headers }
      );
      if (response) {
        if (response) {
          setServiceData(response.data.rows);
          setTotalPages(Math.ceil(response.data.count / limit));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    const buinessID = location.state.buinessID;
    getBuinessDetils(buinessID);
    getServicesData(buinessID);
  }, [page, limit]);
  return (
    <>
      <Container>
        <Container className="container-center" style={{ marginTop: "50px" }}>
          <img
            src="images/Frame 1321316250.png"
            onClick={() => window.history.back()}
            className="pointer mb-3"
          />
          <div className="perticular-container">
            <img src={BASEURL + imgPath} alt="logo" className="" />
            <div className="mt-5">
              <h2>{buinessData && buinessData?.business_name}</h2>
              <p>{buinessData && buinessData?.description}</p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-6 conatiner-table">
              <Table responsive hover className="">
                <thead>
                  <td className="color-text">Field</td>
                  <td className="color-text">Information</td>
                </thead>
                <tbody>
                  <tr>
                    <td>Business Name</td>
                    <td>{buinessData && buinessData?.business_name}</td>
                  </tr>
                  <tr>
                    <td>Owner Name</td>
                    <td>{buinessData && buinessData?.user}</td>
                  </tr>
                  <tr>
                    <td>Owner Contact</td>
                    <td>{buinessData && buinessData?.business_no}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{buinessData && buinessData?.business_email}</td>
                  </tr>
                  <tr>
                    <td>Location</td>
                    <td>{buinessData && buinessData?.street_address}</td>
                  </tr>
                  <tr>
                    <td>Total Bookings</td>
                    <td>{dynamicData && dynamicData?.booking_count}</td>
                  </tr>
                  <tr>
                    <td>Customer Ratings</td>
                    <td>⭐⭐⭐⭐</td>
                  </tr>
                  <tr>
                    <td>Revenue Generated</td>
                    <td>${dynamicData && dynamicData?.total_profit}</td>
                  </tr>
                  <tr>
                    <td>Service Status</td>
                    <td>Active</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="col-6">
              <div className="cards-row">
                <div
                  className="perticular-cards pointer"
                  onClick={() => {
                    navigate("/super-perticularservices", {
                      state: buinessData?.id,
                    });
                    window.scroll(0, 0);
                  }}
                >
                  <h5>Services</h5>
                  <h1>{dynamicData && dynamicData?.service_count}</h1>
                </div>
                <div
                  className="perticular-cards pointer"
                  onClick={() => {
                    navigate("/super-perticularagents", {
                      state: buinessData?.id,
                    });
                    window.scroll(0, 0);
                  }}
                >
                  <h5>Agents</h5>
                  <h1>{dynamicData && dynamicData?.agent_count}</h1>
                </div>
              </div>
              <div className="mt-3">
                <Table responsive hover className="">
                  <thead>
                    <td className="color-text">Service Name</td>
                    <td className="color-text">Agent Name</td>
                  </thead>
                  <tbody>
                    {serviceData &&
                      serviceData.map((responce) => {
                        return (
                          <tr>
                            <td>{responce?.name}</td>
                            <td>{responce?.agent}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
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
          </div>
        </Container>
      </Container>
    </>
  );
};

export default PerticularBuiness;
