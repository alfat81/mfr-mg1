/**
 * Клиентский помощник для работы с GitHub Contents API.
 * Используется админ-панелью для commit'а изменений в JSON-данных и PDF-файлах
 * прямо в репозиторий. После commit'а GitHub Pages автоматически пересобирает сайт.
 *
 * Ограничения:
 * - Размер файла ≤ 1 МБ (для больших файлов нужен Git Data API или Git LFS)
 * - Токен PAT хранится в localStorage (только для внутренних админов)
 * - Требуются права `repo` (приватный) или `public_repo` (публичный)
 */

export interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
}

export interface GitHubFile {
  sha: string;
  /** base64-закодированное содержимое (без переноса строк) */
  content: string;
  path: string;
  size: number;
}

const API_BASE = "https://api.github.com";

function headers(config: GitHubConfig): HeadersInit {
  return {
    Authorization: `Bearer ${config.token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function repoUrl(config: GitHubConfig, path?: string): string {
  const base = `${API_BASE}/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repo)}/contents`;
  return path ? `${base}/${encodeURI(path)}` : base;
}

/**
 * Проверяет доступ к репозиторию с указанным токеном.
 * Возвращает название репозитория или бросает ошибку.
 */
export async function verifyToken(config: GitHubConfig): Promise<{ repoFullName: string }> {
  const url = `${API_BASE}/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repo)}`;
  const res = await fetch(url, { headers: headers(config) });
  if (res.status === 401) {
    throw new Error("Неверный токен или недостаточно прав");
  }
  if (res.status === 404) {
    throw new Error("Репозиторий не найден — проверьте owner/repo и права токена");
  }
  if (!res.ok) {
    throw new Error(`GitHub API: ${res.status}`);
  }
  const data = await res.json();
  return { repoFullName: data.full_name };
}

/**
 * Получает файл из репозитория. Возвращает null, если файл не существует.
 */
export async function getFile(
  path: string,
  config: GitHubConfig,
): Promise<GitHubFile | null> {
  const url = `${repoUrl(config, path)}?ref=${encodeURIComponent(config.branch)}`;
  const res = await fetch(url, { headers: headers(config) });
  if (res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${res.status}: ${text}`);
  }
  const data = await res.json();
  return {
    sha: data.sha,
    content: data.content ?? "",
    path: data.path,
    size: data.size ?? 0,
  };
}

/**
 * Создаёт или обновляет текстовый файл (UTF-8) в репозитории.
 * Если файл существует — передайте его SHA для обновления.
 */
export async function putTextFile(
  path: string,
  content: string,
  message: string,
  config: GitHubConfig,
  sha?: string,
): Promise<{ sha: string }> {
  const base64 = utf8ToBase64(content);
  return putBase64File(path, base64, message, config, sha);
}

/**
 * Создаёт или обновляет бинарный файл (PDF, изображение) в репозитории.
 * `base64Content` должен быть без переноса строк и префикса data:.
 */
export async function putBase64File(
  path: string,
  base64Content: string,
  message: string,
  config: GitHubConfig,
  sha?: string,
): Promise<{ sha: string }> {
  const body: Record<string, unknown> = {
    message,
    content: base64Content,
    branch: config.branch,
  };
  if (sha) body.sha = sha;

  const res = await fetch(repoUrl(config, path), {
    method: "PUT",
    headers: {
      ...headers(config),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    let errorMsg = `GitHub API ${res.status}`;
    try {
      const j = JSON.parse(text);
      errorMsg += `: ${j.message || ""}`;
    } catch {
      errorMsg += `: ${text.slice(0, 200)}`;
    }
    throw new Error(errorMsg);
  }

  const data = await res.json();
  return { sha: data.content?.sha ?? "" };
}

/**
 * Удаляет файл из репозитория.
 */
export async function deleteFile(
  path: string,
  message: string,
  sha: string,
  config: GitHubConfig,
): Promise<void> {
  const res = await fetch(repoUrl(config, path), {
    method: "DELETE",
    headers: {
      ...headers(config),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      sha,
      branch: config.branch,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${res.status}: ${text}`);
  }
}

/**
 * Конвертация UTF-8 строки в base64 (поддержка кириллицы).
 */
export function utf8ToBase64(str: string): string {
  //encodeURIComponent → percent-encoded UTF-8, unescape → bytes, btoa → base64
  return btoa(unescape(encodeURIComponent(str)));
}

/**
 * Конвертация base64 в UTF-8 строку.
 */
export function base64ToUtf8(b64: string): string {
  // Убираем переносы строк, которые GitHub добавляет в response
  const clean = b64.replace(/\s/g, "");
  return decodeURIComponent(escape(atob(clean)));
}

/**
 * Читает File как base64 (для загрузки PDF).
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Убираем префикс data:...;base64,
      const base64 = result.split(",")[1] || "";
      resolve(base64);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Генерирует slug из произвольной строки (для ID и имён файлов).
 */
export function slugify(s: string): string {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
    з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c",
    ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu",
    я: "ya",
  };
  return s
    .toLowerCase()
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/**
 * Генерирует уникальный ID.
 */
export function generateId(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  );
}
