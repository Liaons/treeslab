# TREES Lab Website

Proposta para o novo site do TREES - Grupo de Pesquisa em Sensoriamento Remoto e Ecologia.
https://liaons.github.io/treeslab/

## 🌐 Estrutura do Site

O site foi completamente reformulado e dividido em múltiplas páginas especializadas:

### 📄 Páginas

- **`index.html`** - Página inicial com apresentação do laboratório
- **`publicacoes.html`** - Página dedicada às publicações científicas
- **`equipe.html`** - Página da equipe com perfis dos membros

### 🎨 Arquivos de Estilo e Scripts

- **`style.css`** - Estilos CSS compartilhados
- **`trees-common.js`** - Funcionalidades JavaScript compartilhadas

### 📊 Dados

- **`peer_reviewed_scientific_articles.csv`** - Base de dados das publicações
- **`trees_lab_people_clean.csv`** - Base de dados da equipe

## ✨ Funcionalidades

### Página Inicial (`index.html`)
- Hero section impactante com gradiente
- Seções sobre missão e abordagem do laboratório
- Estatísticas dinâmicas (contadores animados)
- Áreas de pesquisa destacadas
- Destaques recentes com links para outras páginas

### Página de Publicações (`publicacoes.html`)
- **Seções retráteis por ano** - Publicações agrupadas cronologicamente
- **Estatísticas detalhadas** - Total, recentes, alto impacto, anos ativos
- **Auto-abertura** - Ano mais recente aberto automaticamente
- **Links diretos** - Acesso às publicações originais

### Página da Equipe (`equipe.html`)
- **Agrupamentos por categoria**:
  - 👨‍🔬 Líderes de Pesquisa
  - 🎓 Pós-Doutorandos
  - 📚 Doutorandos
  - 📖 Mestrandos
  - 🎒 Graduandos
  - 🤝 Colaboradores
- **Seções retráteis** - Organização hierárquica da equipe
- **Perfis completos** - Fotos, pesquisa, expertise, formação
- **Links sociais** - LinkedIn, ResearchGate, ORCID

## 🎯 Características do Design

### Visual Moderno
- Tipografia profissional (system fonts)
- Paleta de cores consistente (#2d6a57, #1f4a3a)
- Gradientes suaves e sombras elegantes
- Layout responsivo para todos os dispositivos

### Interatividade
- **Animações suaves** - Fade-in no scroll
- **Contadores animados** - Estatísticas crescem dinamicamente
- **Hover effects** - Feedbacks visuais nos elementos
- **Navegação fixa** - Barra superior sempre acessível

### Seções Retráteis
- **Sistema de accordion** - Uma seção aberta por vez
- **Indicadores visuais** - Ícones e cores para estados
- **Transições suaves** - Animações de abertura/fechamento
- **Auto-organização** - Seções relevantes abertas por padrão

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com flexbox/grid
- **JavaScript ES6+** - Interatividade e carregamento de dados
- **Papa Parse** - Processamento de arquivos CSV
- **CSS Animations** - Transições e efeitos visuais

## 🚀 Como Executar

1. Clone o repositório
2. Inicie um servidor local:
   ```bash
   python3 -m http.server 8000
   ```
3. Acesse `http://localhost:8000`

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:
- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (< 768px)

## 🔄 Atualizações de Dados

Os dados são carregados dinamicamente dos arquivos CSV:
- Para adicionar publicações: edite `peer_reviewed_scientific_articles.csv`
- Para atualizar equipe: edite `trees_lab_people_clean.csv`
- As páginas se atualizam automaticamente

## 🎨 Personalização

### Cores
As cores principais podem ser alteradas no arquivo `style.css`:
```css
--primary-color: #2d6a57;
--secondary-color: #1f4a3a;
```

### Categorias da Equipe
Para adicionar novas categorias, edite o objeto `categoryLabels` em `equipe.html`.

## 📧 Contato

Instituto Nacional de Pesquisas Espaciais (INPE)  
Email: contato@treeslab.org

---

*Desenvolvido com ❤️ para o TREES Lab*
