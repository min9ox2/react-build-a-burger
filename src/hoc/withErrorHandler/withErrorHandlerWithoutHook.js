import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";

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
    const [error, setError] = useState(null);

    //componentWillMount
    const reqInterceptor = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    });

    const resInterceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        setError(err);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    //}, []);
    }, [reqInterceptor, resInterceptor]); //to satisfy lint and actually makes sense here

    const errorConfirmHandler = () => {
      setError(null);
    };

    return (
      <>
        <Modal show={error} clicked={errorConfirmHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
