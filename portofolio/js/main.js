/* TYPING EFFECT */

const typingText = document.getElementById('typing-text');

if (typingText) {

    const names = [
        'Syarifah Putri',
        'Web Developer',
        'Mahasiswa'
    ];

    let nameIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {

        const currentName = names[nameIndex];

        if (isDeleting) {
            typingText.textContent =
                currentName.substring(0, charIndex - 1);

            charIndex--;
        } else {
            typingText.textContent =
                currentName.substring(0, charIndex + 1);

            charIndex++;
        }

        let delay = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentName.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            nameIndex = (nameIndex + 1) % names.length;
            delay = 500;
        }

        setTimeout(typeEffect, delay);
    }

    typeEffect();
}


/* PROJECT */

const projectGrid = document.getElementById('project-grid');

if (projectGrid) {

    const projects = [
        {
            title: 'Website Portofolio',
            desc: 'Website pribadi menggunakan HTML, CSS, dan JavaScript.'
        },
        {
            title: 'Website Kalkulator',
            desc: 'Website kalkulator sederhana dengan JavaScript.'
        },
        {
            title: 'SecondSpace',
            desc: 'Ide marketplace barang bekas yang sedang dikembangkan.'
        }
    ];

    projects.forEach(function(project) {

        const card = document.createElement('div');

        card.className = 'project-card';

        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.desc}</p>
        `;

        card.addEventListener('click', function() {
            alert('Kamu memilih project: ' + project.title);
        });

        projectGrid.appendChild(card);
    });
}


/* DARK MODE */

const darkModeBtn = document.getElementById('dark-mode-btn');

if (darkModeBtn) {

    darkModeBtn.addEventListener('click', function() {

        document.body.classList.toggle('dark');

        if (document.body.classList.contains('dark')) {
            darkModeBtn.textContent = '☀';
        } else {
            darkModeBtn.textContent = '☾';
        }

    });
}


/* CONTACT FORM */

const contactForm = document.getElementById('contact-form');

if (contactForm) {

    contactForm.addEventListener('submit', function(event) {

        event.preventDefault();

        const nama = document.getElementById('nama').value;
        const email = document.getElementById('email').value;
        const pesan = document.getElementById('pesan').value;

        if (nama === '' || email === '' || pesan === '') {

            alert('Mohon isi semua data terlebih dahulu.');

        } else {

            alert('Pesan berhasil dikirim. Terima kasih, ' + nama + ' ♡');

            contactForm.reset();

        }

    });

}