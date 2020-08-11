const addMovieModel = document.getElementById("add-modal");
const startAddMovieBtn = document.querySelector('header button');
const backDrop = document.getElementById("backdrop");
const cancelAddMovieBtn = addMovieModel.querySelector(".btn--passive")
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModel.querySelectorAll("input")
const entryTextSection = document.getElementById('entry-text')
const  deleteMovieModal = document.getElementById('delete-modal')


const movies = [];


function updateUI(){
    if(movies.length === 0){
        entryTextSection.style.display = "block";
    }else{
        entryTextSection.style.display = "none";
    }
}

function deleteMovieHandler (movieId){
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
    cancelMovieDeletion();
}

function cancelMovieDeletion (){
    backDropfunc();
    deleteMovieModal.classList.remove('visible')
}

function startDeleteMovieHandler(movieId){
    deleteMovieModal.classList.add('visible');
    backDropfunc();
    const cancelBtn = deleteMovieModal.querySelector('.btn--passive')
    let confirmBtn = deleteMovieModal.querySelector('.btn--danger')
   
    confirmBtn.replaceWith(confirmBtn.cloneNode(true));
    confirmBtn = deleteMovieModal.querySelector('.btn--danger')

    cancelBtn.removeEventListener('click', cancelMovieDeletion)
    cancelBtn.addEventListener("click", cancelMovieDeletion)
    confirmBtn.addEventListener('click', deleteMovieHandler.bind(null, movieId))
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
    newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById("movie-list")
    listRoot.append(newMovieElement);    
}

function backDropfunc(){
    backDrop.classList.toggle("visible");
}

function closeMovieModal (){
    addMovieModel.classList.remove('visible')
}

function showMovieModal(){
    addMovieModel.classList.add("visible");
    backDropfunc();
}

function clearMovieInput(){
    for (const usrInput of userInputs){
        usrInput.value = '';
    }
}

function cancelAddMovieHandler(){
    closeMovieModal();
    backDropfunc();
    clearMovieInput();
}

function backDropClickHandler(){
    closeMovieModal();
    cancelMovieDeletion();
    clearMovieInput();
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
        closeMovieModal();
        backDropfunc();
        clearMovieInput();
        renderNewMovieElement(newMovie.id, newMovie.title, newMovie.imageUrl, newMovie.rating);
        updateUI();
}

startAddMovieBtn.addEventListener('click', showMovieModal);
backDrop.addEventListener('click', backDropClickHandler);
cancelAddMovieBtn.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener("click", addMovieHandler)