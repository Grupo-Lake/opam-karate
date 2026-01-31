# OPAM KARATE - Site Institucional

Site institucional completo para o DOJO de Karate **OPAM KARATE**, desenvolvido com Next.js, TypeScript e Tailwind CSS.

## 🥋 Sobre o Projeto

Este é um site institucional moderno e responsivo para uma academia de Karate, com páginas completas, animações suaves e design profissional.

## ✨ Funcionalidades

- **Página Inicial**: Hero section impactante com animações, sobre o dojo, benefícios do karate, turmas e CTA
- **Sobre**: História, valores e equipe de instrutores (inclui referência ao CODEC)
- **Turmas**: Detalhes de todas as turmas disponíveis (Infantil, Juvenil, Adulto e Competição)
- **Horários**: Grade completa de horários das aulas
- **Galeria**: Galeria de fotos dos eventos e treinos
- **CODEC**: Página dedicada ao Congresso de Desenvolvimento nos Esportes de Contato
- **Contato**: Formulário de contato, informações e localização

## 🚀 Tecnologias Utilizadas

- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI reutilizáveis e acessíveis
- **Framer Motion** - Animações fluidas e interativas
- **Lucide React** - Ícones modernos

## 📦 Instalação

As dependências já foram instaladas. Caso precise reinstalar:

```bash
npm install
```

## 🏃‍♂️ Como Executar

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx              # Página inicial
│   ├── sobre/page.tsx        # Página sobre
│   ├── turmas/page.tsx       # Página de turmas
│   ├── horarios/page.tsx     # Página de horários
│   ├── galeria/page.tsx      # Página de galeria
│   ├── contato/page.tsx      # Página de contato
│   ├── layout.tsx            # Layout principal
│   └── globals.css           # Estilos globais
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # Cabeçalho do site
│   │   └── Footer.tsx        # Rodapé do site
│   ├── sections/
│   │   ├── HeroSection.tsx   # Seção hero da home
│   │   ├── AboutSection.tsx  # Seção sobre da home
│   │   ├── BenefitsSection.tsx # Seção benefícios
│   │   ├── ClassesSection.tsx  # Seção turmas
│   │   └── CTASection.tsx      # Seção call-to-action
│   └── ui/                   # Componentes shadcn/ui
└── lib/
    └── utils.ts              # Utilitários
```

## 🎨 Personalização

### Cores

As cores principais do tema (vermelho) podem ser ajustadas no arquivo `src/app/globals.css`.

### Conteúdo

- **Informações de contato**: Edite Footer.tsx e contato/page.tsx
  - Endereço: R. Colonial das Missões, 114 - Itaquera - São Paulo - SP, 08210-120
  - Instagram: https://www.instagram.com/opamkarate/
  - Facebook: https://web.facebook.com/karatenindoryu
  - WhatsApp: +55 11 96939-2260 (Sensei Bruno Garcia)
- **Horários**: Edite horarios/page.tsx
- **Turmas**: Edite turmas/page.tsx
- **Imagens**: Adicione imagens na pasta `public/` e substitua os placeholders
- **Filiação SHINSHUKAN**: https://shinshukan.com.br/site/filiados-shinshukan/opam-itaquera/
- **Congresso CODEC**: https://congressocodec.com.br/
- **Itaquera.net.br**: https://itaquera.net.br/sobre/opam-nin-do-ryu-karate

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:
- 📱 Mobile (smartphones)
- 📱 Tablet
- 💻 Desktop
- 🖥️ Telas grandes

## 🔧 Build para Produção

Para criar uma build otimizada:

```bash
npm run build
```

Para executar a build:

```bash
npm run start
```

## 📝 Próximos Passos

1. **Adicionar imagens reais**: Substitua os placeholders por fotos do dojo
2. **Integrar formulário**: Conecte o formulário de contato com um backend ou serviço (como FormSpree, EmailJS)
3. **Adicionar mapa**: Integre Google Maps na página de contato
4. **SEO**: Adicione meta tags específicas para cada página
5. **Analytics**: Integre Google Analytics ou similar
6. **WhatsApp**: Adicione o link real do WhatsApp
7. **Redes Sociais**: Atualize os links das redes sociais

## 📄 Licença

Este projeto foi desenvolvido para o OPAM KARATE.

---
