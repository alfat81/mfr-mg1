"use client";

import { motion } from "framer-motion";
import {
  History,
  Bike,
  Sparkles,
  Trophy,
  Gauge,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Award,
  Medal,
  FileBadge,
  ClipboardCheck,
  AlertTriangle,
  Target,
  Users,
} from "lucide-react";
import {
  PARTICIPANT_CLASSES,
  CLASS_COLOR_HEX,
  CLASS_TRANSITION_RULES,
  SPECIAL_NOMINATIONS,
  HISTORY_MILESTONES,
  SPORT_TITLES,
  EVSK_GENERAL_RULES,
  PARTICIPANT_REQUIREMENTS,
  PENALTY_RULES,
  SCORING_SYSTEM,
  WINNER_RULES,
  WOMENS_CUP,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";

const NOMINATION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  trophy: Trophy,
  bike: Bike,
};

export function Discipline() {
  return (
    <section
      id="discipline"
      className="section-anchor relative py-24 md:py-32 bg-muted/40 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-soft text-navy px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ring-1 ring-gold/30 mb-5"
          >
            <Bike className="h-3.5 w-3.5" />
            Дисциплина
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display font-extrabold text-navy text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-balance"
          >
            Что такое{" "}
            <span className="text-gradient-gold">мотоджимхана</span> на самом деле
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed"
          >
            Спортсмен, мотоцикл и трасса из конусов. Цель — пройти её за
            минимальное время, не сбив ни одного элемента. Просто? На первый
            взгляд. На деле — ювелирная работа телом, газом и тормозом.
          </motion.p>
        </div>

        {/* History timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-20"
        >
          <div className="flex items-center gap-2 mb-8">
            <History className="h-5 w-5 text-gold" />
            <h3 className="font-display font-bold text-xl text-navy">
              Краткая история дисциплины
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HISTORY_MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative rounded-2xl bg-card p-5 ring-1 ring-border hover:ring-gold/40 transition-all"
              >
                <div className="font-display font-extrabold text-2xl text-gradient-gold mb-1">
                  {m.year}
                </div>
                <div className="font-semibold text-foreground text-sm mb-1.5">
                  {m.title}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {m.description}
                </p>
                {/* connector dot */}
                <div className="absolute -top-2 left-5 h-3 w-3 rounded-full bg-gold ring-4 ring-background" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Participant classes — unofficial internal system from gymkhana-cup.ru */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-20"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-gold" />
              <h3 className="font-display font-bold text-xl text-navy">
                Внутренние классы (неофициально)
              </h3>
            </div>
            <span className="text-xs text-muted-foreground">
              неофициальная система gymkhana-cup.ru · японская традиция · ред. 04 от 01.01.2023
            </span>
          </div>
          <div className="rounded-2xl bg-gold-soft ring-1 ring-gold/30 p-4 mb-6 max-w-3xl">
            <p className="text-sm text-navy leading-relaxed">
              <strong>⚠️ Важно:</strong> эта система классов A/B/C/D/N —{" "}
              <strong>неофициальная</strong>, заимствованная из японской традиции
              мотоджимханы. Используется для спортивной градации внутри
              дисциплины на платформе gymkhana-cup.ru.{" "}
              <strong>Официальная спортивная классификация России</strong> —
              это звания и разряды ЕВСК (МС, КМС, I, II, III), см. блок ниже.
            </p>
          </div>
          <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
            Внутренний класс присваивается по времени прохождения трассы — в
            процентах от эталонного (мирового рекорда зачётной трассы или
            лучшего времени соревнования). Десять классов, от A до N, каждый со
            своим цветом, который используется на жилетках, наклейках и в
            протоколах.
          </p>

          {/* Class cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PARTICIPANT_CLASSES.map((c, i) => {
              const color = CLASS_COLOR_HEX[c.colorGroup];
              return (
                <motion.div
                  key={c.code}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: (i % 5) * 0.05 }}
                  className="group relative rounded-2xl bg-card p-4 ring-1 ring-border hover:shadow-gold hover:-translate-y-0.5 transition-all overflow-hidden"
                >
                  {/* Top color stripe */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ backgroundColor: color }}
                  />
                  {/* Code badge */}
                  <div className="flex items-start justify-between mb-2 pt-1">
                    <div
                      className="font-display font-extrabold text-3xl leading-none"
                      style={{ color }}
                    >
                      {c.code}
                    </div>
                    <span
                      className="text-[10px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: `${color}20`,
                        color,
                      }}
                    >
                      {c.groupName}
                    </span>
                  </div>
                  <div className="font-mono text-xs font-semibold text-foreground mb-1.5">
                    {c.threshold}
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {c.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Color legend */}
          <div className="mt-5 rounded-2xl bg-card ring-1 ring-border p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
              Цветовое обозначение классов
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              {(["A", "B", "C", "D", "N"] as const).map((g) => (
                <div key={g} className="flex items-center gap-1.5">
                  <span
                    className="h-3 w-3 rounded-full ring-2 ring-white shadow-sm"
                    style={{ backgroundColor: CLASS_COLOR_HEX[g] }}
                  />
                  <span className="font-medium text-foreground">
                    {g === "A" && "A — красный"}
                    {g === "B" && "B — синий"}
                    {g === "C" && "C — зелёный"}
                    {g === "D" && "D — жёлтый"}
                    {g === "N" && "N — чёрно-белый"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Transition rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mt-5 rounded-2xl bg-navy text-white p-6 md:p-8 ring-1 ring-gold/20 shadow-navy relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw className="h-5 w-5 text-gold" />
                <h4 className="font-display font-bold text-lg">
                  Переход между классами
                </h4>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3">
                {CLASS_TRANSITION_RULES.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <ShieldCheck className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <span className="text-white/80 leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 pt-4 border-t border-white/10 text-xs text-white/60 leading-relaxed">
                <strong className="text-gold">Важно:</strong> класс А присваивается
                только после выполнения комплекса условий в течение одного
                календарного года — топ-3 на этапах GGP и оффлайн-соревнованиях,
                результаты на базовых фигурах и первое место на соревнованиях
                класса B или новый мировой рекорд. Подробности — в регламенте.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Special nominations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="h-5 w-5 text-gold" />
            <h3 className="font-display font-bold text-xl text-navy">
              Особые номинации
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
            Дополнительные зачёты внутри каждого этапа. Подиум в каждой
            номинации — отдельная церемония награждения.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {SPECIAL_NOMINATIONS.map((n, i) => {
              const Icon = NOMINATION_ICONS[n.icon] ?? Sparkles;
              return (
                <motion.div
                  key={n.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group rounded-2xl bg-navy text-white p-6 ring-1 ring-gold/20 hover:ring-gold/50 hover:shadow-navy transition-all"
                >
                  <div className="h-12 w-12 rounded-xl bg-gold/15 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <h4 className="font-display font-bold text-lg mb-2">
                    {n.name}
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {n.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Sports titles and discharges — OFFICIAL (EVSK 2026–2029) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-20"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-gold" />
              <h3 className="font-display font-bold text-xl text-navy">
                Официальные спортивные звания и разряды
              </h3>
              <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] uppercase tracking-widest font-bold px-2 py-0.5">
                <ShieldCheck className="h-3 w-3" />
                Официально
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              ЕВСК 2026–2029 · приказ Минспорта России № 299 от 09.04.2026
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
            Это <strong>официальная</strong> спортивная классификация Российской
            Федерации по виду спорта «мотоциклетный спорт», дисциплина «фигурное
            управление мотоциклом — класс открытый». Звания и разряды
            присваиваются приказами Минспорта России и действуют пожизненно.
            В отличие от внутренних классов A/B/C/D/N, разряды и звания ЕВСК
            признаются всеми спортивными федерациями и организациями страны.
          </p>

          {/* Title cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SPORT_TITLES.map((t, i) => {
              const accentColor =
                t.accent === "gold"
                  ? "#f0b90b"
                  : t.accent === "red"
                    ? "#e0071b"
                    : t.accent === "navy"
                      ? "#1a2b3c"
                      : t.accent === "blue"
                        ? "#1981f2"
                        : t.accent === "green"
                          ? "#5bba2a"
                          : "#6b7280";
              const isTitle = t.type === "звание";
              const Icon = isTitle ? Medal : FileBadge;
              return (
                <motion.div
                  key={t.code}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                  className="group relative rounded-2xl bg-card p-5 ring-1 ring-border hover:shadow-gold hover:-translate-y-0.5 transition-all overflow-hidden"
                >
                  {/* Top color stripe */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ backgroundColor: accentColor }}
                  />
                  <div className="flex items-start justify-between mb-3 pt-1">
                    <div
                      className="h-11 w-11 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${accentColor}18`,
                        color: accentColor,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-right">
                      <div
                        className="font-display font-extrabold text-2xl leading-none"
                        style={{ color: accentColor }}
                      >
                        {t.code}
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                        {isTitle ? "звание" : "разряд"}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-display font-bold text-sm text-foreground mb-1.5 leading-tight">
                    {t.name}
                  </h4>
                  {t.ageFrom && (
                    <div className="text-[11px] text-gold font-semibold mb-2">
                      с {t.ageFrom}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {t.description}
                  </p>
                  <ul className="space-y-1.5">
                    {t.conditions.map((c, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-1.5 text-[11px] text-foreground/80"
                      >
                        <span
                          className="shrink-0 mt-0.5 h-1 w-1 rounded-full"
                          style={{ backgroundColor: accentColor }}
                        />
                        <span className="leading-relaxed">{c}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* General rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mt-5 rounded-2xl bg-card ring-1 ring-border p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-gold" />
              <h4 className="font-display font-bold text-base text-foreground">
                Общие условия присвоения
              </h4>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {EVSK_GENERAL_RULES.map((rule, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs text-muted-foreground"
                >
                  <span className="shrink-0 mt-0.5 h-4 w-4 rounded-full bg-gold/15 text-gold text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Requirements to participants (from Kubok Russia 2026 regulation) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-20"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-gold" />
              <h3 className="font-display font-bold text-xl text-navy">
                Требования к участникам
              </h3>
            </div>
            <span className="text-xs text-muted-foreground">
              по Регламенту Кубка России 2026 · утв. МФР
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
            Условия допуска к участию в Кубке России по фигурному управлению
            мотоциклом (класс открытый). Действуют на всех 6 этапах сезона 2026.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTICIPANT_REQUIREMENTS.map((req, i) => (
              <motion.div
                key={req.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="rounded-2xl bg-card p-5 ring-1 ring-border hover:ring-gold/40 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="shrink-0 h-7 w-7 rounded-lg bg-navy text-gold text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h4 className="font-display font-bold text-sm text-foreground">
                    {req.title}
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {req.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Penalties and scoring (from Kubok Russia 2026 regulation) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-20"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-gold" />
              <h3 className="font-display font-bold text-xl text-navy">
                Штрафы, пенализация и система очков
              </h3>
            </div>
            <span className="text-xs text-muted-foreground">
              по Регламенту Кубка России 2026
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
            Штрафные баллы — это дополнительное время, прибавляемое к основному.
            Один штрафной балл равен 1 секунде. Победитель заезда — участник с
            наименьшим итоговым временем. Очки начисляются за место в заезде.
          </p>

          {/* Penalty cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            {PENALTY_RULES.map((rule, i) => {
              const color =
                rule.type === "1сек"
                  ? "#f0b90b"
                  : rule.type === "3сек"
                    ? "#e0071b"
                    : rule.type === "no_ride"
                      ? "#1a2b3c"
                      : "#5bba2a";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
                  className="rounded-2xl bg-card p-5 ring-1 ring-border hover:ring-gold/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-bold"
                      style={{ backgroundColor: `${color}20`, color }}
                    >
                      {rule.penalty}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {rule.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Scoring table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="rounded-2xl bg-navy text-white p-6 ring-1 ring-gold/20 shadow-navy"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-gold" />
              <h4 className="font-display font-bold text-base">
                Система очков за место в заезде
              </h4>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
              {SCORING_SYSTEM.map((s) => (
                <div
                  key={s.place}
                  className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3 text-center"
                >
                  <div className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">
                    место
                  </div>
                  <div className="font-display font-bold text-lg text-white">
                    {s.place}
                  </div>
                  <div className="text-xs text-gold font-semibold mt-1">
                    {s.points} очков
                  </div>
                </div>
              ))}
            </div>
            <ul className="grid sm:grid-cols-2 gap-2.5 pt-4 border-t border-white/10">
              {WINNER_RULES.map((rule, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-white/75"
                >
                  <span className="shrink-0 mt-0.5 h-4 w-4 rounded-full bg-gold/15 text-gold text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Women's Cup of MFR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-20"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gold" />
              <h3 className="font-display font-bold text-xl text-navy">
                Женский Кубок МФР 2026
              </h3>
            </div>
            <span className="text-xs text-muted-foreground">
              внутренний календарь МФР · утв. МФР
            </span>
          </div>
          <div className="grid lg:grid-cols-12 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="lg:col-span-7 rounded-2xl bg-card p-6 ring-1 ring-border"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-flag-red/10 text-flag-red text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 mb-3">
                {WOMENS_CUP.status}
              </span>
              <h4 className="font-display font-bold text-lg text-foreground mb-2">
                {WOMENS_CUP.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {WOMENS_CUP.description}
              </p>
              <div className="space-y-2">
                {WOMENS_CUP.requirements.map((r, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-muted/40 p-3 ring-1 ring-border"
                  >
                    <div className="text-xs font-semibold text-foreground mb-1">
                      {r.title}
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      {r.description}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-5 rounded-2xl bg-navy text-white p-6 ring-1 ring-gold/20 shadow-navy"
            >
              <div className="text-xs uppercase tracking-widest text-gold font-semibold mb-3">
                6 этапов — параллельно с Кубком России
              </div>
              <ul className="space-y-2.5">
                {WOMENS_CUP.stages.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl bg-white/[0.04] ring-1 ring-white/10 p-2.5"
                  >
                    <span className="shrink-0 h-7 w-7 rounded-lg bg-gold text-navy-deep text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gold font-semibold">
                        {s.dates}
                      </div>
                      <div className="font-display font-semibold text-sm text-white">
                        {s.city}
                      </div>
                      <div className="text-[11px] text-white/60">
                        {s.region}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 text-center"
        >
          <a
            href="#stages"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-navy to-navy-soft text-white px-7 py-3.5 font-bold text-sm shadow-navy hover:scale-105 transition-transform"
          >
            Посмотреть этапы сезона
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
