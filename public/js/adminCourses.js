const courseModal=document.getElementById("courseModal");

document
.getElementById("openCourseModal")
.onclick=()=>{

courseModal.style.display="flex";

};

window.onclick=(e)=>{

if(e.target===courseModal){

courseModal.style.display="none";

}

};