// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Olympics/api/Games/FullDetails?id=');
    self.displayName = 'Athlete Full Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.Id = ko.observable('');
    self.CountryName = ko.observable('');
    self.Logo = ko.observable('');
    self.Name = ko.observable('');
    self.Photo = ko.observable('');
    self.Season = ko.observable('');
    self.Year = ko.observable('');
    self.City = ko.observable('');

    self.Athletes = ko.observableArray([]);
    self.AthletesOpen = ko.observable(false);
    self.AthletesToggle = function () {
        self.AthletesOpen(!self.AthletesOpen())
    }
    self.AthletesBig = ko.computed(() => self.Athletes().length > 50);
    self.AthletesEntries = ko.computed(function () {
        if (self.AthletesOpen())
            return self.Athletes()
        else
            return self.Athletes().slice(0, 50);
    });

    self.Competitions = ko.observableArray([]);
    self.CompetitionsOpen = ko.observable(false);
    self.CompetitionsToggle = function () {
        self.CompetitionsOpen(!self.CompetitionsOpen())
    }
    self.CompetitionsBig = ko.computed(() => self.Competitions().length > 50);
    self.CompetitionsEntries = ko.computed(function () {
        if (self.CompetitionsOpen())
            return self.Competitions()
        else
            return self.Competitions().slice(0, 50);
    });

    self.Modalities = ko.observableArray([]);
    self.ModalitiesOpen = ko.observable(false);
    self.ModalitiesToggle = function () {
        self.ModalitiesOpen(!self.ModalitiesOpen())
    }
    self.ModalitiesBig = ko.computed(() => self.Modalities().length > 50);
    self.ModalitiesEntries = ko.computed(function () {
        if (self.ModalitiesOpen())
            return self.Modalities()
        else
            return self.Modalities().slice(0, 50);
    });

    self.Medals = ko.observableArray([]);
    self.Url = ko.observable('');

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getfGame...');
        var composedUri = self.baseUri() + id;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.Id(data.Id);
            self.CountryName(data.CountryName);
            self.Logo(data.Logo);
            self.Name(data.Name);
            self.Photo(data.Photo);
            self.Season(data.Season);
            self.Year(data.Year);
            self.City(data.City);
            self.Athletes(data.Athletes);
            self.Competitions(data.Competitions);
            self.Modalities(data.Modalities);
            self.Medals(data.Medals);
        });
    };

    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });
    }

    function showLoading() {
        $('#myModal').modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //--- start ....
    showLoading();
    var pg = getUrlParameter('id');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("document.ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
});

ko.bindingHandlers.formatSeason = {
    update: function(element, valueAccessor) {
        const value = ko.unwrap(valueAccessor());
        element.textContent = { Summer: "☀️ Summer", Winter: "❄️️ Winter"}[value];
    }
};
