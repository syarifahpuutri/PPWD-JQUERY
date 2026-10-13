/* ============================================================
   WARUNG ICE CREAM - JQUERY SCRIPT
   Praktikum Pemrograman Web Dasar
   ============================================================ */

$(document).ready(function () {

    /* =====================================================
       1. DATA PRODUK
       ===================================================== */

    const produkData = [

        {
            id: 1,
            nama: 'Es Krim Cokelat',
            harga: 15000,
            kategori: 'es-krim',
            icon: '🍫',
            desc: 'Cokelat premium lembut',
            badge: 'Best Seller',
            badgeType: 'hot'
        },

        {
            id: 2,
            nama: 'Es Krim Strawberry',
            harga: 15000,
            kategori: 'es-krim',
            icon: '🍓',
            desc: 'Stroberi segar asli',
            badge: 'Favorit',
            badgeType: ''
        },

        {
            id: 3,
            nama: 'Es Krim Vanilla',
            harga: 13000,
            kategori: 'es-krim',
            icon: '🍦',
            desc: 'Vanilla klasik creamy',
            badge: '',
            badgeType: ''
        },

        {
            id: 4,
            nama: 'Es Krim Mangga',
            harga: 16000,
            kategori: 'es-krim',
            icon: '🥭',
            desc: 'Mangga manis tropis',
            badge: 'Baru',
            badgeType: ''
        },

        {
            id: 5,
            nama: 'Sundae Cokelat',
            harga: 25000,
            kategori: 'sundae',
            icon: '🍨',
            desc: 'Sundae dengan topping cokelat',
            badge: 'Best Seller',
            badgeType: 'hot'
        },

        {
            id: 6,
            nama: 'Sundae Keju',
            harga: 27000,
            kategori: 'sundae',
            icon: '🧀',
            desc: 'Sundae topping keju melimpah',
            badge: '',
            badgeType: ''
        },

        {
            id: 7,
            nama: 'Sundae Buah',
            harga: 28000,
            kategori: 'sundae',
            icon: '🍧',
            desc: 'Sundae dengan buah segar',
            badge: 'Favorit',
            badgeType: ''
        },

        {
            id: 8,
            nama: 'Milkshake Cokelat',
            harga: 20000,
            kategori: 'minuman',
            icon: '🥤',
            desc: 'Milkshake cokelat dingin',
            badge: '',
            badgeType: ''
        },

        {
            id: 9,
            nama: 'Milkshake Strawberry',
            harga: 20000,
            kategori: 'minuman',
            icon: '🥛',
            desc: 'Milkshake stroberi segar',
            badge: 'Baru',
            badgeType: ''
        },

        {
            id: 10,
            nama: 'Es Teh Manis',
            harga: 8000,
            kategori: 'minuman',
            icon: '🧊',
            desc: 'Es teh manis segar',
            badge: '',
            badgeType: ''
        },

        {
            id: 11,
            nama: 'Es Jeruk',
            harga: 10000,
            kategori: 'minuman',
            icon: '🍊',
            desc: 'Es jeruk peras asli',
            badge: '',
            badgeType: ''
        },

        {
            id: 12,
            nama: 'Float Ice Cream',
            harga: 22000,
            kategori: 'minuman',
            icon: '🍹',
            desc: 'Minuman soda dengan es krim',
            badge: 'Best Seller',
            badgeType: 'hot'
        }

    ];


    /* =====================================================
       2. STATE
       ===================================================== */

    let cart = [];

    let currentFilter = 'all';

    let searchKeyword = '';

    let toastTimer;


    /* =====================================================
       3. RENDER PRODUK
       ===================================================== */

    function renderProduk() {

        const $grid = $('#produkGrid');

        $grid.empty();


        const filtered = produkData.filter(function (p) {

            const matchKategori =
                currentFilter === 'all' ||
                p.kategori === currentFilter;

            const matchSearch =
                p.nama
                    .toLowerCase()
                    .includes(searchKeyword.toLowerCase()) ||

                p.desc
                    .toLowerCase()
                    .includes(searchKeyword.toLowerCase());

            return matchKategori && matchSearch;

        });


        if (filtered.length === 0) {

            $grid.html(`
                <div style="
                    grid-column: 1/-1;
                    text-align: center;
                    padding: 60px 20px;
                    color: #bbb;
                ">

                    <i
                        class="fas fa-search"
                        style="
                            font-size: 3.5rem;
                            color: #ffe4ec;
                            margin-bottom: 20px;
                            display: block;
                        "
                    ></i>

                    <h3
                        style="
                            color: #999;
                            font-weight: 600;
                            margin-bottom: 8px;
                        "
                    >
                        Produk tidak ditemukan
                    </h3>

                    <p style="font-size: 0.9rem;">
                        Coba kata kunci atau kategori lain
                    </p>

                </div>
            `);

            return;
        }


        filtered.forEach(function (p) {

            const badgeHtml = p.badge
                ? `
                    <div class="produk-badge ${p.badgeType}">
                        ${p.badge}
                    </div>
                `
                : '';


            const card = `

                <div
                    class="produk-card"
                    data-id="${p.id}"
                    data-kategori="${p.kategori}"
                >

                    ${badgeHtml}

                    <div class="produk-img">
                        ${p.icon}
                    </div>

                    <div class="produk-info">

                        <h3>
                            ${p.nama}
                        </h3>

                        <p class="desc">
                            ${p.desc}
                        </p>

                        <div class="produk-footer">

                            <div class="produk-price">

                                Rp ${p.harga.toLocaleString('id-ID')}

                                <small>
                                    per porsi
                                </small>

                            </div>

                            <button
                                type="button"
                                class="btn-add-cart"
                                data-id="${p.id}"
                                title="Tambah ke keranjang"
                            >
                                <i class="fas fa-plus"></i>
                            </button>

                        </div>

                    </div>

                </div>

            `;

            $grid.append(card);

        });

    }


    /* =====================================================
       4. FILTER KATEGORI NAVBAR
       ===================================================== */

    $('.nav-link').click(function () {

        $('.nav-link')
            .removeClass('active');

        $(this)
            .addClass('active');


        currentFilter =
            $(this).data('filter');


        $('.filter-btn')
            .removeClass('active');

        $(`.filter-btn[data-cat="${currentFilter}"]`)
            .addClass('active');


        renderProduk();

    });


    /* =====================================================
       5. FILTER KATEGORI BUTTON
       ===================================================== */

    $('.filter-btn').click(function () {

        $('.filter-btn')
            .removeClass('active');

        $(this)
            .addClass('active');


        currentFilter =
            $(this).data('cat');


        $('.nav-link')
            .removeClass('active');

        $(`.nav-link[data-filter="${currentFilter}"]`)
            .addClass('active');


        renderProduk();

    });


    /* =====================================================
       6. PENCARIAN REAL-TIME
       ===================================================== */

    $('#searchProduk').on('input', function () {

        searchKeyword =
            $(this).val();

        renderProduk();

    });


    /* =====================================================
       7. TAMBAH KE KERANJANG
       ===================================================== */

    $(document).on(
        'click',
        '.btn-add-cart',
        function (e) {

            e.stopPropagation();


            const id =
                Number($(this).data('id'));


            const produk =
                produkData.find(
                    p => p.id === id
                );


            if (!produk) {
                return;
            }


            const existing =
                cart.find(
                    item => item.id === id
                );


            if (existing) {

                existing.qty += 1;

            } else {

                cart.push({

                    id: produk.id,

                    nama: produk.nama,

                    harga: produk.harga,

                    icon: produk.icon,

                    qty: 1

                });

            }


            updateCartUI();


            showToast(
                `${produk.icon} ${produk.nama} ditambahkan!`
            );


            $(this).css(
                'transform',
                'rotate(90deg) scale(1.3)'
            );


            setTimeout(() => {

                $(this).css(
                    'transform',
                    ''
                );

            }, 300);


            $('#cartBadge').css(
                'transform',
                'scale(1.4)'
            );


            setTimeout(() => {

                $('#cartBadge').css(
                    'transform',
                    'scale(1)'
                );

            }, 200);

        }
    );


    /* =====================================================
       8. UPDATE UI KERANJANG
       + LATIHAN 1 DISKON 10%
       ===================================================== */

    function updateCartUI() {

        const $cartItems =
            $('#cartItems');


        const totalQty =
            cart.reduce(
                (sum, item) =>
                    sum + item.qty,
                0
            );


        let totalHarga =
            cart.reduce(
                (sum, item) =>
                    sum + (item.harga * item.qty),
                0
            );


        let diskon = 0;


        /* LATIHAN 1 */

        if (totalHarga > 100000) {

            diskon =
                totalHarga * 0.1;

        }


        const totalBayar =
            totalHarga - diskon;


        $('#cartBadge')
            .text(totalQty);


        $('#cartOriginal')
            .text(
                'Rp ' +
                totalHarga.toLocaleString('id-ID')
            );


        $('#cartDiscount')
            .text(
                diskon > 0
                    ? '- Rp ' +
                      diskon.toLocaleString('id-ID')
                    : 'Rp 0'
            );


        $('#cartTotal')
            .text(
                'Rp ' +
                totalBayar.toLocaleString('id-ID')
            );


        if (cart.length === 0) {

            $cartItems.html(`

                <div class="cart-empty">

                    <i class="fas fa-shopping-cart"></i>

                    <p>
                        Keranjang masih kosong
                    </p>

                    <small>
                        Yuk pilih es krim dulu!
                    </small>

                </div>

            `);

            return;
        }


        let html = '';


        cart.forEach(function (item) {

            html += `

                <div
                    class="cart-item"
                    data-id="${item.id}"
                >

                    <div class="cart-item-icon">
                        ${item.icon}
                    </div>

                    <div class="cart-item-info">

                        <h5>
                            ${item.nama}
                        </h5>

                        <div class="price">
                            Rp ${(item.harga * item.qty)
                                .toLocaleString('id-ID')}
                        </div>

                        <div class="qty-control">

                            <button
                                type="button"
                                class="qty-btn"
                                data-action="minus"
                                data-id="${item.id}"
                            >
                                −
                            </button>

                            <span class="qty-value">
                                ${item.qty}
                            </span>

                            <button
                                type="button"
                                class="qty-btn"
                                data-action="plus"
                                data-id="${item.id}"
                            >
                                +
                            </button>

                        </div>

                    </div>

                    <button
                        type="button"
                        class="cart-item-remove"
                        data-id="${item.id}"
                        title="Hapus"
                    >
                        <i class="fas fa-trash"></i>
                    </button>

                </div>

            `;

        });


        $cartItems.html(html);

    }


    /* =====================================================
       9. PLUS / MINUS QUANTITY
       ===================================================== */

    $(document).on(
        'click',
        '.qty-btn',
        function () {

            const action =
                $(this).data('action');


            const id =
                Number($(this).data('id'));


            const item =
                cart.find(
                    i => i.id === id
                );


            if (!item) {
                return;
            }


            if (action === 'plus') {

                item.qty += 1;

            }


            else if (action === 'minus') {

                item.qty -= 1;


                if (item.qty <= 0) {

                    cart =
                        cart.filter(
                            i => i.id !== id
                        );

                }

            }


            updateCartUI();

        }
    );


    /* =====================================================
       10. HAPUS ITEM
       ===================================================== */

    $(document).on(
        'click',
        '.cart-item-remove',
        function () {

            const id =
                Number($(this).data('id'));


            const item =
                cart.find(
                    i => i.id === id
                );


            if (item) {

                showToast(
                    `${item.icon} ${item.nama} dihapus dari keranjang`
                );

            }


            cart =
                cart.filter(
                    i => i.id !== id
                );


            updateCartUI();

        }
    );


    /* =====================================================
       11. BUKA CART
       ===================================================== */

    $('#cartBtn').click(function () {

        $('#cartSidebar')
            .addClass('open');

        $('#cartOverlay')
            .fadeIn(300);

    });


    /* =====================================================
       12. TUTUP CART
       ===================================================== */

    $('#cartClose, #cartOverlay')
        .click(function () {

            $('#cartSidebar')
                .removeClass('open');

            $('#cartOverlay')
                .fadeOut(300);

        });


    /* =====================================================
       13. CHECKOUT
       ===================================================== */

    $('#btnCheckout').click(function () {

        if (cart.length === 0) {

            showToast(
                '❌ Keranjang masih kosong!'
            );

            return;
        }


        $('#buyerModal')
            .addClass('show');

    });


    /* =====================================================
       14. TUTUP MODAL PEMBELI
       ===================================================== */

    $('#buyerModalClose').click(function () {

        $('#buyerModal')
            .removeClass('show');

    });


    $('#buyerModal').click(function (e) {

        if (e.target === this) {

            $('#buyerModal')
                .removeClass('show');

        }

    });


    /* =====================================================
       15. VALIDASI NAMA
       ===================================================== */

    $('#namaPembeli').on(
        'input',
        function () {

            validasiNama();

        }
    );


    function validasiNama() {

        const nama =
            $('#namaPembeli')
                .val()
                .trim();


        if (nama.length < 3) {

            $('#namaPembeli')
                .removeClass('valid')
                .addClass('invalid');

            $('#namaError')
                .text(
                    'Nama minimal 3 karakter.'
                );

            return false;
        }


        $('#namaPembeli')
            .removeClass('invalid')
            .addClass('valid');

        $('#namaError')
            .text('');

        return true;

    }


    /* =====================================================
       16. VALIDASI ALAMAT
       ===================================================== */

    $('#alamatPembeli').on(
        'input',
        function () {

            validasiAlamat();

        }
    );


    function validasiAlamat() {

        const alamat =
            $('#alamatPembeli')
                .val()
                .trim();


        if (alamat.length < 10) {

            $('#alamatPembeli')
                .removeClass('valid')
                .addClass('invalid');

            $('#alamatError')
                .text(
                    'Alamat minimal 10 karakter.'
                );

            return false;
        }


        $('#alamatPembeli')
            .removeClass('invalid')
            .addClass('valid');

        $('#alamatError')
            .text('');

        return true;

    }


    /* =====================================================
       17. VALIDASI NOMOR HP
       ===================================================== */

    $('#hpPembeli').on(
        'input',
        function () {

            validasiHP();

        }
    );


    function validasiHP() {

        const hp =
            $('#hpPembeli')
                .val()
                .trim();


        const pola =
            /^0[0-9]{9,12}$/;


        if (!pola.test(hp)) {

            $('#hpPembeli')
                .removeClass('valid')
                .addClass('invalid');

            $('#hpError')
                .text(
                    'Nomor HP harus diawali 0 dan terdiri dari 10-13 angka.'
                );

            return false;
        }


        $('#hpPembeli')
            .removeClass('invalid')
            .addClass('valid');

        $('#hpError')
            .text('');

        return true;

    }


    /* =====================================================
       18. LATIHAN 2
       SIMPAN RIWAYAT LOCAL STORAGE
       ===================================================== */

    function ambilRiwayat() {

        try {

            const data =
                JSON.parse(
                    localStorage.getItem('riwayat')
                );


            if (Array.isArray(data)) {

                return data;

            }


            return [];

        }

        catch (error) {

            return [];

        }

    }


    function simpanRiwayat(
        total,
        qty,
        nama
    ) {

        const riwayat =
            ambilRiwayat();


        riwayat.push({

            tanggal:
                new Date().toISOString(),

            nama: nama,

            total:
                Number(total),

            qty:
                Number(qty)

        });


        localStorage.setItem(
            'riwayat',
            JSON.stringify(riwayat)
        );

    }


    /* =====================================================
       19. TAMPILKAN RIWAYAT
       ===================================================== */

    function tampilRiwayat() {

        const riwayat =
            ambilRiwayat();


        const $list =
            $('#riwayatList');


        if (riwayat.length === 0) {

            $list.html(`

                <div class="history-empty">

                    <i class="fas fa-receipt"></i>

                    <p>
                        Belum ada transaksi.
                    </p>

                    <small>
                        Riwayat checkout akan muncul di sini.
                    </small>

                </div>

            `);

            return;
        }


        let html = '';


        riwayat
            .slice()
            .reverse()
            .forEach(function (item) {

                const tanggal =
                    new Date(
                        item.tanggal
                    ).toLocaleString(
                        'id-ID'
                    );


                html += `

                    <div class="history-card">

                        <div class="history-left">

                            <div class="history-icon">
                                <i class="fas fa-receipt"></i>
                            </div>

                            <div>

                                <div class="history-name">
                                    ${item.nama || 'Pembeli'}
                                </div>

                                <div class="history-date">
                                    ${tanggal}
                                </div>

                            </div>

                        </div>


                        <div class="history-right">

                            <div class="history-total">
                                Rp ${Number(item.total)
                                    .toLocaleString('id-ID')}
                            </div>

                            <div class="history-qty">
                                ${item.qty} item
                            </div>

                        </div>

                    </div>

                `;

            });


        $list.html(html);

    }


    /* =====================================================
       20. SUBMIT FORM CHECKOUT
       ===================================================== */

    $('#buyerForm').submit(function (e) {

        e.preventDefault();


        const namaValid =
            validasiNama();


        const alamatValid =
            validasiAlamat();


        const hpValid =
            validasiHP();


        if (
            !namaValid ||
            !alamatValid ||
            !hpValid
        ) {

            showToast(
                '❌ Lengkapi data pembeli terlebih dahulu.'
            );

            return;

        }


        /* Hitung total */

        let totalHarga =
            cart.reduce(
                (sum, item) =>
                    sum + (item.harga * item.qty),
                0
            );


        let diskon = 0;


        if (totalHarga > 100000) {

            diskon =
                totalHarga * 0.1;

        }


        const totalBayar =
            totalHarga - diskon;


        const totalQty =
            cart.reduce(
                (sum, item) =>
                    sum + item.qty,
                0
            );


        const nama =
            $('#namaPembeli')
                .val()
                .trim();


        /* Simpan riwayat
           SEBELUM cart dikosongkan */

        simpanRiwayat(
            totalBayar,
            totalQty,
            nama
        );


        /* Kosongkan cart */

        cart = [];

        updateCartUI();


        /* Tutup modal */

        $('#buyerModal')
            .removeClass('show');


        $('#cartSidebar')
            .removeClass('open');


        $('#cartOverlay')
            .fadeOut(300);


        /* Reset form */

        $('#buyerForm')[0].reset();

        $('.form-group input, .form-group textarea')
            .removeClass('valid invalid');

        $('.error-message')
            .text('');


        /* Update riwayat */

        tampilRiwayat();


        /* Notifikasi */

        showToast(
            `✅ Checkout berhasil! ${totalQty} item · Rp ${totalBayar.toLocaleString('id-ID')}`
        );

    });


    /* =====================================================
       21. HAPUS RIWAYAT
       ===================================================== */

    $('#btnHapusRiwayat').click(function () {

        const riwayat =
            ambilRiwayat();


        if (riwayat.length === 0) {

            showToast(
                'Tidak ada riwayat transaksi.'
            );

            return;

        }


        const yakin =
            confirm(
                'Hapus semua riwayat transaksi?'
            );


        if (!yakin) {
            return;
        }


        localStorage.removeItem(
            'riwayat'
        );


        tampilRiwayat();


        showToast(
            '🗑️ Riwayat transaksi dihapus.'
        );

    });


    /* =====================================================
       22. TOAST NOTIFICATION
       ===================================================== */

    function showToast(message) {

        clearTimeout(toastTimer);


        $('#toastMsg')
            .text(message);


        $('#toast')
            .addClass('show');


        toastTimer =
            setTimeout(function () {

                $('#toast')
                    .removeClass('show');

            }, 2500);

    }


    /* =====================================================
       23. HAMBURGER MENU
       ===================================================== */

    $('#hamburger').click(function () {

        $('#navMenu')
            .toggleClass('show');


        const icon =
            $(this).find('i');


        if (
            $('#navMenu')
                .hasClass('show')
        ) {

            icon
                .removeClass('fa-bars')
                .addClass('fa-times');

        } else {

            icon
                .removeClass('fa-times')
                .addClass('fa-bars');

        }

    });


    /* =====================================================
       24. TUTUP MENU MOBILE
       ===================================================== */

    $('.nav-link').click(function () {

        if (window.innerWidth <= 768) {

            $('#navMenu')
                .removeClass('show');


            $('#hamburger')
                .find('i')
                .removeClass('fa-times')
                .addClass('fa-bars');

        }

    });


    /* =====================================================
       25. INISIALISASI
       ===================================================== */

    renderProduk();

    updateCartUI();

    tampilRiwayat();


    /* Console */

    console.log(
        '%c🍦 Warung Ice Cream - Siap!',
        'color:#ff6b9d;font-size:16px;font-weight:bold;'
    );


    console.log(
        '%cTotal produk: ' + produkData.length,
        'color:#2d1b3d;font-size:12px;'
    );

});