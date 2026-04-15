export interface RoadmapLesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  icon: string;
  lessons: RoadmapLesson[];
}

export interface RoadmapLevel {
  id: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  badge: string;
  topics: RoadmapTopic[];
  locked: boolean;
}

export interface RoadmapDomain {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  levels: RoadmapLevel[];
}

export const roadmapDomains: RoadmapDomain[] = [
  {
    id: 'data-engineering',
    title: 'Data Engineering',
    icon: '🗄️',
    color: 'hsl(200, 80%, 46%)',
    description: 'Build scalable data pipelines and infrastructure',
    levels: [
      {
        id: 'de-beginner',
        level: 'Beginner',
        estimatedTime: '4 weeks',
        badge: '🥉',
        locked: false,
        topics: [
          {
            id: 'de-sql', title: 'SQL Fundamentals', icon: '📊',
            lessons: [
              { id: 'de-sql-1', title: 'SELECT & WHERE clauses', duration: '8 min', completed: true },
              { id: 'de-sql-2', title: 'JOINs & Subqueries', duration: '12 min', completed: true },
              { id: 'de-sql-3', title: 'Aggregations & Grouping', duration: '10 min', completed: false },
            ],
          },
          {
            id: 'de-python', title: 'Python for Data', icon: '🐍',
            lessons: [
              { id: 'de-py-1', title: 'Pandas Basics', duration: '15 min', completed: false },
              { id: 'de-py-2', title: 'Data Cleaning', duration: '12 min', completed: false },
            ],
          },
          {
            id: 'de-linux', title: 'Linux & CLI', icon: '🖥️',
            lessons: [
              { id: 'de-cli-1', title: 'Terminal Essentials', duration: '10 min', completed: false },
              { id: 'de-cli-2', title: 'Shell Scripting', duration: '14 min', completed: false },
            ],
          },
        ],
      },
      {
        id: 'de-intermediate',
        level: 'Intermediate',
        estimatedTime: '6 weeks',
        badge: '🥈',
        locked: true,
        topics: [
          {
            id: 'de-etl', title: 'ETL Pipelines', icon: '🔄',
            lessons: [
              { id: 'de-etl-1', title: 'Extract patterns', duration: '12 min', completed: false },
              { id: 'de-etl-2', title: 'Transform logic', duration: '15 min', completed: false },
              { id: 'de-etl-3', title: 'Load strategies', duration: '10 min', completed: false },
            ],
          },
          {
            id: 'de-warehouse', title: 'Data Warehousing', icon: '🏗️',
            lessons: [
              { id: 'de-dw-1', title: 'Star & Snowflake Schema', duration: '14 min', completed: false },
              { id: 'de-dw-2', title: 'Dimensional Modeling', duration: '16 min', completed: false },
            ],
          },
        ],
      },
      {
        id: 'de-advanced',
        level: 'Advanced',
        estimatedTime: '8 weeks',
        badge: '🥇',
        locked: true,
        topics: [
          {
            id: 'de-spark', title: 'Apache Spark', icon: '⚡',
            lessons: [
              { id: 'de-sp-1', title: 'RDDs & DataFrames', duration: '18 min', completed: false },
              { id: 'de-sp-2', title: 'Spark SQL', duration: '15 min', completed: false },
            ],
          },
          {
            id: 'de-kafka', title: 'Kafka Streaming', icon: '📡',
            lessons: [
              { id: 'de-kf-1', title: 'Producers & Consumers', duration: '14 min', completed: false },
              { id: 'de-kf-2', title: 'Stream Processing', duration: '16 min', completed: false },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'web-development',
    title: 'Web Development',
    icon: '🌐',
    color: 'hsl(234, 62%, 50%)',
    description: 'Master modern full-stack web development',
    levels: [
      {
        id: 'wd-beginner',
        level: 'Beginner',
        estimatedTime: '3 weeks',
        badge: '🥉',
        locked: false,
        topics: [
          {
            id: 'wd-html', title: 'HTML & CSS', icon: '🎨',
            lessons: [
              { id: 'wd-h-1', title: 'Semantic HTML', duration: '10 min', completed: true },
              { id: 'wd-h-2', title: 'Flexbox & Grid', duration: '14 min', completed: true },
              { id: 'wd-h-3', title: 'Responsive Design', duration: '12 min', completed: true },
            ],
          },
          {
            id: 'wd-js', title: 'JavaScript Basics', icon: '⚡',
            lessons: [
              { id: 'wd-js-1', title: 'Variables & Functions', duration: '10 min', completed: true },
              { id: 'wd-js-2', title: 'DOM Manipulation', duration: '12 min', completed: false },
            ],
          },
        ],
      },
      {
        id: 'wd-intermediate',
        level: 'Intermediate',
        estimatedTime: '5 weeks',
        badge: '🥈',
        locked: true,
        topics: [
          {
            id: 'wd-react', title: 'React.js', icon: '⚛️',
            lessons: [
              { id: 'wd-r-1', title: 'Components & Props', duration: '12 min', completed: false },
              { id: 'wd-r-2', title: 'Hooks & State', duration: '15 min', completed: false },
              { id: 'wd-r-3', title: 'Routing & Forms', duration: '14 min', completed: false },
            ],
          },
          {
            id: 'wd-ts', title: 'TypeScript', icon: '🔷',
            lessons: [
              { id: 'wd-ts-1', title: 'Types & Interfaces', duration: '12 min', completed: false },
              { id: 'wd-ts-2', title: 'Generics', duration: '14 min', completed: false },
            ],
          },
        ],
      },
      {
        id: 'wd-advanced',
        level: 'Advanced',
        estimatedTime: '6 weeks',
        badge: '🥇',
        locked: true,
        topics: [
          {
            id: 'wd-node', title: 'Node.js & APIs', icon: '🟢',
            lessons: [
              { id: 'wd-n-1', title: 'REST API Design', duration: '15 min', completed: false },
              { id: 'wd-n-2', title: 'Authentication', duration: '18 min', completed: false },
            ],
          },
          {
            id: 'wd-deploy', title: 'DevOps & Deploy', icon: '🚀',
            lessons: [
              { id: 'wd-d-1', title: 'Docker Basics', duration: '14 min', completed: false },
              { id: 'wd-d-2', title: 'CI/CD Pipelines', duration: '16 min', completed: false },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI / Machine Learning',
    icon: '🤖',
    color: 'hsl(160, 60%, 40%)',
    description: 'From fundamentals to production ML systems',
    levels: [
      {
        id: 'ai-beginner',
        level: 'Beginner',
        estimatedTime: '4 weeks',
        badge: '🥉',
        locked: false,
        topics: [
          {
            id: 'ai-math', title: 'Math Foundations', icon: '📐',
            lessons: [
              { id: 'ai-m-1', title: 'Linear Algebra', duration: '15 min', completed: false },
              { id: 'ai-m-2', title: 'Probability & Stats', duration: '14 min', completed: false },
            ],
          },
          {
            id: 'ai-python', title: 'Python for ML', icon: '🐍',
            lessons: [
              { id: 'ai-py-1', title: 'NumPy & Pandas', duration: '12 min', completed: false },
              { id: 'ai-py-2', title: 'Matplotlib & Seaborn', duration: '10 min', completed: false },
            ],
          },
        ],
      },
      {
        id: 'ai-intermediate',
        level: 'Intermediate',
        estimatedTime: '6 weeks',
        badge: '🥈',
        locked: true,
        topics: [
          {
            id: 'ai-ml-core', title: 'ML Algorithms', icon: '🧠',
            lessons: [
              { id: 'ai-ml-1', title: 'Regression Models', duration: '15 min', completed: false },
              { id: 'ai-ml-2', title: 'Classification', duration: '14 min', completed: false },
              { id: 'ai-ml-3', title: 'Clustering', duration: '12 min', completed: false },
            ],
          },
          {
            id: 'ai-sklearn', title: 'Scikit-learn', icon: '🔬',
            lessons: [
              { id: 'ai-sk-1', title: 'Pipelines', duration: '12 min', completed: false },
              { id: 'ai-sk-2', title: 'Model Evaluation', duration: '14 min', completed: false },
            ],
          },
        ],
      },
      {
        id: 'ai-advanced',
        level: 'Advanced',
        estimatedTime: '8 weeks',
        badge: '🥇',
        locked: true,
        topics: [
          {
            id: 'ai-dl', title: 'Deep Learning', icon: '🌊',
            lessons: [
              { id: 'ai-dl-1', title: 'Neural Networks', duration: '18 min', completed: false },
              { id: 'ai-dl-2', title: 'CNNs & RNNs', duration: '20 min', completed: false },
            ],
          },
          {
            id: 'ai-nlp', title: 'NLP & LLMs', icon: '💬',
            lessons: [
              { id: 'ai-nlp-1', title: 'Transformers', duration: '16 min', completed: false },
              { id: 'ai-nlp-2', title: 'Fine-tuning LLMs', duration: '18 min', completed: false },
            ],
          },
        ],
      },
    ],
  },
];
