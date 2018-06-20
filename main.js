renderMainView();

var popup = "";
var fetchUrl = 'http://www.avisiteapi.tk/playerAPI/api/playlist';
$(".add-playlist-btn").click(event => {
    popup = new SubmittablePopup('popups/add_playlist.html');
});


function init(playlists) {
    $('main').empty()
    playlists.forEach(playlistObj => {
        var playlist = new Playlist(playlistObj);
        playlist.build();
    })
}

function renderMainView() {
    $('main').empty();
    fetch(fetchUrl)
        .then(response => response.json())
        .then(playlists => {
            console.log(playlists.data);
            init(playlists.data)

            $('input[type=search]').keyup(event => {
                init(
                    playlists.data.filter(pl => pl.name.toLowerCase().includes($(event.target).val().toLowerCase()))
                )
            });

        })
}

function addPlaylist(data) {
    console.log(data);
    fetch(fetchUrl, {
            method: "post",
            contentType: 'application/json',
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => console.log(data));
}