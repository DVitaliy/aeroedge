import React from "react";
import PropTypes from "prop-types";

class DetailsFive extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
    this.selectInstance = null;
  }
  componentDidMount() {
    window.M.updateTextFields();
    const elems = document.querySelectorAll("select");
    this.selectInstance = window.M.FormSelect.init(elems, {});
  }
  componentWillUnmount() {
    this.selectInstance.map(instance => instance.destroy());
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card" style={{ padding: "10px" }}>
            <div className="row">
              <div className="col s12">
                <blockquote style={{ borderLeftColor: "#64b5f6" }}>
                  <h6>Company</h6>
                  <div className="divider" />
                </blockquote>
              </div>
              <div className="input-field col s12 m6">
                <input
                  defaultValue="TOCALO Co.,Ltd"
                  id="input1-1"
                  type="text"
                />
                <label htmlFor="input1-1">Copmany ID:</label>
              </div>
              <div className="input-field col s12 m6">
                <input defaultValue="00000000" id="input1-2" type="text" />
                <label htmlFor="input1-2">User ID:</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <blockquote style={{ borderLeftColor: "#64b5f6" }}>
                  <h6>5M Details</h6>
                  <div className="divider" />
                </blockquote>
              </div>
              <div className="input-field col s12 m6">
                <input
                  value={this.state.serialNo}
                  name="serialNo"
                  id="serialNo"
                  type="text"
                  onChange={this.handleInputChange}
                />
                <label htmlFor="serialNo">Serial No:</label>
              </div>
              <div className="input-field col s12 m6">
                <select>
                  <option value="1">LPT7</option>
                  <option value="2">LPT5</option>
                </select>
                <label>Product code:</label>
              </div>

              <div className="input-field col s4 m2">
                <input defaultValue="" id="input3-1" type="text" />
                <label htmlFor="input3-1">Arrival date:</label>
              </div>
              <div className="input-field col s4 m2">
                <input defaultValue="2018/1/31" id="input3-2" type="text" />
                <label htmlFor="input3-2">Worked date:</label>
              </div>
              <div className="input-field col s4 m2">
                <input defaultValue="" id="input3-3" type="text" />
                <label htmlFor="input3-3">Ship date:</label>
              </div>
              <div className="input-field col s12 m6">
                <select>
                  <option value="1">E4</option>
                  <option value="2">E4R1</option>
                  <option value="2">E4R2</option>
                </select>
                <label>Revision code:</label>
              </div>

              <div className="input-field col s6 m3">
                <input defaultValue="" id="input4-1" type="text" />
                <label htmlFor="input4-1">Man code:</label>
              </div>
              <div className="input-field col s6 m3">
                <input defaultValue="" id="input4-2" type="text" />
                <label htmlFor="input4-2">Material code:</label>
              </div>
              <div className="input-field col s12 m6">
                <select>
                  <option value="1">T1</option>
                  <option value="2">P1</option>
                  <option value="2">MC0</option>
                  <option value="2">T2</option>
                  <option value="2">WJ1</option>
                  <option value="2">WJ2</option>
                  <option value="2">P2</option>
                  <option value="2">MC1</option>
                  <option value="2">P3</option>
                  <option value="2">MC2</option>
                  <option value="2">MC3</option>
                  <option value="2">P4</option>
                  <option value="2">MT1</option>
                  <option value="2">FG1</option>
                  <option value="2">FG2</option>
                  <option value="2">FG3</option>
                  <option value="2">MT2</option>
                  <option value="2">F</option>
                  <option value="2">MT3</option>
                  <option value="2">SET</option>
                  <option value="2">PT</option>
                  <option value="2">MT4</option>
                  <option value="2">RT</option>
                  <option value="2">MT5</option>
                  <option value="2">P5</option>
                  <option value="2">TMSP1</option>
                  <option value="2">MT6</option>
                  <option value="2">FT</option>
                </select>
                <label>Method code:</label>
              </div>

              <div className="input-field col s12 m4">
                <input defaultValue="" id="input5-1" type="text" />
                <label htmlFor="input5-1">Machine code:</label>
              </div>
              <div className="input-field col s12 m4">
                <input defaultValue="" id="input5-2" type="text" />
                <label htmlFor="input5-2">NG comment:</label>
              </div>
              <div className="input-field col s12 m4">
                <input defaultValue="" id="input5-3" type="text" />
                <label htmlFor="input5-3">Next method company code:</label>
              </div>

              <div className="input-field col s4 m2">
                <input defaultValue="" id="input6-1" type="text" />
                <label htmlFor="input6-1">Optional field 1:</label>
              </div>
              <div className="input-field col s4 m2">
                <input defaultValue="" id="input6-2" type="text" />
                <label htmlFor="input6-2">Optional field 2:</label>
              </div>
              <div className="input-field col s4 m2">
                <input defaultValue="" id="input6-3" type="text" />
                <label htmlFor="input6-3">Optional field 3:</label>
              </div>
              <div className="input-field col s4 m2">
                <input defaultValue="" id="input6-4" type="text" />
                <label htmlFor="input6-4">Optional field 4:</label>
              </div>
              <div className="input-field col s4 m4">
                <input defaultValue="" id="input6-5" type="text" />
                <label htmlFor="input6-5">Optional field 5:</label>
              </div>
            </div>

            <div className="row">
              <div className="col s12 m4">
                <blockquote style={{ borderLeftColor: "#64b5f6" }}>
                  <h6>File upload</h6>
                  <div className="divider" />
                </blockquote>
                <div
                  className="file-field input-field grey lighten-4"
                  style={{ padding: "35px 15px", borderRadius: "10px" }}
                >
                  <div className="btn">
                    <span>
                      <i className="material-icons left">attach_file</i>File
                    </span>
                    <input type="file" />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
              </div>
              <div className="col s12 m8">
                <blockquote style={{ borderLeftColor: "#64b5f6" }}>
                  <h6>Attached files</h6>
                  <div className="divider" />
                </blockquote>
                <div className="col s4 m3 center hoverable">
                  <p className="truncate">
                    <i className="material-icons">picture_as_pdf</i>
                    <br />
                    Traveler Documents.pdf
                  </p>
                </div>
                <div className="col s4 m3 center hoverable">
                  <p className="truncate">
                    <i className="material-icons">insert_drive_file</i>
                    <br />
                    Traveler Documents.pdf
                  </p>
                </div>
                <div className="col s4 m3 center hoverable">
                  <p className="truncate">
                    <i className="material-icons">picture_as_pdf</i>
                    <br />
                    Traveler Documents.pdf
                  </p>
                </div>
                <div className="col s4 m3 center hoverable">
                  <p className="truncate">
                    <i className="material-icons">insert_drive_file</i>
                    <br />
                    Traveler Documents.pdf
                  </p>
                </div>
                <div className="col s4 m3 center hoverable">
                  <p className="truncate">
                    <i className="material-icons">picture_as_pdf</i>
                    <br />
                    Traveler Documents.pdf
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <a className="waves-effect waves-light btn right">
                  Save
                  <i className="material-icons left">save</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
DetailsFive.propTypes = {
  data: PropTypes.object.isRequired,
  dataSource: PropTypes.object.isRequired,
};
export default DetailsFive;
