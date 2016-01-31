$(document).ready(function() {

    var babyMenu = $('a.menu-trigger');
    var menu = $('nav ul');
    //MOBILE MENU TOGGLING AND ICON TOGGLING
    babyMenu.on('click', function(e){
    	e.preventDefault();
    	menu.slideToggle('800');
    	$(this).find('i').toggleClass('fa-bars fa-times');
    })

    //COPYRIGHT UPDATE
    var theYear = new Date();
    var update = theYear.getFullYear();
    $('#year').html(update);
});


