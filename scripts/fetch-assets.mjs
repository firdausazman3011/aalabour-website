// Downloads the original site's images listed in src/content/assets.json into /public.
// The source host blocks clients that request too fast, so this goes one file at a
// time with a pause in between and stops at the first refused connection.
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const manifest = JSON.parse(await readFile(join(root, "src/content/assets.json"), "utf8"));
const delayMs = Number(process.env.FETCH_DELAY_MS ?? 4000);
const headers = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36",
  Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
  Referer: "https://aalabors.com/",
};

const exists = (p) => access(p).then(() => true, () => false);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let fetched = 0;
for (const [local, remote] of Object.entries(manifest.files)) {
  const target = join(root, "public", local);
  if (await exists(target)) continue;

  const url = manifest.base + remote;
  let res;
  try {
    res = await fetch(url, { headers });
  } catch {
    console.error(`Connection refused at ${url}. The host may be rate-limiting; try again later.`);
    process.exit(1);
  }
  if (!res.ok) {
    console.error(`${res.status} ${url}`);
    if (res.status === 406 || res.status === 403) process.exit(1);
    continue;
  }
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, Buffer.from(await res.arrayBuffer()));
  fetched++;
  console.log(`saved ${local}`);
  await sleep(delayMs);
}
console.log(`Done. ${fetched} new file(s).`);
