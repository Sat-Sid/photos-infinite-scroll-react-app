import React, { useState, useRef } from "react";
import Spinner from "./Spinner";



function Card(props){

    const [hasImgLoaded, setHasImgLoaded] = useState(false);
    const imgRef = useRef();


    function onImgLoaded(){
        setHasImgLoaded(true);
    }



    return (
        <div className="card rounded-3">
            {
                (!hasImgLoaded) 
                    &&
                        <div className="d-flex justify-content-center align-items-center z-1 position-absolute h-100 w-100 bg-light">
                            <Spinner />
                        </div> 
            }


            <img ref={imgRef} src= {props.imgURL.url} className="card-img object-fit-cover h-100" alt="photos" onLoad={onImgLoaded} loading="lazy"/>  
            <div className="card-img-overlay-cust d-flex justify-content-between">
                <a className="btn" href= {props.imgURL.url} target= "_blank">
                    <i className="bi bi-arrows-fullscreen"></i>
                </a>
                <button type="button" className="btn">
                    <i className="bi bi-heart-fill text-end"></i>
                </button>
                
            </div>

        </div>
    );
}

export default Card;