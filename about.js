const prevBtn= document.querySelector("#prev-btn")
const nextBtn= document.querySelector("#next-btn")
const book= document.querySelector("#book")


const papper1= document.querySelector("#p1")
const papper2= document.querySelector("#p2")
const papper3= document.querySelector("#p3")

//event listeners:
prevBtn.addEventListener("click", goPrevPage) 
nextBtn.addEventListener("click", goNextPage) 


//business logic:
let currentLocation=1;
let numOfPages=3;
let maxLocation= numOfPages +1;


function openBook(){
    book.style.transform= "translateX(50%)";
    prevBtn.style.transform= "translateX(-180px)";
    nextBtn.style.transform= "translateX(180px)";
}


function closeBook(isAtBeginning){
    if(isAtBeginning){
        book.style.transform= "translateX(0%)";
        } else {      
        book.style.transform= "translateX(100%)";
    }
    
    prevBtn.style.transform= "translateX(0px)";
    nextBtn.style.transform= "translateX(0px)";

}




function goNextPage(){
    if(currentLocation < maxLocation){
        switch(currentLocation){
            case 1:
                openBook();
                papper1.classList.add("flipped");
                papper1.style.zIndex=1;
                break;

            case 2:
                papper2.classList.add("flipped");
                papper2.style.zIndex=2;
                break;

            case 3:
                papper3.classList.add("flipped");
                papper3.style.zIndex=3;
                closeBook();
                break;
            default:
                throw new Error("unknown state")
        }
        currentLocation++;
    } else if(currentLocation === numOfPages){
        closeBook(false);	
    }    

}


function goPrevPage(){
    if( currentLocation > 1){
        switch(currentLocation){

            case 2:
                closeBook();
                papper1.classList.remove("flipped");
                papper1.style.zIndex=3;
                break;

            case 3:
                papper2.classList.remove("flipped");
                papper2.style.zIndex=2;
                break;

            case 4:
                openBook();
                papper3.classList.remove("flipped");
                papper3.style.zIndex=1;
                break;

            default:
                throw new Error("unknown state");
        }
    }
    currentLocation--;

}


