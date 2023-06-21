import React from "react";
import { NextPageContext } from "next";

interface ErrorProps {
  statusCode: number | null;
}

class ErrorPage extends React.Component<ErrorProps> {
  static getInitialProps({ res, err }: NextPageContext) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
  }

  render() {
    return (
      <p>
        {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
    );
  }
}

export default ErrorPage;
