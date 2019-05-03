import React from "react";
//TODO dontshow text with < 5%
const RADIUS = 30;
const HOLE = 7;
const CENTER_PIE = 50;
//const COLORS = ["#2c8cfb", "#4ea7df", "#77abdb", "#5c83a8"];
const COLORS = ["#90caf9", "#1976d2", "#0d47a1", "#82b1ff"];

function getAnglePoint(startAngle, endAngle, radius, x, y) {
  var x1, y1, x2, y2, x3, y3, x4, y4;

  x1 = x + radius * Math.cos((Math.PI * startAngle) / 180);
  y1 = y + radius * Math.sin((Math.PI * startAngle) / 180);
  x2 = x + radius * Math.cos((Math.PI * endAngle) / 180);
  y2 = y + radius * Math.sin((Math.PI * endAngle) / 180);

  x3 = x + (radius - HOLE / 2) * Math.cos((Math.PI * (endAngle + 10)) / 180);
  y3 = y + (radius - HOLE / 2) * Math.sin((Math.PI * (endAngle + 10)) / 180);

  x4 = x + (radius + HOLE / 2) * Math.cos((Math.PI * (startAngle + 10)) / 180);
  y4 = y + (radius + HOLE / 2) * Math.sin((Math.PI * (startAngle + 10)) / 180);

  return { x1, y1, x2, y2, x3, y3, x4, y4 };
}

class DonutChart extends React.Component {
  constructor(props) {
    console.log("DonutChart constructor", props);
    super(props);
  }

  componentDidMount() {
    console.log("DonutChart componentDidMount");
  }
  componentDidUpdate(prevProps) {
    console.log("DonutChart componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("DonutChart componentWillUnmount");
  }
  render() {
    const { data = [], label = [] } = this.props.value;
    const SUM = data.reduce((s, a) => s + a);
    let startAngle = 0;
    return (
      <div className="svg-wrapper">
        <svg
          viewBox={"0 0 100 100"}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="dashboard-monitor donut"
        >
          <circle
            r={31}
            cx="50%"
            cy="50%"
            fill="none"
            stroke="#e5e5e5"
            strokeWidth={1}
          />
          <circle
            r={22}
            cx="50%"
            cy="50%"
            fill="none"
            stroke="#e5e5e5"
            strokeWidth={1}
          />
          {data.map((slice, index) => {
            const nextAngle = startAngle;
            const angle = (slice / SUM) * 360;
            startAngle += angle;

            return (
              <Slice
                key={index}
                value={slice}
                label={label[index]}
                startAngle={nextAngle}
                angle={angle}
                color={COLORS[index]}
                arrow={this.props.arrow}
              />
            );
          })}
          <text
            className="total"
            x={"50%"}
            y={"50%"}
            fontWeight="bold"
            fontSize={12}
            fontStyle="italic"
            textAnchor="middle"
            fill="#4b4b4b"
          >
            <tspan dy={8}>{SUM}</tspan>
            <tspan x={"50%"} fontSize={5} dy={-10} textAnchor="middle">
              Total
            </tspan>
          </text>
        </svg>
      </div>
    );
  }
}

class Slice extends React.Component {
  static defaultProps = {
    arrow: true
  };

  constructor(props) {
    console.log("Slice constructor", props);
    super(props);
    this.state = {
      path: "",
      line: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
      }
    };
  }

  componentDidMount() {
    console.log("Slice componentDidMount");
    this.draw();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("Slice componentDidUpdate");
    if (prevProps.value !== this.props.value) this.draw();
  }
  componentWillUnmount() {
    console.log("Slice componentWillUnmount");
  }
  draw() {
    const { startAngle, angle, arrow } = this.props;
    const path = [];
    const a = getAnglePoint(
      startAngle,
      startAngle + angle,
      RADIUS,
      CENTER_PIE,
      CENTER_PIE
    );
    const b = getAnglePoint(
      startAngle,
      startAngle + angle,
      RADIUS - HOLE,
      CENTER_PIE,
      CENTER_PIE
    );

    path.push("M" + a.x1 + "," + a.y1);
    path.push(
      "A" +
        RADIUS +
        "," +
        RADIUS +
        " 0 " +
        (angle > 180 ? 1 : 0) +
        ",1 " +
        a.x2 +
        "," +
        a.y2
    );
    if (arrow) path.push("L" + a.x3 + "," + a.y3);

    path.push("L" + b.x2 + "," + b.y2);
    path.push(
      "A" +
        (RADIUS - HOLE) +
        "," +
        (RADIUS - HOLE) +
        " 0 " +
        (angle > 180 ? 1 : 0) +
        ",0 " +
        b.x1 +
        "," +
        b.y1
    );

    if (arrow) path.push("L" + b.x4 + "," + b.y4);
    // Close
    path.push("Z");
    const line = (() => {
      return {
        x1:
          CENTER_PIE +
          (RADIUS - HOLE / 2) *
            Math.cos((Math.PI * (startAngle + angle / 2)) / 180),
        y1:
          CENTER_PIE +
          (RADIUS - HOLE / 2) *
            Math.sin((Math.PI * (startAngle + angle / 2)) / 180),
        x2:
          CENTER_PIE +
          (RADIUS + HOLE) *
            Math.cos((Math.PI * (startAngle + angle / 2)) / 180),
        y2:
          CENTER_PIE +
          (RADIUS + HOLE) * Math.sin((Math.PI * (startAngle + angle / 2)) / 180)
      };
    })();

    this.setState({
      path: path.join(" "),
      line
    });
  }
  render() {
    const { line, path } = this.state;
    const { color, value, label } = this.props;
    return (
      <g overflow="hidden">
        <path
          d={path}
          fill={color}
          stroke={color}
          strokeWidth={0}
          className="hover-effect"
        />
        <line {...line} stroke="#cbd2d9" strokeWidth={0.3} />
        <text
          className="value"
          x={line.x2}
          y={line.y2 > line.y1 ? line.y2 + 9 : line.y2 - 2}
          fontSize={9}
          fontStyle="italic"
          textAnchor="middle"
          fill="#4b4b4b"
          fontWeight="bold"
        >
          <tspan>{value}</tspan>
          <tspan x={line.x2} fontSize={3.7} dy={-8} textAnchor="middle">
            {label}
          </tspan>
        </text>
      </g>
    );
  }
}

export default DonutChart;
