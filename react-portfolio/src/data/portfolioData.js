// Profile and Personal Data
export const profileData = {
    name: "Jeno Aldrei A. Laurente",
    nickname: "Jeno",
    initials: "JA",
    title: "Full Stack Developer",
    roles: ["Full Stack Developer", "UI/UX Designer", "React Native Developer", "Problem Solver", "Tech Enthusiast"],
    email: "laurentejeno73@gmail.com",
    phone: "+63 947 343 0196",
    location: "Caramoan, Camarines Sur, Philippines",
    bio: "Crafting digital experiences through innovative design and robust development. Passionate about creating solutions that bridge the gap between user needs and business objectives with clean, efficient code. I specialize in building modern web and mobile applications that deliver exceptional user experiences.",
    tagline: "Available for Opportunities",
    summary: "A dedicated Full Stack Developer with 3+ years of experience in designing, developing, and deploying scalable web and mobile applications. Proven track record of delivering high-quality projects from concept to deployment. Strong expertise in React ecosystem, Node.js, and modern development practices.",
    interests: ["Web Development", "Mobile Apps", "UI/UX Design", "Open Source", "Learning New Technologies"],
    languages: ["English (Fluent)", "Filipino (Native)", "Bicol (Native)"],
    availability: "Full-time, Freelance, Contract",
    socialLinks: {
        github: "https://github.com/JenoPro",
        linkedin: "https://www.linkedin.com/in/jeno-aldrei-laurente-50038a287",
        facebook: "https://www.facebook.com/share/1BjxABqxMN/",
        telegram: "https://t.me/JenoLaurente"
    },
    stats: {
        yearsExperience: 3,
        projectsCompleted: 15,
        deployedProjects: 2,
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
        title: "Digistall",
        type: "Mobile App, Web App",
        status: "deployed",
        description: "My first deployed project! A comprehensive cross-platform mobile and web system for leasehold management in public markets. Features include real-time stall tracking, payment processing, admin dashboard, leaseholder portal, and automated notifications. Successfully funded through a pitch competition and deployed at digi-stall.com.",
        longDescription: "Digistall revolutionizes how public market stall rentals are managed. The system provides a complete solution for market administrators to manage stall assignments, track payments, send notifications, and generate reports. Leaseholders can view their stall status, make payments, and communicate with administrators through the mobile app.",
        image: "/images/Digistall.png",
        technologies: ["React Native", "Node.js", "Supabase", "PostgreSQL", "Expo", "Express.js"],
        features: [
            "Real-time stall availability tracking",
            "Secure payment integration",
            "Push notification system",
            "Admin analytics dashboard",
            "Multi-platform support (iOS, Android, Web)"
        ],
        github: "https://github.com/JenoPro/Naga-Stall.git",
        liveUrl: "http://digi-stall.com/",
        featured: true,
        completionPercentage: 90,
        role: "Lead Developer",
        duration: "8 months"
    },
    {
        id: "dubai-cultural-journey",
        title: "Dubai: A Cultural Journey",
        type: "Landing Page",
        status: "deployed",
        description: "An immersive digital e-Portfolio showcasing Dubai's rich cultural heritage and futuristic innovation. Features stunning 3D elements with Spline, parallax scrolling, smooth animations, and a modern responsive design. Created as a final project demonstrating advanced frontend skills.",
        longDescription: "Discover Dubai - Where Heritage Meets Future. This interactive landing page takes visitors on an immersive journey through the cultural tapestry of Dubai — a city where ancient traditions dance with futuristic innovation. The project showcases advanced web technologies including 3D graphics, smooth scrolling effects, and beautiful typography.",
        image: "/images/Dubai.png",
        technologies: ["HTML5", "CSS3", "JavaScript", "Spline 3D", "Font Awesome", "Responsive Design"],
        features: [
            "Stunning 3D elements with Spline viewer",
            "Parallax scrolling effects",
            "Smooth section transitions",
            "Cultural content exploration",
            "Fully responsive design"
        ],
        github: "https://github.com/JenoPro/tcw-final-project",
        liveUrl: "https://tcw-final-project.vercel.app/",
        featured: true,
        completionPercentage: 100,
        role: "Frontend Developer",
        duration: "2 weeks"
    },
    {
        id: "establishment",
        title: "Establishment Profiling System",
        type: "Web App",
        status: "in-development",
        description: "A comprehensive web application for local business profiling and tourist accommodation booking in Caramoan. This ambitious project aims to digitize local business information and connect tourists with authentic local experiences. Development is currently paused due to budget constraints but will resume with proper funding.",
        longDescription: "The Establishment Profiling System serves as a digital directory for all businesses in Caramoan, Philippines. It helps tourists discover local establishments, book accommodations, and plan their visits. For business owners, it provides a platform to showcase their services and manage bookings.",
        image: "/images/Project2.png",
        technologies: ["Vue.js", "Vuetify", "Laravel", "MySQL", "RESTful API", "Google Maps API"],
        features: [
            "Business directory with search and filters",
            "Online booking system",
            "Interactive map integration",
            "Review and rating system",
            "Business analytics dashboard"
        ],
        github: "https://github.com/VNZray/frontend.git",
        liveUrl: null,
        featured: true,
        completionPercentage: 45,
        role: "Frontend Developer",
        duration: "Ongoing"
    },
    {
        id: "enrollease",
        title: "EnrollEase",
        type: "Desktop App",
        status: "in-development",
        description: "A Java-based student enrollment system designed for educational institutions. Features centralized course management, automated scheduling, student record management, and comprehensive admin dashboard. Built with scalability in mind to handle thousands of students.",
        longDescription: "EnrollEase streamlines the entire enrollment process for educational institutions. From student registration to course selection and payment processing, the system handles it all. The admin dashboard provides real-time insights into enrollment statistics, class capacities, and financial summaries.",
        image: "/images/Project3.png",
        technologies: ["Java", "JavaFX", "Firebase", "PostgreSQL", "Scene Builder", "MVC Architecture"],
        features: [
            "Automated enrollment workflow",
            "Course prerequisite validation",
            "Payment tracking system",
            "Class schedule generation",
            "Student portal access"
        ],
        github: null,
        liveUrl: null,
        featured: true,
        completionPercentage: 35,
        role: "Full Stack Developer",
        duration: "Ongoing"
    },
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
        title: "First Deployed Project",
        description: "Successfully deployed Digistall - my first production application. A cross-platform mobile and web system for leasehold management. Secured funding through a pitch competition and launched at digi-stall.com. This milestone represents years of learning finally paying off.",
        type: "milestone",
        icon: "rocket",
        achievements: [
            "Deployed first production application",
            "Secured project funding through pitch",
            "Reached 90% completion milestone",
            "Implemented real-time features",
            "Managed end-to-end development"
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
        description: "Building robust, scalable server-side applications. I design efficient APIs and implement secure authentication systems that can handle growth.",
        technologies: ["Node.js", "Express", "Laravel", "PostgreSQL", "MongoDB", "Supabase"],
        highlights: [
            "RESTful API Design",
            "Database Optimization",
            "Authentication & Security",
            "Real-time Data Handling"
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

// EmailJS Configuration
export const emailConfig = {
    serviceId: "service_ces6v7a",
    templateId: "template_cqdks3g",
    publicKey: "QhJMTNteD8iU6t9om"
};
