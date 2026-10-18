import asyncio,json,time,os
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path(__file__).parent/'output';OUT.mkdir(exist_ok=True)
PAGES=['panorama','evolucao','concorrencia','composicao','territorios','perspectivas','estudio','movimento','dados-metodologia']
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(**({'executable_path':os.environ['BROWSER_EXECUTABLE']} if os.environ.get('BROWSER_EXECUTABLE') else {}))
  result=[]
  for label,width,height in [('desktop',1440,1000),('tablet',820,1180),('mobile',390,844)]:
   for theme in ['light','dark']:
    context=await browser.new_context(viewport={'width':width,'height':height},color_scheme=theme)
    page=await context.new_page()
    await page.add_init_script(f"localStorage.setItem('atlas-theme','{theme}');")
    for route in PAGES:
     errors=[];handler=lambda e:errors.append(str(e));page.on('pageerror',handler)
     start=time.monotonic()
     try:
      await page.goto('http://127.0.0.1:8765/'+route,wait_until='domcontentloaded')
      await page.wait_for_selector('.editorial-header',timeout=20000)
      await page.wait_for_timeout(1800)
      overflow=await page.evaluate('document.documentElement.scrollWidth-innerWidth')
      alerts=await page.locator('.editorial-error').all_inner_texts()
      await page.screenshot(path=str(OUT/f'{route}-{label}-{theme}.png'))
      result.append(dict(route=route,profile=label,theme=theme,errors=errors[:5],overflow=overflow,boundary=alerts,seconds=round(time.monotonic()-start,2)))
      print(json.dumps(result[-1],ensure_ascii=False),flush=True)
     except Exception as e:
      result.append(dict(route=route,profile=label,theme=theme,failure=str(e)[:400]));print(json.dumps(result[-1]),flush=True)
     page.remove_listener('pageerror',handler)
    await context.close()
  await browser.close()
  (OUT/'sweep.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
  failed=[r for r in result if r.get('errors') or r.get('failure') or r.get('boundary') or r.get('overflow',0)>1]
  assert not failed,failed
  print('PASS 54 page/profile/theme views')
asyncio.run(main())
