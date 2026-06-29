"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FileText,
  Shield,
  Edit,
  Download,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { DOCUMENTS, type DocItem } from "@/lib/site-data";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "file-text": FileText,
  shield: Shield,
  edit: Edit,
};

interface ManagedDoc {
  id: string;
  title: string;
  description: string;
  category: string;
  filename: string;
  uploadedAt: string;
}

export function Documents() {
  const [managedDocs, setManagedDocs] = useState<ManagedDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/data/documents.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) {
          setManagedDocs(json.documents ?? []);
          setLoadError(false);
        }
      } catch {
        if (!cancelled) setLoadError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Объединяем: статичные документы (fallback) + динамические из JSON
  // Если JSON загрузился успешно, используем только его; иначе — статичные
  const allDocs: DocItem[] = !loadError && managedDocs.length > 0
    ? managedDocs.map((d) => ({
        title: d.title,
        description: d.description,
        href: `/documents/${d.filename}`,
        icon: "file-text",
        size: "PDF",
        category: d.category as DocItem["category"],
      }))
    : DOCUMENTS;

  return (
    <section
      id="docs"
      className="section-anchor relative py-24 md:py-32 bg-background overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left header */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-gold-soft text-navy px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ring-1 ring-gold/30 mb-5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Документы
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-display font-extrabold text-navy text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-balance"
            >
              Регламент, правила и{" "}
              <span className="text-gradient-gold">заявка</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-muted-foreground text-base leading-relaxed"
            >
              Все официальные документы сезона 2026 в одном месте. Документы
              добавляются и обновляются через админ-панель — после публикации
              они автоматически появляются на сайте.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-6 rounded-2xl bg-navy text-white p-5 ring-1 ring-gold/20"
            >
              <div className="text-xs uppercase tracking-widest text-gold mb-1.5 font-semibold">
                Вид спорта
              </div>
              <div className="font-display font-bold text-2xl">№ 0910007511Я</div>
              <div className="text-xs text-white/60 mt-1">
                Мотоциклетный спорт, дисциплина «мотоджимхана (ФУМ)»
              </div>
            </motion.div>

            {loading && (
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Загрузка документов…
              </div>
            )}
            {loadError && !loading && (
              <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>Показаны документы по умолчанию. Не удалось загрузить обновлённый список.</span>
              </div>
            )}
          </div>

          {/* Right: docs cards */}
          <div className="lg:col-span-8 space-y-4">
            {allDocs.map((doc, i) => {
              const Icon = ICON_MAP[doc.icon] ?? FileText;
              return (
                <motion.a
                  key={doc.title}
                  href={doc.href}
                  download
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative block rounded-2xl bg-card p-6 ring-1 ring-border hover:ring-gold/40 hover:shadow-gold transition-all"
                >
                  <div className="flex items-start gap-5">
                    {/* Icon block */}
                    <div className="shrink-0 relative">
                      <div className="absolute -inset-1 bg-gold/20 blur rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative h-14 w-14 rounded-xl bg-gradient-to-br from-navy to-navy-soft text-gold flex items-center justify-center ring-1 ring-white/10">
                        <Icon className="h-7 w-7" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold px-2 py-0.5 rounded-md bg-muted">
                          {doc.category}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold px-2 py-0.5 rounded-md bg-muted">
                          {doc.size}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-lg text-foreground group-hover:text-navy transition-colors">
                        {doc.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                        {doc.description}
                      </p>
                    </div>

                    {/* Download icon */}
                    <div className="shrink-0 self-center flex items-center gap-1 text-muted-foreground group-hover:text-gold transition-colors">
                      <Download className="h-5 w-5" />
                      <ChevronRight className="h-4 w-4 -ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.a>
              );
            })}

            {allDocs.length === 0 && !loading && (
              <div className="rounded-2xl bg-card ring-1 ring-border p-10 text-center text-muted-foreground">
                <FileText className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p>Документы пока не добавлены. Используйте админ-панель.</p>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl bg-gold-soft ring-1 ring-gold/30 p-5 text-sm text-navy"
            >
              <p className="leading-relaxed">
                <strong>Важно:</strong> документы обновляются по мере
                утверждения. Если вы подаёте заявку, всегда используйте
                последнюю редакцию регламента и формы заявки с этого сайта.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
