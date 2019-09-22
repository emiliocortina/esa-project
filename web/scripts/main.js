$(".nav-link").click(function (e) {
    console.log("Holi")
    e.preventDefault();
    var section = $(this).attr("href");
    $("html, body").animate({
        scrollTop: ($(section).offset().top - 80)
    });
});
