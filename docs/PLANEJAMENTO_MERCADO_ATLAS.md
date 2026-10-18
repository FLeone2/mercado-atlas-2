# Planejamento do novo Mercado Atlas

18 de outubro de 2026 · Escopo exclusivo de planejamento

Reorganizar o Mercado Atlas em seis páginas editoriais contínuas, com Estúdio e Mercado em movimento acessíveis pelo menu Explorar. Preservar todas as análises, ferramentas, filtros, tabelas e exportações. A direção visual será a das três imagens aprovadas: fundo quente, títulos serifados, números em sans, superfícies suaves e uma figura protagonista por seção.

Este plano não autoriza implementação, publicação, criação de repositório ou mudança na base. O destino do futuro projeto permanece para a execução posterior. A migração deve ocorrer em etapas, preservando o projeto original e usando seus resultados como referência numérica.

## 1 Evidências e grau de conclusão

### Código e fontes consultados

O endpoint de commits do GitHub confirmou o HEAD de main em `9c8ce64b4cfd2f4e39f7b90f18968e7a1f2bd936`, igual ao commit do pacote. Portanto, não há delta de HEAD a incorporar. Foi obtida uma cópia de inspeção por arquivo compactado, sem inicializar repositório. Consultados README, package.json, vite.config.js, src/main.jsx, contexto do kit, montagem DashboardContent, navegação, exploração, evolução, catálogo e cenários. Não foi encontrado AGENTS.md na cópia consultada. As três imagens foram abertas e inspecionadas visualmente.

O HTML atual de https://www.typefive.com/ foi obtido. Seus preloads declaram recursos Saans Regular/Medium/SemiBold, Saans SemiMono e SeasonMix Regular/Medium/SemiBold. Isso identifica recursos declarados, mas não comprova a fonte computada de cada elemento nem concede licença de reutilização. Os arquivos do site não devem ser copiados para o novo produto.

| Evidência | Resultado e implicação |
|---|---|
| React e Vite | React 19 e Vite 6; preservar a plataforma |
| Montagem | `vite.config.js:assembleMarket` concatena includes e fontes de workers num módulo virtual de escopo compartilhado; antes de dividir chunks, explicitar imports e contratos |
| Entrada | `src/main.jsx` busca snapshot antes de montar DataAppProvider e DashboardContent; CSS legado e fontes entram eager |
| Navegação | `modules/navigation.js`: 13 IDs de rota em oito grupos, mais utilitária |
| Estado | `src/kit/context.jsx`: `tab`, `f.*`, `s` JSON; preserva dimensões extras; navegação usa pushState, escrita de filtros usa replaceState |
| Evolução | HistoryView contém LegacyHistoryView em details; EvolutionInteractiveBlock só monta brush/anos depois de clique; são funções alcançáveis e ocultas |
| Catálogo | 13 formatos; disponibilidades por área registradas em CATALOG_AREAS; mapas adicionais em explore; seletor atual mostra um formato por vez |
| Economia | ScenarioWorkspace usa seis valores; default efetivo em DashboardContent é context. Phase2View é alcançável pelo bloco de referências das outras subvisões |
| Exploração | Valores reais: chart/ranking/structure/mitsubishi. ranking aciona redirecionamento para a rota ranking; structure força parametrização da pirâmide; mitsubishi depende do destaque |
| Mapa | DashboardContent monta GeographyView apenas em geography. A mensagem do commit menciona mapa no panorama, mas o ramo de renderização é a evidência determinante |
| Serviços | Query service e caches/workers existentes devem ser preservados, inclusive assinantes compartilhados |

### Verificação executada nesta sessão

`node tests/data-baseline.test.cjs`: aprovado, arquivos iguais ao baseline. `node tests/period-shortcuts.test.cjs`: aprovado, Ano atual 2026-01-01 a 2026-09-30 e Último mês 2026-09-01 a 2026-09-30. `node tests/query-service.test.cjs`: três testes aprovados para deduplicação, fila e cancelamento de assinantes. Cinco verificações no total; não equivalem à suíte inteira.

A instalação local por `npm ci` falhou ao tentar gravar o cache padrão fora da área gravável. O build desta sessão não foi executado com sucesso. Playwright Python está instalado, porém o executável Chromium esperado não está disponível. Não foram concluídos preview, inspeção das rotas em navegador, screenshots, estilos computados ou benchmarks. Não foi confirmada uma URL publicada. O README indica Cloudflare Pages e publicação automática em push; isso reforça a necessidade de evitar push no projeto original.

Os números abaixo são do pacote de auditoria, não novas medições: JS 1.486,07 kB / 466,32 kB gzip; CSS 195,20 kB / 38,06 kB gzip; snapshot 2.680.208 bytes; dados aproximadamente 259 MiB em disco; 129 meses de 2016-01 a 2026-09. Tamanho em disco não é transferência inicial. Não há resultado de LCP, INP, CLS ou ganho percentual demonstrado.

### Cobertura editorial e pendência de runtime

`MATRIZ_168_FAMILIAS.csv` dá destino, renderer, contrato de escopo e teste a cada F001–F168, sem eliminação ou consolidação de família. `VARIANTES_E_OCORRENCIAS.csv` expande ocorrências do catálogo por área e enumera modos conhecidos. Esses registros distinguem evidência estática de validação em navegador. Não representam uma contagem definitiva de gráficos efetivamente renderizáveis.

As 248 evidências literais permanecem no pacote de referências, com arquivo e linha. Títulos estáticos, prefixos dinâmicos e utilitários não serão contados automaticamente como figuras. A certificação completa de instâncias e paridade fica bloqueada até a varredura de runtime da fase 0. Nenhuma função será declarada morta apenas por falta de título ou correspondência no CSV; MunicipalMap, por exemplo, exige seguir os chamadores antes de classificá-la. Esta é uma limitação material do inventário de instâncias, não um item considerado aprovado.

## 2 Arquitetura editorial e URLs

Menu desktop: Panorama, Evolução, Concorrência, Composição, Territórios, Perspectivas e Explorar. Explorar oferece links diretos para Estúdio e Mercado em movimento; Dados e metodologia e tema ficam como utilitários. Tablet usa navegação compacta; celular usa menu com foco gerenciado. Caso os testes de descoberta falhem, mostrar os oito destinos analíticos diretamente. Todos são páginas reais.

Cada página tem sumário de âncoras, títulos e espaços de figura presentes desde a entrada. Rolagem revela os gráficos automaticamente. Âncoras não desmontam capítulos. Accordion, menu de ações e drawer não contêm figuras analíticas.

| Página canônica | Ordem dos capítulos e âncoras |
|---|---|
| `/panorama` | `#pulso`, `#indicadores`, `#tendencia`, `#marcas`, `#combustiveis`, `#canais`, `#atalhos` |
| `/evolucao` | `#volume-participacao`, `#comparar-anos`, `#ritmo-sazonalidade`, `#crescimento`, `#composicao-tempo`, `#explorar-faixa`, `#detalhes-mensais` |
| `/concorrencia` | `#ranking` com lista, conectado e pirâmide em blocos próprios; `#trajetorias`, `#comparar-periodos`, `#modelos-lado-a-lado`, `#mitsubishi-segmento`, `#participacao-crescimento`, `#mudanca`, `#concentracao` |
| `/composicao` | `#segmentos-carrocerias`, `#piramide`, `#propulsao`, `#eletrificacao-tempo`, `#nacionais-importados`, `#origem-marcas`, `#canais-conexoes` |
| `/territorios` | `#brasil-municipios`, `#marcas-territorio`, `#varejo-venda-direta`, `#presenca-populacao`, `#leituras-mapa`, `#rede-mitsubishi` |
| `/perspectivas` | `#contexto`, `#distribuicoes`, `#economia-mercado`, `#retrato-regional`, `#projecoes`, `#cenarios`, `#validacao`, `#referencias-historicas` |
| `/estudio` | `#criar-grafico`, `#ranking-comparado`, `#piramide-parametrizavel`, `#perfil-mitsubishi`, `#formatos`, `#mapas`, `#favoritos`, `#relatorio` |
| `/movimento` | `#corridas`, `#lideranca`, `#bolhas`, `#mix`, `#brasil-tempo`, `#dados-exatos` |
| `/dados-metodologia` | `#confianca`, `#cobertura`, `#fontes`, `#reconciliacao`, `#regras-auditoria` |

A matriz adiciona subâncora `fNNN` estável a cada família dentro do capítulo, por exemplo `/concorrencia#f042`. Para ocorrências preservadas em mais de uma página, o ID completo inclui a origem antiga, evitando colisão e permitindo comparação. Todas as subâncoras são destinos de figura ou ferramenta, mesmo quando há várias variantes locais.

### Regras de posicionamento que preservam profundidade

Panorama conserva pulso, quatro KPIs, faixa Mitsubishi, tendência, Top 10 mais Mitsubishi, combustíveis, canais e ações de QuickQuestions. Não adiciona mapa permanente nem consulta territorial no boot. O mapa da referência 01 inspira a linguagem, enquanto a referência 02 rege a abertura de Territórios.

Evolução expõe executive, composition e growth em sequência. LegacyHistoryView é distribuído por pergunta, sem exclusão de trajetórias que pareçam repetidas. Marcas, modelos e carrocerias têm figuras próprias; combustíveis, propulsão e canais mantêm escopos e tabelas. Brush e comparação de anos ficam visíveis, com controles legítimos de seleção. Os heatmaps de crescimento anual e de volume mês×ano são figuras distintas. Base 100 preserva a base original, inclusive N/D quando o primeiro mês não tem valor; acumulado reinicia por ano e não recebe rótulo YTD quando janeiro está fora do recorte.

Concorrência começa com três figuras de ranking: lista, conectado A/B e pirâmide. Elas não se confundem com a pirâmide BD. Conserva figuras de ganhos frente ao período imediatamente anterior e comparações anuais separadas. ModelDuel aceita até quatro grupos; usa dois painéis comparáveis como padrão. CompetitiveReading preserva os três conjuntos Triton/picapes médias, Eclipse Cross/SUVs compactos e Outlander/SUVs médios, ranking de pares e matriz de UFs. Perfil Mitsubishi expõe KPIs, Classe BD, identidades discordantes, comparação e distribuição por UF. ShareDecomposition em três componentes e waterfall mercado/participação continuam em blocos distintos. HHI nacional fixo e Pareto mantêm escopos próprios.

Composição reúne as quatro rotas atuais. Conserva subsegmentos, ano de fabricação, categorias desconhecidas, taxonomia e hierarquia segmento→marca→modelo. FlowSankey vai para canais e conexões; o Sankey do catálogo conserva modelo→canal→região. O Sankey de pacote econômico origem→propulsão→carroceria permanece em Perspectivas e recebe link contextual, pois seu pacote e denominador são próprios. Nacional/importado, origem histórica da marca e parcerias Brasil–China não são fundidos. O waffle acompanha percentual exato.

Territórios abre com um mapa amplo e detalhes ao lado. Líderes, Top 3, força relativa, canais, taxa por mil e cada mapa adicional têm figuras próprias na sequência. Espigões do workspace e do catálogo permanecem ocorrências distintas. Rede mostra localização por município e nomes, sem simular precisão de endereço. Município sem geometria continua na tabela. Profundidade UF/município é interação local; não exige botão para revelar outra figura. Mapas 3D entram estáticos e com controle de câmera explícito.

Perspectivas converte context/diagnostic/economy/regional/forecasts/simulations em capítulos contínuos. Quatro indicadores oficiais e crédito×emplacamentos base100 abrem a página. Gráficos de coeficientes, CCF, observado×estimado, Moran, Holm, benchmarks, reconciliação e superfície de resposta ficam no fluxo. Só prosa metodológica e tabelas exclusivamente de auditoria vão para o utilitário. Referências históricas conservam seus gráficos e rótulos de pacote congelado. Estado indisponível explica a ausência; não se sintetizam dados.

Estúdio mantém ferramentas explícitas e os 13 formatos nomeados: bump, slope, dumbbell, marimekko, treemap, waffle, stacked-area, heatmap, diverging, sankey, bubble, waterfall e pareto. Os sete mapas do catálogo têm seções próprias dentro de mapas. Cada figura recebe controles locais e link Ver no contexto. Restaurar favorito não depende de descobrir o antigo seletor. Mercado em movimento mantém cinco figuras/players, incluindo liderança no tempo, com apenas um player ativo e todos inicialmente pausados.

## 3 Compatibilidade de navegação e estado

| tab antigo | Destino inicial |
|---|---|
| dashboard | `/panorama#pulso` |
| history | `/evolucao#volume-participacao` |
| competition | `/concorrencia#participacao-crescimento` |
| ranking | `/concorrencia#ranking` |
| segments | `/composicao#segmentos-carrocerias` |
| structure | `/composicao#piramide` |
| technology | `/composicao#propulsao` |
| origin | `/composicao#nacionais-importados` |
| geography | `/territorios#brasil-municipios` |
| explore | `/estudio#criar-grafico` |
| models | `/perspectivas#contexto` |
| animations | `/movimento#corridas` |
| quality | `/dados-metodologia#confianca` |

O adaptador será uma função pura sobre URL e estado salvo. Primeiro faz parse seguro, depois resolve tab, depois a subvisão, por último a âncora. Preserva `f.*`, inclusive dimensões extras do manifesto, arrays e escopos do mapa. Preserva `s` e chaves antigas sob namespace de compatibilidade; não renomeia chaves em massa antes de extrair seus contratos. Saída canônica inclui versão do esquema de estado. Campos inválidos produzem aviso conciso e estado recuperável, sem escolher silenciosamente outro período ou UF. Parâmetros desconhecidos são preservados enquanto não houver decisão de segurança explícita.

`models:scenarios-workspace.tab` mapeia context→contexto, diagnostic→distribuicoes, economy→economia-mercado, regional→retrato-regional, forecasts→projecoes, simulations→cenarios. `explore:market-exploration.view` mapeia chart→criar-grafico, ranking→ranking-comparado, structure→piramide-parametrizavel, mitsubishi→perfil-mitsubishi. A rota antiga structure conserva o modo forçado e seus controles; é uma ocorrência editorial na Composição, com acesso parametrizável no Estúdio. Ranking list/connected/pyramid focaliza o respectivo bloco visível. Para animations, races/bubbles/mix/maps focaliza corridas/bolhas/mix/brasil-tempo; liderança permanece figura da família corrida, identificada separadamente.

A subvisão de evolução usa useState local no código consultado; não presumir que todos os links antigos gravavam executive/composition/growth. Sem subvisão explicitamente persistida, manter o destino padrão. Para favoritos que contenham esse critério, recuperar o valor e focalizar o capítulo equivalente. Mesma cautela para rankingControls e opções guardadas fora de `s`.

Migração inicial usa replaceState uma única vez; ações reais de navegação usam pushState; filtros usam replaceState, coerentes com o comportamento atual. popstate restaura rota, filtros, controles e foco sem reescrever a URL em loop. URL canônica explícita tem prioridade sobre tab legado conflitante; manter o legado na carga de compatibilidade para recuperação. Uma segunda normalização da mesma URL deve produzir a mesma saída.

Favoritos são lidos na versão original e adaptados em memória; não sobrescrever armazenamento antes de validar round-trip. Manter exportação de backup e restauração do formato antigo. Exportações de figura, relatório e impressão resolvem a mesma revisão de dados e filtros da tela. Compartilhar um filtro recém-alterado não pode exportar a revisão anterior.

## 4 Contrato de filtros e dados

Preservar os 24 filtros: universo, período, UF, município, marca, modelo, grupo_modelo, combustível, segmento, subsegmento, canal, região, nacionalidade, ano de fabricação, potência, carga, passageiros, porte BD, carroceria BD, classe BD, macro BD, combustível/tecnologia BD, propulsão e origem do veículo BD. Usar os IDs existentes do snapshot e manifesto, sem inventar traduções de chave; o rótulo pode mudar. Opções adicionais do manifesto entram automaticamente no drawer.

Barra principal mostra período, marca/modelo e região conforme página, com atalhos Ano atual e Último mês sempre disponíveis. Drawer Filtrar dados preserva pesquisa e multisseleção, foco, Escape e retorno ao acionador. Chips mostram cada filtro ativo e limpeza individual/todos. Busca, Top N, destaque e ordenação são controles de exibição. Seus efeitos não alteram posição no universo completo ou denominador.

O mapa usa contexto independente com seleção única. Ao importar filtros gerais múltiplos, exige uma escolha local explícita; não toma a primeira UF. Mudar UF limpa município apenas nesse contexto. Estados globais das outras páginas permanecem guardados.

Cada resposta de consulta carrega chave canônica, versão do manifesto, escopo efetivo, cobertura e revisão. Controles respondem imediatamente. Enquanto atualiza, manter a última figura identificada como revisão anterior e indicar Atualizando. Publicar conjuntamente o grupo de resultados que depende da mesma consulta; se uma revisão falhar, não misturar capítulos com denominadores incompatíveis. Bloquear exportação até a chave da resposta coincidir com a chave requisitada. Pacotes fixos usam seu próprio ciclo e badge Filtros globais não aplicados.

Invariantes: contagens somam quantidades; registros duplicados permanecem conforme método; N/D não vira zero; desconhecido não vira ICE; Outros e não classificados ficam no denominador. Identidade Mitsubishi segue Fabricante, não cor. Participação de marca, participação da seleção, canal e razão Mitsubishi/concorrente não são intercambiáveis. Taxa por mil preserva população oficial fixa de 2026. Não alterar BD retroativamente, identidade/origem ou ingestão mensal. Simulação não é previsão causal. Intervalos nominais e cobertura efetiva permanecem distintos. Previsões que não superam baseline continuam com aviso.

## 5 Sistema visual

### Tokens propostos

| Token | Claro | Escuro proposto | Uso |
|---|---|---|---|
| canvas | #fffbfa | #191b19 | Fundo |
| surface | #f0f1eb | #242824 | Figura protagonista |
| text | #333232 | #f4f2ec | Texto principal |
| text-secondary | #5f625b | #bdc4b7 | Eixos e unidade |
| border | #d3d7cd | #4b5448 | Divisórias; verificar contraste por função |
| sage | #7d8967 | #a8b68f | Preenchimentos; não usar como texto pequeno no fundo claro |
| sage-strong | #50603e | #b3c69d | Linha/foco quando a versão suave não atingir contraste |
| blue | #7892aa | #9ab8d0 | Série auxiliar |
| taupe | #aaa298 | #c7bcb0 | Categoria; reforçar contorno se necessário |
| mitsubishi | #a52945 | #f08099 | Identidade exclusiva da marca |
| positive | #46613f | #a5c598 | Crescimento |
| negative | #995739 | #e6ab86 | Queda |

Tokens escuros são proposta sujeita à medição de contraste. Texto comum ≥4,5:1; texto grande ≥3:1; foco, controle e marca informativa ≥3:1 quando aplicável. Paletas suaves não bastam para distinguir marcas: usar nome, traço e símbolo. Categorias desconhecidas usam neutro/hachura. Paleta categórica herda o registro estável de cores de marcas existente e adapta luminância por tema; não recolorir todas as marcas como sálvia. Escalas sequenciais usam progressão perceptual; bivariado mantém legenda de duas dimensões, taxas com unidade e limites explícitos.

Título: serif editorial de peso 500–600, sem caixa alta geral. A referência declara Season Mix; interface declara Saans. Uso dessas famílias depende de licença web própria e confirmação por estilos computados. Alternativa de protótipo: Cormorant Garamond 600 somente nos títulos e Manrope nos números/controles, já declaradas no projeto; conferir OFL dos pacotes antes de distribuir. Não afirmar equivalência tipográfica exata. A revisão visual deve avaliar se Cormorant mantém presença suficiente sem retomar a delicadeza excessiva do tema antigo. Não há compra de fonte bloqueando o protótipo.

Escala: H1 52/56px desktop e 36/40 mobile; H2 36/40 e 30/34; H3 24/30 e 22/28; corpo 16/24; controles/eixos 14/20. Números em Manrope com tabular-nums e formatação pt-BR. Percentual e p.p. distintos. Fonte local WOFF2 com subset que contenha pt-BR, swap e fallback de métricas aproximadas; verificar licença e arquivos em vez de copiar recursos do Type Five.

Contêiner máximo 1360px; margens 48px desktop, 32 tablet e 20 mobile. Grid 12 colunas, gap 24px; 8 em tablet; 4 em celular. Seções separadas por 80px desktop e 48px mobile; painéis com 32px/24px; raio 8px, sem sombra decorativa. Header 72px e título curto; abertura até 20–25% da tela. Rótulos nunca diminuem para acomodar gráfico. Página não tem rolagem horizontal; tabelas largas têm região identificada.

Linhas 2px; pontos só para seleção ou baixa densidade; grades discretas; barras partem de zero. Áreas 100% não criam curvas que alterem composição. Séries não atravessam lacunas. Tooltip estável, legível por foco/toque, crosshair compartilhado apenas para séries com eixo temporal compatível. Valores exatos ficam disponíveis na tabela e exportação. Cada figura tem título, resumo acessível, unidade, período efetivo, status e toolbar discreta para compartilhar/favoritar/exportar.

Estados previstos: carregamento com altura reservada; atualização com revisão identificada; vazio; sem comparação; N/D/base zero; cobertura parcial; erro com tentar novamente; base fixa; experimental; filtro não aplicado; geometria sem vínculo. Mensagens essenciais permanecem na figura. Métodos extensos vão para Sobre os dados, com link permanente. Remover textos de instrução repetitivos, versões e hashes da superfície, preservando-os nos arquivos exportados.

### Wireframe 01 Panorama

Desktop 1440×900: header 72px; conteúdo começa a 112px com H1 O mercado em perspectiva em 52px, sem hero fotográfico. Linha de período/universo/marca/região e botão Filtrar dados, seguida dos chips. Pulso em faixa discreta; quatro KPIs em quatro colunas equivalentes e faixa Mitsubishi de uma linha. Tendência ocupa 12 colunas, altura útil 340px mais título/unidade; controles dia/mês/ano no cabeçalho. Próximo bloco contém ranking de marcas em 7 colunas e composição de combustíveis em 5; canais na seção seguinte. QuickQuestions usa links concisos para os destinos existentes.

Conservar da imagem 01 fundo, espaço, contraste de título e painel de tendência. Ajustar a abertura para mostrar dados cedo e manter os quatro indicadores reais, sem copiar números ou inserir mapa ornamental. Tablet distribui KPIs 2×2. Celular usa KPIs 2×2 somente se rótulos couberem, caso contrário uma coluna; gráfico com altura 300px e ticks menos frequentes, sem fonte menor.

### Wireframe 02 Territórios

Header e filtros iguais. H1 Cada região, uma perspectiva, seguido do recorte efetivo. Primeiro painel de 12 colunas: mapa real do Brasil em 7 e detalhes em 5, altura mínima 520px. Legenda com unidade e intervalo abaixo do mapa. Busca UF/município acessível acima. Detalhes preservam nome do território, volume, comparação válida e dados existentes; a sparkline e as barras da imagem só entram se derivarem de consultas atuais comprovadas, sem inventar novos indicadores.

Abaixo: líderes e Top 3, força relativa, canais, taxa por mil, mapas alternativos e rede. O mapa não vira seis miniaturas. Em tablet portrait e celular, mapa acima dos detalhes, 360px/320px de altura; seleção por lista equivalente e legenda sempre legível. Não reproduzir geometria da imagem: usar códigos e malhas oficiais do projeto.

### Wireframe 03 Modelos lado a lado

A seção central de Concorrência abre com H2 Modelos lado a lado, descrição de unidade/período e seleção de até quatro grupos, com remover/adicionar acessíveis. Dois painéis de 6 colunas por padrão, cada um com nome, volume, mudança comparável e série na mesma escala. Três painéis de 4 colunas só em largura suficiente; quatro usam 2×2. A imagem 03 orienta ritmo, alinhamento e pequenos múltiplos, mas Triton conserva carmim por regra de identidade.

Abaixo, participação no tempo ocupa 8 colunas e distribuição por UF 4 apenas se ambos pertencem ao contrato real da comparação; caso contrário, distribuir as figuras existentes de ModelDuel e manter o mapa no perfil Mitsubishi, com link. Não inventar participação normalizada entre modelos: aplicar o denominador que a consulta original fornece e explicitá-lo. Em celular todos os painéis ficam em coluna, mesma escala e altura de 280–320px. Referência de ano anterior usa traço secundário com legenda, sem valores ilustrativos.

## 6 Renderers e dependências

A matriz define renderer por família; preservar o renderer atual é fallback obrigatório até comprovar paridade. Plot será experimentado em três figuras reais: tendência do Panorama, comparação de participação slope e heatmap mensal. Validar dados, eixos, seleção, teclado, exportação e payload antes de adotar para as demais figuras compatíveis. Plot recebe dados já agregados; não incorpora novas fórmulas.

| Problema | Existente ou nativo | Opção proposta | Benefício e custo | Risco e licença a verificar |
|---|---|---|---|---|
| Gráficos estatísticos e cartesianos | SVG do kit | @observablehq/plot após protótipo | Gramática comum; bytes gzip incrementais medidos no build dos três casos, sem estimativa vendida como medida | Interação/exportação não são automáticas; ISC a conferir na versão fixada |
| Sankey | FlowSankey e renderers atuais | d3-sankey seletivo se simplificar | Layout especializado; chunk por renderer, custo a medir | Preservar cruzamentos, balanço e ordem; ISC a confirmar |
| Treemap | Catálogo existente | d3-hierarchy seletivo | Hierarquia sem reescrever layout; medir import efetivo | Identidades e Outros; ISC a confirmar |
| Projeção/brush/zoom | Código atual e Pointer Events | d3-geo/d3-brush/d3-zoom só se lacuna concreta | Reduzir manutenção de interação complexa; comparar custo incremental | Foco, toque e exportação; ISC a confirmar |
| Geometrias | Malhas e cache por UF | topojson-simplify apenas com entrada apropriada | Derivados topológicos menores, com bytes/erro geométrico medidos | Não aplicar a SVG path arbitrário; ilhas/códigos/checksums; ISC a confirmar |
| Navegação contínua por tiles | SVG/Canvas atuais | MapLibre + Protomaps condicionais | Apenas se houver necessidade de tile map; medir JS, GPU, tiles e transferência por sessão | Licença MapLibre BSD-3-Clause a confirmar; dados/estilos/tiles e atribuições separados |
| Densidade 3D/hexbin | Canvas/SVG atuais | deck.gl só após gargalo comprovado | Aceleração potencial; custo WebGL e memória medidos | Context loss, dispositivo fraco; MIT a confirmar |
| Drawer/menu | Kit local | Radix pontual somente se kit falhar | Acessibilidade; zero dependência adicional se kit passar | Não duplicar UI library; MIT a confirmar |
| Tipografia | Fontsource instalado | Fontes existentes ou licença comercial própria | Evitar download de alfabetos sem uso; ≤100KiB críticos transferidos | OFL dos pacotes e licença web Season/Saans; nenhuma licença inferida do preload |

Não instalar bibliotecas nesta etapa. Confirmar documentação atual, licença, versão e lockfile na execução. Não adicionar pacote D3 inteiro, Next ou Observable Framework. Marimekko, waffle, pirâmides e waterfall podem permanecer SVG específico; animações mantêm renderer local com atualização fora de React a cada frame. MapLibre e deck.gl não são pré-requisitos estéticos.

## 7 Performance e arquitetura técnica

### Contratos e fronteiras

Extrair primeiro as dependências do módulo virtual: helpers de formatação e datas; contratos de filtros/manifesto; agregação/query service; hooks de acesso; componentes do kit; views. Eliminar dependências implícitas por imports explícitos, uma fronteira por vez. Só então usar import dinâmico por página e por renderer pesado. Não aumentar chunkSizeWarningLimit para esconder tamanho.

Arquivos futuros sugeridos, sujeitos ao contrato extraído: `src/app/routes.js`, `src/app/legacy-state.js`, `src/app/state.js`, `src/pages/*.jsx`, `src/charts/*.jsx`, `src/styles/tokens.css` e CSS de página. Reusar `src/kit/context.jsx`, componentes e módulos de domínio quando isso evite uma segunda abstração. `src/market/core.js`, `vite.config.js`, `src/main.jsx` e os includes são os principais pontos de migração, com exports intermediários para manter o build a cada fase.

Shell monta antes do snapshot amplo. Bootstrap derivado e versionado contém manifesto mínimo, defaults, esquema e listas essenciais. Snapshot original permanece intacto; um adaptador carrega consultas/listas completas por página. Medir se o bootstrap cabe no orçamento; não transportar 2,68MB apenas com outro nome. Workers viram arquivos próprios quando possível, preservando protocolo, deduplicação e cancelamento.

Cada seção reserva altura e prepara módulo/dados com IntersectionObserver aproximadamente duas telas antes. Ajustar rootMargin e concorrência pela medição. Âncoras e impressão devem solicitar as seções ainda não preparadas; não usar content-visibility sem conferir busca, navegação assistiva e impressão. Falha de chunk tem retry e estado terminal conciso; timeout de verificação impede skeleton infinito.

Cache canônico inclui filtros ordenados, tipo da consulta, versão do manifesto, universo, período efetivo e controles que alteram o cálculo. Top N visual não duplica cubos. Manter LRU com limites iniciais propostos de 64MiB desktop e 24MiB mobile para resultados derivados, além de cache de geometria separado; calibrar após medir objetos retidos. Começar com duas consultas agregadoras simultâneas e quatro downloads desktop, um agregador e dois downloads mobile; ajustar por baseline. Assinante cancelado não encerra trabalho ainda necessário por outro. Resposta atrasada nunca vence revisão atual.

Parsing/descompressão/agregação ficam nos workers existentes ou em tarefas particionadas; cache de malha por UF e prefetch por foco/hover/proximidade. Sem baixar todas as malhas no boot. DPR de Canvas começa limitado a 2 e é calibrado; ResizeObserver sem loop. Downsampling só visual, com extremos/lacunas e método preservados; exportação exata. Timers, RAF, workers exclusivos e observers têm cleanup. Navegação repetida não mantém players ou geometrias sem limite.

### Orçamentos de aceitação

| Cenário | Critério proposto |
|---|---|
| Entrada fria | HTML+CSS+JS do shell ≤250KiB gzip; primeiro percurso com gráficos ≤350KiB gzip; fontes críticas ≤100KiB efetivamente transferidos; JSON essencial ≤200KiB comprimidos |
| Campo p75 | LCP ≤2,5s; INP ≤200ms; CLS ≤0,1. Até haver amostra suficiente, declarar laboratório como laboratório |
| Clique, filtro, menu | Feedback visual ≤100ms, sem esperar cubo |
| Filtro comum quente | p95 filtro→conjunto consistente ≤500ms no equipamento definido |
| Histórico completo frio | Orçamento em bytes/latência definido a partir do baseline; não exigir 500ms para 129 cubos |
| Rolagem e interação | Alvo 60fps desktop/tablet; orçamento aproximado 16,7ms/frame; sem long tasks >50ms repetitivas durante interação estável |
| Navegar por todas as áreas | Cache limitado; após três ciclos e período de estabilização, memória retida sem crescimento monotônico inexplicado; teto final após baseline |
| Movimento | Primeiro frame estático ao chegar; só player acionado consulta frames adiante; pausar fora da tela e com document.hidden |

Dados mensais têm orçamento próprio por consulta: bytes comprimidos, descomprimidos, meses consultados e cache hit. Teto do shell não inclui cubos nem pode ser atingido removendo análises. Se os protótipos excederem budgets, registrar custo por módulo e opção técnica antes de negociar um limite revisado.

### Instrumentação e protocolo

Usar PerformanceObserver para LCP, layout shifts, long tasks e eventos suportados; User Timing em input, query-start, cache-hit/miss, worker-start/end, response e consistent-render. Registrar revisão e tipo de cenário, sem conteúdo sensível dos filtros. Resource Timing/HAR separa bytes transferidos de tamanho de arquivo. Bundle report registra importadores e gzip; heap/perfis verificam retenção e main thread.

Perfis fixos: desktop 1440×900; tablet 1024×768 e 768×1024, com validação em iPad real quando disponível; celular 390×844 com CPU limitada e rede documentada. Usar Chromium para comparação automatizada e Safari/iPad para validação de comportamento. Registrar hardware, navegador, versão, rede e throttling. Não confundir emulação de viewport com medição em hardware real.

Executar cinco passagens frias e cinco quentes por cenário/perfil: último mês, YTD, 12 meses, histórico integral, município e player. Fria redefine cache de navegador e caches da aplicação; quente repete exatamente o recorte com caches estabilizados. Mediana dessas cinco passagens é descritiva; usar máximo e distribuição bruta, não p95 confiável com n=5. Para p95 operacional de filtros, coletar pelo menos 100 interações comparáveis, declarar n e ambiente. Repetir baseline e novo build sob mesmo protocolo.

Transições UI 160–240ms e figuras compatíveis 250–400ms, sem espera mínima para dados prontos. Mudança de unidade/identidade/escala incompatível usa troca curta. reduced-motion elimina interpolação não essencial. Exportações usam valor final exato, nunca estado interpolado. Bateria e dispositivo lento reduzem movimento.

## 8 Migração por fases

Estimativas em dias úteis de trabalho, para um profissional com apoio de revisão de design e domínio. São faixas de esforço, não compromisso de data; recalibrar após fase 0. As etapas preservam um build utilizável e o projeto original.

| Fase | Esforço indicativo | Arquivos e dependências | Saída verificável |
|---|---|---|---|
| 0 Inventário e baseline | 3–5 dias | README, package/lock, core, navigation, kit/context, modules, workers, tests; recuperar ambiente com npm cache gravável e navegador | Expandir todas as instâncias/variantes em runtime, resolver alcançabilidade, documentar denominadores por consulta; baseline de rede/performance e hashes; nenhum item sem status |
| 1 Protótipo vertical real | 3–5 dias | Após 0; main, kit, estilos e três renderers isolados | Tendência, slope e heatmap com dados reais; comparar Plot/existente, exportação, foco, payload e imagem 01; decisão de dependência documentada |
| 2 Shell e estado | 4–6 dias | Após contratos de 0; context, navigation, main, vite; routes/legacy-state/pages propostos | Seis destinos e dois secundários, drawer 24+ filtros, redirects dos 13 IDs, favoritos e voltar/avançar; bootstrap e chunks reais sem scope quebrado |
| 3 Evolução e Concorrência | 5–8 dias | Após 1/2; evolution-views/brush/years, history-analyses, ranking-views, competitive-reading, catálogo e core | Três visões em seções; rankings separados; ModelDuel e perfil MIT completos; equivalência numérica e visual 03; sem unir decomposições |
| 4 Composição e Territórios | 5–8 dias | Após 2 e renderers comuns; flow-sankey, catalog charts/maps, primary/leader/territory maps, core | Sankeys preservados; todos mapas e tabelas; seleção independente, malhas por UF, rede e imagem 02; sem alterar geometrias originais |
| 5 Perspectivas Estúdio Movimento | 6–10 dias | Após 2 e contratos; scenarios, core/Phase2View, catalog-workspace, animations e workers | Seis capítulos econômicos e referências; 13 formatos nomeados + mapas; todas ferramentas e cinco players; estado pausado e base fixa explícita |
| 6 QA e prontidão | 4–6 dias | Após todas; testes, fixtures existentes, public/_headers, build | Matriz 100% verificada, snapshots e hashes iguais, checks responsivos/AA/performance/exportação; relatório de riscos e decisão de prontidão |

Ordem não exige reescrever cálculos. Cada fase compara saída antiga/nova no mesmo recorte e pode manter renderer antigo redesenhado se for a menor solução correta. Não apagar arquivos antigos antes de zerar referências e provar equivalência. Desligar a versão candidata mantém a base original disponível para comparação. A publicação permanece fora do escopo deste plano.

## 9 Testes e critérios de saída

### Cobertura funcional e numérica

Reusar data-baseline, period-shortcuts, query-service, display-filters, municipal-filter-regression, primary-map-state, leader-map, evolution-years/brush, ranking/catálogo e testes de fontes reais, histórico, Sankey, caches e animações. A suíte Python de cenários requer dependências de `scripts/requirements-scenarios.txt`; instalar apenas na preparação de testes. Não executar update-derived nem regenerar baseline para fazer testes passarem.

Fixtures comparáveis: último mês nacional leve; YTD; últimos 12 meses; histórico completo; seleção de marca/modelo/grupo; UF única; município; multisseleção global seguida de mapa; filtros BD e desconhecidos; recorte vazio; base comparativa zero/ausente; período parcial; universo all no mês com pesados; Top N com Mitsubishi fora do Top; pacote econômico fixo. Gravar filtros exatos e versão em cada resultado de referência.

Contagens e denominadores devem ser exatamente iguais. Proporções e modelos preservam precisão da fonte e arredondamento existente; qualquer tolerância de ponto flutuante precisa estar vinculada ao algoritmo, não servir de tolerância genérica para diferença de total. Conferir tooltip, tabela, CSV, PNG, relatório e PDF. Arquivos de dados e baseline mantêm SHA-256; derivados novos ficam em caminho separado com proveniência e aprovação específica antes de uso.

Adicionar apenas lacunas de migração: adaptador URL idempotente e round-trip, arrays e JSON inválido, chaves extras, favorite restore, estados do mapa, race de duas respostas fora de ordem, exportação bloqueada durante revisão divergente e recuperação de chunk. Testar que todos os gráficos editoriais surgem por rolagem sem details fechado, seletor de formato único ou botão para abrir análise.

### Catálogo completo de instâncias

Para cada família: abrir rota antiga, exercitar controles, expandir details e registrar IDs realmente montados, guardas de disponibilidade, unidade, denominador, dados e variante. Seguir chamadas desde DashboardContent e CatalogExtras, inclusive estados salvos. Anotar separadamente: alcançável visível, alcançável oculto, condicional sem dados no recorte e função não alcançável comprovada por análise de chamadas. O último grupo não é apagado automaticamente.

Expandir o produto de variantes apenas para combinações válidas; filtros de domínio podem ter milhares de valores, então cobrir partições equivalentes e limites em vez de prometer produto cartesiano impraticável. Disponibilidades por área do catálogo são ocorrências distintas, mesmo quando o renderer é compartilhado. Novas instâncias encontradas recebem sufixo estável e entram na matriz antes da certificação.

### Visual acessível e responsivo

Capturas comparativas antigas/novas das três referências e todas as 13 rotas antigas/variantes representativas, em claro/escuro e desktop/tablet/celular. O teste visual atual cobre desktop e celular, não tablet nem todos os estados dinâmicos; ampliar a seleção de cenários sem alegar cobertura já existente. Screenshot só após conclusão/erro explícito da consulta; não aceitar skeleton como aprovação visual. Revisar rótulos, linhas de base, legendas, fontes, foco, overflow, tooltip, impressão e ausência de gráficos no rodapé técnico.

Teclado completa filtro, busca, drawer, menus, seleção de território, comparação e player. Alvos de toque aproximadamente 44px. Foco visível, Escape e retorno ao acionador. Título/resumo acessíveis e tabela exata em toda figura; não inserir milhares de marcas na sequência Tab. Contraste medido nos dois temas e foco. Zoom 200%, reduced-motion, leitor de tela e Safari/iPad real quando disponível. Sem depender de hover para números ou de cor para sentido.

Imprimir/PDF deve preparar automaticamente todas as seções da página, pausar players e aguardar os dados necessários; erro parcial aparece no documento. PNG preserva texto e legenda em resolução útil e fontes prontas. CSV mantém filtros, revisão, período efetivo e unidades; fidelidade analítica tem prioridade sobre abreviar títulos.

### Critério de aceite final

Aprovar somente com todas as famílias e variantes runtime mapeadas, nenhuma redução sem prova de equivalência, dados íntegros, rotas/favoritos restaurados, todos os gráficos encontráveis por rolagem, testes necessários aprovados e desempenho comparado no mesmo ambiente. Não declarar ganho com base só em bundle menor. Falha de acessibilidade, exportação ou denominador impede prontidão, mesmo com aparência aprovada.

## 10 Decisões e riscos

Decisões resolvidas neste plano: React/Vite; seis páginas principais e duas secundárias; âncoras contínuas; estados antigos preservados; manter renderer quando migração não agregar valor; Plot condicionado aos três protótipos; sem novo mapa no Panorama; sem instalação de biblioteca ou scripts externos nesta etapa.

Pendências que bloqueiam certificação, sem exigir escolha de padding ou layout pelo usuário:

1. Ambiente reproduzível para build e navegador: usar cache npm dentro da área gravável, instalar navegador compatível e executar auditoria runtime. Responsável: engenharia, fase 0. Até lá, inventário de instâncias e performance permanecem incompletos.
2. Confirmar denominadores e alcançabilidade de todas as instâncias condicionais, incluindo classes sem dados, variantes dos pacotes fixos e funções antigas. Responsáveis: engenharia e revisão analítica, fase 0. Preservar ocorrências enquanto houver dúvida.
3. Destino do novo projeto e hospedagem, antes de criar repositório ou publicar, na execução posterior. O planejamento independe dessa escolha.
4. Fonte comercial só bloqueia uso da fonte específica: comprovar licença própria ou seguir com equivalentes já presentes. Não bloqueia o protótipo.

Riscos principais: escopo concatenado dificultar chunks; duplicação editorial gerar consultas duplicadas; filtros gerais parecerem aplicáveis a pacote fixo; redução excessiva de contraste; referências de comparação induzirem denominador novo; caches sem limite; lazy loading prejudicar impressão ou âncoras. As fases e testes acima tratam cada risco antes da declaração de prontidão.

## 11 Referências de execução

Pacote original: `00_LEIA_PRIMEIRO.txt`, `01_PROMPT_CODEX_PLANEJAMENTO.txt`, `inventario_funcional.csv`, `evidencia_estatica.csv` e três PNGs. Código-base: https://github.com/FLeone2/mercado-atlas no commit informado. Direção: https://www.typefive.com/; gráficos: https://github.com/observablehq/plot e https://observablehq.com/@observablehq/plot-gallery. Bibliotecas condicionais e documentação oficial estão no prompt original; versões/licenças devem ser verificadas antes da instalação.

Skills efetivamente lidas: cloud-environment-runtime e networking para inspeção do ambiente; pages:write-page para redação do arquivo; Ponytail local em `.claude/skills/ponytail/SKILL.md` para reutilização e dependências mínimas. As variantes ponytail-review/audit/debt foram localizadas, mas não executadas. Nenhuma skill específica de frontend design, acessibilidade ou performance foi identificada na lista disponível. Bibliotecas não são tratadas como skills. Não houve envio de mensagens externas, commit, push ou publicação.
