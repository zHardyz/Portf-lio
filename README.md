# Portfólio Pessoal - Guia de Edição

Este documento contém instruções sobre como personalizar e editar as diferentes seções do seu portfólio pessoal.

## Índice

1. [Informações Pessoais](#informações-pessoais)
2. [Seção Sobre](#seção-sobre)
3. [Habilidades](#habilidades)
4. [Projetos](#projetos)
5. [Serviços](#serviços)
6. [Contato](#contato)
7. [Tema e Cores](#tema-e-cores)
8. [Responsividade](#responsividade)

## Informações Pessoais

Para alterar as informações pessoais no cabeçalho e na seção hero:

1. Abra o arquivo `index.html`
2. Localize a seção hero (aproximadamente linha 50)
3. Altere o nome em `<h1 class="glitch-text" data-text="Jasson Adriano">Jasson Adriano</h1>`
4. Altere a descrição em `<p class="hero-description">Transformando ideias em realidade digital</p>`

Para alterar as profissões que aparecem no efeito de digitação:

1. Abra o arquivo `script.js`
2. Localize a função `initTypingEffect()` (aproximadamente linha 46)
3. Edite o array `words` com suas profissões ou habilidades

## Seção Sobre

Para editar o texto da seção "Sobre Mim":

1. Abra o arquivo `index.html`
2. Localize a seção com id "about" (aproximadamente linha 70)
3. Edite os parágrafos dentro da div `about-text`

## Habilidades

Para editar as habilidades e seus níveis:

1. Abra o arquivo `index.html`
2. Localize a div `skills-grid` (aproximadamente linha 80)
3. Cada habilidade é representada por um elemento `skill-card`

Para **adicionar uma nova habilidade**:

```html
<div class="skill-card animate-on-scroll">
    <i class="skill-icon nome-da-tecnologia-icon"></i>
    <span>Nome da Tecnologia</span>
    <div class="skill-level" data-level="85"></div>
</div>
```

Para **alterar o nível de uma habilidade**:

1. Modifique o valor do atributo `data-level` no elemento `skill-level`
2. Os valores variam de 0 a 100, representando a porcentagem de domínio da habilidade

Por exemplo, para alterar o nível de JavaScript para 90%:
```html
<div class="skill-level" data-level="90"></div>
```

Para **adicionar um novo ícone de habilidade**:

1. Abra o arquivo `style.css`
2. Adicione uma nova classe para o ícone seguindo o padrão das existentes
3. Use um SVG adequado para a tecnologia

Exemplo:
```css
.nova-tecnologia-icon {
    background-color: #6c5ce7;
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='...'/%3E%3C/svg%3E");
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='...'/%3E%3C/svg%3E");
    mask-size: contain;
    -webkit-mask-size: contain;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    width: 40px;
    height: 40px;
}
```

## Projetos

Para editar os projetos exibidos:

1. Abra o arquivo `index.html`
2. Localize a seção com id "projects" (aproximadamente linha 110)
3. Cada projeto é representado por um elemento `project-card`

Para **adicionar um novo projeto**:

```html
<article class="project-card animate-on-scroll">
    <div class="project-image">
        <img src="imagens/seu-projeto.png" alt="Nome do Projeto - Interface do projeto" loading="lazy">
        <div class="project-overlay">
            <div class="project-links">
                <a href="https://link-do-projeto.com" target="_blank" rel="noopener" class="project-link">Ver Projeto</a>
                <a href="https://github.com/seu-usuario/repositorio" target="_blank" rel="noopener" class="project-link">GitHub</a>
            </div>
        </div>
    </div>
    <div class="project-info">
        <h3>Nome do Projeto</h3>
        <p>Descrição do projeto em poucas palavras.</p>
        <div class="project-tags">
            <span>Tecnologia 1</span>
            <span>Tecnologia 2</span>
            <span>Tecnologia 3</span>
        </div>
    </div>
</article>
```

Para projetos em desenvolvimento, use:

```html
<div class="project-links">
    <span class="project-status">Em Desenvolvimento</span>
</div>
```

## Serviços

Para editar os serviços oferecidos:

1. Abra o arquivo `index.html`
2. Localize a seção com id "services" (aproximadamente linha 220)
3. Cada serviço é representado por um elemento `service-card`

Para **adicionar ou editar um serviço**:

```html
<div class="service-card animate-on-scroll">
    <div class="service-icon">
        <i class="nome-do-servico-icon" aria-hidden="true"></i>
    </div>
    <div class="service-content">
        <h3>Nome do Serviço</h3>
        <p>Descrição do serviço oferecido.</p>
    </div>
</div>
```

### Layout Responsivo de Serviços

A seção de serviços possui um layout adaptativo que muda conforme o tamanho da tela:

- **Em telas grandes (desktop)**: Os serviços são exibidos como cards verticais em uma grade, com o ícone acima do texto.
- **Em telas pequenas (mobile)**: Os serviços são exibidos como cards horizontais em uma lista, com o ícone à esquerda do texto, proporcionando uma melhor experiência em dispositivos móveis.

Esta abordagem dual garante que a seção de serviços seja sempre apresentada da forma mais adequada para cada dispositivo.

## Contato

Para editar as informações de contato:

1. Abra o arquivo `index.html`
2. Localize a seção com id "contact" (aproximadamente linha 250)
3. Altere os links e informações nos elementos `contact-card`

Por exemplo, para alterar o link do WhatsApp:
```html
<a href="https://wa.me/5599999999999" target="_blank" rel="noopener" class="contact-card whatsapp animate-on-scroll">
```

## Tema e Cores

Para alterar as cores do tema:

1. Abra o arquivo `style.css`
2. Localize as variáveis CSS no início do arquivo (aproximadamente linha 2)
3. Modifique as cores conforme desejado

```css
:root {
    /* Cores - Tema Escuro (padrão) */
    --bg-primary: #0f0f13;
    --bg-secondary: #161622;
    --text-primary: #ffffff;
    --text-secondary: #a0a0b0;
    --accent-primary: #6c5ce7;
    --accent-secondary: #00b8ff;
    --gradient-primary: linear-gradient(135deg, #6c5ce7, #00b8ff);
    /* ... outras variáveis ... */
}

[data-theme="light"] {
    /* Cores - Tema Claro */
    --bg-primary: #f5f7ff;
    --bg-secondary: #ffffff;
    /* ... outras variáveis ... */
}
```

## Responsividade

O site está configurado para ser totalmente responsivo em diferentes tamanhos de tela, desde desktops grandes até smartphones pequenos. A estrutura de responsividade é organizada da seguinte forma:

### Breakpoints Principais

O site utiliza os seguintes breakpoints para adaptação a diferentes dispositivos:

- **Telas grandes (1400px+)**: Layout amplo com 3 colunas para projetos
- **Telas médias a grandes (até 1200px)**: Layout ajustado com 2 colunas para projetos
- **Tablets e telas médias (até 992px)**: Ajustes de tamanho de fonte e layout
- **Tablets pequenos (até 768px)**: Menu mobile ativado, layout em coluna única
- **Smartphones (até 576px)**: Tamanhos reduzidos, espaçamentos menores
- **Smartphones pequenos (até 400px)**: Ajustes específicos para telas muito pequenas

### Como Ajustar a Responsividade

Se precisar fazer ajustes na responsividade:

1. Abra o arquivo `style.css`
2. Localize a seção "Responsividade - Versão Unificada e Melhorada" (próximo ao final do arquivo)
3. Modifique os valores dentro das media queries conforme necessário

Por exemplo, para ajustar o tamanho da fonte do título principal em smartphones:

```css
@media (max-width: 576px) {
    .glitch-text {
        font-size: 2.3rem; /* Altere este valor */
    }
    /* ... outros estilos ... */
}
```

### Testando a Responsividade

Para testar a responsividade do seu site:

1. Use as ferramentas de desenvolvedor do navegador (F12 ou Ctrl+Shift+I)
2. Ative o modo de visualização responsiva (ícone de dispositivo móvel)
3. Selecione diferentes tamanhos de tela ou defina dimensões personalizadas
4. Verifique como o site se comporta em cada tamanho

Recomenda-se testar em dispositivos reais sempre que possível, além dos emuladores do navegador.

---

## Dicas Adicionais

- Sempre faça backup do site antes de realizar alterações significativas
- Teste as alterações em diferentes navegadores e dispositivos
- Otimize as imagens antes de adicioná-las ao site para melhor desempenho
- Mantenha os arquivos organizados para facilitar futuras edições
- Ao adicionar novos elementos, certifique-se de que eles sejam responsivos seguindo o padrão existente

Para qualquer dúvida adicional, entre em contato com o desenvolvedor original ou consulte a documentação das tecnologias utilizadas (HTML, CSS e JavaScript). 