import React from "react";

export const DataSourceContext = React.createContext();

export const withContext = WrappedComponent => {
  return class extends React.Component {
    static contextType = DataSourceContext;
    constructor(props, context) {
      super(props);

      console.log("WrappedComponent constructor", props, context);
      context.updateDataSource(props.match.params[0]);
    }
    componentDidMount() {
      console.log("WrappedComponent componentDidMount");
    }
    componentDidUpdate(prevProps) {
      console.log("WrappedComponent componentDidUpdate");
    }
    componentWillUnmount() {
      console.log("WrappedComponent componentWillUnmount");
    }

    render() {
      console.log("WrappedComponent render context", this.context);
      return (
        <WrappedComponent
          {...this.props}
          dataSource={this.context.dataSource}
        />
      );
    }
  };
};
