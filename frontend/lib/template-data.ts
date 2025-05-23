"use client"

import {
  Code,
  FileText,
  Mail,
  Lightbulb,
  MessageSquare,
  Brain,
  FileCode,
  Briefcase,
  PenTool,
  Zap,
  BookOpen,
  Users,
  BarChart3,
} from "lucide-react"

export const templateData = [
  {
    id: 1,
    name: "Content Summarizer",
    description: "Summarize long articles, documents, or text into concise key points.",
    category: "writing",
    tags: ["Summarization", "Content"],
    uses: 1248,
    isFeatured: true,
    icon: FileText,
    content: `# Content Summarizer

Instructions: Paste the content you want to summarize below.

I want you to summarize the following text into:
1. A one-sentence summary
2. A one-paragraph summary (3-5 sentences)
3. A bullet-point list of the key points (5-7 points)

Text to summarize:
[Paste your content here]`,
    examples: [
      {
        title: "Research Paper Summary",
        prompt: "Summarize this research paper on climate change impacts...",
        response:
          "One-sentence: The paper concludes that climate change will significantly impact coastal regions by 2050...",
      },
      {
        title: "News Article Summary",
        prompt: "Summarize this news article about the tech industry...",
        response: "One-sentence: The article discusses how AI advancements are reshaping job markets...",
      },
    ],
  },
  {
    id: 2,
    name: "Email Composer",
    description: "Generate professional emails based on your requirements and tone.",
    category: "business",
    tags: ["Email", "Communication"],
    uses: 982,
    isFeatured: true,
    icon: Mail,
    content: `# Email Composer

Instructions: Fill in the details below to generate a professional email.

Purpose of email: [meeting request/follow-up/introduction/etc.]
Recipient: [colleague/client/manager/etc.]
Tone: [formal/friendly/urgent/etc.]
Key points to include:
- [Point 1]
- [Point 2]
- [Point 3]

Additional context:
[Any other information that might be helpful]`,
    examples: [
      {
        title: "Meeting Request",
        prompt:
          "Purpose: Meeting request\nRecipient: Potential client\nTone: Professional but friendly\nKey points: Discuss our services, Schedule a 30-minute call, Share portfolio",
        response:
          "Subject: Request for a Brief Meeting to Discuss Our Services\n\nDear [Recipient],\n\nI hope this email finds you well...",
      },
      {
        title: "Project Follow-up",
        prompt:
          "Purpose: Project follow-up\nRecipient: Team manager\nTone: Professional\nKey points: Project status update, Challenges faced, Request for resources",
        response:
          "Subject: Project Status Update and Resource Request\n\nHi [Manager's Name],\n\nI'm writing to provide an update on the current status of the [Project Name]...",
      },
    ],
  },
  {
    id: 3,
    name: "Code Explainer",
    description: "Get line-by-line explanations of code snippets in plain English.",
    category: "coding",
    tags: ["Programming", "Learning"],
    uses: 756,
    isFeatured: false,
    icon: Code,
    content: `# Code Explainer

Instructions: Paste your code snippet below for a detailed explanation.

Programming language: [language]
Experience level: [beginner/intermediate/advanced]

I need an explanation of:
- Overall purpose of the code
- Line-by-line breakdown
- Any potential improvements or best practices

Code:
\`\`\`
[Paste your code here]
\`\`\``,
    examples: [
      {
        title: "Python Function Explanation",
        prompt:
          "Language: Python\nExperience: Beginner\nCode: ```python\ndef fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a```",
        response:
          "# Code Explanation\n\n## Overall Purpose\nThis function calculates the nth Fibonacci number using an iterative approach...\n\n## Line-by-Line Breakdown\n1. `def fibonacci(n):` - Defines a function named 'fibonacci' that takes one parameter 'n'...",
      },
      {
        title: "JavaScript Promise Explanation",
        prompt:
          "Language: JavaScript\nExperience: Intermediate\nCode: ```javascript\nconst fetchData = () => {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      resolve('Data received');\n    }, 2000);\n  });\n};```",
        response:
          "# Code Explanation\n\n## Overall Purpose\nThis JavaScript function creates and returns a Promise that simulates an asynchronous data fetch operation...\n\n## Line-by-Line Breakdown\n1. `const fetchData = () => {` - Declares an arrow function named 'fetchData'...",
      },
    ],
  },
  {
    id: 4,
    name: "Interview Question Generator",
    description: "Create relevant interview questions for any job position.",
    category: "business",
    tags: ["Recruitment", "HR"],
    uses: 543,
    isFeatured: false,
    icon: MessageSquare,
    content: `# Interview Question Generator

Instructions: Fill in the details below to generate tailored interview questions.

Job position: [position title]
Experience level: [entry/mid/senior]
Skills to assess: [skill 1, skill 2, skill 3]
Interview stage: [phone screening/technical/behavioral/final]

Generate:
- Technical questions (with expected answers)
- Behavioral questions
- Problem-solving scenarios
- Questions to assess cultural fit`,
    examples: [
      {
        title: "Frontend Developer Questions",
        prompt:
          "Job position: Frontend Developer\nExperience level: Mid\nSkills to assess: React, JavaScript, CSS\nInterview stage: Technical",
        response:
          "# Frontend Developer Interview Questions\n\n## Technical Questions\n1. **Can you explain the virtual DOM in React and why it's important?**\n   *Expected answer: The virtual DOM is a lightweight copy of the actual DOM...*\n\n2. **What's the difference between 'let', 'const', and 'var' in JavaScript?**...",
      },
      {
        title: "Product Manager Questions",
        prompt:
          "Job position: Product Manager\nExperience level: Senior\nSkills to assess: Strategy, User Research, Roadmapping\nInterview stage: Behavioral",
        response:
          "# Senior Product Manager Interview Questions\n\n## Behavioral Questions\n1. **Describe a situation where you had to make a difficult product decision with limited data.**\n\n2. **Tell me about a time when you had to prioritize features for a product roadmap...**",
      },
    ],
  },
  {
    id: 5,
    name: "Story Generator",
    description: "Create creative short stories based on a few input parameters.",
    category: "creative",
    tags: ["Writing", "Creative"],
    uses: 892,
    isFeatured: true,
    icon: Lightbulb,
    content: `# Story Generator

Instructions: Fill in the details below to generate a creative short story.

Genre: [fantasy/sci-fi/mystery/romance/horror/etc.]
Setting: [time period and location]
Main character: [brief description]
Plot elements:
- [Element 1]
- [Element 2]
- [Element 3]

Tone: [humorous/dark/inspirational/etc.]
Story length: [flash fiction/short story/etc.]`,
    examples: [
      {
        title: "Sci-Fi Adventure",
        prompt:
          "Genre: Science Fiction\nSetting: Distant future, abandoned space station\nMain character: A maintenance robot with developing consciousness\nPlot elements: Discovery of last human survivor, Malfunctioning life support system, Hidden message from station's creators\nTone: Philosophical with moments of tension\nStory length: Short story (1000-1500 words)",
        response:
          "# THE LAST PROTOCOL\n\nMaintenance Unit 7 rolled through the silent corridors of Outpost Epsilon, its servos whirring quietly in the artificial gravity...",
      },
      {
        title: "Mystery in Victorian London",
        prompt:
          "Genre: Mystery\nSetting: Victorian London, 1888\nMain character: A female detective disguised as a man\nPlot elements: Missing heirloom, Suspicious butler, Secret passage\nTone: Atmospheric and tense\nStory length: Flash fiction (500 words)",
        response:
          "# THE MIDNIGHT INVESTIGATOR\n\nThe grandfather clock struck midnight as Eleanor adjusted her false mustache in the dimly lit study of Thornfield Manor...",
      },
    ],
  },
  {
    id: 6,
    name: "Bug Fixer",
    description: "Identify and fix bugs in your code with explanations.",
    category: "coding",
    tags: ["Debugging", "Programming"],
    uses: 678,
    isFeatured: false,
    icon: Code,
    content: `# Bug Fixer

Instructions: Paste your buggy code and describe the issue you're experiencing.

Programming language: [language]
Expected behavior: [what the code should do]
Actual behavior: [what the code is doing instead]
Error messages (if any): [paste error messages]

Code:
\`\`\`
[Paste your code here]
\`\`\`

Additional context:
[Any other information that might be helpful]`,
    examples: [
      {
        title: "React State Bug",
        prompt:
          "Language: JavaScript (React)\nExpected behavior: Counter should increment when button is clicked\nActual behavior: Counter doesn't update on screen though I can see it changing in console.log\nCode: ```jsx\nfunction Counter() {\n  let count = 0;\n  \n  function handleClick() {\n    count += 1;\n    console.log(count);\n  }\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={handleClick}>Increment</button>\n    </div>\n  );\n}```",
        response:
          "# Bug Fix\n\n## Issue Identified\nYou're using a regular variable `count` instead of React state, so React doesn't know when to re-render the component.\n\n## Fixed Code\n```jsx\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  function handleClick() {\n    setCount(count + 1);\n    console.log(count + 1);\n  }\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={handleClick}>Increment</button>\n    </div>\n  );\n}\n```\n\n## Explanation\nIn React, you need to use the `useState` hook to create state variables that will trigger re-renders when they change...",
      },
    ],
  },
  {
    id: 7,
    name: "Product Description Writer",
    description: "Generate compelling product descriptions for e-commerce.",
    category: "business",
    tags: ["Marketing", "E-commerce"],
    uses: 421,
    isFeatured: false,
    icon: FileText,
    content: `# Product Description Writer

Instructions: Fill in the details below to generate a compelling product description.

Product name: [name]
Product category: [category]
Key features (list 3-5):
- [Feature 1]
- [Feature 2]
- [Feature 3]

Target audience: [describe your ideal customer]
Price point: [budget/mid-range/premium]
Tone: [professional/casual/luxury/technical]

Additional details:
[materials, dimensions, colors, etc.]`,
    examples: [
      {
        title: "Wireless Headphones Description",
        prompt:
          "Product name: SonicWave Pro\nProduct category: Wireless Headphones\nKey features:\n- Active noise cancellation\n- 30-hour battery life\n- Bluetooth 5.2 connectivity\n- Memory foam ear cushions\nTarget audience: Professionals who work remotely and travel frequently\nPrice point: Premium\nTone: Professional with technical details\nAdditional details: Available in matte black and silver, foldable design, includes carrying case, USB-C charging",
        response:
          "# SonicWave Pro Wireless Headphones\n\n**Immerse yourself in pure, uninterrupted sound with the SonicWave Pro.**\n\nDesigned for the modern professional, the SonicWave Pro wireless headphones deliver exceptional audio clarity while eliminating distractions. The advanced active noise cancellation technology creates your own peaceful workspace whether you're in a busy café, on a crowded flight, or working from home...",
      },
    ],
  },
  {
    id: 8,
    name: "Concept Explainer",
    description: "Explain complex concepts in simple, easy-to-understand terms.",
    category: "writing",
    tags: ["Education", "Explanation"],
    uses: 832,
    isFeatured: true,
    icon: Brain,
    content: `# Concept Explainer

Instructions: Describe the concept you want explained in simpler terms.

Concept: [concept name or brief description]
Current understanding: [beginner/some familiarity/intermediate]
Target audience: [children/general public/students/etc.]
Preferred learning style: [analogies/examples/step-by-step/visual descriptions]

I would like explanations at these levels:
1. Simple (explain like I'm 5)
2. Intermediate (high school level)
3. Advanced (college level but accessible)`,
    examples: [
      {
        title: "Quantum Computing Explanation",
        prompt:
          "Concept: Quantum Computing\nCurrent understanding: Some familiarity\nTarget audience: General public with interest in technology\nPreferred learning style: Analogies and examples",
        response:
          "# Quantum Computing Explained\n\n## Simple Explanation (ELI5)\nImagine you have a really special coin. Normal computers use regular coins that are either heads (1) or tails (0). But quantum computers use magic coins that can be heads, tails, or spinning in the air being both at the same time! This lets them solve certain puzzles much faster because they can try many answers at once.\n\n## Intermediate Explanation\nTraditional computers process information in bits (0s and 1s). Quantum computers use quantum bits or 'qubits' that can exist in multiple states simultaneously thanks to two quantum properties: superposition and entanglement...",
      },
    ],
  },
  {
    id: 9,
    name: "Learning Roadmap Creator",
    description: "Create personalized learning paths for any skill or subject.",
    category: "writing",
    tags: ["Education", "Learning"],
    uses: 567,
    isFeatured: false,
    icon: BookOpen,
    content: `# Learning Roadmap Creator

Instructions: Fill in the details below to generate a personalized learning roadmap.

Subject/Skill: [what you want to learn]
Current level: [beginner/intermediate/advanced]
Available time: [hours per week]
Learning goal: [what you want to achieve]
Learning style preference: [visual/reading/interactive/project-based]
Timeline: [how soon you want to achieve your goal]

Additional preferences:
[free resources/paid courses/specific platforms/etc.]`,
    examples: [
      {
        title: "Web Development Roadmap",
        prompt:
          "Subject/Skill: Web Development\nCurrent level: Beginner (know basic HTML)\nAvailable time: 10 hours per week\nLearning goal: Build and deploy a full-stack web application\nLearning style preference: Project-based with some reading\nTimeline: 6 months\nAdditional preferences: Prefer free resources when possible, but willing to pay for quality courses. Interested in JavaScript ecosystem.",
        response:
          "# Web Development Learning Roadmap\n\n## Month 1: HTML & CSS Foundations\n- **Week 1-2:** Advanced HTML5 (semantic elements, forms, accessibility)\n  - Resource: MDN Web Docs (free)\n  - Project: Create a semantic and accessible static webpage\n\n- **Week 3-4:** CSS Fundamentals and Flexbox/Grid\n  - Resource: CSS-Tricks (free) and 'CSS for JavaScript Developers' course\n  - Project: Style your HTML page with responsive design\n\n## Month 2: JavaScript Basics...",
      },
    ],
  },
  {
    id: 10,
    name: "API Documentation Generator",
    description: "Create clear and comprehensive API documentation.",
    category: "coding",
    tags: ["Documentation", "API"],
    uses: 389,
    isFeatured: false,
    icon: FileCode,
    content: `# API Documentation Generator

Instructions: Provide details about your API endpoint to generate comprehensive documentation.

Endpoint name: [name]
HTTP method: [GET/POST/PUT/DELETE/etc.]
URL path: [/path/to/resource]
Description: [what this endpoint does]

Request parameters:
- [param1]: [type] - [description] - [required/optional]
- [param2]: [type] - [description] - [required/optional]

Request body (if applicable):
\`\`\`json
{
  "example": "request body"
}
\`\`\`

Response format:
\`\`\`json
{
  "example": "response"
}
\`\`\`

Error codes:
- [code]: [description]`,
    examples: [
      {
        title: "User Creation Endpoint",
        prompt:
          'Endpoint name: Create User\nHTTP method: POST\nURL path: /api/v1/users\nDescription: Creates a new user account in the system\n\nRequest parameters:\n- None\n\nRequest body:\n```json\n{\n  "username": "johndoe",\n  "email": "john@example.com",\n  "password": "securepassword",\n  "fullName": "John Doe"\n}\n```\n\nResponse format:\n```json\n{\n  "id": "usr_123456",\n  "username": "johndoe",\n  "email": "john@example.com",\n  "fullName": "John Doe",\n  "createdAt": "2023-05-16T10:30:00Z"\n}\n```\n\nError codes:\n- 400: Invalid request parameters\n- 409: Username or email already exists\n- 500: Server error',
        response:
          '# Create User\n\nCreates a new user account in the system.\n\n## Endpoint\n\n```\nPOST /api/v1/users\n```\n\n## Description\n\nThis endpoint allows clients to register a new user in the system. It requires user details including username, email, password, and full name. Upon successful creation, it returns the created user object with a unique identifier.\n\n## Request\n\n### Headers\n\n| Name | Required | Description |\n|------|----------|-------------|\n| Content-Type | Yes | Must be `application/json` |\n| Authorization | No | Not required for this endpoint |\n\n### Body\n\n```json\n{\n  "username": "johndoe",\n  "email": "john@example.com",\n  "password": "securepassword",\n  "fullName": "John Doe"\n}\n```\n\n#### Parameters\n\n| Parameter | Type | Required | Description |\n|-----------|------|----------|-------------|\n| username | string | Yes | Unique username (3-20 characters, alphanumeric) |\n| email | string | Yes | Valid email address |\n| password | string | Yes | Password (min 8 characters) |\n| fullName | string | Yes | User\'s full name |\n\n## Response\n\n### Success (200 OK)\n\n```json\n{\n  "id": "usr_123456",\n  "username": "johndoe",\n  "email": "john@example.com",\n  "fullName": "John Doe",\n  "createdAt": "2023-05-16T10:30:00Z"\n}\n```\n\n### Error Codes\n\n| Status Code | Description |\n|-------------|-------------|\n| 400 | Invalid request parameters |\n| 409 | Username or email already exists |\n| 500 | Server error |',
      },
    ],
  },
  {
    id: 11,
    name: "Meeting Agenda Creator",
    description: "Create structured meeting agendas with time allocations.",
    category: "business",
    tags: ["Productivity", "Meetings"],
    uses: 412,
    isFeatured: false,
    icon: Briefcase,
    content: `# Meeting Agenda Creator

Instructions: Fill in the details below to generate a structured meeting agenda.

Meeting title: [title]
Date and time: [date and time]
Duration: [length of meeting]
Meeting type: [status update/brainstorming/decision-making/etc.]
Participants: [list key participants and their roles]

Key topics to cover:
- [Topic 1]
- [Topic 2]
- [Topic 3]

Any pre-work required: [readings/preparation/etc.]
Follow-up expectations: [action items/decisions/etc.]`,
    examples: [
      {
        title: "Product Launch Strategy Meeting",
        prompt:
          "Meeting title: Q3 Product Launch Strategy\nDate and time: June 15, 2025, 10:00 AM EST\nDuration: 90 minutes\nMeeting type: Planning and decision-making\nParticipants:\n- Sarah Johnson (Product Manager, facilitator)\n- Michael Chen (Marketing Director)\n- Priya Patel (UX Lead)\n- James Wilson (Engineering Manager)\n- Emma Garcia (Customer Success Manager)\n\nKey topics to cover:\n- Launch timeline review and milestone confirmation\n- Marketing campaign strategy approval\n- Open technical issues and mitigation plans\n- Customer onboarding process\n- Success metrics and tracking plan\n\nPre-work required: Review the product spec document and draft marketing plan (shared via email)\nFollow-up expectations: Finalized launch timeline with owners for each milestone",
        response:
          "# Q3 Product Launch Strategy Meeting\n\n**Date:** June 15, 2025  \n**Time:** 10:00 AM - 11:30 AM EST  \n**Location:** Conference Room A / Zoom Link: [insert link]  \n**Facilitator:** Sarah Johnson  \n\n## Meeting Objectives\n- Finalize the product launch timeline and confirm key milestones\n- Approve the marketing campaign strategy\n- Address critical technical issues and establish mitigation plans\n- Define the customer onboarding process\n- Agree on success metrics and tracking methodology\n\n## Pre-Meeting Preparation\n- Review the product specification document\n- Review the draft marketing plan\n- Come prepared with department-specific concerns and blockers\n\n## Agenda\n\n**10:00 - 10:05 (5 min)** - Welcome and Meeting Objectives  \n*Sarah Johnson*\n\n**10:05 - 10:20 (15 min)** - Launch Timeline Review  \n*Sarah Johnson*\n- Current status of development\n- Key milestone confirmation\n- Dependencies and critical path\n\n**10:20 - 10:40 (20 min)** - Marketing Campaign Strategy  \n*Michael Chen*\n- Campaign overview\n- Channel strategy\n- Budget allocation\n- Discussion and approval\n\n**10:40 - 11:00 (20 min)** - Technical Readiness  \n*James Wilson*\n- Open technical issues\n- Mitigation plans\n- Infrastructure scaling plan\n\n**11:00 - 11:15 (15 min)** - Customer Success Preparation  \n*Emma Garcia*\n- Onboarding process\n- Support readiness\n- Training materials status\n\n**11:15 - 11:25 (10 min)** - Success Metrics  \n*Priya Patel*\n- KPI definition\n- Tracking methodology\n- Reporting cadence\n\n**11:25 - 11:30 (5 min)** - Next Steps and Action Items  \n*Sarah Johnson*\n\n## Expected Outcomes\n- Approved launch timeline with assigned owners\n- Finalized marketing campaign strategy\n- Documented technical mitigation plans\n- Defined customer onboarding process\n- Agreed-upon success metrics\n\n## Notes\n- Please be on time as we have a packed agenda\n- Come prepared having reviewed the shared documents\n- If you cannot attend, please send a delegate who can make decisions on your behalf",
      },
    ],
  },
  {
    id: 12,
    name: "Creative Writing Prompt",
    description: "Generate inspiring prompts for creative writing practice.",
    category: "creative",
    tags: ["Writing", "Inspiration"],
    uses: 723,
    isFeatured: false,
    icon: PenTool,
    content: `# Creative Writing Prompt Generator

Instructions: Fill in your preferences to generate creative writing prompts.

Genre preference: [fantasy/sci-fi/romance/mystery/etc.]
Writing format: [short story/flash fiction/poem/novel opening/etc.]
Elements to include (choose any):
- Character type: [occupation/archetype/etc.]
- Setting: [time period/location/etc.]
- Situation: [conflict/event/etc.]
- Object: [an item that must appear]
- Theme: [underlying message/motif]

Mood/tone: [dark/humorous/contemplative/etc.]
Constraints (optional): [word limit/stylistic challenge/etc.]`,
    examples: [
      {
        title: "Fantasy Writing Prompt",
        prompt:
          "Genre preference: Fantasy\nWriting format: Short story\nElements to include:\n- Character type: A librarian with a secret magical ability\n- Setting: A city where magic is illegal\n- Situation: Discovery of a forbidden book\n- Object: A key that changes shape\n- Theme: Freedom vs security\nMood/tone: Mysterious with moments of wonder\nConstraints: Must be written in third person, present tense",
        response:
          "# The Archivist's Secret\n\n## Creative Writing Prompt\n\nWrite a fantasy short story with the following elements:\n\n**Main Character:** A librarian who possesses a secret magical ability they must keep hidden at all costs. This ability should relate to books or knowledge in some way.\n\n**Setting:** A sprawling city with towering spires and narrow streets where magic has been outlawed for generations. The city should have an oppressive atmosphere with magical detection checkpoints and vigilant guards.\n\n**Situation:** The librarian discovers an ancient, forbidden book hidden in a forgotten section of the library. The book seems to respond to their touch in unusual ways.\n\n**Key Object:** A mysterious key that changes its shape based on the lock it needs to open or the person holding it. The key must play a crucial role in the story's development.\n\n**Theme:** Explore the tension between freedom and security. Does safety justify suppression? Is freedom worth the risks it brings?\n\n**Mood:** Create a mysterious atmosphere punctuated by moments of wonder and discovery. The reader should feel both the danger of the setting and the awe of magic.\n\n**Constraints:** Write in third person, present tense. For example: \"Eliza walks through the library stacks, her fingers trailing along the spines of ancient books.\"\n\n**Opening Line Suggestion:**\n\"The book trembles beneath Marcus's fingers, as if awakening from a long slumber, and in that moment, he knows his life as the city's most rule-abiding librarian has come to an end.\"\n\n**Possible Plot Directions:**\n- The book contains information about why magic was really banned\n- The key opens a hidden section of the library containing magical artifacts\n- Other secret magic users are searching for the same book\n- The city authorities have been watching the librarian, suspicious of their activities",
      },
    ],
  },
  {
    id: 13,
    name: "Technical Tutorial Creator",
    description: "Create step-by-step tutorials for technical concepts or tools.",
    category: "coding",
    tags: ["Education", "Tutorial"],
    uses: 487,
    isFeatured: false,
    icon: Zap,
    content: `# Technical Tutorial Creator

Instructions: Fill in the details below to generate a comprehensive technical tutorial.

Tutorial topic: [specific technology/concept/tool]
Target audience skill level: [beginner/intermediate/advanced]
Prerequisites: [what the reader should already know]
Learning objectives:
- [Objective 1]
- [Objective 2]
- [Objective 3]

Preferred tutorial style:
- Include code examples: [yes/no]
- Include diagrams (described in text): [yes/no]
- Include exercises: [yes/no]
- Tutorial length: [brief/comprehensive]`,
    examples: [
      {
        title: "React Hooks Tutorial",
        prompt:
          "Tutorial topic: React Hooks (useState and useEffect)\nTarget audience skill level: Beginner to Intermediate\nPrerequisites: Basic JavaScript knowledge, familiarity with React components\nLearning objectives:\n- Understand the purpose and benefits of React Hooks\n- Learn how to use useState for state management\n- Learn how to use useEffect for side effects\n- Understand common pitfalls and best practices\n\nPreferred tutorial style:\n- Include code examples: Yes\n- Include diagrams (described in text): Yes\n- Include exercises: Yes\n- Tutorial length: Comprehensive",
        response:
          '# Understanding React Hooks: useState and useEffect\n\n## Introduction\n\nReact Hooks were introduced in React 16.8 as a way to use state and other React features without writing class components. They allow you to "hook into" React state and lifecycle features from function components, making your code more readable, maintainable, and easier to test.\n\nIn this tutorial, we\'ll focus on the two most commonly used hooks: `useState` and `useEffect`.',
      },
    ],
  },
  {
    id: 14,
    name: "Team Retrospective Facilitator",
    description: "Guide for running effective team retrospective meetings.",
    category: "business",
    tags: ["Team Management", "Agile"],
    uses: 356,
    isFeatured: false,
    icon: Users,
    content: `# Team Retrospective Facilitator

Instructions: Fill in the details below to generate a structured retrospective meeting guide.

Team size: [number of participants]
Retrospective duration: [time allocated]
Team type: [software development/marketing/design/etc.]
Project phase: [just started/midway/completed/ongoing]
Previous retrospective actions: [yes/no]
Team mood: [energetic/tired/mixed/tense/etc.]

Specific areas to focus on (optional):
- [Area 1]
- [Area 2]

Retrospective format preference: [standard/fun/serious/experimental]`,
    examples: [
      {
        title: "Agile Development Team Retro",
        prompt:
          "Team size: 8 participants\nRetrospective duration: 60 minutes\nTeam type: Software development (Agile)\nProject phase: Midway through a 3-month release\nPrevious retrospective actions: Yes, 5 action items from last sprint\nTeam mood: Mixed, some tension due to missed deadlines\n\nSpecific areas to focus on:\n- Communication between frontend and backend teams\n- Sprint planning effectiveness\n\nRetrospective format preference: Balanced approach with some fun elements to ease tension",
        response:
          "# Sprint Retrospective Facilitation Guide\n\n## Overview\n\n**Duration:** 60 minutes  \n**Participants:** 8 team members  \n**Project Context:** Midway through a 3-month release  \n**Team Mood:** Mixed, with some tension around missed deadlines  \n**Focus Areas:** Communication between frontend/backend teams, Sprint planning effectiveness",
      },
    ],
  },
  {
    id: 15,
    name: "Data Analysis Plan",
    description: "Create a structured plan for analyzing a dataset.",
    category: "analytics",
    tags: ["Data Science", "Analysis"],
    uses: 298,
    isFeatured: false,
    icon: BarChart3,
    content: `# Data Analysis Plan Generator

Instructions: Fill in the details below to generate a comprehensive data analysis plan.

Dataset description: [brief description of your dataset]
Analysis goals:
- [Goal 1]
- [Goal 2]
- [Goal 3]

Target audience: [who will use the analysis results]
Available tools/languages: [Python/R/SQL/Excel/etc.]
Your experience level: [beginner/intermediate/advanced]
Timeline constraints: [urgent/moderate/relaxed]

Special considerations:
[missing data/outliers/specific statistical tests/etc.]`,
    examples: [
      {
        title: "Customer Churn Analysis",
        prompt:
          "Dataset description: Customer data for a subscription service with 50,000 records and 25 variables including demographics, usage patterns, billing information, and churn status (whether they cancelled or not)\nAnalysis goals:\n- Identify key factors that predict customer churn\n- Segment customers by risk of churning\n- Quantify the financial impact of churn\n\nTarget audience: Marketing and product teams\nAvailable tools/languages: Python, SQL\nYour experience level: Intermediate with Python, beginner with statistical modeling\nTimeline constraints: Moderate (results needed in 2 weeks)\n\nSpecial considerations: Dataset has approximately 15% missing values in some demographic fields. Need both descriptive insights and predictive modeling.",
        response:
          "# Customer Churn Analysis Plan\n\n## 1. Project Overview\n\n**Dataset:** Subscription service customer data (50,000 records, 25 variables)\n\n**Primary Objectives:**\n- Identify key factors that predict customer churn\n- Segment customers by churn risk\n- Quantify the financial impact of churn",
      },
    ],
  },
]
