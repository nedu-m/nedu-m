const baseUrl = "https://nedum.xyz";
const key = "25cc323eab34a7a57e1f78166cd2fd58";
const endpoint = "https://api.indexnow.org/indexnow";

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
if (!sitemapResponse.ok) {
  throw new Error(`Sitemap returned ${sitemapResponse.status}`);
}

const sitemap = await sitemapResponse.text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (!urlList.length) throw new Error("Sitemap contained no URLs");

const response = await fetch(endpoint, {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(baseUrl).host,
    key,
    keyLocation: `${baseUrl}/${key}.txt`,
    urlList,
  }),
});

if (!response.ok) {
  throw new Error(`IndexNow returned ${response.status}: ${(await response.text()).slice(0, 500)}`);
}

console.log(`Submitted ${urlList.length} canonical URL(s) to IndexNow.`);
