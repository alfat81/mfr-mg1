"use client";

import { useState, useEffect } from "react";
import {
  Lock,
  LogOut,
  FileText,
  Users,
  ExternalLink,
  Key,
  X,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  verifyToken,
  type GitHubConfig,
} from "@/lib/github-admin";
import { DocumentsManager } from "./documents-manager";
import { CommissionsManager } from "./commissions-manager";

const STORAGE_KEY = "mfr-admin-config";
const AUTH_KEY = "mfr-admin-auth";

/**
 * SHA-256 хеш пароля администратора.
 * Хранится в коде как хеш — сам пароль в исходниках не светится.
 *
 * Пароль по умолчанию: mfr-fum-2026
 * Сменить:
 *   1. Сгенерировать новый хеш:
 *      printf '%s' 'новый-пароль' | sha256sum
 *   2. Заменить значение ADMIN_PASSWORD_HASH ниже.
 */
const ADMIN_PASSWORD_HASH =
  "342a554eabff6bb0c457e55b4fdfd2ea8c46abdbdde0dc087174b7ef0a515064";

/** Простая обёртка над Web Crypto API для SHA-256. */
async function sha256(text: string): Promise<string> {
  const buf = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function AdminPage() {
  // Этап 1: защищён ли вход паролем? (auth = true, если пароль введён верно)
  const [authed, setAuthed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(AUTH_KEY) === "1";
    } catch {
      return false;
    }
  });

  // Модальное окно пароля
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Этап 2: GitHub PAT (после пароля)
  const [config, setConfig] = useState<GitHubConfig | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as GitHubConfig) : null;
    } catch {
      return null;
    }
  });

  // Если пользователь не авторизован паролем — показываем заглушку с кнопкой
  if (!authed) {
    return (
      <PasswordGate
        onUnlock={() => {
          try {
            sessionStorage.setItem(AUTH_KEY, "1");
          } catch {
            /* ignore */
          }
          setAuthed(true);
          // Если у нас уже есть сохранённый GitHub config — модалку GitHub показывать не нужно,
          // пользователь сразу попадёт в админку (после проверки пароля).
        }}
        showModal={showPasswordModal}
        onShowModal={() => setShowPasswordModal(true)}
        onCloseModal={() => setShowPasswordModal(false)}
      />
    );
  }

  // Если авторизован паролем, но нет GitHub config — показываем форму PAT
  if (!config) {
    return (
      <LoginView
        onLogin={(c) => {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
          setConfig(c);
        }}
        onBack={() => {
          sessionStorage.removeItem(AUTH_KEY);
          setAuthed(false);
        }}
      />
    );
  }

  // Полный доступ — показываем админ-панель
  return (
    <AdminView
      config={config}
      onLogout={() => {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(AUTH_KEY);
        setConfig(null);
        setAuthed(false);
      }}
    />
  );
}

/* ============ ЭТАП 1: Защита паролем ============ */

function PasswordGate({
  onUnlock,
  showModal,
  onShowModal,
  onCloseModal,
}: {
  onUnlock: () => void;
  showModal: boolean;
  onShowModal: () => void;
  onCloseModal: () => void;
}) {
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const submit = async () => {
    setChecking(true);
    setError("");
    try {
      const hash = await sha256(password);
      if (hash === ADMIN_PASSWORD_HASH) {
        onUnlock();
        onCloseModal();
        setPassword("");
      } else {
        setAttempts((a) => a + 1);
        setError("Неверный пароль");
        setPassword("");
      }
    } catch {
      setError("Не удалось проверить пароль");
    } finally {
      setChecking(false);
    }
  };

  // Закрытие по Escape
  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showModal, onCloseModal]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-deep p-4 relative">
      {/* Декоративный фон */}
      <div className="absolute inset-0 bg-grid-gold opacity-10 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative text-center max-w-md">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-gold to-gold-dark text-navy-deep shadow-gold mb-6">
          <Lock className="h-8 w-8" />
        </div>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight">
          Закрытая зона
        </h1>
        <p className="text-white/70 text-sm mb-8 leading-relaxed">
          Админ-панель Комиссии по ФУМ МФР. Доступ только для администраторов
          сайта. Нажмите кнопку ниже, чтобы ввести пароль.
        </p>
        <button
          onClick={onShowModal}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-dark text-navy-deep px-7 py-3.5 font-bold text-sm shadow-gold hover:scale-105 transition-transform"
        >
          <Key className="h-4 w-4" />
          Войти по паролю
        </button>
        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/40 leading-relaxed">
          <p>
            Не помните пароль? Свяжитесь с председателем комиссии:
            <br />
            <a
              href="mailto:serovdima@list.ru"
              className="text-gold hover:underline"
            >
              serovdima@list.ru
            </a>{" "}
            ·{" "}
            <a
              href="tel:+79778236390"
              className="text-gold hover:underline"
            >
              +7 (977) 823-63-90
            </a>
          </p>
        </div>
      </div>

      {/* Модальное окно ввода пароля */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwd-modal-title"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-navy-deep/85 backdrop-blur-sm"
            onClick={onCloseModal}
          />

          <Card className="relative max-w-sm w-full p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-gold to-gold-dark text-navy-deep flex items-center justify-center shadow-gold">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h2
                  id="pwd-modal-title"
                  className="font-display font-bold text-lg text-foreground"
                >
                  Вход в админку
                </h2>
                <p className="text-xs text-muted-foreground">
                  Введите пароль для доступа
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="admin-password">Пароль</Label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    autoFocus
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPwd ? "Скрыть" : "Показать"}
                  >
                    {showPwd ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-md bg-destructive/10 text-destructive text-sm p-3 flex items-start gap-2">
                  <span className="shrink-0">⚠</span>
                  <span>{error}</span>
                </div>
              )}

              {attempts >= 3 && (
                <p className="text-xs text-muted-foreground">
                  Забыли пароль? Свяжитесь с председателем комиссии —
                  контакты на странице ниже.
                </p>
              )}

              <Button
                type="submit"
                disabled={checking || !password}
                className="w-full bg-navy hover:bg-navy-soft text-white h-11"
              >
                {checking ? "Проверка…" : "Войти"}
              </Button>
            </form>

            <div className="mt-5 pt-5 border-t text-xs text-muted-foreground flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
              <p>
                Пароль проверяется локально в браузере. После входа потребуется
                GitHub-токен для сохранения изменений.
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

/* ============ ЭТАП 2: Вход в GitHub (PAT) ============ */

function LoginView({
  onLogin,
  onBack,
}: {
  onLogin: (c: GitHubConfig) => void;
  onBack: () => void;
}) {
  const [token, setToken] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [branch, setBranch] = useState("main");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const cfg = { token, owner, repo, branch };
      await verifyToken(cfg);
      onLogin(cfg);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-deep p-4">
      <Card className="max-w-md w-full p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-gold to-gold-dark text-navy-deep flex items-center justify-center shadow-gold">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">
              Подключение к GitHub
            </h1>
            <p className="text-xs text-muted-foreground">
              Шаг 2 · Кубок России по ФУМ МФР
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="token">GitHub Personal Access Token</Label>
            <Input
              id="token"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_... или github_pat_..."
              autoComplete="off"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Токен с правами <code className="bg-muted px-1 rounded">repo</code>{" "}
              (приватный репозиторий) или{" "}
              <code className="bg-muted px-1 rounded">public_repo</code>{" "}
              (публичный)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="owner">Владелец</Label>
              <Input
                id="owner"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="mfr-mg"
              />
            </div>
            <div>
              <Label htmlFor="repo">Репозиторий</Label>
              <Input
                id="repo"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                placeholder="mfr-mg.ru"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="branch">Ветка</Label>
            <Input
              id="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="main"
            />
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 text-destructive text-sm p-3 flex items-start gap-2">
              <span className="shrink-0">⚠</span>
              <span className="break-words">{error}</span>
            </div>
          )}

          <Button
            onClick={submit}
            disabled={loading || !token || !owner || !repo}
            className="w-full bg-navy hover:bg-navy-soft text-white h-11"
          >
            {loading ? "Проверка…" : "Войти в админку"}
          </Button>

          <button
            onClick={onBack}
            className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Назад к вводу пароля
          </button>
        </div>

        <div className="mt-6 pt-6 border-t text-xs text-muted-foreground space-y-2.5 leading-relaxed">
          <p>
            <strong className="text-foreground">Как создать токен:</strong>{" "}
            <a
              href="https://github.com/settings/tokens/new?scopes=repo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy underline hover:text-gold-dark inline-flex items-center gap-0.5"
            >
              GitHub → Settings → Developer settings → Personal access tokens
              <ExternalLink className="h-3 w-3" />
            </a>
            . Выберите scope <code className="bg-muted px-1 rounded">repo</code>.
          </p>
          <p>
            <strong className="text-foreground">Безопасность:</strong> токен
            хранится в localStorage браузера и используется только для вызовов
            GitHub API с вашего устройства.
          </p>
          <p>
            <strong className="text-foreground">Ограничение:</strong> размер
            загружаемого файла ≤ 1 МБ (лимит GitHub Contents API). Для больших
            PDF используйте Git напрямую.
          </p>
        </div>
      </Card>
    </div>
  );
}

/* ============ ЭТАП 3: Админ-панель ============ */

function AdminView({
  config,
  onLogout,
}: {
  config: GitHubConfig;
  onLogout: () => void;
}) {
  const [tab, setTab] = useState<"documents" | "commissions">("documents");

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-navy-deep text-white sticky top-0 z-30 shadow-navy">
        <div className="container mx-auto max-w-7xl px-4 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-lg bg-gold text-navy-deep flex items-center justify-center shrink-0">
              <Lock className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="font-display font-bold text-sm sm:text-base truncate">
                Админ-панель МФР
              </div>
              <div className="text-[11px] text-white/60 truncate">
                {config.owner}/{config.repo} · ветка {config.branch}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 px-3 py-2 text-xs font-medium transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              На сайт
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="bg-white/5 ring-white/10 border-white/10 text-white hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Выйти</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-1 mb-6 border-b border-border overflow-x-auto">
          <TabButton
            active={tab === "documents"}
            onClick={() => setTab("documents")}
            icon={FileText}
          >
            Документы
          </TabButton>
          <TabButton
            active={tab === "commissions"}
            onClick={() => setTab("commissions")}
            icon={Users}
          >
            Региональные комиссии
          </TabButton>
        </div>

        {tab === "documents" && <DocumentsManager config={config} />}
        {tab === "commissions" && <CommissionsManager config={config} />}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
        active
          ? "border-gold text-navy"
          : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
}
