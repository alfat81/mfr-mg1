"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  MapPin,
  Trophy,
  Users,
  Calendar,
  ArrowRight,
  Flag,
  CheckCircle2,
} from "lucide-react";
import { STAGES, getNextStage, getCompletedStages } from "@/lib/site-data";

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    ended: false,
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute -inset-1 bg-gold/20 blur-md rounded-2xl" />
        <div className="relative w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-2xl bg-navy-deep/60 backdrop-blur-md ring-1 ring-gold/30 flex items-center justify-center">
          <span className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tabular-nums tracking-tight">
            {pad(value)}
          </span>
        </div>
      </div>
      <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/70 font-medium">
        {label}
      </span>
    </div>
  );
}

export function Hero() {
  // Compute the next stage on the client (dates depend on user's local time).
  // useMemo avoids the lint warning about setState-in-effect; the value is
  // stable for a given render of the component.
  const { nextStage, completedCount } = useMemo(() => {
    const now = new Date();
    return {
      nextStage: getNextStage(STAGES, now),
      completedCount: getCompletedStages(STAGES, now).length,
    };
  }, []);

  const [time, setTime] = useState(() => {
    const now = new Date();
    const next = getNextStage(STAGES, now);
    if (!next) return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
    return getTimeLeft(new Date(next.fullDate));
  });

  useEffect(() => {
    if (!nextStage) return;
    const target = new Date(nextStage.fullDate);
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [nextStage]);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden bg-navy-deep"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-moto.webp"
          alt="Мотоджимхана — фигурное управление мотоциклом"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep/95 via-navy-deep/80 to-navy/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-gold opacity-30" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-gold/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-flag-red/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/8 backdrop-blur px-4 py-1.5 ring-1 ring-gold/30 mb-6">
              {nextStage ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                  </span>
                  <span className="text-xs font-medium text-white/90 uppercase tracking-[0.18em]">
                    Сезон 2026 идёт · пройдено {completedCount} из {STAGES.length}
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold" />
                  <span className="text-xs font-medium text-white/90 uppercase tracking-[0.18em]">
                    Сезон 2026 завершён
                  </span>
                </>
              )}
            </div>

            <h1 className="font-display font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-balance">
              Кубок России по{" "}
              <span className="text-gradient-mfr">фигурному управлению мотоциклом</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl lg:mx-0 mx-auto leading-relaxed text-pretty">
              Главные национальные соревнования по мотоджимхане под эгидой
              Комиссии Мотоциклетной федерации России. Вид спорта{" "}
              <span className="text-gold font-semibold">№ 0910007511Я</span>.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="#contacts"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-dark text-navy-deep px-7 py-3.5 font-bold text-sm shadow-gold hover:scale-105 transition-transform"
              >
                Хочу участвовать
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#stages"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur ring-1 ring-white/20 text-white px-7 py-3.5 font-semibold text-sm hover:bg-white/20 transition-colors"
              >
                Календарь этапов
              </a>
            </div>

            {/* Quick stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-2xl lg:mx-0 mx-auto">
              {[
                { icon: Trophy, value: `${STAGES.length}`, label: "этапов в сезоне" },
                { icon: CheckCircle2, value: `${completedCount}`, label: "этапов пройдено" },
                { icon: Users, value: "500+", label: "участников" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center lg:items-start gap-1"
                >
                  <s.icon className="h-5 w-5 text-gold" />
                  <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    {s.value}
                  </div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: countdown card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative max-w-md mx-auto lg:ml-auto">
              <div className="absolute -inset-3 bg-gradient-to-br from-gold/30 to-flag-red/20 blur-2xl rounded-3xl" />
              <div className="relative rounded-3xl bg-navy/80 backdrop-blur-xl ring-1 ring-white/10 p-6 sm:p-8 shadow-navy">
                {nextStage ? (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <Flag className="h-5 w-5 text-gold" />
                      <span className="text-xs uppercase tracking-[0.18em] text-gold font-semibold">
                        До старта {nextStage.id}-го этапа
                      </span>
                    </div>
                    <div className="font-display font-bold text-xl text-white mb-1">
                      {nextStage.city}
                    </div>
                    <div className="text-white/70 text-sm mb-6 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {nextStage.region} · {nextStage.date}
                    </div>

                    {time.ended ? (
                      <div className="py-8 text-center text-white font-display font-bold text-xl">
                        Соревнования начались!
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 gap-2 sm:gap-3">
                        <TimeBlock value={time.days} label="дней" />
                        <TimeBlock value={time.hours} label="часов" />
                        <TimeBlock value={time.minutes} label="минут" />
                        <TimeBlock value={time.seconds} label="секунд" />
                      </div>
                    )}

                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                      <span>Статус:</span>
                      <span className="text-gold font-semibold uppercase tracking-wider">
                        Регистрация открыта
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <Trophy className="h-5 w-5 text-gold" />
                      <span className="text-xs uppercase tracking-[0.18em] text-gold font-semibold">
                        Сезон 2026 завершён
                      </span>
                    </div>
                    <div className="font-display font-bold text-2xl text-white mb-2">
                      Все {STAGES.length} этапов проведены
                    </div>
                    <p className="text-white/70 text-sm mb-6">
                      Спасибо всем участникам и партнёрам. Итоговый протокол
                      Кубка России будет опубликован в разделе «Документы».
                    </p>
                    <a
                      href="#docs"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold text-navy-deep hover:bg-gold-dark font-bold text-sm py-3 transition-colors"
                    >
                      <Calendar className="h-4 w-4" />
                      Открыть документы
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div className="mt-16 hidden md:flex justify-center">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <span className="text-[10px] uppercase tracking-[0.2em]">
              Листайте вниз
            </span>
            <div className="h-10 w-6 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
              <span className="block h-2 w-1 rounded-full bg-white animate-scroll-down" />
            </div>
            <ChevronDown className="h-3 w-3 -mt-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
