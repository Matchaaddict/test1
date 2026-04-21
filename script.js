const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
    });
});

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
    }
    lastScroll = currentScroll;
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.benefit-card, .choose-card, .tip-item, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
});

const quizAnswers = {};
const quizSteps = document.querySelectorAll('.quiz-step');
const quizResult = document.querySelector('.quiz-result');
const resultText = document.querySelector('.result-text');
const quizRestart = document.querySelector('.quiz-restart');

if (quizSteps.length > 0) {
    quizSteps[0].classList.add('active');
}

document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', () => {
        const step = option.closest('.quiz-step');
        const stepNumber = parseInt(step.dataset.step);
        quizAnswers[`step${stepNumber}`] = option.dataset.value;

        step.classList.remove('active');
        const nextStep = document.querySelector(`.quiz-step[data-step="${stepNumber + 1}"]`);
        if (nextStep) {
            nextStep.classList.add('active');
        } else {
            showQuizResult();
        }
    });
});

function showQuizResult() {
    const age = quizAnswers.step1;
    const situation = quizAnswers.step2;
    const personality = quizAnswers.step3;

    let recommendation = '';

    if (age === 'baby') {
        recommendation += 'สำหรับทารก (0-12 เดือน) แนะนำหมวกผ้าฝ้ายนุ่ม ๆ ไม่มีตะเข็บกดทับ ';
    } else if (age === 'toddler') {
        recommendation += 'สำหรับวัยหัดเดิน (1-3 ปี) แนะนำหมวกบักเก็ต (Bucket Hat) เพราะปีกโดยรอบบังแดดได้ทุกทิศ ';
    } else {
        recommendation += 'สำหรับเด็กวัย 3-6 ปี เลือกได้หลากหลาย ทั้งหมวกแก๊ป หมวกบักเก็ต หรือหมวกปีกกว้าง ';
    }

    if (situation === 'outdoor') {
        recommendation += 'เน้นปีกกว้าง 7+ ซม. ค่า UPF 50+ และมีสายรัดคางแบบถอดได้ ';
    } else if (situation === 'daily') {
        recommendation += 'เลือกแบบที่ใส่สบาย น้ำหนักเบา ระบายอากาศดี ';
    } else {
        recommendation += 'ใช้หมวกผ้าหนา ผ้าขนสัตว์ หรือผ้าฟลีซ ปกปิดหูได้ ';
    }

    if (personality === 'active') {
        recommendation += 'สายรัดคางและวัสดุซักง่ายเป็นเรื่องสำคัญที่สุด';
    } else if (personality === 'calm') {
        recommendation += 'เลือกเน้นความสวยงามและความสบายได้อย่างเต็มที่';
    } else {
        recommendation += 'ให้ลูกเป็นคนเลือกลายและสีเอง จะช่วยให้ยอมใส่มากขึ้น';
    }

    quizSteps.forEach(s => s.classList.remove('active'));
    resultText.textContent = recommendation;
    quizResult.classList.add('active');
}

quizRestart?.addEventListener('click', () => {
    quizResult.classList.remove('active');
    quizSteps.forEach(s => s.classList.remove('active'));
    quizSteps[0].classList.add('active');
    Object.keys(quizAnswers).forEach(k => delete quizAnswers[k]);
});

document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('toggle', () => {
        if (item.open) {
            document.querySelectorAll('.faq-item').forEach(other => {
                if (other !== item && other.open) {
                    other.open = false;
                }
            });
        }
    });
});
