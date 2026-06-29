import type { NextConfig } from "next";

/**
 * Конфигурация Next.js для деплоя на GitHub Pages.
 *
 * Используется при сборке через GitHub Actions (см. .github/workflows/deploy.yml)
 * и при локальной проверке через `bun run build:github`.
 *
 * Локальная разработка использует ./next.config.ts (output: standalone).
 *
 * Ключевые отличия от dev-конфигурации:
 * - output: "export" — статическая сборка в /out
 * - images.unoptimized: true — нет Image Optimization на статике
 * - basePath и assetPrefix — для репозиториев не на корневом домене
 *   (например, https://user.github.io/mfr-mg/ → basePath: "/mfr-mg")
 */

// basePath вычисляется из имени репозитория (для репозиториев вида user.github.io — пустой)
// Можно переопределить через env BASE_PATH (например, для кастомного домена mfr-mg.ru)
function computeBasePath(): string {
  // 1. Явное переопределение через env
  if (process.env.BASE_PATH !== undefined) {
    return process.env.BASE_PATH;
  }
  // 2. Из GITHUB_REPOSITORY (прокидывается GitHub Actions)
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
  if (!repo) return ""; // локальная сборка без env — без basePath
  // 3. Репозитории вида user.github.io → корневой домен, без basePath
  if (repo.toLowerCase().endsWith(".github.io")) return "";
  // 4. Обычный репозиторий → /repo-name
  return `/${repo}`;
}

const basePath = computeBasePath();

const nextConfig: NextConfig = {
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // basePath должен быть без trailing slash; пустая строка для корневого домена
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  images: {
    unoptimized: true,
  },
  // Трейлинг-слэш — полезно для GitHub Pages, чтобы относительные пути работали корректно
  trailingSlash: true,
};

export default nextConfig;
