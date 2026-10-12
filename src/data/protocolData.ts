export interface Exercise {
  id: string;
  name: string;
  duration: string;
  workSeconds: number;
  restSeconds: number;
  isUnilateral: boolean;
  unilateralSwitchSeconds?: number;
  image: string;
  remoteUrl: string;
  originalLink: string;
  description: string;
  attention: string;
  easierOption?: string;
  focusMuscles: string[];
  steps: string[];
}

export interface Routine {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  disclaimerNote?: string;
  badge: string;
  duration: string;
  exercises: Exercise[];
}

export const PROTOCOL_SECTIONS = [
  { id: 'o-que-saber', label: 'O que saber' },
  { id: 'ativacao', label: 'Ativação' },
  { id: 'rotinas', label: 'Rotinas' },
  { id: 'alimentacao', label: 'Alimentação' },
  { id: 'cronograma', label: 'Cronograma' },
  { id: 'aviso-importante', label: 'Aviso importante' },
];

export const ROUTINES_DATA: Routine[] = [
  {
    id: 'rotina-1',
    number: 1,
    title: 'Firmador Express',
    subtitle: 'Uma sequência simples para praticar agachamento, elevação de quadril e extensão de quadril.',
    badge: 'Rotina 1',
    duration: '6 minutos · 2 voltas',
    exercises: [
      {
        id: 'r1-e1',
        name: 'Agachamento sumô',
        duration: '40 segundos de movimento · 20s descanso',
        workSeconds: 40,
        restSeconds: 20,
        isUnilateral: false,
        image: '/exercises/exercise_1.jpg',
        remoteUrl: 'https://i.ibb.co/PZhLK1YV/Duck-ai-image-2026-10-12-21-56-8.jpg',
        originalLink: 'https://ibb.co/d02TFkcH',
        description: 'Afaste os pés um pouco mais que a largura dos ombros e vire as pontas levemente para fora. Flexione os joelhos e leve o quadril para trás, descendo apenas até onde conseguir manter o tronco confortável e os pés apoiados. Empurre o chão para voltar a ficar em pé.',
        attention: 'Os joelhos acompanham a direção dos pés. Não precisa descer muito.',
        focusMuscles: ['Glúteo máximo', 'Adutores da coxa', 'Quadríceps'],
        steps: [
          'Pés afastados além da largura dos ombros com pontas apontadas a 30°-45° para fora.',
          'Mantenha o peito aberto e desça o quadril empurrando os joelhos na direção dos dedos.',
          'Desça até uma profundidade confortável sem arredondar a coluna.',
          'Empurre o chão firmemente pelos calcanhares para retornar à posição inicial.'
        ]
      },
      {
        id: 'r1-e2',
        name: 'Elevação pélvica',
        duration: '40 segundos de movimento · 20s descanso',
        workSeconds: 40,
        restSeconds: 20,
        isUnilateral: false,
        image: '/exercises/exercise_2.jpg',
        remoteUrl: 'https://i.ibb.co/WN2wkBq4/Duck-ai-image-2026-10-12-21-56-7.jpg',
        originalLink: 'https://ibb.co/JWs4vr0w',
        description: 'Deite-se de costas, com os joelhos dobrados e os pés apoiados no chão. Contraia suavemente o abdômen e eleve o quadril até formar uma linha confortável entre tronco e coxas. Faça uma pausa breve no alto e desça devagar.',
        attention: 'Evite arquear a lombar para levantar mais alto.',
        focusMuscles: ['Glúteo máximo', 'Isquiotibiais', 'Core'],
        steps: [
          'Deite de costas no solo ou colchonete com os joelhos dobrados a ~90°.',
          'Pés apoiados firmes na largura dos quadris, braços relaxados ao lado do corpo.',
          'Aperte os glúteos e erga a pelve até alinhar ombros, quadril e joelhos.',
          'Sustente 1 segundo no topo sem hiperextender a lombar e desça com controle.'
        ]
      },
      {
        id: 'r1-e3',
        name: 'Quatro apoios: extensão de quadril',
        duration: '40 segundos (20s cada lado) · 20s descanso',
        workSeconds: 40,
        restSeconds: 20,
        isUnilateral: true,
        unilateralSwitchSeconds: 20,
        image: '/exercises/exercise_3.jpg',
        remoteUrl: 'https://i.ibb.co/x8jsCp7H/Duck-ai-image-2026-10-12-21-56-6.jpg',
        originalLink: 'https://ibb.co/zHR5ny4J',
        description: 'Fique apoiada nas mãos e nos joelhos, com as mãos sob os ombros. Mantendo o joelho dobrado, leve um pé para trás e para cima sem girar o quadril. Volte com controle. Troque de lado após cerca de 20 segundos.',
        attention: 'Faça um movimento pequeno se isso ajudar a manter a coluna estável.',
        focusMuscles: ['Glúteo máximo', 'Estabilizadores do core'],
        steps: [
          'Posição de 4 apoios com punhos alinhados aos ombros e joelhos aos quadris.',
          'Mantendo o abdômen firme e o joelho a 90°, empurre a sola do pé em direção ao teto.',
          'Concentre a força nos glúteos sem balançar o quadril ou arquear a lombar.',
          'Execute por 20 segundos com uma perna e inverta o lado para mais 20 segundos.'
        ]
      }
    ]
  },
  {
    id: 'rotina-2',
    number: 2,
    title: 'Empinador Noturno',
    subtitle: 'Uma sequência com movimentos de extensão do quadril e apoio unilateral.',
    disclaimerNote: 'O nome é apenas uma identificação da rotina: os exercícios não garantem que os glúteos mudem de formato.',
    badge: 'Rotina 2',
    duration: '6 minutos · 2 voltas',
    exercises: [
      {
        id: 'r2-e1',
        name: 'Elevação pélvica com pausa',
        duration: '40 segundos de movimento · 20s descanso',
        workSeconds: 40,
        restSeconds: 20,
        isUnilateral: false,
        image: '/exercises/exercise_4.jpg',
        remoteUrl: 'https://i.ibb.co/s9Vgr0z8/Duck-ai-image-2026-10-12-21-56-5.jpg',
        originalLink: 'https://ibb.co/yFQNJw7H',
        description: 'Deite-se de costas, com os joelhos dobrados. Eleve o quadril e mantenha a posição por dois segundos, contraindo os glúteos sem prender a respiração. Desça devagar e repita.',
        attention: 'Mantenha a contração consciente no topo sem empurrar com a coluna lombar.',
        focusMuscles: ['Glúteo máximo', 'Glúteo médio', 'Posterior de coxa'],
        steps: [
          'Deitada de costas com pés alinhados ao quadril.',
          'Eleve os quadris ativando intencionalmente os glúteos.',
          'Pausa isométrica de 2 segundos completos no ponto mais alto.',
          'Desça de maneira suave e controlada até quase tocar o chão antes de repetir.'
        ]
      },
      {
        id: 'r2-e2',
        name: 'Afundo para trás alternado',
        duration: '40 segundos de movimento · 20s descanso',
        workSeconds: 40,
        restSeconds: 20,
        isUnilateral: false,
        image: '/exercises/exercise_5.jpg',
        remoteUrl: 'https://i.ibb.co/0RhmbBzf/Duck-ai-image-2026-10-12-21-56-4.jpg',
        originalLink: 'https://ibb.co/mV6bWvPH',
        description: 'Em pé, dê um passo para trás e flexione os joelhos até uma amplitude confortável. Empurre o chão com o pé da frente para voltar à posição inicial e alterne as pernas.',
        attention: 'Use uma base estável e reduza a profundidade se sentir desconforto nos joelhos.',
        focusMuscles: ['Glúteo máximo', 'Quadríceps', 'Equilíbrio'],
        steps: [
          'Fique em pé com postura ereta e olhar à frente.',
          'Dê um passo firme para trás com uma perna, flexionando os joelhos.',
          'Mantenha o joelho da perna da frente alinhado com o tornozelo.',
          'Empurre com o calcanhar frontal para retornar e repita com a outra perna.'
        ]
      },
      {
        id: 'r2-e3',
        name: 'Elevação pélvica unilateral',
        duration: '40 segundos (20s cada lado) · 20s descanso',
        workSeconds: 40,
        restSeconds: 20,
        isUnilateral: true,
        unilateralSwitchSeconds: 20,
        image: '/exercises/exercise_6.jpg',
        remoteUrl: 'https://i.ibb.co/HfTpBQ2b/Duck-ai-image-2026-10-12-21-56-3.jpg',
        originalLink: 'https://ibb.co/RkT4YWSs',
        description: 'Deite-se de costas, com um pé apoiado no chão e o outro levantado. Eleve o quadril usando a perna apoiada, sem deixar a pelve girar. Faça cerca de 20 segundos de cada lado.',
        attention: 'Evite inclinar ou tombar a bacia para os lados durante o movimento.',
        easierOption: 'Mantenha os dois pés apoiados e faça a elevação pélvica comum.',
        focusMuscles: ['Glúteo máximo isolado', 'Estabilizadores pélvicos'],
        steps: [
          'Deite de costas e eleve uma das pernas (flexionada ou estendida).',
          'Com o pé de apoio firme no chão, empurre o quadril para cima.',
          'Mantenha a pelve nivelada e paralela ao chão.',
          'Troque de perna na marca de 20 segundos para trabalhar o outro lado.'
        ]
      }
    ]
  },
  {
    id: 'rotina-3',
    number: 3,
    title: 'Lateral do Quadril',
    subtitle: 'Esta rotina trabalha movimentos de afastamento da perna e controle lateral do quadril.',
    disclaimerNote: 'Exercitar essa região não permite escolher de onde o corpo perde gordura, mas pode fortalecer os músculos envolvidos nos movimentos laterais.',
    badge: 'Rotina 3',
    duration: '6 minutos · 2 voltas',
    exercises: [
      {
        id: 'r3-e1',
        name: 'Elevação da perna deitada de lado',
        duration: '40 segundos (20s cada lado) · 20s descanso',
        workSeconds: 40,
        restSeconds: 20,
        isUnilateral: true,
        unilateralSwitchSeconds: 20,
        image: '/exercises/exercise_7.jpg',
        remoteUrl: 'https://i.ibb.co/xq8BXXXR/Duck-ai-image-2026-10-12-21-56-2.jpg',
        originalLink: 'https://ibb.co/m5F2bbbM',
        description: 'Deite-se de lado, com o corpo alinhado e a perna de cima estendida. Eleve a perna alguns centímetros sem girar o pé para o teto e desça com controle. Troque de lado após cerca de 20 segundos.',
        attention: 'Mantenha o movimento confortável; não é necessário levantar a perna muito alto.',
        focusMuscles: ['Glúteo médio', 'Glúteo mínimo', 'Tensor da fáscia lata'],
        steps: [
          'Deite-se de lado em linha reta, com a cabeça apoiada confortavelmente.',
          'Mantenha a perna de cima reta e a ponta do pé levemente apontada para a frente.',
          'Eleve a perna com movimento controlado sentindo a lateral do quadril.',
          'Não gire a bacia para trás. Troque de lado aos 20 segundos.'
        ]
      },
      {
        id: 'r3-e2',
        name: 'Abdução de quadril em quatro apoios',
        duration: '40 segundos (20s cada lado) · 20s descanso',
        workSeconds: 40,
        restSeconds: 20,
        isUnilateral: true,
        unilateralSwitchSeconds: 20,
        image: '/exercises/exercise_8.jpg',
        remoteUrl: 'https://i.ibb.co/v8TsZCH/Duck-ai-image-2026-10-12-21-56-1.jpg',
        originalLink: 'https://ibb.co/MLt8Mys',
        description: 'Fique em quatro apoios. Mantendo o joelho dobrado, abra uma perna para o lado sem inclinar o tronco. Volte devagar e alterne o lado após cerca de 20 segundos.',
        attention: 'Mantenha o tronco e o peso estáveis entre as mãos.',
        focusMuscles: ['Glúteo médio', 'Estabilizadores do quadril'],
        steps: [
          'Posicione-se em 4 apoios com coluna neutra e abdômen contraído.',
          'Mantendo o joelho dobrado a 90°, eleve a perna lateralmente.',
          'Evite torcer o tronco para o lado oposto para compensar.',
          'Desça devagar e inverta o lado após 20 segundos.'
        ]
      },
      {
        id: 'r3-e3',
        name: 'Concha',
        duration: '40 segundos (20s cada lado) · 20s descanso',
        workSeconds: 40,
        restSeconds: 20,
        isUnilateral: true,
        unilateralSwitchSeconds: 20,
        image: '/exercises/exercise_9.jpg',
        remoteUrl: 'https://i.ibb.co/KJvZd78/Duck-ai-image-2026-10-12-21-56.jpg',
        originalLink: 'https://ibb.co/2T42xPp',
        description: 'Deite-se de lado com os joelhos dobrados e os pés juntos. Sem deixar a pelve rolar para trás, abra o joelho de cima e feche devagar. Troque de lado após cerca de 20 segundos.',
        attention: 'Sem deixar a pelve rolar para trás ao abrir o joelho.',
        easierOption: 'Diminua a amplitude ou faça pequenas pausas para manter o controle.',
        focusMuscles: ['Glúteo médio', 'Rotadores externos profundos'],
        steps: [
          'Deite de lado com joelhos dobrados a 45° e calcanhares colados um ao outro.',
          'Mantendo os pés unidos, abra o joelho superior como uma concha.',
          'Mantenha a pelve imóvel apontada para a frente.',
          'Retorne devagar e troque de lado aos 20 segundos.'
        ]
      }
    ]
  }
];

export const NUTRITION_IDEAS = [
  {
    title: 'Arroz, feijão e ovo',
    category: 'Almoço ou Jantar',
    badge: 'Econômico & Completo',
    desc: 'Combinação clássica que fornece aminoácidos essenciais, ferro e fibras de forma acessível e balanceada.',
  },
  {
    title: 'Leite com aveia e banana',
    category: 'Lanche Rápido',
    badge: 'Energia & Praticidade',
    desc: 'Carboidratos de liberação gradual com cálcio e proteínas leves para recuperar a energia do dia.',
  },
  {
    title: 'Iogurte natural com fruta e aveia',
    category: 'Café ou Lanche',
    badge: 'Probiótico & Fibras',
    desc: 'Excelente para a saúde intestinal, saciedade prolongada e fornecimento de proteínas de alta biodisponibilidade.',
  },
  {
    title: 'Sardinha com pão ou com arroz',
    category: 'Refeição Rápida',
    badge: 'Rico em Ômega-3',
    desc: 'Fonte rica em ômega-3, cálcio e proteína de alta qualidade com ótimo custo-benefício.',
  },
  {
    title: 'Frango com arroz, feijão ou legumes',
    category: 'Almoço ou Jantar',
    badge: 'Proteína Magra',
    desc: 'Base proteica com micronutrientes dos legumes para suporte à recuperação e manutenção muscular.',
  },
  {
    title: 'Ovos mexidos com pão e uma fruta',
    category: 'Café da Manhã',
    badge: 'Fácil & Rápido',
    desc: 'Preparação simples em poucos minutos com vitaminas, colina e energia para a manhã.',
  }
];

export const WEEKLY_SCHEDULE_DATA = [
  { day: 'Segunda-feira', label: 'Seg', routineId: 'rotina-1', plan: 'Rotina 1 — Firmador Express', type: 'workout' },
  { day: 'Terça-feira', label: 'Ter', routineId: null, plan: 'Descanso ou movimento leve', type: 'rest' },
  { day: 'Quarta-feira', label: 'Qua', routineId: 'rotina-2', plan: 'Rotina 2 — Empinador Noturno', type: 'workout' },
  { day: 'Quinta-feira', label: 'Qui', routineId: null, plan: 'Descanso', type: 'rest' },
  { day: 'Sexta-feira', label: 'Sex', routineId: 'rotina-3', plan: 'Rotina 3 — Lateral do Quadril', type: 'workout' },
  { day: 'Sábado', label: 'Sáb', routineId: null, plan: 'Movimento leve opcional', type: 'active-rest' },
  { day: 'Domingo', label: 'Dom', routineId: null, plan: 'Descanso', type: 'rest' }
];
