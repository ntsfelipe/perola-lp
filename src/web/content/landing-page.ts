import type { LandingPageContent } from "@/types/content";

export const landingPageContent = {
  seo: {
    title: "Pérola | Fisioterapia pélvica especializada",
    description:
      "Landing page da clinica Pérola Fisioterapia Pélvica, especializada em saúde pélvica para mulheres e homens.",
  },
  brand: {
    name: "PÉROLA",
    tagline: "Cuidado especializado para a saúde que sustenta a vida.",
    logoUrl: "/images/perola-logo.png",
  },
  navigation: [
    { id: "specialties", label: "Especialidades", href: "#especialidades", visible: true },
    { id: "clinic", label: "Clínica", href: "#clinica", visible: true },
    { id: "team", label: "Equipe", href: "#equipe", visible: true },
    { id: "testimonials", label: "Depoimentos", href: "#depoimentos", visible: true },
    { id: "location", label: "Localização", href: "#localizacao", visible: true },
    { id: "blog", label: "Blog", href: "/blog", visible: false },
  ],
  contact: {
    whatsappNumber: "+55 (12) 99683-8196",
    whatsappMessage:
      "Olá! Gostaria de saber mais sobre os atendimentos da clínica Pérola.",
    address: "Rua José Alves dos Santos, 281 Edifico New Port, sala 305, 3 andar - Floradas de São José, São José dos Campos - SP, 12230-081",
    mapUrl: "https://www.google.com/maps/place/P%C3%A9rola+P%C3%A9lvica+Fisioterapia/@-23.2194421,-45.889989,17z/data=!4m6!3m5!1s0x94cc4b7ab3810545:0x85fc81dc0f1a6556!8m2!3d-23.2194421!4d-45.889989!16s%2Fg%2F11qh239mk1?entry=ttu&g_ep=EgoyMDI2MDYyOC4wIKXMDSoASAFQAw%3D%3D",
    instagramUrl: "https://www.instagram.com/perola.pelvica/",
  },
  hero: {
    enabled: true,
    eyebrow: "Fisioterapia pélvica especializada",
    title: "Cuidado especializado para a saúde que",
    titleAccent: "sustenta a vida.",
    description:
      "Atendimento humanizado e baseado em evidências para mulheres e homens em todas as fases da vida. Um espaço seguro para recuperação, autonomia e bem-estar.",
    ctaLabel: "Agendar consulta",
    image: {
      src: "/images/perola-logo.png",
      alt: "Logotipo da clínica Pérola Fisioterapia Pélvica",
      width: 5000,
      height: 5000,
    },
  },
  metrics: {
    enabled: true,
    items: [
      { id: "experience", value: "5+ anos", label: "de experiência clínica", icon: "badge" },
      { id: "patients", value: "1.000+", label: "pacientes atendidos", icon: "users" },
      { id: "specialists", value: "Especialistas", label: "altamente certificadas", icon: "award" },
    ],
  },
  specialties: {
    enabled: true,
    eyebrow: "Cuidado integral",
    title: "Nossas especialidades",
    description:
      "Abordagens personalizadas para prevenir e tratar disfunções pélvicas com acolhimento e ciência.",
    items: [
      {
        id: "obstetrics",
        icon: "baby",
        title: "Obstetrícia & preparação",
        description: "ALTERAR_INFORMAÇÕES — preparação para gestação, parto e puerpério.",
      },
      {
        id: "postpartum",
        icon: "heart",
        title: "Recuperação pós-parto",
        description: "ALTERAR_INFORMAÇÕES — recuperação funcional e retorno seguro às atividades.",
      },
      {
        id: "female",
        icon: "sparkles",
        title: "Disfunções femininas",
        description: "ALTERAR_INFORMAÇÕES — cuidado individualizado para diferentes necessidades.",
      },
      {
        id: "male",
        icon: "person",
        title: "Saúde pélvica masculina",
        description: "ALTERAR_INFORMAÇÕES — avaliação, prevenção e reabilitação especializada.",
      },
      {
        id: "nutrition",
        icon: "nutrition",
        title: "Nutrição & amamentação",
        description: "ALTERAR_INFORMAÇÕES — suporte integrado para cada fase do cuidado.",
      },
    ],
  },
  team: {
    enabled: true,
    eyebrow: "Nossa equipe",
    title: "Excelência clínica encontra empatia profunda.",
    description:
      "A reabilitação pélvica vai além dos exercícios: ela restaura confiança e autonomia. Nossa equipe combina formação rigorosa, escuta ativa e atendimento livre de julgamentos.",
    image: {
      src: "/images/imagens/erica-1.jpeg",
      alt: "Erica, profissional da equipe Perola",
      width: 1425,
      height: 1600,
    },
    professionals: [
      {
        id: "erica",
        name: "Erica",
        role: "Fisioterapeuta pelvica",
        image: {
          src: "/images/imagens/erica-3.jpeg",
          alt: "Retrato de Erica",
          width: 1103,
          height: 1600,
        },
        detailImage: {
          src: "/images/imagens/erica-1.jpeg",
          alt: "Retrato de Erica",
          width: 1425,
          height: 2048,
        },
      },
      {
        id: "bianca-fernandes",
        name: "Bianca Fernandes",
        role: "Fisioterapeuta",
        image: {
          src: "/images/imagens/bianca-fernandes-fisioterapeuta.jpeg",
          alt: "Retrato de Bianca Fernandes",
          width: 1078,
          height: 1600,
        },
      },
      {
        id: "gabriela-furtado",
        name: "Gabriela Furtado",
        role: "Fisioterapeuta pelvica",
        image: {
          src: "/images/imagens/gabriela-furtado-fisioterapeuta-pelvica.jpeg",
          alt: "Retrato de Gabriela Furtado",
          width: 1067,
          height: 1600,
        },
      },
      {
        id: "gabriela-gregorio",
        name: "Gabriela Gregorio",
        role: "Doula",
        image: {
          src: "/images/imagens/gabriela-gregorio-doula.jpeg",
          alt: "Retrato de Gabriela Gregorio",
          width: 1072,
          height: 1600,
        },
      },
      {
        id: "luana-toledo",
        name: "Luana Toledo",
        role: "Nutricionista",
        image: {
          src: "/images/imagens/luana-toledo-nutricionista.jpeg",
          alt: "Retrato de Luana Toledo",
          width: 1062,
          height: 1600,
        },
      },
      {
        id: "naiara-guimaraes",
        name: "Naiara Guimaraes",
        role: "Fisioterapeuta pelvica",
        image: {
          src: "/images/imagens/naiara-guimaraes-fisioterapeuta-pelvica.jpeg",
          alt: "Retrato de Naiara Guimaraes",
          width: 1063,
          height: 1600,
        },
      },
    ],
    features: [
      "Avaliação minuciosa e escuta ativa.",
      "Privacidade total em cada sessão.",
      "Atualização científica constante.",
    ],
  },
  clinic: {
    enabled: true,
    eyebrow: "A clínica",
    title: "Um ambiente pensado para o seu conforto.",
    description:
      "Questões pélvicas exigem um ambiente seguro. Os espaços foram projetados para reduzir a ansiedade clínica e oferecer conforto sensorial e privacidade.",
    features: [
      {
        id: "humanized",
        icon: "heart",
        title: "Cuidado humanizado",
        description: "Abordagem gentil que respeita o seu tempo e necessidades individuais.",
      },
      {
        id: "private",
        icon: "door",
        title: "Salas privativas",
        description: "Discrição e tranquilidade durante todos os atendimentos.",
      },
      {
        id: "science",
        icon: "science",
        title: "Base científica",
        description: "Protocolos apoiados nas pesquisas mais recentes da área.",
      },
    ],
    gallery: [
      {
        src: "/images/imagens/clinica-1.jpeg",
        alt: "Sala de atendimento da clinica Perola",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/imagens/clinica-2.jpeg",
        alt: "Sala de atendimento com equipamentos",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/imagens/clinica-3.jpeg",
        alt: "Sala privativa de atendimento",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/imagens/clinica-4.jpeg",
        alt: "Corredor interno da clinica",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/imagens/clinica-5.jpeg",
        alt: "Consultorio da clinica Perola",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/imagens/clinica-6.jpeg",
        alt: "Area de apoio da clinica",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/imagens/clinica-7.jpeg",
        alt: "Circulacao interna da clinica",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/imagens/clinica-8.jpeg",
        alt: "Espaco interno da clinica",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/imagens/clinica-9.jpeg",
        alt: "Sala equipada para atendimento",
        width: 1200,
        height: 1600,
      },
    ],
  },
  location: {
    enabled: true,
    eyebrow: "Onde estamos",
    title: "Cuidado próximo, acesso simples.",
    description:
      "Substitua este conteúdo pelo endereço definitivo e pelas orientações de acesso à clínica.",
    ctaLabel: "Abrir no mapa",
    images: [
      {
        src: "/images/imagens/localizacao-2.jpeg",
        alt: "Fachada do edificio da clinica Perola",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/imagens/localizacao-entrada.jpeg",
        alt: "Entrada do edificio da clinica",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/imagens/localizacao-1.jpeg",
        alt: "Vista da regiao da clinica",
        width: 720,
        height: 1280,
      },
    ],
  },
  testimonials: {
    enabled: true,
    eyebrow: "Histórias reais",
    title: "O que dizem nossas pacientes",
    description: "Depoimentos de nossos clientes sobre a experiência de cuidado e recuperação.",
    items: [
      {
        id: "testimonial-1",
        quote:
          "Recomendo de olhos fechados e com certeza, voltarei no pós parto!",
        author: "Laís Faria",
        initials: "L",
        rating: 5,
      },
      {
        id: "testimonial-2",
        quote:
          "Ambiente acolhedor, atendimento excelente e conhecimento técnico",
        author: "Adriana Souza",
        initials: "A",
        rating: 5,
      },
      {
        id: "testimonial-3",
        quote:
          "De um profissionalismo sem igual, respeitosas e acolhedoras com seus pacientes.",
        author: "Gabriela Gregório",
        initials: "G",
        rating: 5,
      },
    ],
  },
  finalCta: {
    enabled: true,
    eyebrow: "Comece sua jornada",
    title: "Seu cuidado pode começar com uma conversa.",
    description:
      "Entre em contato para tirar dúvidas e encontrar o atendimento mais adequado para você.",
    ctaLabel: "Falar pelo WhatsApp",
  },
  footer: {
    description: "Cuidado especializado para a saúde que sustenta a vida.",
    serviceLinks: [
      { label: "Pós-parto", href: "#especialidades" },
      { label: "Saúde pélvica", href: "#especialidades" },
      { label: "Obstetrícia", href: "#especialidades" },
    ],
    institutionalLinks: [
      { label: "Equipe", href: "#equipe" },
      { label: "Clínica", href: "#clinica" },
      { label: "Localização", href: "#localizacao" },
    ],
    copyright: "© 2026 Pérola Fisioterapia Pélvica. Todos os direitos reservados.",
  },
} satisfies LandingPageContent;
