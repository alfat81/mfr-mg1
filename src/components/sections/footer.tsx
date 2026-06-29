"use client";

import { ChevronUp, Lock } from "lucide-react";
import { NAV_LINKS } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="relative bg-navy-deep text-white border-t border-white/10">
      <div className="absolute inset-0 bg-grid-gold opacity-10 pointer-events-none" />
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative">
        {/* Top: Logos row */}
        <div className="py-10 border-b border-white/10">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
              <div className="bg-white rounded-xl p-3 h-16 flex items-center">
                <img
                  src="/images/mfr_logo.webp"
                  alt="Мотоциклетная федерация России"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="bg-white rounded-xl p-3 h-16 flex items-center">
                <img
                  src="/images/logo_minsport.webp"
                  alt="Министерство спорта РФ"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="bg-white rounded-xl p-3 h-16 flex items-center">
                <img
                  src="/images/logo_sm.webp"
                  alt="Спорт высших достижений"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>

            <div className="md:col-span-2 text-center md:text-right">
              <div className="text-xs uppercase tracking-widest text-gold font-semibold mb-1.5">
                Официальные партнёры и аккредитации
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                Вид спорта № 0910007511Я. Соревнования проводятся под эгидой
                Мотоциклетной федерации России при поддержке Министерства спорта
                Российской Федерации.
              </p>
            </div>
          </div>
        </div>

        {/* Middle: Nav + Contacts */}
        <div className="py-10 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-white/95 ring-1 ring-gold/30 overflow-hidden">
                <img
                  src="/images/logo_sm.webp"
                  alt="Комиссия по ФУМ МФР"
                  className="h-full w-full object-contain p-1"
                />
              </div>
              <div>
                <div className="font-display font-bold text-base">
                  Комиссия по ФУМ МФР
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-gold/80 font-medium">
                  Мотоциклетная федерация России
                </div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-4 max-w-sm">
              Официальный сайт Комиссии по фигурному управлению мотоциклом
              (мотоджимхане) Мотоциклетной федерации России. Календарь,
              документы и регистрация на сезон 2026.
            </p>
            <a
              href="https://mfr-mg.ru"
              className="inline-flex items-center gap-2 text-sm text-gold hover:underline"
            >
              mfr-mg.ru
            </a>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-widest text-gold font-semibold mb-4">
              Разделы
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-widest text-gold font-semibold mb-4">
              Контакты
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <a
                  href="tel:+79778236390"
                  className="text-white/70 hover:text-gold transition-colors"
                >
                  +7 (977) 823-63-90
                </a>{" "}
                <span className="text-white/40 text-xs">— председатель</span>
              </div>
              <div>
                <a
                  href="tel:+79201119177"
                  className="text-white/70 hover:text-gold transition-colors"
                >
                  +7 (920) 111-91-77
                </a>{" "}
                <span className="text-white/40 text-xs">— зам. председателя</span>
              </div>
              <a
                href="mailto:serovdima@list.ru"
                className="block text-white/70 hover:text-gold transition-colors"
              >
                serovdima@list.ru
              </a>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://vk.com/motogymkhanarussia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 px-3 rounded-lg bg-white/5 ring-1 ring-white/10 hover:ring-gold/40 hover:bg-white/10 text-xs font-medium transition-all"
                >
                  ВКонтакте
                </a>
                <a
                  href="https://t.me/FUM_MFR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 px-3 rounded-lg bg-white/5 ring-1 ring-white/10 hover:ring-gold/40 hover:bg-white/10 text-xs font-medium transition-all"
                >
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="py-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © 2026 Комиссия по фигурному управлению мотоциклом (мотоджимхане)
            МФР. Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-gold hover:text-navy-deep hover:ring-gold text-xs font-medium text-white/70 px-3.5 py-2 transition-all"
              title="Закрытая зона — вход по паролю"
            >
              <Lock className="h-3.5 w-3.5" />
              Вход для админа
            </a>
            <a
              href="https://vk.com/motogymkhana_nn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-gold transition-colors inline-flex items-center gap-1.5"
            >
              <span className="text-gold">✦</span>
              Created by Motogymkhana NN
            </a>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <a
        href="#top"
        className="absolute -top-6 right-6 md:right-8 h-12 w-12 rounded-full bg-gold text-navy-deep flex items-center justify-center shadow-gold hover:scale-110 transition-transform"
        aria-label="Наверх"
      >
        <ChevronUp className="h-5 w-5" />
      </a>
    </footer>
  );
}
