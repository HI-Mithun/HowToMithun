// src/data/resume.ts

export interface PersonalInfo {
	name: string;
	email: string;
	phone: string;
	location: string;
	photo?: string; // Optional: URL or path to a photo
	tagline?: string;
	links: {
		github?: string;
		linkedin?: string;
		chessCom?: string;
		[key: string]: string | undefined;
	};
}

export interface ExperienceEntry {
	organization: string;
	role: string;
	startDate: string;
	endDate: string | 'Present';
	responsibilities: string[];
}

export interface EducationEntry {
	institution: string;
	degree: string;
	grade?: string;
	startDate: string;
	endDate: string | 'Present';
	website?: string;
}

export interface ProjectEntry {
	title: string;
	startDate: string;
	endDate: string | 'Present';
	role?: string;
	slug?: string;
	highlights?: string[];
}

export interface SkillGroup {
	category: string;
	skills: string[];
}

export interface LanguageEntry {
	name: string;
	fluency: string;
}

export interface AwardEntry {
	title: string;
	awardingInstitution: string;
	date: string;
	description: string;
}

export interface HobbyEntry {
	title: string;
	description: string;
	links?: { label: string; href: string }[];
}



export const personalInfo: PersonalInfo = {
	name: 'Md. Hasan Imam Mithun', // TODO: confirm full display name
	email: 'hi.mithun004@gmail.com',
	phone: '+88 01822-612298',
	location: 'Dhaka, Bangladesh',
	photo: '/images/mithun-profile.jpg',
	tagline: 'Computer Science Undergraduate · Private Tutor · Chess Competitor',
	links: {
		github: 'https://github.com/HI-Mithun',
		linkedin: 'https://www.linkedin.com/in/hasan-imam-mithun/',
		chessCom: 'https://www.chess.com/member/hi_mithun',
	},
};

export const about: string =
	"I'm a Computer Science undergraduate at Dhaka International University with a hands-on interest in machine learning, software development, and technical writing. Alongside my coursework, I work as a private tutor in mathematics, English, and ICT, and have contributed to educational content development and manuscript proofreading for various publishers. Outside of technical work, I compete in chess at a university level and enjoy sketching, reading, and writing across creative and analytical formats.";

export const experience: ExperienceEntry[] = [
	{
		organization: 'Auleek Limited',
		role: 'PC Gameplay Operator',
		startDate: '2026-07-11',
		endDate: 'Present',
		responsibilities: [
			'Annotated gameplay data following detailed project guidelines',
			'Maintained high annotation quality through careful observation and consistency',
			'Maintained Identified gameplay events and documented them accurately',
		],
	},
	{
		organization: 'Self-Employed',
		role: 'Private Tutor (Mathematics, English, ICT)',
		startDate: '2021-01-01',
		endDate: 'Present',
		responsibilities: [
			'Taught mathematics and programming fundamentals to high school and college students',
			'Currently teaching English',
			'Responsible for writing and preparing teaching materials',
		],
	},
	{
		organization: 'Prottoy Coaching Center',
		role: 'Content Writer (Contractual)',
		startDate: '2023-01-01',
		endDate: '2023-09-01',
		responsibilities: [
			'Wrote and edited educational materials for secondary and higher secondary level Physics, Chemistry, Mathematics, and Biology',
			'Structured and formatted documents in Microsoft Word to maintain consistency and improve readability',
			'Reviewed academic content for accuracy, language quality, and logical organization',
		],
	},
	{
		organization: 'Freelance',
		role: 'Beta Reader & Proofreader',
		startDate: '2020-01-01',
		endDate: '2023-01-01',
		responsibilities: [
			'Reviewed translated books across multiple genres',
			'Checked linguistic accuracy and contextual consistency',
			'Provided feedback on readability and content organization',
			'Worked with editors and translators',
		],
	},
	{
		organization: 'Neurone Onuraunon, An Independent Math Club',
		role: 'Vice President',
		startDate: '2024-07-24',
		endDate: 'Present',
		responsibilities: [
			'Organized academic events',
			'Mentored students in problem-solving',
		],
	},
];

export const education: EducationEntry[] = [
	{
		institution: 'Dhaka International University',
		degree: 'B.Sc. in Computer Science & Engineering',
		grade: '3.66/4.00',
		startDate: '2022-01-01',
		endDate: '2026-02-18', // Final day attended, project defense
		website: 'https://diu.ac/',
	},
	{
		institution: 'Government K. M. H. College, Kotchandpur',
		degree: 'Higher Secondary Certificate',
		grade: '4.25/5.00',
		startDate: '2017-01-01',
		endDate: '2020-01-01',
	},
	{
		institution: 'Kotchandpur Government Model Pilot Secondary School',
		degree: 'Secondary School Certificate',
		grade: '4.32/5.00',
		startDate: '2015-01-01',
		endDate: '2017-03-31',
		
	},
];

export const projects: ProjectEntry[] = [
	{
		title: 'Personal Blog Website (Ongoing Personal Project)',
		role: 'Developer & Designer',
		startDate: '2026-08-03',
		endDate: 'Present',
		highlights: [
			'Wrote original articles and essays on technology, everyday observations, and personal experiences',
			'Designed content to engage readers through clear storytelling and relatable ideas',
			'Organized a portfolio featuring blogs, creative writing, programming, and personal projects',
			'Independently managed content planning, editing, and presentation'
		],
	},
	{
		title: 'Health Hub – Smart Healthcare Platform',
		startDate: '2025-08-01',
		endDate: '2026-02-28',
		highlights: [
			'Investigated existing automated healthcare solutions, symptom-based disease prediction systems, and digital disease surveillance platforms to understand current research trends and implementation challenges',
			'Performed comparative analysis of multiple machine learning models to evaluate prediction accuracy and model suitability',
			'Proposed and implemented an integrated healthcare platform combining disease prediction with hospital recommendation',
			'Prepared technical documentation and presented research findings as part of the undergraduate project',
		],

	},
	{
		title: 'Facial Expression Recognition using CNN (FER2013)',
		startDate: '2025-01-01',
		endDate: '2025-05-01',
		highlights: [
			'Trained convolutional neural networks for facial emotion recognition using the FER2013 dataset',
			'Applied preprocessing, normalization, and data augmentation techniques to improve model generalization',
			'Implemented model evaluation metrics to assess performance and accuracy',
			'Documented the research process and results for academic presentation',
		],
	},
	{
		title: 'Lightweight PDF Reader',
		role: 'Developer',
		startDate: '2025-06-01',
		endDate: '2025-06-20',
		highlights: [
			'Developed a lightweight PDF reader application focused on fast document loading and minimal resource usage',
			'Implemented core features including PDF viewing, page navigation, zoom controls, and document management',
			'Designed a simple and user-friendly interface to improve reading experience',
			'Implemented a dictionary feature right inside the reader',
		]
	},
];

export const skills: SkillGroup[] = [
	{ category: 'Languages & Core', skills: ['C++', 'Python', 'SQL', 'MATLAB'] },
	{ category: 'Machine Learning & Data', skills: ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'Keras'] },
	{ category: 'Tools & Platforms', skills: ['Git', 'Microsoft Office', 'Proteus', 'Arduino (Basic)'] },
	{
		category: 'Research & Writing',
		skills: [
			'Report Writing',
			'Research',
			'Field Research',
			'Documentation',
			'Content & Copywriting',
			'Proofreading',
			'Academic Writing',
		],
	},
	{ category: 'Soft Skills', skills: ['Public Speaking'] },
];

export const languages: LanguageEntry[] = [
	{ name: 'Bangla', fluency: 'Native' },
	{ name: 'English', fluency: 'Fluent' },
	{ name: 'Hindi', fluency: 'Conversational (Cannot Read)' },
	{ name: 'Arabic', fluency: 'Basic (Can Read)' },
	{ name: 'Spanish', fluency: 'Basic (I Can Say Hi! And Name a Few Things)' },
];

export const awards: AwardEntry[] = [
	{
		title: 'University Chess Champion (2025)',
		awardingInstitution: 'Dhaka International University',
		date: '2025-03-01',
		description: 'Demonstrated advanced strategic thinking, pattern recognition, and competitive performance.',
	},
];

export const hobbies: HobbyEntry[] = [
	{
		title: 'Chess',
		description:
			'Regularly play and study chess, achieving university championship recognition. Helps develop analytical thinking, pattern recognition, and decision-making under pressure. An intermediate-level player on Chess.com, with a FIDE rating.',
	},
	{
		title: 'Sketching',
		description: 'Practice digital and hand sketching, with a focus on character drawing.',
	},
	{
		title: 'Writing',
		description:
			'Write across creative and analytical formats, with experience proofreading and refining written material for clarity and structure.',
	},
	{
		title: 'Reading',
		description:
			'A dedicated reader with a particular interest in fantasy and science fiction, alongside translated literature, educational books, and magazines.',
	},
];

// Omitted until real content exists: certifications, recommendations,
// references, conferencesAndSeminars. Add typed arrays here when populated,
// then wire the corresponding section back into resume.astro.