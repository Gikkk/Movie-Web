const addMovieModel = document.getElementById("add-modal");
const startAddMovieBtn = document.querySelector('header button');
const backDrop = document.getElementById("backdrop");

function backDropfunc(){
    backDrop.classList.toggle("visible");
}

function toggleMovieModal(){
    addMovieModel.classList.toggle("visible");
    backDropfunc();
}





startAddMovieBtn.addEventListener('click', toggleMovieModal);
