// 使用最新的导入路径
import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts"; 
import { parse } from "https://deno.land/std@0.224.0/yaml/mod.ts"; 
import { join, dirname, fromFileUrl } from "https://deno.land/std@0.224.0/path/mod.ts"; 
import { marked } from "https://esm.sh/marked"; 
import prism from "https://esm.sh/prismjs@latest"; 

marked.setOptions({ 
  highlight: (code, lang) => 
    prism.highlight(code,  prism.languages[lang]  || prism.languages.javascript,  lang)
});

const PORT = Deno.env.get("PORT")  || "8000";
const HOST = Deno.env.get("HOST")  || "0.0.0.0";

const __dirname = dirname(fromFileUrl(import.meta.url)); 
 
async function loadLinks() {
  try {
    const yamlContent = await Deno.readTextFile(join(__dirname,  "links.yml")); 
    return parse(yamlContent);
  } catch (error) {
    console.error("Error  loading YAML file:", error);
    return { categories: [] };
  }
}
 
const router = new Router();
router 
  .get("/", async (ctx) => {
    const data = await loadLinks();
    const html = await Deno.readTextFile(join(__dirname,  "templates", "index.html")); 
    
    const categoriesHtml = data.categories.map(category  => `
      <div class="category-box mb-6" id="${category.name}"> 
        <h2 class="title is-4 has-text-primary">
          <span class="icon-text">
            <span class="icon">
              <i class="fas fa-folder"></i>
            </span>
            <span>${category.name}</span> 
          </span>
        </h2>
        <p class="subtitle is-6 has-text-grey">${category.desc}</p> 
        
        <div class="columns is-multiline">
          ${category.links.map(link  => `
            <div class="column is-one-third">
              <div class="card friend-card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img src="${link.avatar  || `https://ui-avatars.com/api/?name=${encodeURIComponent(link.name)}&background=random`}"  
                            alt="${link.name}"  
                            class="is-rounded"
                            onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(link.name)}&background=random';  this.onerror=null;">
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-5">
                        <a href="${link.url}"  target="_blank" rel="noopener noreferrer">${link.name}</a> 
                      </p>
                    </div>
                  </div>
                  
                  <div class="content">
                    ${link.desc} 
                    <br>
                    <a href="${link.url}"  target="_blank" rel="noopener noreferrer">
                      <span class="icon">
                        <i class="fas fa-external-link-alt"></i>
                      </span>
                      访问网站
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
    
    const rendered = html 
      .replace("<!-- CATEGORIES_PLACEHOLDER -->", categoriesHtml);
    
    ctx.response.headers.set("Content-Type",  "text/html");
    ctx.response.body  = rendered;
  })
  .get("/circle",  async (ctx) => {
    const circle = await Deno.readTextFile(join(__dirname,  "templates", "circle.html")); 
    ctx.response.headers.set("Content-Type",  "text/html");
    ctx.response.body  = circle;
  })
  .get("/style.css",  async (ctx) => {
    const css = await Deno.readTextFile(join(__dirname,  "static", "style.css")); 
    ctx.response.headers.set("Content-Type",  "text/css");
    ctx.response.body  = css;
  })
  .get("/rss.json",  async (ctx) => {
    const json = await Deno.readTextFile(join(__dirname,  "rss.json")); 
    ctx.response.headers.set("Content-Type",  "application/json");
    ctx.response.body  = json;
  }).get("/about",  async (ctx) => {
    const news = await Deno.readTextFile(join(__dirname,  "templates", "about.html")); 
    const content = await Deno.readTextFile(join(__dirname,  "templates", "README.md")); 
    const html = marked.parse(content); 
    const rendered = news 
      .replace("<!-- ABOUT -->", html);
    
    ctx.response.headers.set("Content-Type",  "text/html");
    ctx.response.body  = rendered;
  });
 
const app = new Application();
app.use(router.routes()); 
app.use(router.allowedMethods()); 
 
console.log(`Server  running on http://${HOST}:${PORT}`);
await app.listen({  
  port: parseInt(PORT),
  hostname: HOST
});