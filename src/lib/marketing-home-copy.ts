export type MarketingLocale = 'pt' | 'en';

export const DEVELOPER_NAME = 'E.J TIAGO INVESTIMENTOS';

export type ProviderTypeKey =
  | 'restaurant'
  | 'food_business'
  | 'home_cook'
  | 'food_truck'
  | 'individual_seller'
  | 'other';

export type MarketingHomeCopy = {
  nav: { about: string; providers: string; howItWorks: string; contact: string };
  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    paragraph1: string;
    paragraph2: string;
    learnMore: string;
    developedBy: string;
  };
  about: {
    title: string;
    p1: string;
    p2: string;
    bullets: string[];
    audienceTitle: string;
    customers: string;
    providers: string;
    admins: string;
  };
  providersSection: {
    badge: string;
    title: string;
    intro: string;
    calloutTitle: string;
    calloutBody: string;
    types: { key: ProviderTypeKey; title: string; desc: string }[];
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: { step: string; title: string; desc: string }[];
  };
  trust: { title: string; desc: string }[];
  contact: {
    title: string;
    body: string;
  };
  footer: {
    tagline: string;
    contactLabel: string;
    copyright: string;
    developerLine: string;
  };
};

export const MARKETING_HOME_COPY: Record<MarketingLocale, MarketingHomeCopy> = {
  pt: {
    nav: {
      about: 'O que é',
      providers: 'Fornecedores',
      howItWorks: 'Como funciona',
      contact: 'Contacto',
    },
    hero: {
      badge: 'Plataforma de comida local · Clientes e parceiros',
      titleLine1: 'A comida da sua cidade,',
      titleHighlight: 'num só lugar.',
      paragraph1:
        'é uma plataforma tecnológica que liga quem tem fome a quem cozinha — restaurantes, negócios de alimentos, cozinheiros em casa, food trucks e vendedores independentes.',
      paragraph2:
        'A ElOlam Meal não é o restaurante: facilita a descoberta, o pedido e a comunicação. A preparação, o pagamento e a entrega são acordados entre cliente e fornecedor, com regras claras na app.',
      learnMore: 'Saiba mais sobre a plataforma',
      developedBy: 'Plataforma desenvolvida por',
    },
    about: {
      title: 'O que é a ElOlam Meal?',
      p1: 'É um marketplace de comida: de um lado, clientes que procuram refeições perto de si; do outro, fornecedores que publicam cardápio, preços, zona de entrega e informação sobre o tipo de negócio.',
      p2: 'Existe também a app ElOlam Meal Partner para parceiros gerirem pedidos, perfil, verificação e entrega própria — porque a plataforma não envia motoristas para as encomendas do fornecedor; cada parceiro configura a entrega.',
      bullets: [
        'Pesquisa por cidade e tipo de fornecedor',
        'Pedidos e histórico na conta do cliente',
        'Painel do parceiro para menu e encomendas',
        'Verificação e transparência sobre quem vende',
      ],
      audienceTitle: 'Para quem é?',
      customers: 'Clientes — quem quer encomendar comida local com informação clara sobre o vendedor.',
      providers:
        'Fornecedores — qualquer pessoa ou negócio que vende comida preparada, desde restaurantes formais até quem cozinha em casa.',
      admins: 'Administradores — equipa que revê perfis e mantém a confiança na plataforma.',
    },
    providersSection: {
      badge: 'Aberto a todos os perfis',
      title: 'Fornecedores de todos os tipos',
      intro:
        'A ElOlam Meal foi pensada para todos os tipos de fornecedores, incluindo quem não tem restaurante registrado. Cozinheiros em casa, vendedores individuais e outros perfis são bem-vindos — com transparência sobre se o negócio é ou não uma empresa registrada.',
      calloutTitle: 'Parceiros de todos os perfis',
      calloutBody:
        'O processo inclui tipo de negócio, detalhes, localização e entrega. Não é necessário restaurante formal — cozinheiros em casa e vendedores independentes podem fazer parte da plataforma quando o serviço estiver disponível na sua região.',
      types: [
        {
          key: 'restaurant',
          title: 'Restaurante',
          desc: 'Estabelecimentos com ou sem registo comercial formal.',
        },
        {
          key: 'food_business',
          title: 'Negócio de alimentos',
          desc: 'Empresas registradas que produzem ou vendem comida.',
        },
        {
          key: 'home_cook',
          title: 'Cozinheiro(a) em casa',
          desc: 'Quem cozinha em casa e quer vender refeições na sua cidade.',
        },
        {
          key: 'food_truck',
          title: 'Food truck',
          desc: 'Cozinha móvel com entrega ou recolha no local.',
        },
        {
          key: 'individual_seller',
          title: 'Vendedor individual',
          desc: 'Vendedores independentes — sem necessidade de restaurante registrado.',
        },
        {
          key: 'other',
          title: 'Outros',
          desc: 'Qualquer modelo de venda de comida que faça sentido para si.',
        },
      ],
    },
    howItWorks: {
      title: 'Como funciona',
      subtitle: 'Simples para quem pede e para quem cozinha.',
      steps: [
        {
          step: '1',
          title: 'Descubra',
          desc: 'Clientes encontram cozinhas e vendedores perto de si, com tipo de negócio e avaliações visíveis.',
        },
        {
          step: '2',
          title: 'Peça',
          desc: 'Escolha pratos no cardápio, confirme endereço e acompanhe o estado do pedido na app.',
        },
        {
          step: '3',
          title: 'Receba',
          desc: 'O fornecedor entrega por conta própria (ou combina recolha), conforme a configuração dele.',
        },
      ],
    },
    trust: [
      {
        title: 'Fornecedores verificados',
        desc: 'A equipa pode rever registos e segurança alimentar. O cliente vê se compra a um negócio registrado ou a um vendedor individual.',
      },
      {
        title: 'Avaliações reais',
        desc: 'Classificações de clientes para escolher com confiança.',
      },
      {
        title: 'Perto de si',
        desc: 'Descoberta por cidade, com taxas e raio de entrega definidos pelo fornecedor.',
      },
    ],
    contact: {
      title: 'Quer saber mais?',
      body: 'Este site apresenta a ElOlam Meal. Para dúvidas, parcerias ou informações sobre a plataforma, contacte a nossa equipa.',
    },
    footer: {
      tagline:
        'Plataforma que conecta clientes e fornecedores de comida. ElOlam Meal é tecnologia — não vende nem prepara os pratos dos parceiros.',
      contactLabel: 'Contacto',
      copyright: 'ElOlam Meal. Site informativo da plataforma.',
      developerLine: 'Desenvolvido por',
    },
  },
  en: {
    nav: {
      about: 'About',
      providers: 'Providers',
      howItWorks: 'How it works',
      contact: 'Contact',
    },
    hero: {
      badge: 'Local food platform · Customers and partners',
      titleLine1: 'Your city’s food,',
      titleHighlight: 'in one place.',
      paragraph1:
        'is a technology platform connecting hungry customers with people who cook — restaurants, food businesses, home cooks, food trucks, and independent sellers.',
      paragraph2:
        'ElOlam Meal is not the restaurant: we help with discovery, ordering, and communication. Preparation, payment, and delivery are agreed between customer and provider, with clear rules in the app.',
      learnMore: 'Learn more about the platform',
      developedBy: 'Platform developed by',
    },
    about: {
      title: 'What is ElOlam Meal?',
      p1: 'It is a food marketplace: on one side, customers looking for meals nearby; on the other, providers who publish menus, prices, delivery areas, and business type information.',
      p2: 'There is also the ElOlam Meal Partner app for partners to manage orders, profile, verification, and self-delivery — the platform does not dispatch drivers for provider orders; each partner configures delivery.',
      bullets: [
        'Search by city and provider type',
        'Orders and history in the customer account',
        'Partner dashboard for menu and orders',
        'Verification and transparency about who sells',
      ],
      audienceTitle: 'Who is it for?',
      customers: 'Customers — anyone who wants to order local food with clear information about the seller.',
      providers:
        'Providers — any person or business selling prepared food, from formal restaurants to home cooks.',
      admins: 'Administrators — the team that reviews profiles and maintains trust on the platform.',
    },
    providersSection: {
      badge: 'Open to every profile',
      title: 'All types of providers',
      intro:
        'ElOlam Meal is built for all types of providers, including those without a registered restaurant. Home cooks, individual sellers, and other profiles are welcome — with transparency about whether the business is a registered company.',
      calloutTitle: 'Partners of every kind',
      calloutBody:
        'The process covers business type, details, location, and delivery. A formal restaurant is not required — home cooks and independent sellers can join the platform when the service is available in your area.',
      types: [
        {
          key: 'restaurant',
          title: 'Restaurant',
          desc: 'Establishments with or without formal business registration.',
        },
        {
          key: 'food_business',
          title: 'Food business',
          desc: 'Registered companies that produce or sell food.',
        },
        {
          key: 'home_cook',
          title: 'Home cook',
          desc: 'Cooks at home who want to sell meals in their city.',
        },
        {
          key: 'food_truck',
          title: 'Food truck',
          desc: 'Mobile kitchen with delivery or pickup.',
        },
        {
          key: 'individual_seller',
          title: 'Individual seller',
          desc: 'Independent sellers — no registered restaurant required.',
        },
        {
          key: 'other',
          title: 'Other',
          desc: 'Any food sales model that fits your situation.',
        },
      ],
    },
    howItWorks: {
      title: 'How it works',
      subtitle: 'Simple for those who order and those who cook.',
      steps: [
        {
          step: '1',
          title: 'Discover',
          desc: 'Customers find kitchens and sellers nearby, with business type and ratings visible.',
        },
        {
          step: '2',
          title: 'Order',
          desc: 'Choose dishes from the menu, confirm address, and track order status in the app.',
        },
        {
          step: '3',
          title: 'Receive',
          desc: 'The provider delivers on their own (or arranges pickup), according to their settings.',
        },
      ],
    },
    trust: [
      {
        title: 'Verified providers',
        desc: 'The team can review registrations and food safety. Customers see whether they buy from a registered business or an individual seller.',
      },
      {
        title: 'Real ratings',
        desc: 'Customer ratings to choose with confidence.',
      },
      {
        title: 'Near you',
        desc: 'Discovery by city, with fees and delivery radius set by the provider.',
      },
    ],
    contact: {
      title: 'Want to know more?',
      body: 'This site introduces ElOlam Meal. For questions, partnerships, or platform information, contact our team.',
    },
    footer: {
      tagline:
        'A platform connecting customers and food providers. ElOlam Meal is technology — it does not sell or prepare partners’ dishes.',
      contactLabel: 'Contact',
      copyright: 'ElOlam Meal. Informational platform website.',
      developerLine: 'Developed by',
    },
  },
};
