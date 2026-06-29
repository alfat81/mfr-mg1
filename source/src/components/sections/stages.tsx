"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Building2,
  Phone,
  Mail,
  FileText,
  Route,
  ChevronRight,
  CalendarDays,
  CheckCircle2,
  Radio,
  Hourglass,
  ExternalLink,
} from "lucide-react";
import { STAGES, resolveStageStatus, type StageStatus } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
  StageStatus,
  { label: string; icon: React.ComponentType<{ className?: string }>; className: string }
> = {
  completed: {
    label: "Завершён",
    icon: CheckCircle2,
    className: "bg-white/8 text-white/70 ring-1 ring-white/15",
  },
  live: {
    label: "Идёт сейчас",
    icon: Radio,
    className: "bg-flag-red/20 text-flag-red ring-1 ring-flag-red/50 animate-pulse",
  },
  registration: {
    label: "Регистрация",
    icon: Hourglass,
    className: "bg-gold/20 text-gold ring-1 ring-gold/50",
  },
  upcoming: {
    label: "Скоро",
    icon: CalendarDays,
    className: "bg-white/8 text-white/60 ring-1 ring-white/15",
  },
};

export function Stages() {
  return (
    <section
      id="stages"
      className="section-anchor relative py-24 md:py-32 bg-navy-deep text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-gold opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gold/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-white/8 ring-1 ring-gold/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold mb-5"
          >
            <CalendarDays className="h-3.5 w-3.5" />
            Календарь сезона 2026
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-balance"
          >
            6 этапов. 6 регионов.{" "}
            <span className="text-gradient-mfr">Один Кубок России.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-white/70 text-base md:text-lg leading-relaxed"
          >
            Каждый этап — самостоятельное соревнование с собственным
            протоколом, трассой и призёрами. Очки идут в общий зачёт Кубка.
          </motion.p>
        </div>

        {/* Stage cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STAGES.map((stage, i) => {
            const status = resolveStageStatus(stage);
            const cfg = STATUS_CONFIG[status];
            const StatusIcon = cfg.icon;
            const isCompleted = status === "completed";
            const isLive = status === "live";
            const isRegistration = status === "registration";

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className={cn(
                  "group relative rounded-3xl backdrop-blur ring-1 transition-all p-6 flex flex-col",
                  isLive
                    ? "bg-flag-red/[0.06] ring-flag-red/40 shadow-[0_0_40px_-10px_rgba(224,7,27,0.4)]"
                    : isRegistration
                      ? "bg-gold/[0.04] ring-gold/40 hover:ring-gold/70 hover:bg-gold/[0.07]"
                      : isCompleted
                        ? "bg-white/[0.02] ring-white/8 opacity-90 hover:opacity-100 hover:ring-white/15"
                        : "bg-white/[0.04] ring-white/10 hover:ring-gold/50 hover:bg-white/[0.07]"
                )}
              >
                {/* Stage number + status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div
                        className={cn(
                          "absolute -inset-1 blur rounded-xl",
                          isCompleted ? "bg-white/10" : "bg-gold/20"
                        )}
                      />
                      <div
                        className={cn(
                          "relative h-12 w-12 rounded-xl flex items-center justify-center font-display font-extrabold text-xl",
                          isCompleted
                            ? "bg-white/10 text-white/70 ring-1 ring-white/15"
                            : "bg-gradient-to-br from-gold to-gold-dark text-navy-deep shadow-gold"
                        )}
                      >
                        {stage.id}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40 font-medium">
                        Этап
                      </div>
                      <div className="text-xs text-white/60 font-medium uppercase tracking-wider">
                        {stage.dateRange}
                      </div>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-md",
                      cfg.className
                    )}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {cfg.label}
                  </span>
                </div>

                {/* City + venue */}
                <div className="mb-4">
                  <h3
                    className={cn(
                      "font-display font-bold text-xl mb-1",
                      isCompleted ? "text-white/85" : "text-white"
                    )}
                  >
                    {stage.city}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-white/60">
                    <MapPin className="h-3.5 w-3.5 text-gold" />
                    {stage.region}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2.5 mb-5 text-sm flex-1">
                  <div className="flex items-start gap-2.5 text-white/75">
                    <Building2 className="h-4 w-4 text-white/40 shrink-0 mt-0.5" />
                    <span className="text-xs leading-relaxed">{stage.venue}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-white/75">
                    <FileText className="h-4 w-4 text-white/40 shrink-0 mt-0.5" />
                    <span className="text-xs leading-relaxed">
                      {stage.organizer}
                    </span>
                  </div>
                  {stage.phone && (
                    <div className="flex items-center gap-2.5 text-white/75">
                      <Phone className="h-4 w-4 text-white/40 shrink-0" />
                      <a
                        href={`tel:${stage.phone.replace(/[^+\d]/g, "")}`}
                        className="text-xs hover:text-gold transition-colors"
                      >
                        {stage.phone}
                      </a>
                    </div>
                  )}
                  {stage.phone2 && (
                    <div className="flex items-center gap-2.5 text-white/75">
                      <Phone className="h-4 w-4 text-white/40 shrink-0" />
                      <a
                        href={`tel:${stage.phone2.replace(/[^+\d]/g, "")}`}
                        className="text-xs hover:text-gold transition-colors"
                      >
                        {stage.phone2}
                      </a>
                    </div>
                  )}
                  {stage.email && (
                    <div className="flex items-center gap-2.5 text-white/75">
                      <Mail className="h-4 w-4 text-white/40 shrink-0" />
                      <a
                        href={`mailto:${stage.email}`}
                        className="text-xs hover:text-gold transition-colors truncate"
                      >
                        {stage.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10">
                  <a
                    href={stage.protocol}
                    download
                    className="group/btn inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/5 hover:bg-gold hover:text-navy-deep text-white/85 ring-1 ring-white/10 hover:ring-gold px-3 py-2.5 text-xs font-semibold transition-all"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    {isCompleted ? "Протокол" : "Протокол"}
                  </a>
                  <a
                    href={stage.track}
                    download
                    className="group/btn inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/5 hover:bg-gold hover:text-navy-deep text-white/85 ring-1 ring-white/10 hover:ring-gold px-3 py-2.5 text-xs font-semibold transition-all"
                  >
                    <Route className="h-3.5 w-3.5" />
                    Трасса
                  </a>
                </div>

                {/* External results link for completed stages */}
                {isCompleted && stage.externalStageUrl && (
                  <a
                    href={stage.externalStageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-gold px-3 py-2 text-xs font-medium transition-all"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Результаты на gymkhana-cup.ru
                  </a>
                )}
                {/* Registration CTA for upcoming stages */}
                {isRegistration && stage.externalStageUrl && (
                  <a
                    href={stage.externalStageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gold/15 hover:bg-gold hover:text-navy-deep text-gold px-3 py-2 text-xs font-bold transition-all"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                    Подать заявку
                  </a>
                )}
                {isLive && (
                  <div className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-flag-red/15 text-flag-red px-3 py-2 text-xs font-bold">
                    <Radio className="h-3.5 w-3.5 animate-pulse" />
                    Соревнования идут прямо сейчас
                  </div>
                )}

                {/* Hover glow */}
                <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-gold/0 via-gold/0 to-gold/5" />
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-white/50">
            * Точные даты и места проведения могут уточняться. Следите за
            обновлениями в наших социальных сетях.
          </p>
          <a
            href="#contacts"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-dark text-navy-deep px-7 py-3.5 font-bold text-sm shadow-gold hover:scale-105 transition-transform"
          >
            Подать заявку на участие
            <ChevronRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
