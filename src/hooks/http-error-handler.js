import { useState, useEffect } from "react";

const HttpErrorHandler = (axios) => {
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
    // eslint-disable-next-line
  }, [reqInterceptor, resInterceptor]); //to satisfy lint and actually makes sense here

  const errorConfirmHandler = () => {
    setError(null);
  };

  return [error, errorConfirmHandler];
};

export default HttpErrorHandler;
