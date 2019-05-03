import React from "react";

class ColumnChart extends React.Component {
  static defaultProps = {
    lineColor: "#e4e4e4",
    columnColor: [
      "rgba(98, 172,246, 1)",
      "rgba(38, 139,247, 1)",
      "rgba(30, 123,214, 1)"
    ]
  };
  constructor(props) {
    console.log("ColumnChart constructor", props);
    super(props);
  }

  componentDidMount() {
    console.log("ColumnChart componentDidMount");
  }
  componentDidUpdate(prevProps) {
    console.log("ColumnChart componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("ColumnChart componentWillUnmount");
  }
  render() {
    const { data = [], label = [], marks = [] } = this.props.value;

    const MAX = Math.max(
      ...data.map(i => (i instanceof Array ? i.reduce((s, a) => s + a) : i))
    );
    const SIZE = { width: 200 - 75, height: 100 - 30 };
    const START_POINT = { x1: 50, y1: 75 };
    const WIDTH_RECT = SIZE.width / (data.length * 2 - 1);

    const { lineColor } = this.props;
    return (
      <div className="svg-wrapper">
        <svg
          viewBox={"0 0 200 100"}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="dashboard-monitor column"
        >
          <g overflow="hidden">
            <line
              {...START_POINT}
              x2={START_POINT.x1}
              y2={START_POINT.y1 - SIZE.height}
              stroke={lineColor}
              strokeWidth={0.3}
            />
            <line
              {...START_POINT}
              x2={START_POINT.x1 + SIZE.width}
              y2={START_POINT.y1}
              stroke={lineColor}
              strokeWidth={0.3}
            />
          </g>
          {data.map((slice, index) => {
            const sliceRect = (slice instanceof Array ? slice : [slice]).reduce(
              (prev, current, i) => {
                return {
                  ...prev,
                  [i]: {
                    height: (SIZE.height * ((current / MAX) * 100)) / 100,
                    y: i ? prev[i - 1].height + prev[i - 1].y : 0
                  }
                };
              },
              {}
            );

            const X = START_POINT.x1 + WIDTH_RECT * 2 * index;

            return (
              <g overflow="hidden" key={index}>
                {Object.keys(sliceRect).map(key => (
                  <rect
                    key={key}
                    x={X}
                    y={
                      START_POINT.y1 - sliceRect[key].y - sliceRect[key].height
                    }
                    width={WIDTH_RECT}
                    height={sliceRect[key].height}
                    fill={this.props.columnColor[key]}
                    stroke={this.props.columnColor[key]}
                    strokeWidth={0}
                    className="hover-effect"
                  />
                ))}

                {label[index] && (
                  <text
                    className="value"
                    x={X + WIDTH_RECT / 2}
                    y={START_POINT.y1 + 7}
                    fontSize={5}
                    fontStyle="italic"
                    textAnchor="middle"
                    fill="#4b4b4b"
                    fontWeight="bold"
                  >
                    <tspan>{label[index][0]}</tspan>
                    <tspan x={X + WIDTH_RECT / 2} dy={6} textAnchor="middle">
                      {label[index][1]}
                    </tspan>
                  </text>
                )}
              </g>
            );
          })}

          {marks.map((mark, key) => (
            <g overflow="hidden" key={key}>
              <rect
                x={2}
                y={START_POINT.y1 - SIZE.height + 14 * key}
                width={7}
                height={7}
                fill={this.props.columnColor[key]}
              />
              <text
                x={2 + 7 + 2}
                y={START_POINT.y1 - SIZE.height + 7 + 14 * key}
                fontSize={7}
                fontStyle="italic"
                fill="#4b4b4b"
                fontWeight="bold"
              >
                {mark}
              </text>
            </g>
          ))}

          {!marks.length && (
            <text
              x={START_POINT.x1 - 5}
              y={START_POINT.y1}
              fontSize={7}
              fontStyle="italic"
              textAnchor="end"
              fill={lineColor}
            >
              <tspan dy={-SIZE.height + 7}>{MAX}</tspan>
              <tspan x={START_POINT.x1 - 5} dy={SIZE.height / 2}>
                {Math.floor(MAX / 2)}
              </tspan>
              <tspan x={START_POINT.x1 - 5} dy={SIZE.height / 2 - 7}>
                0
              </tspan>
            </text>
          )}
        </svg>
      </div>
    );
  }
}
export default ColumnChart;
