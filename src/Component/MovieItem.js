import React from 'react'
import { Link } from 'react-router-dom';

export const MovieItem = (props) => {
    const { id,title, rating, imgurl,height,width } = props;

    const {REACT_APP_IMGBASEURL}=process.env;
    return (
        <>

            <Link to={`/singlemovie/${id}`} style={{ textDecoration: 'None',color:'black' }}>
                <div className="card " style={{ width: width , marginLeft:"5px"  }}>
                    <img src={`${REACT_APP_IMGBASEURL}${imgurl}`} style={{height:height}} className="card-img-top" alt="..." />
                    <div className="card-body text-center" >
                        <h5 className="card-title">{title}</h5>
                        <h5 className="card-text"> {rating}</h5>

                    </div>
                </div>
            </Link>

        </>
    )
}
