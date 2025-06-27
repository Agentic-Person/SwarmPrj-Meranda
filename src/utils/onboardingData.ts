import { OnboardingQuestion, PersonalityArchetype } from '../types';

export const onboardingQuestions: OnboardingQuestion[] = [
  {
    id: '1',
    question: "When approaching a new project, what's your first instinct?",
    category: 'approach',
    options: [
      {
        id: '1a',
        text: 'Dive in and start experimenting immediately',
        archetypeWeights: {
          innovator: 3,
          strategist: 0,
          collaborator: 1,
          perfectionist: 0,
          explorer: 2,
          catalyst: 2
        }
      },
      {
        id: '1b',
        text: 'Create a detailed plan and structure first',
        archetypeWeights: {
          innovator: 0,
          strategist: 3,
          collaborator: 1,
          perfectionist: 2,
          explorer: 0,
          catalyst: 1
        }
      },
      {
        id: '1c',
        text: 'Gather the team and brainstorm together',
        archetypeWeights: {
          innovator: 1,
          strategist: 1,
          collaborator: 3,
          perfectionist: 0,
          explorer: 1,
          catalyst: 2
        }
      },
      {
        id: '1d',
        text: 'Research best practices and proven methods',
        archetypeWeights: {
          innovator: 0,
          strategist: 2,
          collaborator: 1,
          perfectionist: 3,
          explorer: 2,
          catalyst: 0
        }
      }
    ]
  },
  {
    id: '2',
    question: "How do you prefer to communicate with your team?",
    category: 'communication',
    options: [
      {
        id: '2a',
        text: 'Quick, informal check-ins and real-time collaboration',
        archetypeWeights: {
          innovator: 2,
          strategist: 0,
          collaborator: 2,
          perfectionist: 0,
          explorer: 1,
          catalyst: 3
        }
      },
      {
        id: '2b',
        text: 'Structured meetings with clear agendas',
        archetypeWeights: {
          innovator: 0,
          strategist: 3,
          collaborator: 1,
          perfectionist: 2,
          explorer: 0,
          catalyst: 1
        }
      },
      {
        id: '2c',
        text: 'Open discussions where everyone can contribute',
        archetypeWeights: {
          innovator: 1,
          strategist: 1,
          collaborator: 3,
          perfectionist: 1,
          explorer: 1,
          catalyst: 1
        }
      },
      {
        id: '2d',
        text: 'Detailed documentation and written updates',
        archetypeWeights: {
          innovator: 0,
          strategist: 2,
          collaborator: 0,
          perfectionist: 3,
          explorer: 1,
          catalyst: 0
        }
      }
    ]
  },
  {
    id: '3',
    question: "When facing a complex problem, you typically:",
    category: 'problem-solving',
    options: [
      {
        id: '3a',
        text: 'Try multiple creative solutions until something works',
        archetypeWeights: {
          innovator: 3,
          strategist: 0,
          collaborator: 1,
          perfectionist: 0,
          explorer: 2,
          catalyst: 1
        }
      },
      {
        id: '3b',
        text: 'Break it down systematically and analyze each part',
        archetypeWeights: {
          innovator: 0,
          strategist: 3,
          collaborator: 0,
          perfectionist: 2,
          explorer: 1,
          catalyst: 0
        }
      },
      {
        id: '3c',
        text: 'Seek input from others and build on their ideas',
        archetypeWeights: {
          innovator: 1,
          strategist: 1,
          collaborator: 3,
          perfectionist: 0,
          explorer: 1,
          catalyst: 2
        }
      },
      {
        id: '3d',
        text: 'Research thoroughly before attempting any solution',
        archetypeWeights: {
          innovator: 0,
          strategist: 2,
          collaborator: 0,
          perfectionist: 3,
          explorer: 2,
          catalyst: 0
        }
      }
    ]
  },
  {
    id: '4',
    question: "What motivates you most in collaborative work?",
    category: 'motivation',
    options: [
      {
        id: '4a',
        text: 'Creating something completely new and groundbreaking',
        archetypeWeights: {
          innovator: 3,
          strategist: 1,
          collaborator: 0,
          perfectionist: 0,
          explorer: 2,
          catalyst: 1
        }
      },
      {
        id: '4b',
        text: 'Achieving measurable goals and strategic outcomes',
        archetypeWeights: {
          innovator: 0,
          strategist: 3,
          collaborator: 1,
          perfectionist: 2,
          explorer: 0,
          catalyst: 1
        }
      },
      {
        id: '4c',
        text: 'Building strong relationships and team harmony',
        archetypeWeights: {
          innovator: 0,
          strategist: 1,
          collaborator: 3,
          perfectionist: 1,
          explorer: 0,
          catalyst: 2
        }
      },
      {
        id: '4d',
        text: 'Delivering high-quality, polished results',
        archetypeWeights: {
          innovator: 1,
          strategist: 2,
          collaborator: 1,
          perfectionist: 3,
          explorer: 0,
          catalyst: 0
        }
      }
    ]
  },
  {
    id: '5',
    question: "How do you handle tight deadlines?",
    category: 'decision-making',
    options: [
      {
        id: '5a',
        text: 'Embrace the pressure and find creative shortcuts',
        archetypeWeights: {
          innovator: 2,
          strategist: 0,
          collaborator: 1,
          perfectionist: 0,
          explorer: 1,
          catalyst: 3
        }
      },
      {
        id: '5b',
        text: 'Prioritize ruthlessly and focus on core objectives',
        archetypeWeights: {
          innovator: 1,
          strategist: 3,
          collaborator: 0,
          perfectionist: 1,
          explorer: 0,
          catalyst: 2
        }
      },
      {
        id: '5c',
        text: 'Rally the team and distribute the workload',
        archetypeWeights: {
          innovator: 0,
          strategist: 1,
          collaborator: 3,
          perfectionist: 0,
          explorer: 0,
          catalyst: 2
        }
      },
      {
        id: '5d',
        text: 'Maintain quality standards even if it means working longer',
        archetypeWeights: {
          innovator: 0,
          strategist: 1,
          collaborator: 0,
          perfectionist: 3,
          explorer: 1,
          catalyst: 0
        }
      }
    ]
  },
  {
    id: '6',
    question: "What's your ideal role in a team project?",
    category: 'teamwork',
    options: [
      {
        id: '6a',
        text: 'The visionary who comes up with breakthrough ideas',
        archetypeWeights: {
          innovator: 3,
          strategist: 1,
          collaborator: 0,
          perfectionist: 0,
          explorer: 2,
          catalyst: 1
        }
      },
      {
        id: '6b',
        text: 'The strategist who plans and coordinates everything',
        archetypeWeights: {
          innovator: 0,
          strategist: 3,
          collaborator: 1,
          perfectionist: 2,
          explorer: 0,
          catalyst: 1
        }
      },
      {
        id: '6c',
        text: 'The connector who brings people together',
        archetypeWeights: {
          innovator: 0,
          strategist: 1,
          collaborator: 3,
          perfectionist: 0,
          explorer: 1,
          catalyst: 2
        }
      },
      {
        id: '6d',
        text: 'The specialist who ensures everything is done right',
        archetypeWeights: {
          innovator: 0,
          strategist: 1,
          collaborator: 1,
          perfectionist: 3,
          explorer: 1,
          catalyst: 0
        }
      }
    ]
  }
];

export const personalityArchetypes: Record<string, PersonalityArchetype> = {
  innovator: {
    type: 'innovator',
    traits: ['Creative', 'Risk-taking', 'Visionary', 'Experimental'],
    workStyle: 'Thrives on breakthrough ideas and novel approaches',
    strengths: ['Creative problem-solving', 'Adaptability', 'Vision', 'Innovation'],
    description: 'You are a creative force who sees possibilities where others see obstacles. Your innovative thinking drives breakthrough solutions and inspires teams to think beyond conventional boundaries.'
  },
  strategist: {
    type: 'strategist',
    traits: ['Analytical', 'Systematic', 'Goal-oriented', 'Logical'],
    workStyle: 'Focuses on structured planning and measurable outcomes',
    strengths: ['Strategic planning', 'Analysis', 'Organization', 'Goal achievement'],
    description: 'You excel at seeing the big picture and creating systematic approaches to achieve objectives. Your strategic mindset helps teams navigate complex challenges with clear direction.'
  },
  collaborator: {
    type: 'collaborator',
    traits: ['Empathetic', 'Communicative', 'Team-focused', 'Inclusive'],
    workStyle: 'Builds consensus and facilitates team harmony',
    strengths: ['Team building', 'Communication', 'Conflict resolution', 'Facilitation'],
    description: 'You are the glue that holds teams together. Your natural ability to understand and connect with others creates an environment where everyone can contribute their best work.'
  },
  perfectionist: {
    type: 'perfectionist',
    traits: ['Detail-oriented', 'Quality-focused', 'Thorough', 'Reliable'],
    workStyle: 'Ensures high standards and attention to detail',
    strengths: ['Quality assurance', 'Attention to detail', 'Reliability', 'Expertise'],
    description: 'You set the standard for excellence. Your meticulous attention to detail and commitment to quality ensures that projects meet the highest standards and deliver exceptional results.'
  },
  explorer: {
    type: 'explorer',
    traits: ['Curious', 'Research-oriented', 'Knowledge-seeking', 'Thorough'],
    workStyle: 'Investigates thoroughly before taking action',
    strengths: ['Research', 'Knowledge synthesis', 'Due diligence', 'Learning'],
    description: 'You are driven by curiosity and the pursuit of knowledge. Your thorough research and deep understanding of subjects provides teams with the insights needed for informed decisions.'
  },
  catalyst: {
    type: 'catalyst',
    traits: ['Energetic', 'Action-oriented', 'Motivating', 'Dynamic'],
    workStyle: 'Drives momentum and motivates others to action',
    strengths: ['Motivation', 'Energy', 'Action orientation', 'Change management'],
    description: 'You are the spark that ignites action. Your energy and enthusiasm motivate others to move forward, turning ideas into reality and keeping projects moving at pace.'
  }
};

export const calculatePersonalityArchetype = (answers: Record<string, string>): PersonalityArchetype => {
  const scores = {
    innovator: 0,
    strategist: 0,
    collaborator: 0,
    perfectionist: 0,
    explorer: 0,
    catalyst: 0
  };

  // Calculate scores based on answers
  Object.entries(answers).forEach(([questionId, optionId]) => {
    const question = onboardingQuestions.find(q => q.id === questionId);
    const option = question?.options.find(o => o.id === optionId);
    
    if (option) {
      Object.entries(option.archetypeWeights).forEach(([archetype, weight]) => {
        scores[archetype as keyof typeof scores] += weight;
      });
    }
  });

  // Find the archetype with the highest score
  const topArchetype = Object.entries(scores).reduce((a, b) => 
    scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
  )[0];

  return personalityArchetypes[topArchetype];
};