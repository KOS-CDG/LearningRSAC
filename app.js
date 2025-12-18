// --- Data Structure (Curriculum) ---
const CURRICULUM = {
    statistics: [
        {
            id: 's1', title: 'Descriptive Statistics', 
            content: `<h3>Foundations of Data</h3><p>We begin by distinguishing between populations and samples. In intermediate statistics, understanding the <strong>Central Limit Theorem</strong> is paramount. It states that the sampling distribution of the sample mean approximates a normal distribution as the sample size becomes larger.</p><div class="code-block"><pre>Mean (μ) = Σx / N \nStandard Deviation (σ) = √[ Σ(x-μ)² / N ]</pre></div><p>We will examine skewness and kurtosis in financial datasets using the provided CSV.</p>`,
            quiz: [{ q: "What does Central Limit Theorem approximate?", options: ["Normal Dist", "Poisson", "Binomial"], a: 0 }]
        },
        { id: 's2', title: 'Regression Analysis', content: `<h3>Linear & Multiple Regression</h3><p>Regression allows us to model the relationship between a dependent variable and one or more independent variables.</p><ul><li>R-Squared: Goodness of fit</li><li>Homoscedasticity: Constant variance of errors</li></ul>`, quiz: [] },
        { id: 's3', title: 'Statistical Inference', content: `<h3>Hypothesis Testing</h3><p>Deep dive into p-values, Type I and Type II errors within the context of clinical trials.</p>`, quiz: [] },
        { id: 's4', title: 'ANOVA & Design', content: `<h3>Analysis of Variance</h3><p>Comparing means across 3+ groups. Post-hoc tests (Tukey HSD) are crucial when null is rejected.</p>`, quiz: [] },
        { id: 's5', title: 'Non-Parametric', content: `<h3>Distribution-Free Tests</h3><p>Wilcoxon Signed-Rank and Kruskal-Wallis tests for when normality assumptions fail.</p>`, quiz: [] },
        { id: 's6', title: 'Multivariate Analysis', content: `<h3>PCA & Clustering</h3><p>Principal Component Analysis to reduce dimensionality in large datasets.</p>`, quiz: [] },
        { id: 's7', title: 'Time Series', content: `<h3>ARIMA & Forecasting</h3><p>Predicting future data points (stock prices, weather) based on historical trends.</p>`, quiz: [] },
        { id: 's8', title: 'Capstone Project', content: `<h3>End-to-End Analysis</h3><p>Download the 'Global Health' dataset and perform a complete survival analysis using R or Python.</p>`, quiz: [] }
    ],
    apa: [
        { id: 'a1', title: 'APA 7 Fundamentals', content: `<h3>The Author-Date System</h3><p>APA 7th edition emphasizes bias-free language. For in-text citations: (Smith, 2023) or Smith (2023).</p>`, quiz: [] },
        { id: 'a2', title: 'Source Types Mastery', content: `<h3>Digital Object Identifiers (DOIs)</h3><p>Always format DOIs as hyperlinks: https://doi.org/10.xxxx/xxxx.</p>`, quiz: [] },
        { id: 'a3', title: 'Advanced Formatting', content: `<h3>Tables and Figures</h3><p>Tables must have a concise title and variable notes. No vertical lines.</p>`, quiz: [] },
        { id: 'a4', title: 'Special Materials', content: `<h3>Legal & Code</h3><p>Citing GitHub repositories, court cases, and AI generated content.</p>`, quiz: [] },
        { id: 'a5', title: 'Paper Architecture', content: `<h3>The Final Output</h3><p>Abstract, keywords, and reference list indentation rules.</p>`, quiz: [] }
    ],
    webdev: [
        { id: 'w1', title: 'HTML5 Semantic Mastery', content: `<h3>Beyond div soup</h3><p>Using <article>, <section>, <aside> for better SEO and Accessibility.</p>`, quiz: [] },
        { id: 'w2', title: 'CSS Grid & Flexbox', content: `<h3>Modern Layouts</h3><p>Implementing the 12-column grid system used in this very application.</p>`, quiz: [] },
        { id: 'w3', title: 'Responsive Design', content: `<h3>Container Queries</h3><p>The new era of responsiveness: @container instead of just @media.</p>`, quiz: [] },
        { id: 'w4', title: 'JS Intermediate', content: `<h3>ES6+ Features</h3><p>Destructuring, Spread Operator, and Modules.</p>`, quiz: [] },
        { id: 'w5', title: 'GSAP Animation', content: `<h3>Timeline Control</h3><p>Sequencing complex animations for luxury feel.</p>`, quiz: [] },
        { id: 'w6', title: 'Real World Projects', content: `<h3>Building the Portfolio</h3><p>Creating a dark-mode portfolio with smooth scrolling.</p>`, quiz: [] },
        { id: 'w7', title: 'Web3 Integration', content: `<h3>Connecting Wallets</h3><p>Using Ethers.js to interact with the Ethereum blockchain.</p>`, quiz: [] }
    ]
};

// --- App State ---
const state = {
    currentTab: 'hero', // statistics, apa, webdev, dashboard
    currentModuleId: null,
    walletAddress: null,
    completedModules: JSON.parse(localStorage.getItem('sovereign_progress')) || []
};

// --- Core Logic ---

const app = {
    init: () => {
        app.setupListeners();
        app.animateHero();
    },

    setupListeners: () => {
        // Tab Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                app.switchTab(tab);
            });
        });

        // Wallet Connect
        document.getElementById('wallet-btn').addEventListener('click', app.connectWallet);
    },

    switchTab: (tabName) => {
        // Update UI
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`.nav-btn[data-tab="${tabName}"]`);
        if(activeBtn) activeBtn.classList.add('active');

        // Logic
        if (tabName === 'dashboard') {
            app.renderDashboard();
            app.toggleView('dashboard-interface');
        } else {
            // Load Course Content
            const courseData = CURRICULUM[tabName];
            if (courseData) {
                app.renderSidebar(courseData, tabName);
                app.toggleView('learning-interface');
                // Auto load first module
                app.loadModule(courseData[0], tabName);
            }
        }
        
        state.currentTab = tabName;
    },

    toggleView: (viewId) => {
        document.getElementById('hero').classList.add('hidden');
        document.getElementById('learning-interface').classList.add('hidden');
        document.getElementById('dashboard-interface').classList.add('hidden');
        
        const target = document.getElementById(viewId);
        target.classList.remove('hidden');
        
        // GSAP Fade In
        gsap.fromTo(target, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5});
    },

    renderSidebar: (modules, category) => {
        const list = document.getElementById('module-list');
        list.innerHTML = '';
        document.getElementById('current-course-title').innerText = category.toUpperCase();

        modules.forEach(mod => {
            const div = document.createElement('div');
            div.className = `module-item ${state.currentModuleId === mod.id ? 'active' : ''}`;
            
            // Check if completed (has NFT)
            const isDone = state.completedModules.includes(mod.id);
            const statusIcon = isDone ? '<i class="fa-solid fa-check" style="color:var(--gold)"></i>' : `<i class="fa-regular fa-circle"></i>`;

            div.innerHTML = `<h4>${mod.title}</h4><span>${statusIcon} Unit ${mod.id.toUpperCase()}</span>`;
            div.onclick = () => app.loadModule(mod, category);
            list.appendChild(div);
        });
    },

    loadModule: (module, category) => {
        state.currentModuleId = module.id;
        
        // Update Sidebar Styles
        app.renderSidebar(CURRICULUM[category], category); // Re-render to update active state
        
        // Update Content
        document.getElementById('module-badge').innerText = `${category} // ${module.id}`;
        document.getElementById('module-title').innerText = module.title;
        document.getElementById('content-body').innerHTML = module.content;

        // Reset Quiz
        const quizSection = document.getElementById('quiz-section');
        if (module.quiz && module.quiz.length > 0) {
            quizSection.classList.remove('hidden');
            app.renderQuiz(module.quiz, module.id);
        } else {
            quizSection.classList.add('hidden');
        }
    },

    renderQuiz: (questions, modId) => {
        const container = document.getElementById('quiz-questions');
        container.innerHTML = '';
        
        // Simple demo quiz render
        questions.forEach((q, idx) => {
            let html = `<div class="quiz-item"><p><strong>Q:</strong> ${q.q}</p>`;
            q.options.forEach((opt, oIdx) => {
                html += `<label><input type="radio" name="q${idx}" value="${oIdx}"> ${opt}</label><br>`;
            });
            html += `</div>`;
            container.innerHTML += html;
        });

        document.getElementById('submit-quiz').onclick = () => app.completeModule(modId);
    },

    completeModule: (modId) => {
        if (!state.walletAddress) {
            alert("Please connect wallet to mint completion NFT.");
            return;
        }
        
        if (!state.completedModules.includes(modId)) {
            state.completedModules.push(modId);
            localStorage.setItem('sovereign_progress', JSON.stringify(state.completedModules));
            
            // Simulating Web3 Transaction
            const btn = document.getElementById('submit-quiz');
            const originalText = btn.innerText;
            btn.innerText = "Minting on Ethereum...";
            
            setTimeout(() => {
                btn.innerText = "Minted! 🏅";
                btn.style.background = "#006039";
                alert(`NFT Badge for Module ${modId} minted to ${state.walletAddress}`);
                app.renderSidebar(CURRICULUM[state.currentTab], state.currentTab);
            }, 2000);
        }
    },

    connectWallet: async () => {
        // Mocking Ethers.js behavior for demo purposes
        // In real app: const provider = new ethers.BrowserProvider(window.ethereum)
        if (window.ethereum || true) { 
            const btn = document.getElementById('wallet-btn');
            btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Connecting...`;
            
            setTimeout(() => {
                state.walletAddress = "0x71C...9A23";
                btn.innerHTML = `<i class="fa-solid fa-wallet"></i> 0x71C...9A23`;
                btn.classList.add('connected');
                app.updateDashboardWallet();
            }, 1000);
        }
    },

    renderDashboard: () => {
        // Update NFT Grid
        const gallery = document.getElementById('nft-gallery');
        gallery.innerHTML = '';
        state.completedModules.forEach(mod => {
            gallery.innerHTML += `<div class="nft-badge" title="${mod}"><i class="fa-solid fa-certificate"></i></div>`;
        });

        // Update Progress Bar
        const totalModules = 8 + 5 + 7; // Stat + APA + Web
        const progress = (state.completedModules.length / totalModules) * 100;
        document.querySelector('.progress-fill').style.width = `${progress}%`;
    },

    updateDashboardWallet: () => {
        if(state.walletAddress) {
            document.getElementById('dash-wallet').innerText = `Connected: ${state.walletAddress} (Network: Goerli)`;
            document.getElementById('dash-wallet').style.color = 'var(--rolex-green)';
        }
    },

    animateHero: () => {
        gsap.from(".reveal-text", { y: 50, opacity: 0, duration: 1, delay: 0.5 });
        gsap.from(".hero-sub", { y: 30, opacity: 0, duration: 1, delay: 0.8 });
        gsap.from(".gold-btn-solid", { y: 20, opacity: 0, duration: 1, delay: 1 });
    }
};

// Start
document.addEventListener('DOMContentLoaded', app.init);