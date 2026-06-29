"use client";

import { motion } from "framer-motion";
import {
  Crown,
  Medal,
  MapPinned,
  Wrench,
  Radio,
  CheckCircle2,
  Handshake,
  Megaphone,
  Users,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { PARTNER_TIERS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  crown: Crown,
  medal: Medal,
  map: MapPinned,
  wrench: Wrench,
  broadcast: Radio,
};

const ACCENT_STYLES: Record<
  string,
  { ring: string; bg: string; text: string; glow: string }
> = {
  gold: {
    ring: "ring-gold/50",
    bg: "bg-gradient-to-br from-gold-soft to-white",
    text: "text-gold-dark",
    glow: "shadow-gold",
  },
  navy: {
    ring: "ring-navy/30",
    bg: "bg-card",
    text: "text-navy",
    glow: "shadow-navy",
  },
  red: {
    ring: "ring-flag-red/30",
    bg: "bg-card",
    text: "text-flag-red",
    glow: "",
  },
  blue: {
    ring: "ring-navy-soft/30",
    bg: "bg-card",
    text: "text-navy-soft",
    glow: "",
  },
  gray: {
    ring: "ring-border",
    bg: "bg-card",
    text: "text-muted-foreground",
    glow: "",
  },
};

const BENEFITS = [
  {
    icon: Megaphone,
    title: "Федеральное медийное покрытие",
    text: "Трансляции, пресс-релизы, упоминания в федеральных и региональных СМИ.",
  },
  {
    icon: Users,
    title: "Аудитория 18–45 лет",
    text: "Высокая вовлечённость активной мотоаудитории по всей России.",
  },
  {
    icon: TrendingUp,
    title: "Рост узнаваемости бренда 40%+",
    text: "Согласно исследованиям эффективности спонсорства в мотоспорте.",
  },
  {
    icon: Handshake,
    title: "Гибкие условия сотрудничества",
    text: "Индивидуальный пакет прав и активаций под задачи вашего бренда.",
  },
];

export function Partners() {
  return (
    <section
      id="partners"
      className="section-anchor relative py-24 md:py-32 bg-muted/40 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gold/8 blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-soft text-navy px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ring-1 ring-gold/30 mb-5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Партнёрам
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display font-extrabold text-navy text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-balance"
          >
            Станьте частью{" "}
            <span className="text-gradient-gold">главного мотособытия года</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed"
          >
            Кубок России по мотоджимхане — это не спортивное событие на один
            день. Это{" "}
            <strong className="text-foreground">шесть этапов в шести регионах</strong>
            , более{" "}
            <strong className="text-foreground">500 участников</strong> и
            <strong className="text-foreground"> 10 000+ зрителей онлайн</strong>{" "}
            за сезон. Аудитория — активная мотоциклетная Россия 18–45 лет, та
            самая, которая выбирает шлемы, мотоциклы, экипировку и сервисы.
            Пять форматов сотрудничества подберём под цели вашего бренда.
          </motion.p>
        </div>

        {/* Tier cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PARTNER_TIERS.map((tier, i) => {
            const Icon = ICON_MAP[tier.icon] ?? Crown;
            const accent = ACCENT_STYLES[tier.accent];
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className={cn(
                  "group relative rounded-3xl p-6 ring-1 transition-all flex flex-col",
                  accent.bg,
                  accent.ring,
                  tier.highlight
                    ? "lg:row-span-2 lg:scale-[1.03] shadow-gold"
                    : "hover:shadow-md"
                )}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gold to-gold-dark text-navy-deep text-[10px] font-bold uppercase tracking-widest shadow-gold">
                    Рекомендуем
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div
                    className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center",
                      tier.highlight
                        ? "bg-gold text-navy-deep shadow-gold"
                        : "bg-navy text-gold"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span
                    className={cn(
                      "text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-md ring-1",
                      tier.highlight
                        ? "bg-gold/20 text-gold-dark ring-gold/30"
                        : "bg-muted text-muted-foreground ring-border"
                    )}
                  >
                    {tier.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  {tier.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 min-h-[40px]">
                  {tier.description}
                </p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {tier.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2
                        className={cn(
                          "h-4 w-4 shrink-0 mt-0.5",
                          tier.highlight ? "text-gold-dark" : "text-gold"
                        )}
                      />
                      <span className="text-foreground/85">
                        <strong className="text-foreground">{f.label}:</strong>{" "}
                        {f.value}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mb-4 pt-4 border-t border-border">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-0.5">
                    Стоимость
                  </div>
                  <div
                    className={cn(
                      "font-display font-bold text-xl",
                      tier.highlight ? "text-gold-dark" : "text-navy"
                    )}
                  >
                    {tier.price}
                  </div>
                </div>

                <a
                  href="#contacts"
                  className={cn(
                    "inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold transition-all",
                    tier.highlight
                      ? "bg-gold text-navy-deep hover:bg-gold-dark shadow-gold"
                      : "bg-navy text-white hover:bg-navy-soft"
                  )}
                >
                  {tier.highlight ? "Обсудить условия" : "Выбрать пакет"}
                  <ChevronRight className="h-4 w-4" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 rounded-3xl bg-navy text-white p-8 md:p-12 ring-1 ring-gold/20 shadow-navy relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-gold opacity-20" />
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold/15 rounded-full blur-3xl" />
          <div className="relative">
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-2">
              Почему именно мотоджимхана?
            </h3>
            <p className="text-white/70 text-sm mb-8 max-w-xl">
              Это самый доступный и быстрорастущий вид мотоциклетного спорта в
              России. Ваш бренд встраивается в живой контент: не баннер на
              сайте, а эмоции спортсменов, победы на подиуме, тысячи репостов
              в социальных сетях и прямые трансляции с этапов.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 hover:ring-gold/30 transition-all"
                >
                  <b.icon className="h-7 w-7 text-gold mb-3" />
                  <div className="font-display font-bold text-base mb-1">
                    {b.title}
                  </div>
                  <p className="text-xs text-white/65 leading-relaxed">
                    {b.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
              <p className="text-sm text-white/70">
                <strong className="text-gold">Срок действия соглашения</strong>{" "}
                — до 31 декабря 2026 года
              </p>
              <a
                href="#contacts"
                className="inline-flex items-center gap-2 rounded-full bg-gold text-navy-deep px-6 py-3 font-bold text-sm shadow-gold hover:scale-105 transition-transform"
              >
                Обсудить сотрудничество
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
