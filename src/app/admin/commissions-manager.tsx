"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Trash2,
  Loader2,
  Plus,
  Users,
  RefreshCw,
  AlertCircle,
  Edit,
  Save,
  X,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Search,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  getFile,
  putTextFile,
  base64ToUtf8,
  generateId,
  type GitHubConfig,
} from "@/lib/github-admin";

const COMMISSIONS_PATH = "public/data/regional-commissions.json";

export interface RegionalCommission {
  id: string;
  region: string;
  federation: string;
  head: string;
  phone: string;
  email: string;
  website: string;
  city: string;
  notes: string;
}

interface CommissionsData {
  commissions: RegionalCommission[];
  updatedAt: string;
}

const EMPTY_FORM: Omit<RegionalCommission, "id"> = {
  region: "",
  federation: "",
  head: "",
  phone: "",
  email: "",
  website: "",
  city: "",
  notes: "",
};

export function CommissionsManager({ config }: { config: GitHubConfig }) {
  const [data, setData] = useState<CommissionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<RegionalCommission, "id">>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<RegionalCommission | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const file = await getFile(COMMISSIONS_PATH, config);
      if (!file) {
        setData({ commissions: [], updatedAt: new Date().toISOString() });
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

  const saveData = async (newData: CommissionsData, message: string) => {
    setSaving(true);
    try {
      const file = await getFile(COMMISSIONS_PATH, config);
      const content = JSON.stringify(newData, null, 2);
      await putTextFile(COMMISSIONS_PATH, content, message, config, file?.sha);
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

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  };

  const handleAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (c: RegionalCommission) => {
    setForm({
      region: c.region,
      federation: c.federation,
      head: c.head,
      phone: c.phone,
      email: c.email,
      website: c.website,
      city: c.city,
      notes: c.notes,
    });
    setEditingId(c.id);
    setShowForm(true);
    // Прокрутить к форме
    setTimeout(() => {
      document.getElementById("commission-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const handleSubmit = async () => {
    if (!data) return;
    if (!form.region.trim() || !form.federation.trim()) {
      toast.error("Заполните «Регион» и «Федерация»");
      return;
    }

    if (editingId) {
      // Редактирование существующей комиссии
      const newData: CommissionsData = {
        commissions: data.commissions.map((c) =>
          c.id === editingId ? { ...form, id: editingId } : c,
        ),
        updatedAt: new Date().toISOString(),
      };
      const ok = await saveData(newData, `commissions: обновить «${form.region}»`);
      if (ok) resetForm();
    } else {
      // Добавление новой комиссии
      const newCommission: RegionalCommission = {
        ...form,
        id: generateId(),
      };
      const newData: CommissionsData = {
        commissions: [...data.commissions, newCommission],
        updatedAt: new Date().toISOString(),
      };
      const ok = await saveData(newData, `commissions: добавить «${form.region}»`);
      if (ok) resetForm();
    }
  };

  const confirmDelete = async () => {
    if (!data || !deleteTarget) return;
    const target = deleteTarget;
    const newData: CommissionsData = {
      commissions: data.commissions.filter((x) => x.id !== target.id),
      updatedAt: new Date().toISOString(),
    };
    const ok = await saveData(newData, `commissions: удалить «${target.region}»`);
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

  // Фильтрация по поиску
  const filtered = (data?.commissions ?? []).filter((c) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      c.region.toLowerCase().includes(q) ||
      c.federation.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.head.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="font-display font-bold text-xl text-navy">
            Региональные комиссии по ФУМ
          </h2>
          <p className="text-sm text-muted-foreground">
            {data?.commissions.length ?? 0} федераций · сбор информации по региональным комиссиям фигурного управления мотоциклом
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
            onClick={handleAdd}
            disabled={showForm && !editingId}
          >
            <Plus className="h-4 w-4" /> Добавить комиссию
          </Button>
        </div>
      </div>

      {/* Поиск по комиссиям */}
      {(data?.commissions.length ?? 0) > 3 && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по региону, федерации, городу, руководителю…"
            className="w-full rounded-lg bg-card ring-1 ring-border focus:ring-gold/50 focus:outline-none pl-10 pr-4 py-2.5 text-sm"
          />
        </div>
      )}

      {/* Форма добавления / редактирования */}
      {showForm && (
        <Card
          id="commission-form"
          className={`p-5 ring-1 ${
            editingId
              ? "ring-blue-300 border-blue-300"
              : "ring-gold/30 border-gold/30"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {editingId ? (
                <Edit className="h-4 w-4 text-blue-600" />
              ) : (
                <Plus className="h-4 w-4 text-gold" />
              )}
              <h3 className="font-display font-bold text-base text-foreground">
                {editingId ? "Редактировать комиссию" : "Новая комиссия"}
              </h3>
              {editingId && (
                <span className="text-[10px] uppercase tracking-widest font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  Редактирование
                </span>
              )}
            </div>
            <button
              onClick={resetForm}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Закрыть форму"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="c-region">Регион *</Label>
              <Input
                id="c-region"
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
                placeholder="Московская область"
              />
            </div>
            <div>
              <Label htmlFor="c-city">Город</Label>
              <Input
                id="c-city"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Москва"
              />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="c-fed">Федерация *</Label>
            <Input
              id="c-fed"
              value={form.federation}
              onChange={(e) => setForm({ ...form, federation: e.target.value })}
              placeholder="ОО «Федерация мотоциклетного спорта Московской области»"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="c-head">Руководитель</Label>
            <Input
              id="c-head"
              value={form.head}
              onChange={(e) => setForm({ ...form, head: e.target.value })}
              placeholder="Иванов Иван Иванович"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="c-phone">Телефон</Label>
              <Input
                id="c-phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+7 (xxx) xxx-xx-xx"
              />
            </div>
            <div>
              <Label htmlFor="c-email">Email</Label>
              <Input
                id="c-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="info@fmsmo.ru"
              />
            </div>
            <div>
              <Label htmlFor="c-web">Сайт</Label>
              <Input
                id="c-web"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://fmsmo.ru"
              />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="c-notes">Примечания</Label>
            <Textarea
              id="c-notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Дополнительная информация: этапы Кубка, особенности, контакты помощников"
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={resetForm} disabled={saving}>
              Отмена
            </Button>
            <Button onClick={handleSubmit} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Сохранение…
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  {editingId ? "Сохранить изменения" : "Добавить комиссию"}
                </>
              )}
            </Button>
          </div>
        </Card>
      )}

      {/* Empty state */}
      {data?.commissions.length === 0 ? (
        <Card className="p-10 text-center text-muted-foreground">
          <Users className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="mb-2">Пока нет региональных комиссий.</p>
          <p className="text-xs mb-4">
            Добавьте первую через форму выше — данные появятся на сайте после
            автоперестройки GitHub Pages (1–2 минуты).
          </p>
          <Button size="sm" onClick={handleAdd}>
            <Plus className="h-4 w-4" /> Добавить первую комиссию
          </Button>
        </Card>
      ) : filtered.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          <Search className="h-8 w-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm">
            По запросу «{query}» ничего не найдено.
          </p>
          <button
            onClick={() => setQuery("")}
            className="text-xs text-navy underline hover:text-gold-dark mt-2"
          >
            Сбросить поиск
          </button>
        </Card>
      ) : (
        <>
          {/* Счётчик */}
          {query.trim() && (
            <div className="text-xs text-muted-foreground">
              Показано {filtered.length} из {data?.commissions.length ?? 0} комиссий
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => {
              const isEditing = c.id === editingId;
              return (
                <Card
                  key={c.id}
                  className={`p-5 flex flex-col transition-all ${
                    isEditing
                      ? "ring-2 ring-blue-400 shadow-md"
                      : "ring-1 ring-border hover:ring-gold/40 hover:shadow-gold"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-widest font-bold text-navy bg-gold-soft inline-block px-2 py-0.5 rounded mb-1.5">
                        {c.region}
                      </div>
                      <h3 className="font-display font-bold text-sm text-foreground leading-tight">
                        {c.federation}
                      </h3>
                      {isEditing && (
                        <span className="inline-block mt-1 text-[10px] uppercase tracking-widest font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                          Редактируется
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-muted-foreground flex-1">
                    {c.head && (
                      <div className="flex items-start gap-2">
                        <Users className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{c.head}</span>
                      </div>
                    )}
                    {c.city && (
                      <div className="flex items-start gap-2">
                        <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                        <span>{c.city}</span>
                      </div>
                    )}
                    {c.phone && (
                      <div className="flex items-start gap-2">
                        <Phone className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                        <a
                          href={`tel:${c.phone.replace(/[^+\d]/g, "")}`}
                          className="hover:text-gold transition-colors"
                        >
                          {c.phone}
                        </a>
                      </div>
                    )}
                    {c.email && (
                      <div className="flex items-start gap-2">
                        <Mail className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                        <a
                          href={`mailto:${c.email}`}
                          className="hover:text-gold transition-colors truncate"
                        >
                          {c.email}
                        </a>
                      </div>
                    )}
                    {c.website && (
                      <div className="flex items-start gap-2">
                        <Globe className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                        <a
                          href={c.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gold transition-colors truncate"
                        >
                          {c.website.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    )}
                    {c.notes && (
                      <p className="text-[11px] text-muted-foreground/80 leading-relaxed pt-1 border-t border-border mt-2">
                        {c.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-1 pt-3 mt-3 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(c)}
                      disabled={saving}
                      className="flex-1 h-8 text-xs"
                    >
                      <Edit className="h-3.5 w-3.5" /> Изменить
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteTarget(c)}
                      disabled={saving}
                      className="h-8 px-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Удалить"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}

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
                  Удалить комиссию?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Комиссия{" "}
                  <strong className="text-foreground">
                    «{deleteTarget.federation}»
                  </strong>{" "}
                  ({deleteTarget.region}) будет удалена. Это действие нельзя
                  отменить.
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
