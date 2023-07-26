import React, {useRef, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import useFetchData from "../useFetchData";
import Card from "./Card";
import Spinner from "./Spinner";
import Navbar from "./Navbar";



function App(){


    const [isIntersecting, setIsIntersecting] = useState(false);
    const [imgURLArray, fetchNewURL] = useFetchData(isIntersecting);
    const cardContainerRef = useRef();


    function interSectionObFun(cardContainer){

        let lastCard = cardContainer.current.querySelector(".card:last-child");

        const ob = new IntersectionObserver(function(entries){

            const element = entries[0];
            const currentElement = element.target;
    
            if (element.isIntersecting){

                ob.disconnect(currentElement);

                setIsIntersecting(true);

                lastCard = cardContainer.current.querySelector(".card:last-child");
                ob.observe(lastCard);

            }
            else {
                return;
            }
            
        });
        ob.observe(lastCard);
    }


    useEffect(function(){

        if (imgURLArray.length != 0){
            interSectionObFun(cardContainerRef);
        } else {
            console.log("length of imgURLArray is zero!")
        }

        setIsIntersecting(fetchNewURL);

    }, [imgURLArray]);

    return (
        <>
            <Navbar />
            <div ref= {cardContainerRef} className="container cards-container">

                {
                    
                    (imgURLArray.length !=0) ?
                    imgURLArray.map(function(eachURLObj, i){
                            return <Card key={i} imgURL= {eachURLObj}/>
                        })
                        :
                    <div className="d-flex justify-content-center align-items-center vh-80-cust"><Spinner /></div>    
                    
                }
            </div>
        </>
    );

}

export default App;






