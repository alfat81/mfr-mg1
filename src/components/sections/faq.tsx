"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { FAQ } from "@/lib/site-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <section
      id="faq"
      className="section-anchor relative py-24 md:py-32 bg-background overflow-hidden"
    >
      <div className="container mx-auto max-w-4xl px-4 md:px-6 relative">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-soft text-navy px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ring-1 ring-gold/30 mb-5"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            Частые вопросы
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display font-extrabold text-navy text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-balance"
          >
            Отвечаем на{" "}
            <span className="text-gradient-gold">частые вопросы</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-muted-foreground text-base leading-relaxed"
          >
            Не нашли ответ? Напишите нам через форму контактов — ответим в
            течение рабочего дня.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="rounded-2xl bg-card ring-1 ring-border overflow-hidden divide-y divide-border"
          >
            {FAQ.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-0 px-5 md:px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 text-base md:text-[17px] font-display font-semibold text-foreground hover:text-gold transition-colors">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-[15px] text-muted-foreground leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
