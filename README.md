# Mercado Atlas 2

Novo site do Mercado Atlas com seis áreas editoriais contínuas, Estúdio, Movimento e Dados e metodologia. Projeto publicado em FLeone2/mercado-atlas-2. O Mercado Atlas original não é alterado.

A direção visual segue as três referências aprovadas: fundo quase branco, superfícies suaves, títulos em DM Serif Display e interface, números e gráficos em Inter. Ambas as famílias usam licença OFL. São alternativas abertas para a direção visual; fontes comerciais do Type Five não são distribuídas.

## Executar

Node 22 ou superior e `tar` disponível. O primeiro build precisa de acesso ao GitHub para obter a base original.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

O build gera `dist/`, pronto para hospedagem estática com fallback de SPA. No Cloudflare Pages: comando `npm run build`, diretório `dist`, variável `NODE_VERSION=22`. Este repositório não confirma uma URL de hospedagem.

## Mesmos dados

`data-source.json` fixa a origem em `FLeone2/mercado-atlas`, commit `9c8ce64b4cfd2f4e39f7b90f18968e7a1f2bd936`. `scripts/prepare-data.mjs` obtém a base original e verifica todos os arquivos contra `tests/fixtures/data-baseline.json`. Divergência faz o build falhar; o baseline nunca é regenerado por esse processo.

`data/` é um cache local ignorado pelo Git, evitando duplicar o acervo de aproximadamente 259 MiB neste repositório. Os dados são copiados para `dist/data/`: o site publicado consulta sua própria hospedagem, sem chamadas ao GitHub durante as análises. Não há reclassificação, correção ou fabricação de dados. Uma atualização mensal exige revisar explicitamente o commit da origem e o baseline correspondente.

## Organização

- Panorama: pulso, indicadores, tendência, marcas, combustíveis, canais e atalhos.
- Evolução: volume, participação, composição, crescimento, detalhes, brush e comparação entre anos.
- Concorrência: lista, ranking conectado e pirâmide, comparação, decomposição e perfil Mitsubishi.
- Composição: segmentos, pirâmide BD, propulsão, eletrificação, origens e conexões.
- Territórios: mapa principal, líderes, análises territoriais e mapas adicionais.
- Perspectivas: contexto econômico, diagnósticos, projeções, simulações e referências históricas.
- Estúdio: ferramentas parametrizáveis, os 13 formatos do catálogo e mapas.
- Movimento: corridas e liderança, bolhas, mix e Brasil no tempo; players inicialmente pausados.

Os 13 IDs de rota antigos são adaptados para URLs canônicas. Filtros `f.*`, estado `s`, opções adicionais do manifesto e favoritos mantêm os contratos originais. O mapa conserva seu contexto independente de seleção única.

## Engenharia

React 19 e Vite 6, reaproveitando o kit, cálculos, caches e serviço compartilhado de consultas. `src/app/` contém a nova experiência e as rotas. Seções são preparadas automaticamente antes da chegada à tela. Os workers originais são emitidos como arquivos separados com hash e conteúdo idêntico. Um bootstrap derivado reduz o carregamento inicial; o snapshot integral é obtido para as referências históricas.

Observable Plot 0.6.17, licença ISC, atende tendência, slope e heatmap, com fallback dos renderers anteriores e carregamento em chunk separado. Os demais renderers foram conservados. Isso não equivale a uma migração integral para Plot nem comprova ganho de desempenho.

## Testar

```sh
npm run build
npm test
python -m pip install -r scripts/requirements-scenarios.txt
python -m unittest discover -s tests -p 'test_*.py'
```

Para a varredura visual, com o preview em execução:

```sh
python -m pip install -r scripts/requirements-ui.txt
python -m playwright install chromium
python tests/visual/editorial.py
```

`BROWSER_EXECUTABLE` seleciona Chromium instalado. Screenshots e resultados ficam em `tests/visual/output/`, ignorado pelo Git. O planejamento e a matriz original das 168 famílias estão em `docs/`.

## Validação e limites

Durante a implementação passaram o build, a integridade da base, 32 arquivos de testes Node e 101 testes Python. Uma rodada com nove páginas, três tamanhos e dois temas passou sem erros JavaScript ou rolagem horizontal após os ajustes. Os testes novos de rotas e igualdade dos assets preparados também passam. A rodada de abertura não certifica todas as variantes ou todas as exportações.

A checagem profunda encontrou IDs repetidos e seções ainda não preparadas no percurso automatizado. Foram aplicados IDs distintos e uma verificação de proximidade complementar ao IntersectionObserver. A repetição completa dessa checagem e a confirmação de todas as variantes permanecem necessárias; não há declaração de paridade total em runtime.

Os budgets de bundle, Core Web Vitals, p95 de consultas, auditoria AA completa e iPad real não estão certificados. Parte do escopo concatenado legado permanece; a separação de workers e chunks é uma etapa da modularização prevista, sem concluir todo o plano de performance. Não há desempenho em campo inventado ou promessa percentual.
