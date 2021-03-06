//----------------------------------------------------------------
// >>> TABLE OF CONTENTS:
//----------------------------------------------------------------

// 01. Mobile Menu
// 02. Header Dropdown Menu
// 03. Select List (Dropdown)
// 04. Facts Counter
// 05. Category Filter (MixItUp Plugin)
// 06. Vertical Tabs
// 07. Blog Tags (Tooltip)
// 08. Owl Carousel
// 09. Sidebar Accordion
// 10. Responsive Tabs
// 11. Responsive Table
// 12. Form Fields (Value Disappear on Focus)
// 13. Bootstrap Carousel Swipe (Testimonials Carousel)
// 14. Bx Carousel
// 15. Contact Form Submit/Validation
// 16. Masonry

//----------------------------------------------------------------

$(function () {
    'use strict';

    //Mobile Menu
    //--------------------------------------------------------
    var bodyObj = $('body');
    var MenuObj = $("#menu");
    var mobileMenuObj = $('#mobile-menu');

    bodyObj.wrapInner('<div id="wrap"></div>');

    var toggleMenu = {
        elem: MenuObj,
        mobile: function () {
            //activate mmenu
            mobileMenuObj.mmenu({
                slidingSubmenus: false,
                position: 'right',
                zposition: 'front'
            }, {
                pageSelector: '#wrap'
            });

            //hide desktop top menu
            this.elem.hide();
        },
        desktop: function () {
            //close the menu
            mobileMenuObj.trigger("close.mm");

            //reshow desktop menu
            this.elem.show();
        }
    };

    Harvey.attach('screen and (max-width:991px)', {
        setup: function () {
            //called when the query becomes valid for the first time
        },
        on: function () {
            //called each time the query is activated
            toggleMenu.mobile();
        },
        off: function () {
            //called each time the query is deactivated
        }
    });

    Harvey.attach('screen and (min-width:992px)', {
        setup: function () {
            //called when the query becomes valid for the first time
        },
        on: function () {
            //called each time the query is activated
            toggleMenu.desktop();
        },
        off: function () {
            //called each time the query is deactivated
        }
    });

    //Header Dropdown Menu
    //--------------------------------------------------------
    var megaMenuHasChildren = $('.dropdown');
    var megaMenuDropdownMenu = $('.dropdown-menu');

    megaMenuHasChildren.on({
        mouseenter: function () {
            if (navigator.userAgent.match(/iPad/i) !== null) {
                $(this).find(megaMenuDropdownMenu).stop(true, true).slideDown('400');
            } else {
                $(this).find(megaMenuDropdownMenu).stop(true, true).delay(400).slideDown();
            }
        }, mouseleave: function () {
            if (navigator.userAgent.match(/iPad/i) !== null) {
                $(this).find(megaMenuDropdownMenu).stop(true, true).slideUp('400');
            } else {
                $(this).find(megaMenuDropdownMenu).stop(true, true).delay(400).slideUp();
            }
        }
    });

    //Select List (Dropdown)
    //--------------------------------------------------------
    var selectObj = $('select');
    var selectListObj = $('ul.select-list');
    selectObj.each(function () {
        var $this = $(this), numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-list'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.on('click', function (e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function () {
                $(this).removeClass('active').next(selectListObj).hide();
            });
            $(this).toggleClass('active').next(selectListObj).toggle();
        });

        $listItems.on('click', function (e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
        });

        $(document).on('click', function () {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });

    //Facts Counter
    //--------------------------------------------------------
    var counterObj = $('.fact-counter');
    counterObj.counterUp({
        delay: 10,
        time: 500
    });

    //Category Filter (MixItUp Plugin)
    //--------------------------------------------------------
    var folioFilterObj = $('#category-filter');
    folioFilterObj.mixItUp();

    //Vertical Tabs
    //--------------------------------------------------------
    var tabObject = $(".tabs-menu li");
    var tabContent = $(".tabs-list .tab-content");
    tabObject.on('click', function (e) {
        e.preventDefault();
        $(this).siblings('li.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        tabContent.removeClass("active");
        tabContent.eq(index).addClass("active");
    });

    //Blog Tags (Tooltip)
    //--------------------------------------------------------
    var tagObj = $('[data-toggle="blog-tags"]');
    tagObj.tooltip();

    //Owl Carousel
    //--------------------------------------------------------
    var owlObj = $('.owl-carousel');
    owlObj.owlCarousel({
        loop: false,
        margin: 30,
        nav: false,
        dots: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 2
            }
        }
    });

    var owlEventObj = $('.owl-carousel-event');
    owlEventObj.owlCarousel({
        loop: false,
        margin: 30,
        nav: false,
        dots: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });

    //Sidebar Accordion
    //--------------------------------------------------------
    var secondaryObj = $('#secondary [data-accordion]');
    var multipleObj = $('#multiple [data-accordion]');
    var singleObj = $('#single[data-accordion]');

    secondaryObj.accordion({
        singleOpen: true
    });

    multipleObj.accordion({
        singleOpen: false
    });

    singleObj.accordion({
        transitionEasing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
        transitionSpeed: 200
    });

    //Responsive Tabs
    //--------------------------------------------------------
    var restabObj = $('#responsiveTabs');
    restabObj.responsiveTabs({
        startCollapsed: 'accordion'
    });

    //Responsive Tables
    //--------------------------------------------------------
    var tableObj = $('.table');
    var shoptableObj = $('.shop_table');
    tableObj.basictable({
        breakpoint: 991
    });

    shoptableObj.basictable({
        breakpoint: 991
    });

    //Form Fields (Value Disappear on Focus)
    //--------------------------------------------------------
    var requiredFieldObj = $('.input-required');

    requiredFieldObj.find('input').on('focus',function(){
        if(!$(this).parent(requiredFieldObj).find('label').hasClass('hide')){
            $(this).parent(requiredFieldObj).find('label').addClass('hide');
        }
    });
    requiredFieldObj.find('input').on('blur',function(){
        if($(this).val() === '' && $(this).parent(requiredFieldObj).find('label').hasClass('hide')){
            $(this).parent(requiredFieldObj).find('label').removeClass('hide');
        }
    });

    //Bootstrap Carousel Swipe (Testimonials Carousel)
    //--------------------------------------------------------
    var testimonialsObj = $("#testimonials");
    testimonialsObj.swiperight(function () {
        $(this).carousel('prev');
    });
    testimonialsObj.swipeleft(function () {
        $(this).carousel('next');
    });

    //Bx Carousel
    //--------------------------------------------------------

    //Popular Items Detail V1

    var popularSlidesD1 = 2;
    var popularWidthD1 = 370;
    var popularMarginD1 = 54;

    if($(window).width() <= 1199) {
        popularSlidesD1 = 2;
        popularWidthD1 = 330;
        popularMarginD1 = 37;
    }
    if($(window).width() <= 991) {
        popularSlidesD1 = 2;
        popularWidthD1 = 350;
        popularMarginD1 = 20;
    }
    if($(window).width() <= 767) {
        popularSlidesD1 = 1;
        popularWidthD1 = 320;
        popularMarginD1 = 0;
    }

    var popularItemObjD1 = $('.popular-items-detail-v1');
    popularItemObjD1.bxSlider({
        minSlides: 1,
        maxSlides: popularSlidesD1,
        slideWidth: popularWidthD1,
        slideMargin: popularMarginD1,
        responsive: true,
        touchEnabled: true,
        controls: false,
        infiniteLoop: true,
        shrinkItems: true
    });

    //Popular Items Detail V2

    var popularSlidesD2 = 3;
    var popularWidthD2 = 360;
    var popularMarginD2 = 30;

    if($(window).width() <= 1199) {
        popularSlidesD2 = 3;
        popularWidthD2 = 300;
        popularMarginD2 = 20;
    }
    if($(window).width() <= 991) {
        popularSlidesD2 = 2;
        popularWidthD2 = 350;
        popularMarginD2 = 20;
    }
    if($(window).width() <= 767) {
        popularSlidesD2 = 1;
        popularWidthD2 = 320;
        popularMarginD2 = 0;
    }

    var popularItemObjD2 = $('.popular-items-detail-v2');
    popularItemObjD2.bxSlider({
        minSlides: 1,
        maxSlides: popularSlidesD2,
        slideWidth: popularWidthD2,
        slideMargin: popularMarginD2,
        responsive: true,
        touchEnabled: true,
        controls: false,
        infiniteLoop: true,
        shrinkItems: true
    });

    //Contact Form Submit/Validation
    //--------------------------------------------------------
    var emailerrorvalidation = 0;
    var formObj = $('#contact');
    var contactFormObj = $('#submit-contact-form');
    var fullname = $("#fullname");
    var emailFieldObj = $("#email");
    var prodi = $("#prodi");
    var fakultas = $("#fakultas");
    var nomorinduk = $("#nomorinduk");
    var phoneFieldObj = $("#phone");
    var messageFieldObj = $("#message");

    contactFormObj.on('click', function () {
        var emailaddress = emailFieldObj.val();
        function validateEmail(emailaddress) {
            var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
            if (filter.test(emailaddress)) {
                return true;
            } else {
                return false;
            }
        }

        var data = {
            fullname: fullname.val(),
            email: emailFieldObj.val(),
            prodi : prodi.val(),
            fakultas : fakultas.val(),
            nomorinduk : nomorinduk.val(),
            phone: phoneFieldObj.val(),
            message: messageFieldObj.val()
        };
        if (data.fullname === '' ||  data.email === '' || data.prodi === '' || data.fakultas === '' || data.nomorinduk === '' ||data.phone === '' || data.message === '') {
            swal({
                title : "error",
                icon: "error",
                text : "All field must be filled in",
                button: "Okay",
            });
            return false;
        } else {
            if (validateEmail(emailaddress)) {
                if (emailerrorvalidation === 1) {
                    alert('Nice! your Email is valid, you can proceed now.');
                }
                emailerrorvalidation = 0;
            } else {
                emailerrorvalidation = 1;
                alert('Oops! Invalid Email Address');
            }
        }
        return true;
    });

    // Book Form Validation
    //--------------------------------------------------------
    var bookFormObj = $('#submit-book-form');
    var isbn = $('#isbn');
    var judul = $('#judul');
    var pengarang = $('#pengarang');
    var penerbit = $('#penerbit');
    var bahasa = $('#bahasa');
    var tahun = $('#tahun');
    var lokasi = $('#lokasi');
    var deskripsi = $('#deskripsi');

    bookFormObj.on('click', function () {
        var data = {
            isbn: isbn.val(),
            judul: judul.val(),
            pengarang : pengarang.val(),
            penerbit : penerbit.val(),
            bahasa : bahasa.val(),
            tahun: tahun.val(),
            lokasi: lokasi.val(),
            deskripsi: deskripsi.val()
        };
        if (data.isbn === '' ||  data.judul === '' || data.pengarang === '' || data.penerbit === '' || data.bahasa === '' || data.tahun === '' ||data.lokasi === '' || data.deskripsi === '') {
            swal({
                title : "Warning",
                icon: "warning",
                text : "Data form selain gambar wajib diisi",
                button: "Okay",
            });
            return false;
        } 

        return true;
    });

    var articleFormObj = $('#submit-article-form');
    var judul = $('#judul');
    var kategory = $('#category');
    var text = $('#text');


    articleFormObj.on('click', function () {
        var data = {
            judul: judul.val(),
            kategory : kategory.val(),
            text : text.val(),
        };
        if (data.judul === '' ||  data.kategory === '' || data.text === '') {
            swal({
                title : "Warning",
                icon: "warning",
                text : "Data form selain gambar wajib diisi",
                button: "Okay",
            });
            return false;
        } 
        if(data.text.length < 50) {
            swal({
                title : "Warning",
                icon: "warning",
                text : "Data konten minimal 50 karakter",
                button: "Okay",
            });
            return false;
        }

        return true;
    });

    var cd_dvdObject = $('#cd_dvd-book-form');
    var id_master = $('#id_master');
    var judul = $('#judul');
    var sumber = $('#sumber');
    var prodiPemilik = $('#prodiPemilik');
    var keterangan = $('#keterangan');

    cd_dvdObject.on('click', function () {
        var data = {
            id_master : id_master.val(),
            judul: judul.val(),
            sumber : sumber.val(),
            prodiPemilik : prodiPemilik.val(),
            keterangan : keterangan.val()
        };
        if (data.id_master === '' ||  data.judul === '' || data.sumber === '' || data.prodiPemilik === '' || data.keterangan === '') {
            swal({
                title : "Warning",
                icon: "warning",
                text : "Data form wajib diisi",
                button: "Okay",
            });
            return false;
        } 
        if(data.keterangan.length < 50) {
            swal({
                title : "Warning",
                icon: "warning",
                text : "Keterangan minimal 50 karakter",
                button: "Okay",
            });
            return false;
        }

        return true;
    });

    var localcontentform = $('#local-content-form');
    var subject = $('#subject');
    var jenis = $('#jenis');
    var penulis = $('#penulis');
    var pembimbing = $('#pembimbing');
    var tahun = $('#tahun');
    var tingkat = $('#tingkat');

    localcontentform.on('click', function () {
        var data = {
            subject : subject.val(),
            jenis: jenis.val(),
            penulis : penulis.val(),
            pembimbing : pembimbing.val(),
            tahun : tahun.val(),
            tingkat : tingkat.val()
        };
        if (data.subject === '' ||  data.jenis === '' || data.penulis === '' || data.pembimbing === '' || data.tahun === '' || data.tingkat === '') {
            swal({
                title : "Warning",
                icon: "warning",
                text : "Data form wajib diisi",
                button: "Okay",
            });
            return false;
        } 
        if(data.tahun > 2020) {
            swal({
                title : "Warning",
                icon: "warning",
                text : "Tahun maksimal 2020",
                button: "Okay",
            });
            return false;
        }

        return true;
    });

    var pengumumanform = $('#pengumuman-form');
    var judul = $('#judul');
    var author = $('#author');
    var konten = $('#konten');

    pengumumanform.on('click', function () {
        var data = {
            judul : judul.val(),
            author: author.val(),
            konten : konten.val(),
        };
        if (data.judul === '' ||  data.author === '' || data.konten === '') {
            swal({
                title : "Warning",
                icon: "warning",
                text : "Data form wajib diisi",
                button: "Okay",
            });
            return false;
        } 
        if(data.konten.length < 50 ) {
            swal({
                title : "Warning",
                icon: "warning",
                text : "Data konten minimal 50 karakter",
                button: "Okay",
            });
            return false;
        }

        return true;
    });

    

});

$( window ).load(function() {
    //Masonry
    //--------------------------------------------------------
    var girdFieldObj = $('.grid');
    girdFieldObj.masonry({
        itemSelector: '.grid-item',
        percentPosition: true
    });
});