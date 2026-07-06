// Profile and Personal Data
export const profileData = {
    name: "Jeno Aldrei A. Laurente",
    nickname: "Jeno",
    initials: "JA",
    title: "Full Stack Developer",
    roles: ["Full Stack Developer", "UI/UX Designer", "React Native Developer", "Problem Solver", "Tech Enthusiast"],
    email: "jenoaldrei.official@gmail.com",
    phone: "+63 947 343 0196",
    location: "Milaor, Camarines Sur, Philippines",
    bio: "Crafting digital experiences through innovative design and robust development. Passionate about creating solutions that bridge the gap between user needs and business objectives with clean, efficient code. I specialize in building modern web and mobile applications that deliver exceptional user experiences.",
    tagline: "Ready for work",
    summary: "A dedicated Full Stack Developer with 3+ years of experience in designing, developing, and deploying scalable web and mobile applications. Proven track record of delivering high-quality projects from concept to deployment. Strong expertise in React ecosystem, Node.js, and modern development practices.",
    interests: ["Web Development", "Mobile Apps", "UI/UX Design", "Open Source", "Learning New Technologies"],
    languages: ["English (Fluent)", "Filipino (Native)", "Bicol (Native)"],
    availability: "Full-time, Freelance, Contract",
    socialLinks: {
        github: "https://github.com/JenoPro",
        linkedin: "https://www.linkedin.com/in/jeno-aldrei-laurente-50038a287",
        facebook: "https://www.facebook.com/profile.php?id=61587077348977",
        telegram: "https://t.me/JenoLaurente"
    },
    stats: {
        yearsExperience: 4,
        projectsCompleted: 18,
        deployedProjects: 3,
        technologies: 20,
        gitCommits: 500,
        linesOfCode: 50000
    }
};

// Skills Data with Categories
export const skillsData = {
    languages: [
        { name: "JavaScript", icon: "js", level: 90, color: "#f7df1e" },
        { name: "TypeScript", icon: "ts", level: 80, color: "#3178c6" },
        { name: "Java", icon: "java", level: 85, color: "#ed8b00" },
        { name: "Python", icon: "python", level: 75, color: "#3776ab" },
        { name: "PHP", icon: "php", level: 70, color: "#777bb4" },
        { name: "HTML/CSS", icon: "html", level: 95, color: "#e34f26" }
    ],
    frontend: [
        { name: "React", icon: "react", level: 90, color: "#61dafb" },
        { name: "Vue.js", icon: "vue", level: 85, color: "#4fc08d" },
        { name: "React Native", icon: "react", level: 85, color: "#61dafb" },
        { name: "Next.js", icon: "nextjs", level: 75, color: "#ffffff" },
        { name: "Tailwind CSS", icon: "tailwind", level: 90, color: "#06b6d4" },
        { name: "Framer Motion", icon: "framer", level: 80, color: "#ff0055" }
    ],
    backend: [
        { name: "Node.js", icon: "node", level: 85, color: "#339933" },
        { name: "Express.js", icon: "express", level: 80, color: "#ffffff" },
        { name: "Laravel", icon: "laravel", level: 75, color: "#ff2d20" },
        { name: "Supabase", icon: "supabase", level: 85, color: "#3ecf8e" },
        { name: "Firebase", icon: "firebase", level: 80, color: "#ffca28" }
    ],
    database: [
        { name: "PostgreSQL", icon: "postgresql", level: 80, color: "#336791" },
        { name: "MongoDB", icon: "mongodb", level: 75, color: "#47a248" },
        { name: "MySQL", icon: "mysql", level: 75, color: "#4479a1" }
    ],
    tools: [
        { name: "Git", icon: "git", level: 90, color: "#f05032" },
        { name: "Figma", icon: "figma", level: 85, color: "#f24e1e" },
        { name: "VS Code", icon: "vscode", level: 95, color: "#007acc" },
        { name: "Docker", icon: "docker", level: 65, color: "#2496ed" }
    ]
};

// Projects Data with Enhanced Information
export const projectsData = [
    {
        id: "digistall",
        title: "Digistall - Leasehold Management System",
        type: "Mobile App, Web App",
        status: "deployed",
        description: "Led development of a comprehensive cross-platform mobile and web system for public market leasehold management. Our team was selected as Startup Founders by the Naga City Government. Secured funding through a pitch competition. Successfully deployed with real-time stall tracking, payment processing, and automated notifications.",
        longDescription: "Led development of a comprehensive cross-platform mobile and web system for public market leasehold management. Our team was selected as Startup Founders by the Naga City Government. Secured funding through a pitch competition. Successfully deployed with real-time stall tracking, payment processing, and automated notifications.",
        image: "/images/Digistall.png",
        technologies: ["React Native", "Node.js", "Supabase", "PostgreSQL", "Expo"],
        features: [
            "Real-time stall availability tracking",
            "Secure payment integration",
            "Push notification system",
            "Admin analytics dashboard",
            "Multi-platform support"
        ],
        github: null,
        liveUrl: null,
        featured: true,
        completionPercentage: 100,
        role: "Lead Developer & Co-Founder",
        duration: "2025 - 2026"
    },
    {
        id: "kusinakonek",
        title: "KusinaKonek",
        type: "Mobile App",
        status: "deployed",
        description: "KusinaKonek is a community-driven food redistribution mobile application that bridges the gap between food donors and recipients in need, reducing food waste and fighting hunger.",
        longDescription: "KusinaKonek (from Filipino — Kusina \"kitchen\" + Konek \"connect\") is a community-driven food redistribution mobile application. Its primary purpose is to bridge the gap between food donors (such as households, organizations, or restaurants) and recipients in need, reducing food waste and fighting hunger. The codebase manages the entire lifecycle of a food donation: Donors can list surplus food, drop pins on an interactive map for pickup, and track claims. Recipients can browse food nearby, add items to a cart (reserving them for 15 minutes), navigate to the location, and provide feedback upon receipt. Administrators/System Processes handle automated claim timeouts, food expiry, and user bans for unfulfilled claims.",
        image: "/images/KUSINAKONEK-NEW-LOGO.png",
        technologies: ["React Native (TSX)", "Express.js", "Supabase", "Expo"],
        features: [
            "Food sharing platform",
            "Interactive map for pickup",
            "Claim tracking and automated timeouts",
            "Beta testing on PlayStore"
        ],
        github: null,
        liveUrl: null,
        featured: true,
        completionPercentage: 95,
        role: "Full Stack Developer",
        duration: "2026"
    },
    {
        id: "dubai-cultural-journey",
        title: "Dubai: A Cultural Journey",
        type: "Landing Page",
        status: "deployed",
        description: "Created an immersive digital e-Portfolio showcasing Dubai's cultural heritage featuring stunning 3D elements with Spline, parallax scrolling, and smooth animations.",
        longDescription: "Created an immersive digital e-Portfolio showcasing Dubai's cultural heritage featuring stunning 3D elements with Spline, parallax scrolling, and smooth animations. Created as a final project demonstrating advanced frontend skills.",
        image: "/images/Dubai.png",
        technologies: ["HTML5", "CSS3", "JavaScript", "Spline 3D"],
        features: [
            "Stunning 3D elements with Spline viewer",
            "Parallax scrolling effects",
            "Smooth animations",
            "Immersive digital e-Portfolio"
        ],
        github: null,
        liveUrl: null,
        featured: true,
        completionPercentage: 100,
        role: "Frontend Developer",
        duration: "2025"
    },
    {
        id: "acota",
        title: "ACOTA - Business Profiling System",
        type: "Web App",
        status: "in-development",
        description: "Developing a comprehensive web application for local business profiling and tourist accommodation booking in Caramoan for local government use.",
        longDescription: "Developing a comprehensive web application for local business profiling and tourist accommodation booking in Caramoan for local government use. Features interactive map integration and booking system.",
        image: "/images/Project2.png",
        technologies: ["Vue.js", "Vuetify", "Laravel", "MySQL"],
        features: [
            "Business profiling",
            "Tourist accommodation booking",
            "Interactive map integration",
            "Local government use"
        ],
        github: null,
        liveUrl: null,
        featured: true,
        completionPercentage: 70,
        role: "Frontend Developer",
        duration: "2024"
    }
];

// Expanded Journey/Roadmap Data - Chronological Order (oldest to newest)
export const journeyData = [
    {
        year: "2022",
        title: "Web Development Journey Begins",
        description: "Started my journey into web development with HTML, CSS, and JavaScript. Discovered my passion for creating digital experiences and solving problems through code. This marked the beginning of an exciting career path.",
        type: "education",
        icon: "book",
        achievements: [
            "HTML5 & CSS3 foundations",
            "JavaScript ES6+ proficiency",
            "Responsive design principles",
            "Git version control basics",
            "First portfolio website created"
        ]
    },
    {
        year: "2022",
        title: "Java & Desktop Development",
        description: "Learned Java and JavaFX for building robust desktop applications. Started developing EnrollEase enrollment system. Gained strong understanding of Object-Oriented Programming principles and design patterns.",
        type: "skill",
        icon: "desktop",
        achievements: [
            "Object-Oriented Programming mastery",
            "JavaFX UI development",
            "Database integration with JDBC",
            "MVC architecture implementation",
            "Desktop application deployment"
        ]
    },
    {
        year: "2023",
        title: "Vue.js & Enterprise Apps",
        description: "Started building enterprise-level applications with Vue.js and Vuetify. Developed the Establishment Profiling System for local government use. Learned state management patterns and component-based architecture at scale.",
        type: "project",
        icon: "code",
        achievements: [
            "Vue.js ecosystem mastery",
            "Component-based architecture",
            "Vuex state management",
            "Enterprise application development",
            "Government project collaboration"
        ]
    },
    {
        year: "2024",
        title: "Full Stack Development",
        description: "Expanded expertise to backend technologies, becoming a true full-stack developer. Mastered Node.js, Express, Supabase, and various database systems. Learned to design RESTful APIs and implement real-time data synchronization.",
        type: "skill",
        icon: "server",
        achievements: [
            "Built scalable backend APIs",
            "Database design and optimization",
            "Real-time data handling with Supabase",
            "Authentication and authorization",
            "API security best practices"
        ]
    },
    {
        year: "2025",
        title: "React Native Mastery",
        description: "Deep dive into mobile development with React Native. Built cross-platform applications with native performance and smooth animations. Learned to work with device APIs, push notifications, and app store deployment processes.",
        type: "skill",
        icon: "mobile",
        achievements: [
            "Built production-ready mobile apps",
            "Mastered Expo and CLI workflows",
            "Integrated native modules",
            "Implemented push notifications",
            "Published to app stores"
        ]
    },
    {
        year: "2026",
        title: "First Deployed Project & Startup Founder",
        description: "Successfully deployed Digistall - my first production application. Our team was selected as Startup Founders by the Naga City Government. This funded start-up delivers a comprehensive cross-platform mobile and web system for leasehold management. Secured funding through a pitch competition and launched at digi-stall.com.",
        type: "milestone",
        icon: "rocket",
        achievements: [
            "Selected as Startup Founder by Naga City Government",
            "Deployed first production application",
            "Secured project funding through pitch competition",
            "Implemented real-time features",
            "Managed end-to-end development"
        ]
    },
    {
        year: "Ongoing",
        title: "Continuous Growth",
        description: "The journey continues! I am deeply committed to lifelong learning, constantly gaining new experiences, and refining my craft. I'm always exploring new technologies and seeking challenges that help me grow as a developer.",
        type: "skill",
        icon: "book",
        achievements: [
            "Continuously Learning",
            "Gaining New Experiences",
            "Exploring Emerging Tech",
            "Refining Development Skills",
            "Open to New Challenges"
        ]
    }
];

// Services/Expertise Data with More Detail
export const expertiseData = [
    {
        icon: "code",
        title: "Frontend Development",
        description: "Crafting beautiful, responsive user interfaces with modern frameworks. I focus on creating fast, accessible, and visually stunning web experiences that users love.",
        technologies: ["React", "Vue.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        highlights: [
            "Single Page Applications (SPA)",
            "Progressive Web Apps (PWA)",
            "Responsive & Mobile-first Design",
            "Performance Optimization"
        ]
    },
    {
        icon: "server",
        title: "Backend Development",
        description: "Building robust, scalable server-side applications and automation workflows. I design efficient APIs and implement secure authentication systems.",
        technologies: ["Node.js", "Express", "Laravel", "Supabase"],
        highlights: [
            "RESTful API Design",
            "Database Optimization",
            "Authentication & Security",
            "No-Code/Low-Code Automation"
        ]
    },
    {
        icon: "smartphone",
        title: "Mobile Development",
        description: "Creating cross-platform mobile applications with React Native. I deliver native-like experiences on both iOS and Android from a single codebase.",
        technologies: ["React Native", "Expo", "Firebase", "Supabase", "Push Notifications"],
        highlights: [
            "Cross-platform Development",
            "Native Module Integration",
            "App Store Deployment",
            "Offline-first Architecture"
        ]
    },
    {
        icon: "palette",
        title: "UI/UX Design",
        description: "Designing intuitive user experiences through research, wireframing, and prototyping. I create designs that are both beautiful and functional.",
        technologies: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems"],
        highlights: [
            "User-Centered Design",
            "Wireframing & Prototyping",
            "Design System Creation",
            "Usability Testing"
        ]
    }
];

// Education Data
export const educationData = [
    {
        degree: "Bachelor of Science in Information Technology",
        school: "Your University Name",
        year: "2020 - 2024",
        description: "Focused on software development, database management, and web technologies.",
        achievements: ["Dean's Lister", "Best Capstone Project", "Tech Club President"]
    }
];

// Certifications Data
export const certificationsData = [
    {
        name: "React Developer Certification",
        issuer: "Meta",
        year: "2024",
        credentialUrl: "#"
    },
    {
        name: "JavaScript Algorithms and Data Structures",
        issuer: "freeCodeCamp",
        year: "2023",
        credentialUrl: "#"
    }
];

// Hobbies & Interests Data
export const hobbiesData = [
    {
        icon: "gamepad",
        title: "Gaming",
        description: "Online games enthusiast - both mobile and PC gaming"
    },
    {
        icon: "crown",
        title: "Chess",
        description: "Strategic thinking through the classic game of chess"
    },
    {
        icon: "music",
        title: "Music",
        description: "Old rock and punk music lover"
    },
    {
        icon: "mountain",
        title: "Nature Trips",
        description: "Exploring the outdoors and connecting with nature"
    },
    {
        icon: "book",
        title: "Reading",
        description: "Manga and Manhwa enthusiast"
    },
    {
        icon: "film",
        title: "Movies & Anime",
        description: "Watching movies and anime in my downtime"
    }
];
