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

const SuperDashbord = () => {
  const [rowData, setRowData] = useState([
    {
      make: "Tesla",
      model: "Model Y",
      price: "Active",
      electric: true,
      month: "June",
      date: new Date(),
    },
    {
      make: "Ford",
      model: "F-Series",
      price: "Active",
      electric: false,
      month: "October",
      date: new Date(),
    },
    {
      make: "Toyota",
      model: "Corolla",
      price: "Active",
      electric: false,
      month: "August",
      date: new Date(),
    },
    {
      make: "Mercedes",
      model: "EQA",
      price: "InActive",
      electric: true,
      month: "February",
      date: new Date(),
    },
  ]);
  const [data, setData] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

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

  useEffect(() => {
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
  }, []);

  const options1 = {
    zoomEnabled: true,
    animationEnabled: true,
    title: {
      text: "Service Report",
    },
    data: data,
  };

  const [value, setValue] = useState(0); // Initial value set to 50

  // Function to handle changes in range input
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "make",
      checkboxSelection: true,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellRenderer: (params) => {
        // Replace with actual image paths based on make value
        let imageUrl = "";
        switch (params.value) {
          case "Tesla":
            imageUrl = "images/Avatar.png";
            break;
          case "Ford":
            imageUrl = "images/Avatar.png";
            break;
          // Add cases for other makes as needed
          default:
            imageUrl = "images/Avatar.png";
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
    { headerName: "Last assessed", field: "date" },
    { headerName: "Status", field: "price", filter: "agNumberColumnFilter" },
    {
      field: "month",
      comparator: (valueA, valueB) => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const idxA = months.indexOf(valueA);
        const idxB = months.indexOf(valueB);
        return idxA - idxB;
      },
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
  ]);
  const defaultColDef = {
    flex: 1,
    filter: "agTextColumnFilter",
    floatingFilter: true,
  };
  const clients = [
    {
      name: "QuantumQuest Enterprises",
      description: "Brings all your news into one place",
      users: ["user1.png", "user2.png", "user3.png", "+5"],
      licenseUse: 70,
    },
    {
      name: "StellarWave Solutions",
      description: "Super lightweight design app",
      users: ["user4.png", "user5.png", "user6.png", "+8"],
      licenseUse: 60,
    },
    // Add more clients as needed
  ];

  return (
    <>
      <Container fluid>
        <Container className="container-center" style={{ marginTop: "50px" }}>
          <Col>
            <div className="text-center hedingDiv">
              <h1 className="text-center ">Analytics</h1>
              <p>
                Our philosophy is simple — create a team of diverse, passionate
                people and <br /> foster a culture that empowers you to do you
                best work.
              </p>
            </div>
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
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 25, 50]}
                  />
                </div>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md={6}>
                <h2>Clients</h2>
                <Table responsive="sm" className="clients-table">
                  <thead>
                    <tr>
                      <th>About</th>
                      <th>Users</th>
                      <th>License use</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, index) => (
                      <tr key={index}>
                        <td>
                          <strong>{client.name}</strong>
                          <br />
                          <span>{client.description}</span>
                        </td>
                        <td>
                          <div className="user-icons">
                            {client.users.map((user, i) => (
                              <Image
                                key={i}
                                src={`/path/to/images/${user}`}
                                roundedCircle
                                className="user-icon"
                              />
                            ))}
                          </div>
                        </td>
                        <td>
                          <ProgressBar
                            now={client.licenseUse}
                            label={`${client.licenseUse}%`}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
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
