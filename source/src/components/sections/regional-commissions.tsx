"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Phone,
  Mail,
  Globe,
  Building2,
  AlertCircle,
  Loader2,
  Search,
} from "lucide-react";

interface RegionalCommission {
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

export function RegionalCommissions() {
  const [data, setData] = useState<RegionalCommission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // В режиме dev / после сборки файл доступен по пути /data/regional-commissions.json
        const res = await fetch("/data/regional-commissions.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: CommissionsData = await res.json();
        if (!cancelled) {
          setData(json.commissions ?? []);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = data.filter((c) => {
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
    <section
      id="regional"
      className="section-anchor relative py-24 md:py-32 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gold/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-soft text-navy px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ring-1 ring-gold/30 mb-5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Региональные комиссии
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display font-extrabold text-navy text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-balance"
          >
            Комиссии по ФУМ{" "}
            <span className="text-gradient-gold">региональных федераций</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed"
          >
            Единый реестр региональных федераций мотоциклетного спорта России,
            развивающих дисциплину «фигурное управление мотоциклом». Если
            вашего региона нет в списке — напишите нам, и мы добавим информацию.
          </motion.p>
        </div>

        {/* Search */}
        {data.length > 0 && (
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по региону, федерации, городу…"
                className="w-full rounded-full bg-card ring-1 ring-border focus:ring-gold/50 focus:outline-none pl-10 pr-4 py-3 text-sm"
              />
            </div>
          </div>
        )}

        {/* States */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-7 w-7 animate-spin text-gold" />
            <span className="ml-3 text-muted-foreground">Загрузка реестра…</span>
          </div>
        )}

        {error && !loading && (
          <div className="max-w-md mx-auto rounded-2xl bg-destructive/5 ring-1 ring-destructive/20 p-6 text-center">
            <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-3" />
            <p className="text-sm text-foreground mb-1">
              Не удалось загрузить реестр комиссий
            </p>
            <p className="text-xs text-muted-foreground">
              Попробуйте обновить страницу или вернитесь позже.
            </p>
          </div>
        )}

        {/* Cards grid */}
        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Users className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p>
                  {data.length === 0
                    ? "Реестр пока пуст. Добавьте региональные комиссии через админ-панель."
                    : "По запросу ничего не найдено."}
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                    className="group rounded-2xl bg-card p-5 ring-1 ring-border hover:ring-gold/40 hover:shadow-gold transition-all flex flex-col"
                  >
                    <div className="mb-3">
                      <div className="text-[10px] uppercase tracking-widest font-bold text-navy bg-gold-soft inline-block px-2 py-0.5 rounded mb-1.5">
                        {c.region}
                      </div>
                      <h3 className="font-display font-bold text-base text-foreground leading-tight">
                        {c.federation}
                      </h3>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground flex-1">
                      {c.head && (
                        <div className="flex items-start gap-2">
                          <Users className="h-4 w-4 shrink-0 mt-0.5 text-gold" />
                          <span className="text-foreground/85 text-xs">{c.head}</span>
                        </div>
                      )}
                      {c.city && (
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-gold" />
                          <span className="text-xs">{c.city}</span>
                        </div>
                      )}
                      {c.phone && (
                        <a
                          href={`tel:${c.phone.replace(/[^+\d]/g, "")}`}
                          className="flex items-start gap-2 hover:text-gold transition-colors"
                        >
                          <Phone className="h-4 w-4 shrink-0 mt-0.5 text-gold" />
                          <span className="text-xs">{c.phone}</span>
                        </a>
                      )}
                      {c.email && (
                        <a
                          href={`mailto:${c.email}`}
                          className="flex items-start gap-2 hover:text-gold transition-colors"
                        >
                          <Mail className="h-4 w-4 shrink-0 mt-0.5 text-gold" />
                          <span className="text-xs truncate">{c.email}</span>
                        </a>
                      )}
                      {c.website && (
                        <a
                          href={c.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 hover:text-gold transition-colors"
                        >
                          <Globe className="h-4 w-4 shrink-0 mt-0.5 text-gold" />
                          <span className="text-xs truncate">
                            {c.website.replace(/^https?:\/\//, "")}
                          </span>
                        </a>
                      )}
                      {c.notes && (
                        <p className="text-[11px] text-muted-foreground/80 leading-relaxed pt-2 border-t border-border mt-2">
                          {c.notes}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Counter */}
            {data.length > 0 && (
              <div className="mt-10 text-center text-xs text-muted-foreground">
                <Building2 className="inline h-3.5 w-3.5 mr-1" />
                Показано {filtered.length} из {data.length} региональных комиссий
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
