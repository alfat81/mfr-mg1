"use client";

import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  ShieldCheck,
  Bike,
  Trophy,
  TrendingUp,
  MapPin,
  Users,
  Target,
} from "lucide-react";

function AnimatedCounter({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) {
          const formatted =
            decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
          ref.current.textContent = `${prefix}${formatted}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, prefix, decimals, count]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

const STATS = [
  {
    icon: TrendingUp,
    value: 59,
    suffix: "%",
    label: "рост интереса к мотоджимхане",
    note: "по данным Яндекс.Метрики за 2024–2025",
  },
  {
    icon: Trophy,
    value: 6,
    label: "этапов по всей России",
    note: "от Нижнего до Невинномысска",
  },
  {
    icon: Bike,
    value: 500,
    prefix: ">",
    label: "участников каждый сезон",
    note: "от новичков до мастеров класса A",
  },
  {
    icon: ShieldCheck,
    value: 100,
    suffix: "%",
    label: "аккредитация МФР и Минспорта",
    note: "вид спорта № 0910007511Я",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="section-anchor relative py-24 md:py-32 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left: Heading & text */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-soft text-navy px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ring-1 ring-gold/30 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                О Кубке России 2026
              </span>
              <h2 className="font-display font-extrabold text-navy text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-balance">
                Искусство контроля,{" "}
                <span className="text-gradient-gold">которое спасает жизни</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 space-y-5 text-[15px] md:text-base text-muted-foreground leading-relaxed"
            >
              <p>
                <strong className="text-foreground">
                  Мотоджимхана — фигурное управление мотоциклом.
                </strong>{" "}
                Спортсмен на мотоцикле проходит трассу из конусов на минимальное
                время, демонстрируя ювелирную точность управления на малых
                скоростях. Дисциплина родилась в Японии в 1970-е как
                «гимнастика для мотоциклистов», а в СССР её аналог под названием
                «фигурное вождение мотоцикла» развивался ещё в 70–80-х годах.
                Сегодня это официальный вид спорта в реестре Минспорта России.
              </p>
              <p>
                Этот спорт доступен каждому владельцу мотоцикла — от 50-кубового
                скутера до литрового турера. Не нужны специальные гоночные
                трассы или дорогая техника: достаточно ровной парковки, десятка
                конусов и желания почувствовать мотоцикл как продолжение
                собственного тела. Регулярные тренировки развивают баланс,
                реакцию и работу корпусом — те самые навыки, которые в
                реальном городе отделяют уверенного водителя от аварийной
                статистики.
              </p>
              <p>
                <strong className="text-foreground">
                  Кубок России 2026
                </strong>{" "}
                — первый в истории полноценный национальный сезон под эгидой
                Комиссии по фигурному управлению мотоциклом МФР.{" "}
                <strong className="text-foreground">Шесть этапов</strong> в
                шести федеральных округах: от Нижнего Новгорода до
                Невинномысска. Победители получат право представлять Россию на
                международных стартах, а зрители — увидеть, как на одной
                площадке разгорается борьба между профессионалами класса A и
                дебютантами класса N.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 relative rounded-2xl overflow-hidden ring-1 ring-border shadow-navy"
            >
              <img
                src="/images/sport-about.webp"
                alt="Мотоджимхана — фигурное управление мотоциклом"
                className="w-full h-64 md:h-80 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs uppercase tracking-widest text-gold mb-1 font-semibold">
                  Дисциплина МФР · с 1970-х
                </div>
                <div className="font-display font-bold text-lg">
                  Точность. Контроль. Скорость.
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Stats grid */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative rounded-2xl bg-card p-5 ring-1 ring-border hover:ring-gold/40 hover:shadow-gold transition-all"
                >
                  <stat.icon className="h-7 w-7 text-gold mb-3" />
                  <div className="font-display font-extrabold text-3xl md:text-4xl text-navy tabular-nums">
                    <AnimatedCounter
                      to={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="mt-1.5 text-sm font-medium text-foreground">
                    {stat.label}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {stat.note}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 rounded-2xl bg-navy text-white p-6 ring-1 ring-gold/20 shadow-navy"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 h-10 w-10 rounded-xl bg-gold/20 flex items-center justify-center">
                  <Target className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <div className="font-display font-bold text-base">
                    Цель сезона 2026
                  </div>
                  <p className="mt-1 text-sm text-white/70 leading-relaxed">
                    Провести 6 этапов в 6 регионах, привлечь 500+ участников и
                    вывести мотоджимхану в топ-3 самых быстрорастущих
                    мотоциклетных дисциплин в России. Дать дорогу молодым
                    спортсменам и показать стране, что мотоспорт бывает
                    доступным.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 grid grid-cols-3 gap-3"
            >
              {[
                { icon: MapPin, value: "6", label: "регионов" },
                { icon: Users, value: "32", label: "субъекта РФ" },
                { icon: Trophy, value: "10", label: "классов" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-card p-4 ring-1 ring-border text-center"
                >
                  <s.icon className="h-5 w-5 text-gold mx-auto mb-1.5" />
                  <div className="font-display font-bold text-xl text-navy">
                    {s.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
