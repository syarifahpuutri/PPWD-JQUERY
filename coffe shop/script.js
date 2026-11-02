$(function () {

    // =====================================================
    // 1. DROPDOWN NAVBAR
    // Event  : mouseenter, mouseleave
    // Effect : slideDown, slideUp
    // =====================================================

    $('.dropdown')
        .on('mouseenter', function () {

            $(this)
                .find('.dropdown-menu')
                .stop(true, true)
                .slideDown(200);

        })
        .on('mouseleave', function () {

            $(this)
                .find('.dropdown-menu')
                .stop(true, true)
                .slideUp(200);

        });


    // =====================================================
    // 2. TAB MENU
    // Event  : click
    // Effect : fadeIn
    // =====================================================

    $('.tab-panel')
        .hide()
        .first()
        .show();


    $('.tab').on('click', function () {

        const target = $(this).data('target');


        // Mengubah tab aktif

        $('.tab').removeClass('active');

        $(this).addClass('active');


        // Menyembunyikan semua panel

        $('.tab-panel').hide();


        // Menampilkan panel yang dipilih
        // menggunakan efek fadeIn

        $(target).fadeIn(400);


        // Smooth scroll ke panel yang dipilih

        $('html, body').animate({
            scrollTop: $(target).offset().top - 120
        }, 500);

    });


    // =====================================================
    // 3. ANIMATE MENU CARD
    // Event  : mouseenter, mouseleave
    // Effect : animate
    // =====================================================

    $('.menu-card')
        .css('position', 'relative')

        .on('mouseenter', function () {

            $(this)
                .stop()
                .animate({
                    top: '-7px'
                }, 180);

        })

        .on('mouseleave', function () {

            $(this)
                .stop()
                .animate({
                    top: '0px'
                }, 180);

        });


    // =====================================================
    // 4. FORM PESANAN
    // Event : focus, blur, submit
    // =====================================================

    $('#formPesan .field')

        .on('focus', function () {

            $(this)
                .addClass('is-focus')
                .removeClass('is-error');

        })

        .on('blur', function () {

            $(this)
                .removeClass('is-focus');

        });


    // =====================================================
    // 5. TOAST
    // =====================================================

    function tampilkanToast(pesan, tipe) {

        $('#toast')
            .stop(true, true)
            .removeClass('success error')
            .addClass(tipe)
            .text(pesan)
            .fadeIn(250)
            .delay(2500)
            .fadeOut(400);

    }


    // =====================================================
    // 6. VALIDASI FORM PESANAN
    // =====================================================

    $('#formPesan').on('submit', function (e) {

        e.preventDefault();


        const nama = $('#nama').val().trim();

        const email = $('#email').val().trim();

        const hp = $('#hp').val().trim();

        const menu = $('#pilihMenu').val();

        const jumlah = $('#jumlah').val();

        const tanggal = $('#tanggal').val();


        if (
            nama === '' ||
            email === '' ||
            hp === '' ||
            menu === '' ||
            jumlah === '' ||
            tanggal === ''
        ) {

            tampilkanToast(
                'Lengkapi data pemesanan terlebih dahulu!',
                'error'
            );

            return;
        }


        tampilkanToast(
            'Pesanan ' + menu +
            ' atas nama ' + nama +
            ' berhasil dikirim!',
            'success'
        );


        this.reset();

    });


    // =====================================================
    // 7. BACK TO TOP
    // Event  : scroll, click
    // Effect : fadeIn, fadeOut, animate
    // =====================================================

    const $btnTop = $('#backToTop');


    $(window).on('scroll', function () {

        if ($(this).scrollTop() > 300) {

            $btnTop.fadeIn(200);

        } else {

            $btnTop.fadeOut(200);

        }

    });


    $btnTop.on('click', function () {

        $('html, body').animate({
            scrollTop: 0
        }, 500);

    });


    // =====================================================
    // 8. JQUERY VALIDATION
    // FORM MEMBER
    // =====================================================


    // Custom validation nomor HP

    $.validator.addMethod(
        'nomorHp',
        function (value, element) {

            return this.optional(element) ||
                /^[0-9]{10,12}$/.test(value);

        },
        'Nomor HP harus 10-12 digit angka'
    );


    // Custom validation password
    // Harus mengandung huruf dan angka

    $.validator.addMethod(
        'hurufAngka',
        function (value, element) {

            return this.optional(element) ||
                (
                    /[A-Za-z]/.test(value) &&
                    /[0-9]/.test(value)
                );

        },
        'Password harus mengandung huruf dan angka'
    );


    // Validation Form Member

    $('#formMember').validate({

        rules: {

            memberNama: {
                required: true,
                minlength: 3
            },

            memberEmail: {
                required: true,
                email: true
            },

            memberHp: {
                required: true,
                nomorHp: true
            },

            memberPassword: {
                required: true,
                minlength: 8,
                hurufAngka: true
            },

            memberKonfirmasi: {
                required: true,
                equalTo: '#mPassword'
            }

        },


        messages: {

            memberNama: {
                required: 'Nama wajib diisi',
                minlength: 'Nama minimal 3 karakter'
            },

            memberEmail: {
                required: 'Email wajib diisi',
                email: 'Format email tidak valid'
            },

            memberHp: {
                required: 'Nomor HP wajib diisi'
            },

            memberPassword: {
                required: 'Password wajib diisi',
                minlength: 'Password minimal 8 karakter'
            },

            memberKonfirmasi: {
                required: 'Konfirmasi password wajib diisi',
                equalTo: 'Password konfirmasi tidak sama'
            }

        },


        errorElement: 'div',

        errorClass: 'pesan-error',


        highlight: function (element) {

            $(element)
                .addClass('is-error')
                .removeClass('is-valid');

        },


        unhighlight: function (element) {

            $(element)
                .removeClass('is-error')
                .addClass('is-valid');

        },


        submitHandler: function (form) {

            const nama = $('#mNama')
                .val()
                .trim();


            tampilkanToast(
                'Selamat datang, ' +
                nama +
                '! Akun member berhasil dibuat.',
                'success'
            );


            form.reset();


            $('#formMember input')
                .removeClass('is-error is-valid');

        }

    });


    // =====================================================
    // 9. SMOOTH SCROLL NAVBAR
    // =====================================================

    $('a[href^="#"]').on('click', function (e) {

        const href = $(this).attr('href');


        if (href.length < 2) {
            return;
        }


        const $tujuan = $(href);


        if ($tujuan.length === 0) {
            return;
        }


        e.preventDefault();


        $('html, body').animate({

            scrollTop:
                $tujuan.offset().top - 70

        }, 500);

    });

});