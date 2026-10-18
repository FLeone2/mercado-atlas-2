# Run: python3 scripts/measure-loading.py URL [URL...]
# Requires Python Playwright and Chromium at /usr/bin/chromium.
import asyncio,json,sys
from playwright.async_api import async_playwright
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  for url in sys.argv[1:]:
   for run in range(3):
    context=await browser.new_context(viewport={'width':1440,'height':1000})
    page=await context.new_page()
    errors=[]
    requests=[]
    page.on("request",lambda r:requests.append(r.url) if "/data/" in r.url or "/prepared-market/" in r.url else None)
    page.on('pageerror',lambda e:errors.append(str(e)))
    await page.goto(url,wait_until='domcontentloaded',timeout=120000)
    try:
     await page.wait_for_selector('#overview-trend svg',timeout=120000)
     await page.wait_for_function("document.body.innerText.includes('268.721') && !document.querySelector('.mp-strip')?.innerText.includes('…')",timeout=120000)
     data=await page.evaluate('''()=>({ready:performance.now(),resources:performance.getEntriesByType('resource').filter(r=>r.name.includes('/data/')||r.name.includes('prepared-market')).map(r=>({name:r.name.split('/').slice(-2).join('/'),bytes:r.transferSize,duration:r.duration})),text:document.body.innerText.slice(0,1800)})''')
     print(json.dumps({'url':url,'run':run,**data,'errors':errors,'requests':requests}),flush=True)
    except Exception as e:
     print(json.dumps({'url':url,'error':str(e),'text':(await page.locator('body').inner_text())[:2000],'errors':errors,'requests':requests}),flush=True)
     break
    await context.close()
  await browser.close()
asyncio.run(main())
