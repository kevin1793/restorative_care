import fs from "fs";
import path from "path";
import { routes, notFound } from "./routes";
import { jsonLdFor } from "./jsonld";

const root = path.resolve(__dirname, "..", "..");

describe("SEO routes", () => {
  test("every page route in App.js has an entry in routes.js, and the reverse", () => {
    const app = fs.readFileSync(path.join(root, "src", "App.js"), "utf8");
    const inApp = [...app.matchAll(/<Route\s+path="([^"]+)"/g)]
      .map((m) => m[1])
      .filter((p) => p !== "*")
      .sort();
    const inRoutes = routes.map((r) => r.path).sort();
    expect(inApp).toEqual(inRoutes);
  });

  test("each route has a title, description, heading and an existing source file", () => {
    routes.forEach((r) => {
      expect(r.title.length).toBeGreaterThan(10);
      expect(r.description.length).toBeGreaterThan(40);
      expect(r.heading).toBeTruthy();
      expect(fs.existsSync(path.join(root, r.source))).toBe(true);
    });
    expect(notFound.title).toMatch(/not found/i);
  });

  test("titles and paths are unique", () => {
    expect(new Set(routes.map((r) => r.title)).size).toBe(routes.length);
    expect(new Set(routes.map((r) => r.path)).size).toBe(routes.length);
  });

  test("inner pages get breadcrumbs; the home page leaves it to index.html", () => {
    expect(jsonLdFor(routes.find((r) => r.path === "/"))).toEqual([]);
    const services = jsonLdFor(routes.find((r) => r.path === "/services"));
    expect(services.map((e) => e["@type"])).toEqual(["BreadcrumbList", "ItemList"]);
    const veterans = jsonLdFor(routes.find((r) => r.path === "/veterans"));
    expect(veterans.map((e) => e["@type"])).toEqual(["BreadcrumbList", "Service"]);
  });
});
