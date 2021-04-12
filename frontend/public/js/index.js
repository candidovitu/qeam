let gameGenre = {
    id: 0,
    name: ''
}

let correctId = 0;
let alreadySelectedChoice = false;

$(async () => {
    console.log('[QEAM] Carregado!');
    showLoadingScreen();

    await loadGenreList();
    hideLoadingScreen();

    $('.home-select-genre #search-input').on('keyup', event => {
        const searchStr = $(event.target).val().toUpperCase();

        for(let genre of $('.home-select-genre .genre-list .genre')) {
            let genreName = $(genre).data('genrename');
            let element = $(genre);

            if(genreName.toUpperCase().indexOf(searchStr) > -1) {
                element.show();
            } else {
                element.hide();
            }
        }

    });

    $('.home-select-genre .genre-list .genre').on('click', event => {
        const element = $(event.target);

        const genreId = element.data('genreid');
        const genreName = element.data('genrename');

        if(genreId) {
            gameGenre.id = genreId;
            gameGenre.name = genreName;

            console.log('genreId: ' + genreId);
            startMatch();
        }

    });
    
});