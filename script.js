const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
});

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
    }
});

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            animateOnScroll.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.why-card, .tip-item, .faq-item, .check-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
});

function animateCounter(el, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * eased);
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
    }
    requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count);
            animateCounter(el, target);
            statObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.querySelector(`[data-panel="${tab}"]`).classList.add('active');
    });
});

const impactBtn = document.getElementById('impactBtn');
const toggleHelmet = document.getElementById('toggleHelmet');
const impactMessage = document.getElementById('impactMessage');
const helmetGroup = document.getElementById('helmet-group');
const impactArrow = document.getElementById('impact-arrow');
const impactWaves = document.getElementById('impact-waves');
const skullGroup = document.getElementById('skull-group');
let helmetOn = true;

toggleHelmet?.addEventListener('click', () => {
    helmetOn = !helmetOn;
    helmetGroup.style.opacity = helmetOn ? '1' : '0';
    toggleHelmet.textContent = helmetOn ? 'ถอดหมวก (ทดสอบ)' : 'สวมหมวกกลับ';
    impactMessage.textContent = helmetOn
        ? 'หมวกสวมอยู่ ลองเล่นภาพจำลอง'
        : '⚠️ ไม่มีหมวกปกป้อง กดเล่นเพื่อดูผล';
});

impactBtn?.addEventListener('click', () => {
    impactBtn.disabled = true;
    impactArrow.style.transition = 'opacity 0.3s ease';
    impactArrow.style.opacity = '1';
    impactMessage.textContent = 'แรงกระแทกมาถึง...';

    setTimeout(() => {
        if (helmetOn) {
            helmetGroup.style.transition = 'transform 0.2s ease';
            helmetGroup.style.transformOrigin = '250px 150px';
            helmetGroup.style.transform = 'translateX(-6px)';
            impactWaves.style.transition = 'opacity 0.4s ease';
            impactWaves.style.opacity = '1';
            impactMessage.textContent = '✅ หมวกดูดซับแรงกระแทก สมองปลอดภัย!';
            impactMessage.style.color = '#27AE60';
        } else {
            skullGroup.style.transition = 'transform 0.2s ease';
            skullGroup.style.transformOrigin = '250px 170px';
            skullGroup.style.transform = 'translateX(8px) rotate(-3deg)';
            impactMessage.textContent = '❌ ไม่มีหมวกปกป้อง สมองเสี่ยงบาดเจ็บรุนแรง';
            impactMessage.style.color = '#E74C3C';
        }
    }, 800);

    setTimeout(() => {
        impactArrow.style.opacity = '0';
        impactWaves.style.opacity = '0';
        helmetGroup.style.transform = 'translateX(0)';
        skullGroup.style.transform = 'translateX(0) rotate(0)';
        impactBtn.disabled = false;
    }, 3000);
});

const headSizeSlider = document.getElementById('headSize');
const headSizeValue = document.getElementById('headSizeValue');
const sizeValueEl = document.getElementById('sizeValue');
const ageValueEl = document.getElementById('ageValue');
const fitAdviceEl = document.getElementById('fitAdvice');

function updateFitResult(cm) {
    headSizeValue.textContent = cm;
    let size, age, advice;
    if (cm < 44) {
        size = 'XXS';
        age = '0-12 เดือน';
        advice = '⚠️ เด็กเล็กมาก ไม่แนะนำให้นั่งมอเตอร์ไซค์';
    } else if (cm < 48) {
        size = 'XS';
        age = '1-3 ปี';
        advice = 'ขนาดเล็กสำหรับเด็กวัยหัดเดิน เลือกแบบน้ำหนักเบา';
    } else if (cm < 51) {
        size = 'S';
        age = '3-5 ปี';
        advice = 'ขนาดมาตรฐานสำหรับเด็กเล็ก เลือกลายที่ลูกชอบ';
    } else if (cm < 54) {
        size = 'M';
        age = '5-8 ปี';
        advice = 'ขนาดกลางสำหรับวัยเริ่มเรียน เน้นมาตรฐาน มอก. 369';
    } else if (cm < 57) {
        size = 'L';
        age = '8-12 ปี';
        advice = 'ขนาดใหญ่สำหรับเด็กโต ระวังน้ำหนักไม่ให้หนักเกิน';
    } else {
        size = 'XL';
        age = '12+ ปี';
        advice = 'ใกล้เคียงหมวกผู้ใหญ่ แต่ยังควรใช้หมวกเด็กโต';
    }
    sizeValueEl.textContent = size;
    ageValueEl.textContent = age;
    fitAdviceEl.textContent = advice;
}

headSizeSlider?.addEventListener('input', (e) => updateFitResult(parseFloat(e.target.value)));
if (headSizeSlider) updateFitResult(parseFloat(headSizeSlider.value));

const quizAnswers = {};
const quizSteps = document.querySelectorAll('.quiz-step');
const quizResult = document.querySelector('.quiz-result');
const resultText = document.querySelector('.result-text');
const quizRestart = document.querySelector('.quiz-restart');
const progressBar = document.getElementById('quizProgress');

function updateProgress(step) {
    if (progressBar) progressBar.style.width = `${(step / 3) * 100}%`;
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
            updateProgress(stepNumber + 1);
        } else {
            showQuizResult();
            updateProgress(3);
        }
    });
});

function showQuizResult() {
    const age = quizAnswers.step1;
    const activity = quizAnswers.step2;
    const budget = quizAnswers.step3;

    let rec = '';

    if (age === 'baby') {
        rec += '⚠️ เด็กต่ำกว่า 1 ปี ไม่ควรนั่งมอเตอร์ไซค์หรือจักรยาน กล้ามเนื้อคอยังไม่แข็งแรง ';
    } else if (age === 'toddler') {
        rec += 'เด็กวัย 1-3 ปี ต้องใช้หมวกไซส์ XS เลือกน้ำหนักเบา 300g ';
    } else if (age === 'preschool') {
        rec += 'เด็กวัย 3-6 ปี เหมาะกับหมวกไซส์ S-M ให้ลูกเลือกลายเอง ';
    } else {
        rec += 'เด็กวัย 6-12 ปี เหมาะกับหมวกไซส์ M-L มาตรฐานครบ ';
    }

    if (activity === 'motorcycle') {
        rec += 'เลือก หมวกนิรภัยมอเตอร์ไซค์ แบบครอบครึ่งหรือเต็มใบ มี มอก. 369 ';
    } else if (activity === 'bicycle') {
        rec += 'เลือก หมวกจักรยาน เบา ระบายอากาศดี มีมาตรฐาน CPSC หรือ EN 1078 ';
    } else if (activity === 'skate') {
        rec += 'เลือก หมวกสเก็ต ทรงกลมครอบท้ายทอย รับแรงกระแทกหลายทิศ ';
    } else {
        rec += 'แนะนำหมวก 2 ใบ: หมวกมอเตอร์ไซค์ (มอก.369) และ หมวกจักรยาน/สเก็ต แยกกิจกรรม ';
    }

    if (budget === 'budget') {
        rec += 'งบต่ำกว่า 1,000 บาท ยังหาหมวกได้มาตรฐาน เน้นดูสัญลักษณ์ มอก. บนหมวก';
    } else if (budget === 'mid') {
        rec += 'งบ 1,000-2,000 บาท ได้หมวกคุณภาพดี ลายสวย น้ำหนักเบา';
    } else {
        rec += 'งบมากกว่า 2,000 บาท เลือกรุ่น Premium มีการระบายอากาศดี และน้ำหนักเบามาก';
    }

    quizSteps.forEach(s => s.classList.remove('active'));
    resultText.textContent = rec;
    quizResult.classList.add('active');
}

quizRestart?.addEventListener('click', () => {
    quizResult.classList.remove('active');
    quizSteps.forEach(s => s.classList.remove('active'));
    quizSteps[0].classList.add('active');
    Object.keys(quizAnswers).forEach(k => delete quizAnswers[k]);
    updateProgress(1);
});

document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('toggle', () => {
        if (item.open) {
            document.querySelectorAll('.faq-item').forEach(other => {
                if (other !== item && other.open) other.open = false;
            });
        }
    });
});
