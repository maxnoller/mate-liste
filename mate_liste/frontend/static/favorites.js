function editMode(){
    $.ajax({
        url: '/favorites/add_favorite',
        type: 'get',
        success: function (data){
            document.getElementById("favoriteContainer").innerHTML += data;
        } 
    });
}