"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Upload,
  Trash2,
  Loader2,
  Plus,
  FileText,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Download,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  getFile,
  putTextFile,
  putBase64File,
  deleteFile,
  fileToBase64,
  base64ToUtf8,
  generateId,
  slugify,
  type GitHubConfig,
} from "@/lib/github-admin";

const DOCUMENTS_PATH = "public/data/documents.json";
const DOCS_DIR = "public/documents";

interface ManagedDocument {
  id: string;
  title: string;
  description: string;
  category: string;
  filename: string;
  uploadedAt: string;
}

interface DocumentsData {
  documents: ManagedDocument[];
  updatedAt: string;
}

const CATEGORIES = ["Регламент", "Правила", "Заявка", "Протокол", "Трасса", "Инструкция", "Другое"];

const MAX_FILE_SIZE = 1024 * 1024; // 1 МБ — лимит GitHub Contents API

export function DocumentsManager({ config }: { config: GitHubConfig }) {
  const [data, setData] = useState<DocumentsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ManagedDocument | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const file = await getFile(DOCUMENTS_PATH, config);
      if (!file) {
        setData({ documents: [], updatedAt: new Date().toISOString() });
      } else {
        const text = base64ToUtf8(file.content);
        setData(JSON.parse(text));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveData = async (newData: DocumentsData, message: string) => {
    setSaving(true);
    try {
      const file = await getFile(DOCUMENTS_PATH, config);
      const content = JSON.stringify(newData, null, 2);
      await putTextFile(DOCUMENTS_PATH, content, message, config, file?.sha);
      setData(newData);
      toast.success("Изменения сохранены");
      return true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Ошибка сохранения");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!data || !deleteTarget) return;
    const target = deleteTarget;
    const newData = {
      documents: data.documents.filter((d) => d.id !== target.id),
      updatedAt: new Date().toISOString(),
    };
    const ok = await saveData(newData, `docs: удалить «${target.title}»`);
    if (ok) setDeleteTarget(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="flex items-start gap-3 text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Не удалось загрузить данные</div>
            <div className="text-sm break-words">{error}</div>
            <Button variant="outline" size="sm" onClick={loadData} className="mt-3">
              <RefreshCw className="h-4 w-4" /> Повторить
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="font-display font-bold text-xl text-navy">
            Документы
          </h2>
          <p className="text-sm text-muted-foreground">
            {data?.documents.length ?? 0} документов · изменения публикуются на сайте после перестройки GitHub Pages (1–2 мин)
          </p>
          {data?.updatedAt && (
            <p className="text-[11px] text-muted-foreground/80 flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              Последнее обновление: {new Date(data.updatedAt).toLocaleString("ru-RU")}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadData} disabled={saving}>
            <RefreshCw className="h-4 w-4" /> Обновить
          </Button>
          <Button
            size="sm"
            onClick={() => setShowAddForm(true)}
            disabled={showAddForm}
          >
            <Plus className="h-4 w-4" /> Добавить документ
          </Button>
        </div>
      </div>

      {showAddForm && (
        <AddDocumentForm
          config={config}
          onClose={() => setShowAddForm(false)}
          onSaved={() => {
            setShowAddForm(false);
            loadData();
          }}
          existingCount={data?.documents.length ?? 0}
        />
      )}

      <Card className="overflow-hidden">
        {data?.documents.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            <FileText className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="mb-2">Пока нет документов.</p>
            <p className="text-xs mb-4">
              Добавьте первый через форму выше — изменения появятся на сайте
              после автоперестройки GitHub Pages (1–2 минуты).
            </p>
            <Button size="sm" onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4" /> Добавить первый документ
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {data?.documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 flex items-start gap-4 hover:bg-muted/40 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-navy text-gold flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-navy bg-gold-soft px-2 py-0.5 rounded">
                      {doc.category}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      PDF
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-sm mb-1">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-1.5 line-clamp-2">
                    {doc.description}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <code className="bg-muted px-1.5 py-0.5 rounded">
                      /documents/{doc.filename}
                    </code>
                    <span>
                      {new Date(doc.uploadedAt).toLocaleDateString("ru-RU")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <a
                    href={`/documents/${doc.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                    title="Скачать"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => setDeleteTarget(doc)}
                    disabled={saving}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive disabled:opacity-50"
                    title="Удалить"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Модальное окно подтверждения удаления */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-navy-deep/70 backdrop-blur-sm"
            onClick={() => !saving && setDeleteTarget(null)}
          />
          <Card className="relative max-w-sm w-full p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-base text-foreground mb-1">
                  Удалить документ?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Документ{" "}
                  <strong className="text-foreground">
                    «{deleteTarget.title}»
                  </strong>{" "}
                  будет удалён из списка. PDF-файл останется в репозитории, но
                  исчезнет с сайта.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setDeleteTarget(null)}
                disabled={saving}
              >
                Отмена
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Удаление…
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" /> Удалить
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function AddDocumentForm({
  config,
  onClose,
  onSaved,
  existingCount,
}: {
  config: GitHubConfig;
  onClose: () => void;
  onSaved: () => void;
  existingCount: number;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Регламент");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!title.trim() || !file) {
      toast.error("Заполните название и выберите файл");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`Файл слишком большой (${(file.size / 1024 / 1024).toFixed(2)} МБ). Максимум — 1 МБ.`);
      return;
    }

    setSaving(true);
    try {
      // 1. Загрузить PDF в /public/documents/
      const base64 = await fileToBase64(file);
      // Сгенерировать имя файла: slug + расширение
      const ext = file.name.split(".").pop()?.toLowerCase() || "pdf";
      const filename = `${slugify(title) || `document-${existingCount + 1}`}.${ext}`;
      const filePath = `${DOCS_DIR}/${filename}`;

      // Проверить, не существует ли файл с таким именем
      const existing = await getFile(filePath, config);
      if (existing) {
        toast.error(`Файл ${filename} уже существует. Переименуйте документ.`);
        setSaving(false);
        return;
      }

      await putBase64File(
        filePath,
        base64,
        `docs: загрузить PDF «${title}»`,
        config,
      );

      // 2. Обновить documents.json
      const docsFile = await getFile(DOCUMENTS_PATH, config);
      const current: DocumentsData = docsFile
        ? JSON.parse(base64ToUtf8(docsFile.content))
        : { documents: [], updatedAt: new Date().toISOString() };

      const newDoc: ManagedDocument = {
        id: generateId(),
        title: title.trim(),
        description: description.trim(),
        category,
        filename,
        uploadedAt: new Date().toISOString(),
      };

      const newData: DocumentsData = {
        documents: [...current.documents, newDoc],
        updatedAt: new Date().toISOString(),
      };

      const content = JSON.stringify(newData, null, 2);
      await putTextFile(
        DOCUMENTS_PATH,
        content,
        `docs: добавить «${title}» в список`,
        config,
        docsFile?.sha,
      );

      toast.success(`Документ «${title}» добавлен`);
      onSaved();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-5 border-gold/30 ring-1 ring-gold/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-base text-foreground">
          Новый документ
        </h3>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="doc-title">Название *</Label>
          <Input
            id="doc-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Регламент Кубка России 2026"
          />
        </div>
        <div>
          <Label>Категория</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-4">
        <Label htmlFor="doc-desc">Описание</Label>
        <Textarea
          id="doc-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Краткое описание документа — для чего он нужен"
          rows={2}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="doc-file">PDF-файл * (максимум 1 МБ)</Label>
        <Input
          id="doc-file"
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        {file && (
          <p className="text-xs text-muted-foreground mt-1.5">
            Выбран: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} КБ)
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose} disabled={saving}>
          Отмена
        </Button>
        <Button onClick={submit} disabled={saving || !title.trim() || !file}>
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Загрузка…
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" /> Опубликовать
            </>
          )}
        </Button>
      </div>

      <div className="mt-4 pt-4 border-t border-border flex items-start gap-2 text-xs text-muted-foreground">
        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
        <p>
          PDF загрузится в <code className="bg-muted px-1 rounded">/public/documents/</code>,
          а метаданные добавятся в{" "}
          <code className="bg-muted px-1 rounded">/public/data/documents.json</code>.
          После коммита GitHub Pages автоматически пересоберёт сайт (1–2 минуты).
        </p>
      </div>
    </Card>
  );
}
