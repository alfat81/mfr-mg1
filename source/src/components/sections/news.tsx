"use client";

import { motion } from "framer-motion";
import { Newspaper, ArrowUpRight, Calendar } from "lucide-react";
import { NEWS } from "@/lib/site-data";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function News() {
  return (
    <section
      id="news"
      className="section-anchor relative py-24 md:py-32 bg-background overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-gold-soft text-navy px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ring-1 ring-gold/30 mb-5"
            >
              <Newspaper className="h-3.5 w-3.5" />
              Новости и анонсы
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-display font-extrabold text-navy text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-balance"
            >
              Что нового в{" "}
              <span className="text-gradient-gold">сезоне 2026</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-sm max-w-md"
          >
            Следите за обновлениями календаря, открытием регистрации и
            изменениями в регламенте.
          </motion.p>
        </div>

        {/* News grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {NEWS.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative rounded-2xl bg-card ring-1 ring-border hover:ring-gold/40 hover:shadow-gold transition-all overflow-hidden flex flex-col"
            >
              {/* Top stripe */}
              <div className="h-1.5 bg-gradient-to-r from-gold via-gold-dark to-flag-red" />

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-navy">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(item.date)}
                  </div>
                </div>

                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-navy transition-colors leading-tight mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {item.excerpt}
                </p>

                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Читать анонс
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
