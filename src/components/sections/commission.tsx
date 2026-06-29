"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Crown } from "lucide-react";
import { COMMISSION } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Commission() {
  return (
    <section
      id="commission"
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
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Комиссия МФР
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display font-extrabold text-navy text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-balance"
          >
            Комиссия по фигурному управлению{" "}
            <span className="text-gradient-gold">мотоциклом МФР</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed"
          >
            Команда профессионалов, которая организует, развивает и популяризирует
            мотоджимхану в России. Руководство и члены комиссии.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {COMMISSION.map((member, i) => {
            const isLead = i === 0; // chairperson highlight
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                className={cn(
                  "group relative rounded-2xl bg-card ring-1 ring-border hover:ring-gold/50 hover:shadow-gold transition-all overflow-hidden",
                  isLead && "lg:col-span-2 ring-gold/40"
                )}
              >
                {/* Photo */}
                <div
                  className={cn(
                    "relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy",
                    isLead ? "aspect-[16/10]" : "aspect-square"
                  )}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />

                  {/* Role badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                        isLead
                          ? "bg-gold text-navy-deep"
                          : "bg-white/10 backdrop-blur text-white ring-1 ring-white/20"
                      )}
                    >
                      {isLead && <Crown className="h-3 w-3" />}
                      {isLead ? "Председатель" : "Комиссия"}
                    </span>
                  </div>

                  {/* Name overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-display font-bold text-white text-base md:text-lg leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs text-gold mt-0.5 font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Contacts */}
                <div className="p-4 space-y-1.5">
                  {member.city && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span>{member.city}</span>
                    </div>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-2 text-xs text-foreground hover:text-gold transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span>+{member.phone.replace(/[^+\d]/g, "").slice(1)}</span>
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-xs text-foreground hover:text-gold transition-colors truncate"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span className="truncate">{member.email}</span>
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-xs text-muted-foreground"
        >
          * Контакты членов комиссии будут обновлены. По всем вопросам
          обращайтесь к председателю или главному секретарю.
        </motion.p>
      </div>
    </section>
  );
}
