import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SideBar, DonutChart, ColumnChart } from "./";

const Loader = () => (
  <div
    style={{
      margin: "40% auto",
      width: "50%"
    }}
  >
    <div className="progress">
      <div className="indeterminate" />
    </div>
  </div>
);
const Divider = () => (
  <div
    className="divider"
    style={{
      margin: "10px auto",
      height: "3px",
      width: "20px",
      backgroundColor: "#353e48"
    }}
  />
);

class DashboardPage extends React.Component {
  constructor(props) {
    console.log("Dashboard constructor", props);
    super(props);
    this.state = {
      invetory: null,
      quality: null
    };
    this.timer = null;
  }

  componentDidMount() {
    console.log("Dashboard componentDidMount");
    this.timer = setTimeout(() => {
      console.log("Dashboard setState");
      this.setState({
        invetory: {
          data: [425, 275, 300],
          label: ["Arrival date", "Processing date", "Shipping date"]
        },
        quality: {
          data: [144, 144, 144],
          label: ["Good ", "Not good", "Scrap"]
        },
        deliveryColumn: {
          data: [1, 2, 3, 2, 1, 3],
          label: [
            ["Wk", 39],
            ["Wk", 40],
            ["Wk", 41],
            ["Wk", 42],
            ["Wk", 43],
            ["Wk", 44]
          ]
        },
        qualityColumn: {
          data: [1, [1, 2, 3], [4], [1, 1, 3], [5, 1], [2, 2, 2]],
          label: [
            ["Wk", 39],
            ["Wk", 40],
            ["Wk", 41],
            ["Wk", 42],
            ["Wk", 43],
            ["Wk", 44]
          ],
          marks: ["Good ", "Not good", "Scrap"]
        }
      });
    }, 3000);
  }
  componentDidUpdate(prevProps) {
    console.log("Dashboard componentDidUpdate");
  }
  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer);
    console.log("Dashboard componentWillUnmount");
  }
  render() {
    return (
      <>
        <SideBar />
        {console.log("render Dashboard")}
        <div className="row">
          <div className="col s12 m4">
            <div className="card center" style={{ minHeight: "500px" }}>
              <h5 style={{ paddingTop: "10px", color: "#2c8cfb" }}>
                <b>Invetory Monitor</b>
              </h5>
              <Divider />
              {this.state.invetory ? (
                <DonutChart value={this.state.invetory} />
              ) : (
                <Loader />
              )}
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card center" style={{ minHeight: "500px" }}>
              <h5 style={{ paddingTop: "10px", color: "#2c8cfb" }}>
                <b>Delivery Monitor</b>
              </h5>
              <Divider />
              <h1>
                <b>
                  <em>
                    4.21<span style={{ fontSize: "18px" }}>Day</span>
                  </em>
                </b>
              </h1>
              <div style={{ padding: "10px 20px" }}>
                {this.state.deliveryColumn ? (
                  <ColumnChart value={this.state.deliveryColumn} />
                ) : (
                  <Loader />
                )}
              </div>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card center" style={{ minHeight: "500px" }}>
              <h5 style={{ paddingTop: "10px", color: "#2c8cfb" }}>
                <b>Quality Monitor</b>
              </h5>
              <Divider />
              {this.state.quality ? (
                <DonutChart value={this.state.quality} arrow={false} />
              ) : (
                <Loader />
              )}
              <div style={{ padding: "10px 20px" }}>
                {this.state.qualityColumn ? (
                  <ColumnChart value={this.state.qualityColumn} />
                ) : (
                  <Loader />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(connect()(DashboardPage));
