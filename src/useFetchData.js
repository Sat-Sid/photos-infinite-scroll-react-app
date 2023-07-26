import React, {useState, useEffect} from "react";


let loremPicsumListAPI;
const randomFoxImgAPI = "https://randomfox.ca/floof/?ref=apilist.fun";
const randomCoffeeImgAPI = "https://coffee.alexflipnote.dev/random.json";   //CORS
const randomDogImgAPI = "https://random.dog/woof.json";
//const randomBigCatImgAPI = "https://randombig.cat/roar.json";
const randomQuokkaImgAPI = "https://quokka.pics/api/";
const loremFlickrImgAPI = "https://loremflickr.com/json/400/600/animals";   //CORS

const  apisArray = [randomDogImgAPI, loremPicsumListAPI, randomFoxImgAPI, randomQuokkaImgAPI];


//Generate Random number function
function randNumGenerator(min, maxButExclude){
    return Math.floor(Math.random() * (maxButExclude - min) + min);
}


//Validate URL function
function checkUrlValid(urlToCheck){
    const fileExtension = urlToCheck.slice(urlToCheck.length - 4, urlToCheck.length).toLowerCase();

    if (fileExtension === ".jpg" || fileExtension === ".png"){
        return true;
    } else {
        return false;
    }
}


//Get required url from json Data function
function sortRequiredUrls(isValidCallBack, rawData, ranNum){
    let sortedUrls = [];
    if(ranNum == 1){
        //it an array of obj
        rawData.forEach(function(eachObj, i){
            let requiredUrl = {
                url: eachObj.download_url
            };
            sortedUrls[i] = requiredUrl;
        });

    } else if (rawData.url || rawData.image) {
        let requiredUrl = {url: ""};

        for (const key in rawData) {
            if (key === "url" || key === "image"){
                requiredUrl.url = rawData[key];
            } 
        }
        if (isValidCallBack(requiredUrl.url)){
            sortedUrls =[requiredUrl];
        } else {
            console.log("Invalid url");
            console.log(requiredUrl.url);
        }
    }
    return sortedUrls;
}


//Select random API function
function selectRandomApiFun(ranNumCallBack, currentPageNum){

    const ranNum = ranNumCallBack(0, apisArray.length);
    let newPageNum = currentPageNum;
    let apiUrl;

    if (ranNum != 1){
        apiUrl = apisArray[ranNum];
    } else {
        
        newPageNum = currentPageNum + 1;
        if (newPageNum <= 100){
            apiUrl = `https://picsum.photos/v2/list?page=${newPageNum}&limit=10`;

        } else {
            console.log(`loremPicsum page num more than 100. Current page num ${newPageNum}`);
        }
    }

    return [apiUrl, newPageNum, ranNum];
}




//Custom hook
function useFetchData(isIntersect){

    const [crtPgNum, setcrtPgNum] = useState(0);
    const [imageURL, setImageURL] = useState([]);
    const [fetchNewURL, setFetchNewURL] = useState(true);
    const [url, pageNum, ranNumber] = selectRandomApiFun(randNumGenerator, crtPgNum);



    useEffect(function(){

        async function fetchDatafromAPI(){
            
            try {

                const res = await fetch(url);
                const data = await res.json();

                const requiredUrlArray = sortRequiredUrls(checkUrlValid, data, ranNumber);

                if (requiredUrlArray.length != 0){
                    setImageURL(function(preVal){
                        return [...preVal, ...requiredUrlArray]
                    });
                } else {
                    console.log("Error! length of array is 0. Fetch data again.");
                    await fetchDatafromAPI();
                }

                if (crtPgNum != pageNum){
                    setcrtPgNum(function(){
                        return pageNum;
                    });
                }
                
            }
            catch(error){
                console.log(`OOp's there was error fetching data from API: ${error}`);
                console.log("Check your internet connection!")
            }
        }

        if(isIntersect){
            fetchDatafromAPI();

            setFetchNewURL(false);
        }


    }, [isIntersect]);

    return [imageURL, fetchNewURL];
}

export default useFetchData;