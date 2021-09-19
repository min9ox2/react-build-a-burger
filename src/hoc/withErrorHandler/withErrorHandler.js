import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from "../../hooks/http-error-handler"

/*const withErrorHandler = (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Modal show>Something went wrong</Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};*/

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {

    // replaced logic with custom hook
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <>
        <Modal show={error} clicked={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
