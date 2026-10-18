# Carregamento inicial — 18/10/2026

O build prepara cinco consultas do período padrão: mercado, Mitsubishi, perfil competitivo, evolução interativa e comparações históricas. Os resultados são produzidos pelo worker original com o manifesto completo. O navegador só os aceita quando os filtros e todas as opções correspondem exatamente e o SHA-256 do manifesto ativo coincide com o da publicação. Qualquer diferença ou falha de download utiliza o worker existente.

Os JSON preparados têm nomes com SHA-256 do conteúdo e cache HTTP imutável. São gerados durante `npm run build`, não são versionados e não alteram `data/`. O índice acompanha o bootstrap. A troca de recorte invalida respostas pendentes para impedir que uma consulta antiga substitua o recorte atual.

## Medição local

Comparação entre o build anterior (`da6dcf0`) e o novo build em servidores HTTP locais equivalentes, Chromium, viewport 1440×1000, três contextos novos por versão, sem limitação de CPU/rede e sem compressão HTTP. O ponto de término exige SVG do gráfico principal e os indicadores do cabeçalho preenchidos. Comando reproduzível: `python3 scripts/measure-loading.py URL_ANTIGA URL_NOVA`.

| Versão | Tempos (ms) | Mediana |
|---|---|---|
| Anterior | 2747, 2010, 2189 | 2189 ms |
| Com consultas preparadas | 1056, 1038, 1047 | 1047 ms |

Redução local de aproximadamente 52%. A abertura anterior baixava três cubos mensais; a nova baixa dois resultados preparados, sem cubos. Os resultados do mercado e da Mitsubishi ocupam aproximadamente 192 KB e 44 KB com gzip, respectivamente. Esses números são de laboratório; não representam todos os dispositivos, redes ou filtros.

## Verificações

- Comparação integral dos cinco JSON com execução independente do worker sobre as fontes reais (`tests/prepared-real-source.test.cjs`).
- Correspondência de filtros, opções, versão do manifesto, reutilização e falha de download (`tests/prepared-market.test.cjs`).
- Chromium: abertura padrão, filtro Mitsubishi, retorno ao worker quando o JSON falha e filtro Fiat aplicado enquanto a resposta nacional é atrasada. O resultado final permanece 53.586 para Fiat.
- O baseline de hashes dos dados permanece obrigatório.

Filtros arbitrários e períodos diferentes continuam exigindo processamento. Esta alteração acelera os recortes iniciais preparados; não torna todas as consultas instantâneas.
