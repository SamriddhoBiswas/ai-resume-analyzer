export const resumes: Resume[] = [
    {
        id: "1",
        companyName: "Google",
        jobTitle: "Frontend Developer",
        imagePath: "/images/resume_01.png",
        resumePath: "/resumes/resume-1.pdf",
        feedback: {
            overallScore: 85,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "2",
        companyName: "Microsoft",
        jobTitle: "Cloud Engineer",
        imagePath: "/images/resume_02.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 55,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "3",
        companyName: "Apple",
        jobTitle: "iOS Developer",
        imagePath: "/images/resume_03.png",
        resumePath: "/resumes/resume-3.pdf",
        feedback: {
            overallScore: 75,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "4",
        companyName: "Google",
        jobTitle: "Frontend Developer",
        imagePath: "/images/resume_01.png",
        resumePath: "/resumes/resume-1.pdf",
        feedback: {
            overallScore: 85,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "5",
        companyName: "Microsoft",
        jobTitle: "Cloud Engineer",
        imagePath: "/images/resume_02.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 55,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "6",
        companyName: "Apple",
        jobTitle: "iOS Developer",
        imagePath: "/images/resume_03.png",
        resumePath: "/resumes/resume-3.pdf",
        feedback: {
            overallScore: 75,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
];

export const AIResponseFormat = `
{
  "overallScore": <number between 0-100>,
  "ATS": {
    "score": <number between 0-100>,
    "tips": [
      {"type": "good" or "improve", "tip": "string"},
      {"type": "good" or "improve", "tip": "string"},
      {"type": "good" or "improve", "tip": "string"},
      {"type": "good" or "improve", "tip": "string"}
    ]
  },
  "toneAndStyle": {
    "score": <number between 0-100>,
    "tips": [
      {"type": "good" or "improve", "tip": "string", "explanation": "string"},
      {"type": "good" or "improve", "tip": "string", "explanation": "string"},
      {"type": "good" or "improve", "tip": "string", "explanation": "string"},
      {"type": "good" or "improve", "tip": "string", "explanation": "string"}
    ]
  },
  "content": {
    "score": <number between 0-100>,
    "tips": [
      {"type": "good" or "improve", "tip": "string", "explanation": "string"},
      {"type": "good" or "improve", "tip": "string", "explanation": "string"},
      {"type": "good" or "improve", "tip": "string", "explanation": "string"},
      {"type": "good" or "improve", "tip": "string", "explanation": "string"}
    ]
  },
  "structure": {
    "score": <number between 0-100>,
    "tips": [
      {"type": "good" or "improve", "tip": "string", "explanation": "string"},
      {"type": "good" or "improve", "tip": "string", "explanation": "string"},
      {"type": "good" or "improve", "tip": "string", "explanation": "string"},
      {"type": "good" or "improve", "tip": "string", "explanation": "string"}
    ]
  },
  "skills": {
    "score": <number between 0-100>,
    "tips": [
      {"type": "good" or "improve", "tip": "string", "explanation": "string"},
      {"type": "good" or "improve", "tip": "string", "explanation": "string"},
      {"type": "good" or "improve", "tip": "string", "explanation": "string"},
      {"type": "good" or "improve", "tip": "string", "explanation": "string"}
    ]
  }
}
`;

export const prepareInstructions = ({jobTitle, jobDescription}: { jobTitle: string; jobDescription: string; }) =>
    `You are an expert in ATS (Applicant Tracking System) and resume analysis.
Please analyze this resume and provide detailed feedback with NUMERIC SCORES (0-100) for each category.

CRITICAL: You MUST return ONLY a valid JSON object with numeric scores for every category. Do not return any text, markdown, code blocks, or explanations outside the JSON.

Job Title: ${jobTitle}
Job Description: ${jobDescription}

Analyze the resume and return feedback in this exact JSON format:
${AIResponseFormat}

IMPORTANT RULES:
1. Return ONLY the JSON object, nothing else
2. All score fields MUST be numbers between 0-100
3. Do NOT include any markdown formatting like \`\`\`json and without the backticks.
4. Do NOT include any text before or after the JSON
5. If the resume is poor, assign LOW scores (not 0 unless truly missing content)

Return the JSON response now:`;
