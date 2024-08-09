import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  ProgressBar,
  Image,
  Table,
} from "react-bootstrap";
import Chart from "react-apexcharts";
import CanvasJSReact from "@canvasjs/react-charts";
import "./SuperDashbord.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AgCharts } from "ag-charts-react";
import axios from "axios";
import { BASEURL } from "../../Commanconstans/Comman";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const SuperDashbord = () => {
  const [rowData, setRowData] = useState([]);
  const [data, setData] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [dashbordData, setDashbordData] = useState({});
  const [page, setPage] = useState(1);
  const [page1, setPage1] = useState(1);
  const [limit, setLimit] = useState(5);
  const [limit1, setLimit1] = useState(15);
  const [profitData, setProfitData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const getData = () => {
    return [
      { asset: "Stocks", amount: 60 },
      { asset: "Bonds", amount: 20 },
      { asset: "Real Estate", amount: 10 },
      { asset: "Cash", amount: 5 },
      { asset: "Commodities", amount: 5 },
    ];
  };

  const [options2, setOptions2] = useState({
    data: getData(),
    title: {
      text: "Portfolio Composition",
    },
    series: [
      {
        type: "donut",
        calloutLabelKey: "asset",
        angleKey: "amount",
        innerRadiusRatio: 0.7,
      },
    ],
  });

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const options = {
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              return 249;
            },
          },
        },
      },
    },
    labels: ["Apples", "Oranges", "Bananas", "Berries"],
    colors: ["#5B549E", "#5B549E", "#5B549E", "#5B549E"],
  };

  const series = [44, 55, 67, 83];

  const options1 = {
    zoomEnabled: true,
    animationEnabled: true,
    title: {
      text: "Service Report",
    },
    data: data,
  };
  const columnDefs = [
    {
      field: "business_name",
      checkboxSelection: true,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellRenderer: (params) => {
        let imageUrl = "";
        switch (params.value) {
          case "Tesla":
            imageUrl = BASEURL + params.data.business_logo;
            break;
          default:
            imageUrl = BASEURL + params.data.business_logo;
        }
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={imageUrl}
              alt={params.value}
              style={{ width: 30, height: 30, marginRight: 10 }}
            />
            <span>{params.value}</span>
          </div>
        );
      },
    },
    {
      headerName: "Business Rate",
      field: "model",
      cellRenderer: () => {
        return (
          <div>
            <input
              type="range"
              min="10"
              max="80"
              defaultValue="10%"
              style={{ width: "90%", color: "#5B549E" }}
              // onChange={(e) => {}}
            />
            &nbsp;
            <span>8%</span>
          </div>
        );
      },
    },
    { headerName: "Business No", field: "business_no" },
    {
      headerName: "Business Email",
      field: "business_email",
      filter: "agNumberColumnFilter",
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
            // onClick={() => editService(params.value)}
          />
          &nbsp;&nbsp;
          <FontAwesomeIcon
            icon={faTrashCan}
            title="Delete"
            // onClick={() => handleOpenDelete(params.value)}
            className="pointer"
            style={{ color: "red" }}
          />
        </>
      ),
    },
  ];
  const defaultColDef = {
    flex: 1,
    filter: "agTextColumnFilter",
    floatingFilter: true,
  };

  const dashbordCount = async () => {
    const token = localStorage.getItem("superadmin-token");
    const headers = {
      "x-access-token": token,
    };
    await axios
      .get(`${BASEURL}/superadmin/dashboard-api1`, { headers })
      .then((responce) => {
        setDashbordData(responce.data.data);
      })
      .catch((error) => console.log(error));
  };

  const getAllBuinessData = async () => {
    const token = localStorage.getItem("superadmin-token");
    const headers = {
      "x-access-token": token,
    };
    await axios
      .get(
        `${BASEURL}/superadmin/dashboard-api3?page=${page1}&limit=${limit1}`,
        {
          headers,
        }
      )
      .then((responce) => {
        if (responce) {
          setRowData(responce.data.rows);
        }
      })
      .catch((error) => console.log(error));
  };

  const allServiceProfit = async () => {
    const token = localStorage.getItem("superadmin-token");
    const headers = {
      "x-access-token": token,
    };
    await axios
      .get(`${BASEURL}/superadmin/dashboard-api?page=${page}&limit=${limit}`, {
        headers,
      })
      .then((responce) => {
        if (responce) {
          setProfitData(responce.data.data);
          setTotalPages(Math.ceil(responce.data.count / limit));
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    dashbordCount();
    getAllBuinessData();
    allServiceProfit();
    setStartTime(new Date());

    const limit = 50000;
    let y = 100;
    const dataPoints = [];

    for (let i = 0; i < limit; i += 1) {
      y += Math.round(Math.random() * 10 - 5);
      dataPoints.push({
        x: i,
        y: y,
      });
    }

    setData([{ type: "line", dataPoints }]);

    setEndTime(new Date());
  }, [page, limit, page1, limit1]);
  return (
    <>
      <Container fluid>
        <Container className="container-center" style={{ marginTop: "50px" }}>
          <Col>
            <div className="text-center hedingDiv">
              <h1 className="text-center ">Dashboard</h1>
              <p>
                Our philosophy is simple — create a team of diverse, passionate
                people and <br /> foster a culture that empowers you to do you
                best work.
              </p>
            </div>
            <Row className="mt-5">
              <Col md={3}>
                <div className="custome-cards-dashbord bg-filler">
                  <strong>TOTAL PROFIT</strong>
                  <div className="ineer-dashbord-div">
                    <h4>${dashbordData?.total_profit}</h4>
                    {/* <div>+ 36%</div> */}
                  </div>
                </div>
              </Col>
              <Col md={3}>
                <div className="custome-cards-dashbord bg-filler text-center">
                  <strong>Total Services</strong>
                  <h1 className="text-center">
                    {dashbordData?.service_count
                      ? dashbordData?.service_count
                      : "0"}
                  </h1>
                </div>
              </Col>
              <Col md={3}>
                <div className="custome-cards-dashbord bg-filler text-center">
                  <strong>Total Agents</strong>
                  <h1 className="text-center">
                    {dashbordData?.agent_count
                      ? dashbordData?.agent_count
                      : "0"}
                  </h1>
                </div>
              </Col>
              <Col md={3}>
                <div className="custome-cards-dashbord bg-filler">
                  <strong>Total Booking</strong>
                  <div className="ineer-dashbord-div">
                    <h4>
                      {" "}
                      {dashbordData?.booking_count
                        ? dashbordData?.booking_count
                        : "0"}
                    </h4>
                    {/* <div>+ 56%</div> */}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <CanvasJSChart options={options1} />
            </Row>
            <Row className="py-5 mt-5">
              <Col md={6}>
                <AgCharts options={options2} />
              </Col>
              <Col md={6}>
                <h4>Services Rate</h4>
                <div>
                  <Form.Label>Home Services</Form.Label> <br />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    style={{ width: "100%", color: "#5B549E" }}
                  />
                </div>
                <div>
                  <Form.Label>Pest Services</Form.Label> <br />
                  <input
                    type="range"
                    min="0"
                    max="80"
                    style={{ width: "100%", color: "#5B549E" }}
                  />
                </div>
                <div>
                  <Form.Label>Repairing Services</Form.Label> <br />
                  <input
                    type="range"
                    min="0"
                    max="70"
                    style={{ width: "100%", color: "#5B549E" }}
                  />
                </div>
                <div>
                  <Form.Label>Cleaning Services</Form.Label> <br />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    style={{ width: "100%", background: "#5B549E" }}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <h2 className="mb-3">Business</h2>
                </div>
                <div
                  className="ag-theme-alpine"
                  style={{ height: 600, width: "100%" }}
                >
                  <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowSelection="multiple"
                    suppressRowClickSelection={true}
                    pagination={true}
                    paginationPageSize={limit1}
                    paginationPageSizeSelector={[10, 25, 50]}
                  />
                </div>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md={6}>
                <h2>Services</h2>
                <Table responsive="sm" className="clients-table">
                  <thead>
                    <tr>
                      <th>Service Name</th>
                      <th>Image</th>
                      <th>Total Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profitData &&
                      profitData?.map((client, index) => (
                        <tr key={index}>
                          <td>
                            <strong>{client.name}</strong>
                          </td>
                          <td>
                            <img
                              src={`${BASEURL + client.service_logo}`}
                              alt="servicelogo"
                              className="user-icon"
                            />
                          </td>
                          <td>
                            ${client.total_revenue ? client.total_revenue : "0"}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
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
              </Col>
              <Col md={6}>
                <Chart
                  options={options}
                  series={series}
                  type="radialBar"
                  height="350"
                />
              </Col>
            </Row>
          </Col>
        </Container>
      </Container>
    </>
  );
};

export default SuperDashbord;
