const addMovieModel = document.getElementById("add-modal");
const startAddMovieBtn = document.querySelector('header button');
const backDrop = document.getElementById("backdrop");
const cancelAddMovieBtn = addMovieModel.querySelector(".btn--passive")
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModel.querySelectorAll("input")
const entryTextSection = document.getElementById('entry-text')

const movies = [];


function updateUI(){
    if(movies.length === 0){
        entryTextSection.style.display = "block";
    }else{
        entryTextSection.style.display = "none";
    }
}

function deleteMovie (movieId){
    let movieIndex = 0;
    for (const movie of movies) {
      if (movie.id === movieId) {
        break;
      }
      movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
}

function deleteMovieHandler(movieId){
    const  deleteMovieModal = document.getElementById('delete-modal')
    deleteMovieModal.classList.add('visible');
    backDropfunc();
  };

function renderNewMovieElement(id ,title, imageUrl, rating){
    const newMovieElement =  document.createElement("li")
    newMovieElement.className = "movie-element";
    newMovieElement.innerHTML = `
        <div class= "movie-element__image">
            <img src = "${imageUrl}" alt= "${title}">
        </div>
        <div class= "movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/ 5 Stars</P>
        </div>
    `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById("movie-list")
    listRoot.append(newMovieElement);    
}

function backDropfunc(){
    backDrop.classList.toggle("visible");
}

function toggleMovieModal(){
    addMovieModel.classList.toggle("visible");
    backDropfunc();
}

function clearMovieInput(){
    for (const usrInput of userInputs){
        usrInput.value = '';
    }
}

function cancelAddMovieHandler(){
    toggleMovieModal();
    clearMovieInput();
}

function backDropClickHandler(){
    toggleMovieModal();
}

function addMovieHandler(){
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if(
        titleValue.trim() === '' ||
        imageUrlValue.trim() === ''||
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
        ){
            alert("Please enter valid values(Between 1 to 5)");
            return;
        }
        const newMovie = {
            id: Math.random().toString(),
            title: titleValue,
            imageUrl: imageUrlValue,
            rating: ratingValue
        }
        movies.push(newMovie);
        console.log(movies);
        toggleMovieModal();
        clearMovieInput();
        renderNewMovieElement(newMovie.id, newMovie.title, newMovie.imageUrl, newMovie.rating);
        updateUI();
}

startAddMovieBtn.addEventListener('click', toggleMovieModal);
backDrop.addEventListener('click', backDropClickHandler);
cancelAddMovieBtn.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener("click", addMovieHandler)