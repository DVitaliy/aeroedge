import React from "react";
import { connect } from "react-redux";
import { withRouter, Prompt } from "react-router-dom";
import { SideBar } from "./";

class ImportPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepUploading: "ready",
      isRewriteChecked: true,
      importFile: null,
      errorProcessImport: null
    };
    this.toggleRewriteChange = this.toggleRewriteChange.bind(this);
    this.stepReadySubmit = this.stepReadySubmit.bind(this);
    this.handleBrowseFile = this.handleBrowseFile.bind(this);
    this.abortImportFile = this.abortImportFile.bind(this);
    this.uploadInstance = null;
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("ImportPage componentDidUpdate");
    if (prevState.stepUploading !== this.state.stepUploading) {
      if (this.state.stepUploading === "uploading" && !this.uploadInstance) {
        console.log("load fakeUpload");
        this.uploadInstance = this.fakeUpload();
      }
    }
  }
  componentWillUnmount() {
    if (this.uploadInstance) {
      window.M.toast({ html: "Import file aborted!" });
      clearTimeout(this.uploadInstance);
    }
  }

  toggleRewriteChange() {
    this.setState({
      isRewriteChecked: !this.state.isRewriteChecked
    });
  }
  handleBrowseFile(file) {
    console.dir(file.target, file.currentTarget);
    this.setState({
      importFile: file.target.files[0].name
    });
  }
  stepReadySubmit(evt) {
    evt.preventDefault();
    if (!this.state.importFile) {
      return window.M.toast({ html: "Browse file" });
    }
    return this.setState({
      stepUploading: "uploading"
    });
  }
  abortImportFile() {
    this.setState({
      stepUploading: "abort",
      importFile: null
    });
  }

  fakeUpload() {
    return setTimeout(() => {
      console.log("fakeUpload end");
      //Emulation import errors
      if (!this.state.isRewriteChecked) {
        this.setState({
          stepUploading: "error",
          errorProcessImport: {
            result: "error",
            payload: [
              "Big file size",
              "345: Unknown Serial No",
              "346: Unknown Serial No",
              "347: Invalid method code"
            ]
          }
        });
      } else {
        this.setState({
          stepUploading: "completed",
          errorProcessImport: null
        });
      }
      this.uploadInstance = null;
    }, 5000);
  }

  render() {
    const { history } = this.props;
    const linkPath = `/${this.props.match.params[0]}/listing`;
    let showStep;
    switch (this.state.stepUploading) {
      case "ready":
        showStep = (
          <form onSubmit={this.stepReadySubmit}>
            <div className="card-content">
              <span className="card-title grey-text text-darken-4">
                Import file
              </span>
              <div>Drag and Drop to upload file or browse</div>
              <div className="file-field input-field">
                <div className="btn">
                  <span>Browse</span>
                  <input
                    type="file"
                    name="importFile"
                    onChange={this.handleBrowseFile}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
              <label>
                <input
                  type="checkbox"
                  checked={this.state.isRewriteChecked}
                  onChange={this.toggleRewriteChange}
                />
                <span>Rewrite duplicate records</span>
              </label>
              <h6 style={{ color: "#bdbdbd" }}>
                Supported formats are xls / xlsx / vcf / csv (file size limit:
                up to 000000 MB).
              </h6>
            </div>
            <div className="card-action">
              <button className="waves-effect waves-light btn-flat cyan darken-3 white-text">
                Begin Import
              </button>
            </div>
          </form>
        );
        break;
      case "uploading":
        showStep = (
          <React.Fragment>
            <div className="card-content">
              <span className="card-title grey-text text-darken-4">
                Import file..
              </span>
              <div className="progress">
                <div className="indeterminate" />
              </div>
            </div>
            <div className="card-action">
              <button
                className="waves-effect waves-red red-text btn-flat text-accent-2 grey lighten-4"
                onClick={() => history.push(linkPath)}
              >
                Abort
              </button>
            </div>
          </React.Fragment>
        );
        break;
      case "completed":
        showStep = (
          <React.Fragment>
            <div className="card-content">
              <span className="card-title grey-text text-darken-4">
                Import is completed!
              </span>
              <blockquote style={{ borderLeftColor: "#64b5f6" }}>
                <pre>
                  {["5345 - added", "3246 - updated", "0 - skipped"].join("\n")}
                </pre>
              </blockquote>
            </div>
            <div className="card-action">
              <button
                className="waves-effect waves-light btn-flat cyan darken-3 white-text"
                onClick={() => history.push(linkPath)}
              >
                Ок
              </button>
            </div>
          </React.Fragment>
        );
        break;
      case "error":
        showStep = (
          <React.Fragment>
            <div className="card-content">
              <span className="card-title red-text text-darken-2">
                Import file canceled!
              </span>
              <blockquote>
                <pre>{this.state.errorProcessImport.payload.join("\n")}</pre>
              </blockquote>
              <div>Please, correct the File and try again.</div>
            </div>
            <div className="card-action">
              <button
                className="waves-effect waves-light btn-flat cyan darken-3 white-text"
                onClick={() =>
                  this.setState({
                    stepUploading: "ready",
                    errorProcessImport: null,
                    importFile: null
                  })
                }
              >
                Try again
              </button>
            </div>
          </React.Fragment>
        );
        break;
      default:
        break;
    }
    return (
      <React.Fragment>
        <Prompt
          when={
            this.state.importFile && this.state.stepUploading !== "completed"
          }
          message="Are you sure you want to Abort import file?"
        />
        <SideBar />
        <div className="row">
          <div className="col s12 m6 center-block">
            <div className="card">{showStep}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(connect()(ImportPage));
