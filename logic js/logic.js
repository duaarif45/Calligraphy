// loader
window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");

    setTimeout(function () {
        preloader.classList.add("hidden");

        document.body.classList.add("loaded");

        setTimeout(function () {
            preloader.remove();
        }, 500);

    }, 2500);
});




// SIDEBAR FUNCTIONS
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const hamburgerBtn = document.getElementById('hamburgerBtn');

    if (sidebar.classList.contains('active')) {
        closeSidebar();
    } else {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        hamburgerBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        document.body.style.overflow = 'hidden';
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const hamburgerBtn = document.getElementById('hamburgerBtn');

    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
    document.body.style.overflow = 'auto';

 
    document.querySelectorAll('.sidebar-drop-content').forEach(content => {
        content.classList.remove('active');
        content.style.maxHeight = null;
    });
    document.querySelectorAll('.sidebar-drop-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.fa-chevron-down').forEach(chevron => {
        chevron.style.transform = 'rotate(0deg)';
    });
}

function toggleSidebarDropdown(id) {
    const content = document.getElementById('sidebar-drop-' + id);
    const btn = document.querySelector(`button[onclick="toggleSidebarDropdown('${id}')"]`);
    const chevron = document.getElementById('chevron-' + id);

    if (!content || !btn) return;

    
    document.querySelectorAll('.sidebar-drop-content').forEach(el => {
        if (el.id !== 'sidebar-drop-' + id) {
            el.classList.remove('active');
            el.style.maxHeight = null;
        }
    });
    document.querySelectorAll('.sidebar-drop-btn').forEach(el => {
        if (el !== btn) {
            el.classList.remove('active');
        }
    });
    document.querySelectorAll('.fa-chevron-down').forEach(el => {
        if (el !== chevron) {
            el.style.transform = 'rotate(0deg)';
        }
    });

    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        btn.classList.remove('active');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
        content.style.maxHeight = null;
    } else {
        content.classList.add('active');
        btn.classList.add('active');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
        content.style.maxHeight = content.scrollHeight + "px";
    }
}


function handleNavClick(tradition) {
 
    document.querySelectorAll('.drop-content').forEach(drop => {
        drop.style.visibility = '';
        drop.style.opacity = '';
        drop.style.display = '';
    });

  
    const calligraphySection = document.getElementById('calligraphy');
    if (calligraphySection) {
        calligraphySection.scrollIntoView({ behavior: 'smooth' });
    }

   
    setTimeout(() => {
        showTraditionDetail(tradition);
    }, 300);
}

function handleSidebarNav(tradition) {
    closeSidebar();

    const calligraphySection = document.getElementById('calligraphy');
    if (calligraphySection) {
        calligraphySection.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => {
        showTraditionDetail(tradition);
    }, 400);
}

function handleSidebarSwitch(type) {
    closeSidebar();
    setTimeout(() => {
        if (type === 'kids' && typeof switchToKids === 'function') {
            switchToKids();
        } else if (type === 'adults' && typeof switchToAdults === 'function') {
            switchToAdults();
        }
    }, 300);
}




// TRADITIONS DETAIL 
function showTraditionDetail(tradition) {
    const overview = document.getElementById('traditions');
    if (overview) {
        overview.style.display = 'none';
    }

    document.querySelectorAll('.detail-section').forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });

    const detailSection = document.getElementById(tradition + '-detail');
    if (detailSection) {
        detailSection.style.display = 'block';
        detailSection.classList.add('active');

        setTimeout(() => {
            detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

function showSection(sectionId) {
    if (sectionId === 'traditions') {
        document.querySelectorAll('.detail-section').forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        const overview = document.getElementById('traditions');
        if (overview) {
            overview.style.display = 'block';
            setTimeout(() => {
                overview.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
}

function showScript(scriptId, event) {
    if (!event) return;

    const showcase = event.target.closest('.script-showcase');
    if (!showcase) return;

    showcase.querySelectorAll('.script-content').forEach(content => {
        content.classList.remove('active');
    });

    showcase.querySelectorAll('.script-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    const selectedContent = document.getElementById(scriptId);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }

    event.target.classList.add('active');
}


function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message || 'Action completed successfully!';
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function handleEnroll(e) {
    e.preventDefault();
    showToast('🎉 Enrollment successful!');
}


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);


document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.detail-section').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });

    const overview = document.getElementById('traditions');
    if (overview) {
        overview.style.display = 'block';
    }

    document.querySelectorAll('.drop-content').forEach(drop => {
        drop.style.visibility = '';
        drop.style.opacity = '';
        drop.style.display = '';
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });


    

    document.querySelectorAll('.tradition-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function (e) {
            e.stopPropagation();
            const tradition = this.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
            if (tradition) showTraditionDetail(tradition);
        });
    });

    
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            showSection('traditions');
        });
    });

 
    document.querySelectorAll('.enroll-btn').forEach(btn => {
        btn.addEventListener('click', handleEnroll);
    });

    // Script Tabs
    document.querySelectorAll('.script-tab').forEach(tab => {
        tab.addEventListener('click', function (e) {
            const match = this.getAttribute('onclick')?.match(/'([^']+)'/);
            if (match) showScript(match[1], e);
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeSidebar();
        }
    });
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('active')) {
            closeSidebar();
            return;
        }

        const activeDetail = document.querySelector('.detail-section.active');
        if (activeDetail) {
            showSection('traditions');
        }
    }
});




// CHILD AND ADULT SECTION 
// Show Kids Section
function switchToKids() {
    document.getElementById('kids-content').style.display = 'block';
    document.getElementById('adults-content').style.display = 'none';
    document.getElementById('kidsBtn').classList.add('active');
    document.getElementById('adultsBtn').classList.remove('active');

    setTimeout(function () {
        document.getElementById('adult-kid-section').scrollIntoView({ behavior: 'smooth' });
    }, 50);

    return false;
}

function switchToAdults() {
    document.getElementById('kids-content').style.display = 'none';
    document.getElementById('adults-content').style.display = 'block';
    document.getElementById('adultsBtn').classList.add('active');
    document.getElementById('kidsBtn').classList.remove('active');

    setTimeout(function () {
        document.getElementById('adult-kid-section').scrollIntoView({ behavior: 'smooth' });
    }, 50);

    return false;
}













// Gallery Data
const galleryData = [
    {
        img: "pics/gallery1.jpg",
        category: "Arabic",
        title: "Alhamdulillah",
        desc: "Elegant Thuluth Arabic calligraphy in gold leaf on textured canvas. Represents gratitude and praise to Allah, perfect for spiritual wall decor."
    },
    {
        img: "pics/gallery2.jpg",
        category: "Western",
        title: "Western Font Collection",
        desc: "A vintage Western typography set with ornamental serif letters, embossed textures, and decorative borders reminiscent of 19th-century signage."
    },
    {
        img: "pics/gallery3.jpg",
        category: "Oriental",
        title: "Katana Spirit",
        desc: "Japanese Kanji calligraphy for 'Strength' rendered in semi-cursive Gyosho style, complemented with a samurai sword brush stroke motif for dynamic impact."
    },
    {
        img: "pics/gallery4.jpg",
        category: "Arabic",
        title: "Kun Fayakun",
        desc: "Quranic verse 'Be, and it is' in Thuluth script, with bold black ink strokes and abstract geometric accents, symbolizing divine creation and manifestation."
    },
    {
        img: "pics/gallery5.jpg",
        category: "Western",
        title: "Pacocho Alonzo",
        desc: "Ornamental SVG-style Western serif letters with vintage Wild West inspiration, featuring textured shadows and decorative flourishes."
    },
    {
        img: "pics/gallery6.jpg",
        category: "Oriental",
        title: "Shodo Practice",
        desc: "Traditional Japanese Kaisho-style brush calligraphy demonstrating disciplined, precise strokes, highlighting the rhythm and flow of Shodo practice."
    },
    {
        img: "pics/gallery7.jpg",
        category: "Arabic",
        title: "Ya Allah",
        desc: "Diwani-style Arabic calligraphy with floral accents and crimson highlights on cream background, invoking devotion and elegance in worship."
    },
    {
        img: "pics/gallery8.jpg",
        category: "Oriental",
        title: "Flowing Spirit",
        desc: "Minimalist sumi ink brush strokes capturing the essence of cursive Shodo, mounted in a contemporary frame for a modern aesthetic."
    },
    {
        img: "pics/gallery9.jpg",
        category: "Arabic",
        title: "Ya Allah",
        desc: "Diwani nocturnal composition in turquoise highlights against black background, emphasizing elegance and spiritual devotion in Islamic art."
    },
    {
        img: "pics/gallery10.jpg",
        category: "Arabic",
        title: "Bismillah",
        desc: "Vertical Thuluth-Kufic fusion with interlaced geometry; 'In the name of Allah, the Most Gracious, the Most Merciful' rendered elegantly on canvas."
    },
    {
        img: "pics/gallery11.jpg",
        category: "Hebrew",
        title: "God Made Me Laugh",
        desc: "Biblical Hebrew calligraphy (Genesis 21:6) paired with copperplate English translation, celebrating Sarah’s joy at Isaac’s birth with ornamental accents."
    },
    {
        img: "pics/gallery12.jpg",
        category: "Indic",
        title: "Om Shanti",
        desc: "Devanagari calligraphy depicting the sacred Om symbol with triple Shanti mantra, accented with flames for a peaceful yet vibrant spiritual design."
    },
    {
        img: "pics/gallery13.jpg",
        category: "Hebrew",
        title: "Beloved's Promise",
        desc: "Song of Solomon 6:3 rendered in stylized Hebrew script with English translation; 'I am my beloved's and my beloved is mine,' with ornamental heart motifs."
    },
    {
        img: "pics/gallery14.jpg",
        category: "Oriental",
        title: "The Way of Writing",
        desc: "Japanese Shodo calligraphy on hanging scroll representing 'the art of writing', emphasizing traditional brush techniques and character balance."
    },
    {
        img: "pics/gallery15.jpg",
        category: "Indic",
        title: "Illusion",
        desc: "Modern 3D Hindi calligraphy on textured canvas, representing 'Maya' — the illusion of the material world — with depth, shadows, and contemporary flair."
    }
];

let currentImageIndex = 0;

const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');

            if (filter === 'all' || category.toLowerCase() === filter.toLowerCase()) {
                item.classList.remove('hidden');
                item.style.animationDelay = `${index * 0.1}s`;
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                }, 10);
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Lightbox Functions
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('galleryLightbox');
    if (!lightbox) return;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateLightbox();
}

function closeLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) currentImageIndex = galleryData.length - 1;
    if (currentImageIndex >= galleryData.length) currentImageIndex = 0;

    updateLightbox();
}

function updateLightbox() {
    const data = galleryData[currentImageIndex];
    const img = document.getElementById('lightboxImg');
    const loading = document.getElementById('lightboxLoading');
    if (!img || !loading) return;

    loading.style.display = 'block';
    img.style.opacity = '0.5';

    img.src = data.img;
    document.getElementById('lightboxCategory').textContent = data.category;
    document.getElementById('lightboxTitle').textContent = data.title;
    document.getElementById('lightboxDesc').textContent = data.desc;

    // Meta safe check
    const metaHtml = (data.meta || []).map(m => `<span><i class="fa-solid fa-circle-info"></i> ${m}</span>`).join('');
    const metaContainer = document.getElementById('lightboxMeta');
    if (metaContainer) metaContainer.innerHTML = metaHtml;

    img.onload = () => {
        loading.style.display = 'none';
        img.style.opacity = '1';
    };
}







// feedback 



const emojiBtns = document.querySelectorAll('.emoji-btn');
let selectedRating = 0;

emojiBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        selectedRating = parseInt(this.dataset.rating);


        emojiBtns.forEach((b, index) => {
            b.classList.toggle('active', index < selectedRating);
        });
    });
});


document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function () {
        this.classList.toggle('active');
    });
});


const textarea = document.getElementById('comment');
const charCount = document.getElementById('charCount');

textarea.addEventListener('input', function () {
    const length = this.value.length;
    charCount.textContent = `${length}/500`;


    charCount.style.color = length >= 450 ? '#ef4444' : '#94a3b8';
});


const submitBtn = document.getElementById('submitBtn');
const feedbackForm = document.getElementById('feedbackForm');
const successState = document.getElementById('successState');
const resetBtn = document.getElementById('resetBtn');

submitBtn.addEventListener('click', function () {

    if (selectedRating === 0) {
        feedbackForm.classList.add('shake');
        setTimeout(() => feedbackForm.classList.remove('shake'), 500);
        return;
    }

    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {

        document.querySelectorAll('.header, .rating-section, .tags-section, .comment-section, #submitBtn')
            .forEach(el => el.style.display = 'none');

        successState.classList.add('show');
    }, 1500);
});

resetBtn.addEventListener('click', function () {
    selectedRating = 0;
    document.querySelectorAll('.emoji-btn, .tag').forEach(el => el.classList.remove('active'));
    textarea.value = '';
    charCount.textContent = '0/500';

    document.querySelectorAll('.header, .rating-section, .tags-section, .comment-section, #submitBtn')
        .forEach(el => el.style.display = el.id === 'submitBtn' ? 'flex' : 'block');

    submitBtn.innerHTML = '<span>Submit Feedback</span><i class="fa-solid fa-paper-plane"></i>';
    submitBtn.disabled = false;
    successState.classList.remove('show');
});