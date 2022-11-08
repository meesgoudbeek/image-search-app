import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useFetch from "./services/useFetch";
import LightBox from "./components/Lightbox";
import Loader from "./components/Loader";

const getUrl = (img) => {
  const clientId =
    "0d54d7bf8f81c9ee80a75d9e1263fbb6b8267fad9d908e597b9f7c4f6bcdee23";
  const defaultUrl = `https://api.unsplash.com/search/photos?page=1&query=chefs&client_id=${clientId}&per_page=20`;
  const searchUrl = `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${clientId}&per_page=20`;
  return img === "" ? defaultUrl : searchUrl;
};

function App() {
  const [img, setImg] = useState("");
  const { response, loading, error } = useFetch(getUrl(img));

  const handleSearchChange = (e) => {
    e.preventDefault();
    setImg(e.target.value);
  };

  return (
    <div className="container-fluid">
      {loading && <Loader />}
      {error && <p>Something went wrong...</p>}
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center input">
          <input
            className="col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 border-dark"
            type="text"
            placeholder="Search Anything..."
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {response && (
        <div className="row">
          <div className="col-12 d-flex justify-content-evenly flex-wrap">
            {response.results.map((val) => {
              return (
                <LightBox key={val.id} src={val.urls.regular}>
                  <LazyLoadImage
                    src={val.urls.regular}
                    className="w-100 h-100 img-thumbnail"
                    alt="val.alt_description"
                  />
                </LightBox>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
