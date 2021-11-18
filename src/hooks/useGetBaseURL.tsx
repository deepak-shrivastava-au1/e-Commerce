import React, { useEffect, useState } from "react";

function useGetBaseURL() {
  const [baseURL, setBaseURL] = useState<object | undefined>(undefined);

  useEffect(() => {
    fetch("./config/config.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (configData) {   
        setBaseURL(configData);
      })
      .catch(function (err) {
        console.log(err, " error");
      });
  }, []);

  return baseURL;
}

export default useGetBaseURL;
