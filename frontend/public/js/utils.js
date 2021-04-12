const randomId = obj => {
    const keys = Object.keys(obj);
    return keys[ keys.length * Math.random() << 0];
}

async function loadGenreList() {

    const { data } = await fetch('/genreList').then(response => response.json());
    const container = $('.home-select-genre .genre-list');

    for (let genre of data) {
        if(genre.id > 0)
        container.append(`
            <div class="genre" data-genreid="${genre.id}" data-genrename="${genre.name}">
                <img src="${genre.picture_big}" alt="${genre.name}" class="cover">
                <span class="title">${genre.name}</span>
            </div>
        `);
    }

}

let errorTries = 0;

async function startMatch() {
    try {
        $('.home-select-genre').hide();
        $('.game').show();
    
        showLoadingScreen();
    
        const match = await fetch(`/game/getMatch/${gameGenre.id}`).then(response => response.json());
        const genre = await fetch(`/game/getGenre/${gameGenre.id}`).then(response => response.json());
    
        let tracks = match.tracks;
        correctId = match.correctTrackId;
    
        try {
            for(let i = 0; i < 3; i++) {
                let trackId = randomId(tracks);
                let track = tracks[trackId];
        
                if(!track) return nextMatch();
        
                $('.game .choices').append(`
                    <div class="choice" onclick="selectChoice(${track.id})"><b>${track.artist}</b> ${track.name}</div>
                `);
        
                delete tracks[trackId];
            }
        } catch (err) {
    
            if(errorTries <= 3) {
                errorTries++;
                console.error('Erro ao escolher alternativa. Pulando..', err);
                nextMatch();
            } else {
                alert('Ocorreu um erro ao carregar a partida.. :(\n' + errorTries + ' tentativas falhas');
                location.reload();
            }
    
        }
    
        $('.game .game-header .category').text(genre.name);
        $('.game .game-header .cover-image img').attr('src', genre.picture_big);
        $('.next-btn').hide();
        
        hideLoadingScreen();
        
        $('#audio-player').attr('src', match.correctTrackPreview);
        $('#audio-player')[0].play();
    } catch (err) {
        if(errorTries <= 3) {
            errorTries++;
            console.error('Erro ao escolher alternativa. Pulando..', err);
            nextMatch();
        } else {
            alert('Ocorreu um erro ao carregar a partida.. :(\n' + errorTries + ' tentativas falhas');
            location.reload();
        }
    }
}

function selectChoice(id) {
    if(alreadySelectedChoice) return;

    alreadySelectedChoice = true;
    $('.next-btn').show();
    $('#audio-player')[0].pause();

    $('.deezer-player').append(`
        <iframe id="playeriframe" scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=true&color=EF5466&layout=dark&size=medium&type=tracks&id=${correctId}&app_id=1" height="90" width="500"></iframe>
    `)

    if(id === correctId) {
        console.log('Acertou!');
        $('body').css('background', '#53ff3f');
    } else {
        console.log('Errou!');
        $('body').css('background', '#f95454');
    }

    setTimeout(() => {
        $('body').css('background', '#121216');
    }, 2000);
}

function nextMatch() {
    startMatch();
    alreadySelectedChoice = false;
    for(let btn of $('.game .choices .choice')) {
        $(btn).remove();
    };
    $('#playeriframe').remove();
}

function showLoadingScreen() {
    $('.loading-screen').css('display', 'flex');
}

function hideLoadingScreen() {
    $('.loading-screen').css('display', 'none');
}