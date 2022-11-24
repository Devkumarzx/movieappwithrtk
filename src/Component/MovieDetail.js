import React, { useEffect } from "react";
import { MovieItem } from "./MovieItem";
import { useParams } from "react-router-dom";
import { Spinner } from "./Spinner";
import { useGetCastQuery, useGetMovieDetailQuery } from "../Redux/MovieSlice";

export const MovieDetail = () => {
  const { REACT_APP_IMGBASEURL } = process.env;

  const { id } = useParams();

  const movieRes = useGetMovieDetailQuery(id);
  const movieCast = useGetCastQuery(id);

  useEffect(() => {
    if (movieRes?.isError) {
      alert(JSON.stringify(movieRes?.error));
    }
    if (movieCast?.isError) {
      alert(JSON.stringify(movieCast?.error));
    }
  }, [movieRes, movieCast]);
  return (
    <>
      {movieRes?.isFetching ? (
        <Spinner />
      ) : (
        <div>
          <div className="container mt-3  ">
            <div className="row shadow-lg rounded-lg">
              <div className="col-lg-6 my-2">
                <div className=" h-50 d-flex ">
                  <div className="w-25">
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={`${REACT_APP_IMGBASEURL}${movieRes?.data?.poster_path}`}
                      alt="..."
                    />
                  </div>
                  <div className="w-75" style={{ paddingLeft: "10px" }}>
                    <h3>{movieRes?.data?.original_title}</h3>
                    <h5>{`Rating: ${movieRes?.data?.vote_average}`}</h5>
                    <div className="d-flex ">
                      <p>{`${movieRes?.data?.runtime} min `}</p>
                      {movieRes?.data?.genres?.map((item, index) => (
                        <p key={index} style={{ marginLeft: "10px" }}>
                          {item.name}
                        </p>
                      ))}
                    </div>
                    <p>Release date: {movieRes?.data?.release_date}</p>
                  </div>
                </div>
                <div className=" h-50 " style={{ overflow: "auto" }}>
                  <h4>overview</h4>
                  <p>{movieRes?.data?.overview}</p>
                </div>
              </div>
              <div className="col-lg-6 d-flex justify-content-end ">
                <img
                  src={`${REACT_APP_IMGBASEURL}${movieRes?.data?.backdrop_path}`}
                  className=" w-100"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div
            className="container-fluid d-flex"
            style={{ overflowX: "auto", margin: "0 auto" }}
          >
            {movieCast?.data?.cast?.map((item, index) => (
              <MovieItem
                key={index}
                id={item.cast_id}
                title={item.character}
                imgurl={item.profile_path}
                height={"15rem"}
                width={"15rem"}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
