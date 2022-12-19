//--- Internal functions
function ajaxHelper(uri, method, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Call[" + uri + "] Fail...");
            hideLoading();
        }
    });
}

function showLoading() {
    $("#myModal").modal('show', {
        keyboard: false
    });
}
function hideLoading() {
    $('#myModal').on('shown.bs.modal', function (e) {
        $("#myModal").modal('hide');
    });
}

function sleep(milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds);
}


function removeFav(DriverId) {
    console.log("remove fav")
    $("#fav-" + DriverId).remove();

    let fav = JSON.parse(localStorage.fav || '[]');

    const index = fav.indexOf(DriverId);

    if (index != -1)
        fav.splice(index, 1);

    localStorage.setItem("fav", JSON.stringify(fav));
}


$(document).ready(function () {
    showLoading();

    let fav = JSON.parse(localStorage.fav || '[]');

    console.log(fav);


    for (const i of fav) {
        console.log(i);

        ajaxHelper('http://192.168.160.58/Olympics/api/Athletes/' + i, 'GET').done(function (data) {
            console.log(data)
            if (localStorage.fav.length != 0) {
                console.log('bacalhau');
                $("#table-favourites").show();
                $('#noadd').hide();
                $('#nofav').hide();
                $("#table-favourites").append(
                    `<tr id="fav-${i}">
                        <td class="align-middle">${i}</td>
                        <td class="align-middle">${data.Name}</td>
                        <td class="align-middle">${data.Nationality}</td>
                        <td class="text-end">
                            <a class="btn btn-default btn-outline-danger btn-sm btn-favourite" onclick="removeFav(${i})"><i class="fa fa-heart" title="Selecione para remover dos favoritos"></i></a>
                        </td>
                    </tr>`
                )

            }
        });
        sleep(50);
    }

    hideLoading();
})