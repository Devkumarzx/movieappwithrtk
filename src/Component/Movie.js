import React, { useEffect, useState } from "react";
import { MovieItem } from "./MovieItem";
import { Spinner } from "./Spinner";
import { useLazyGetMoviesQuery } from "../Redux/MovieSlice";

export const Movie = ({ query, title, surl, cname }) => {
  const [page, setpage] = useState(1);

  const [getData, movieRes] = useLazyGetMoviesQuery();

  useEffect(() => {
    getData({ query, surl, cname, page });
  }, [query]);

  useEffect(() => {
    if (movieRes.isError) {
      alert(JSON.stringify(movieRes?.error));
    }
  }, [movieRes]);

  useEffect(() => {
    getData({ query, surl, cname, page });
  }, [page]);

  const handleprev = () => {
    setpage(page - 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlenext = () => {
    setpage(page + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
   
  };
  return (
    <>
      <div className="container ">
        <h1 className="text-center my-3">{title} Movies</h1>
        {movieRes?.data?.results.length === 0 || movieRes?.data === undefined? <div className='col-lg-12 my-3 d-flex justify-content-center'> <h2 className='text-muted'>No Data Found</h2></div> :null}
        {movieRes?.isFetching ? (
          <Spinner />
        ) : (
          <div className="row">
            {movieRes?.data?.results?.map((item, index) => (
              <div
                key={index}
                className="col-lg-4 col-md-6 my-3 d-flex justify-content-center"
              >
                <MovieItem
                  id={item.id}
                  title={item.original_title}
                  rating={`Rating: ${item.vote_average}`}
                  imgurl={item.poster_path}
                  height={"25rem"}
                  width={"22rem"}
                />
              </div>
            ))}

            <div className="container  d-flex justify-content-between my-3">
              <button
                disabled={page === 1}
                onClick={handleprev}
                className="btn btn-primary"
              >
                Previous
              </button>
              <h4>
                Page no: {page}/{movieRes?.data?.total_pages || 1}
              </h4>
              <button
                disabled={page >= movieRes?.data?.total_pages}
                onClick={handlenext}
                className="btn btn-primary"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
