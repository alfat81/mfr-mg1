"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Send,
  ExternalLink,
  MessageCircle,
  MapPin,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const LEADERSHIP = [
  {
    name: "Дмитрий Серов",
    role: "Председатель комиссии",
    phone: "+7 (977) 823-63-90",
    phoneHref: "+79778236390",
    email: "serovdima@list.ru",
  },
  {
    name: "Алексей Фатьянов",
    role: "Заместитель председателя",
    phone: "+7 (920) 111-91-77",
    phoneHref: "+79201119177",
    email: "alexey@fatyanov.com",
  },
  {
    name: "Наталья Недавойдина",
    role: "Главный секретарь",
    phone: "+7 (921) 257-36-05",
    phoneHref: "+79212573605",
    email: "n.nedavoydina@fum.ru",
  },
];

const SOCIALS = [
  { name: "ВКонтакте", href: "https://vk.com/motogymkhanarussia", icon: "vk" },
  { name: "Telegram-канал", href: "https://t.me/FUM_MFR", icon: "tg" },
  { name: "Telegram-бот", href: "https://t.me/FUM_MFR", icon: "tg-bot" },
];

export function Contacts() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [fallbackVisible, setFallbackVisible] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let mounted = true;
    const timeoutId = setTimeout(() => {
      try {
        if (
          !iframe.contentWindow ||
          iframe.contentDocument?.body?.innerHTML.trim() === ""
        ) {
          if (mounted) setFallbackVisible(true);
        }
      } catch {
        if (mounted) setFallbackVisible(true);
      }
    }, 3500);

    const onLoad = () => {
      setTimeout(() => {
        try {
          if (
            iframe.contentDocument?.body?.innerHTML.trim() === "" ||
            iframe.contentDocument?.body?.innerHTML.includes("blocked")
          ) {
            if (mounted) setFallbackVisible(true);
          }
        } catch {
          // cross-origin — assume loaded ok
        }
      }, 500);
    };
    iframe.addEventListener("load", onLoad);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      iframe.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <section
      id="contacts"
      className="section-anchor relative py-24 md:py-32 bg-navy-deep text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-gold opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left: Contact info */}
          <div className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-white/8 ring-1 ring-gold/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold mb-5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Контакты
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-balance"
            >
              Связаться и{" "}
              <span className="text-gradient-mfr">подать заявку</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-white/70 text-base leading-relaxed"
            >
              Заполните форму справа — мы свяжемся с вами для подтверждения
              участия. Или позвоните напрямую председателю комиссии.
            </motion.p>

            {/* Leadership cards */}
            <div className="mt-8 space-y-3">
              {LEADERSHIP.map((person, i) => (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group rounded-2xl bg-white/[0.05] backdrop-blur ring-1 ring-white/10 hover:ring-gold/40 transition-all p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark text-navy-deep flex items-center justify-center shadow-gold">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-base">
                        {person.name}
                      </div>
                      <div className="text-xs text-gold mb-2">{person.role}</div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <a
                          href={`tel:${person.phoneHref}`}
                          className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-gold transition-colors"
                        >
                          <Phone className="h-3 w-3" />
                          {person.phone}
                        </a>
                        <a
                          href={`mailto:${person.email}`}
                          className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-gold transition-colors"
                        >
                          <Mail className="h-3 w-3" />
                          {person.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <div className="text-xs uppercase tracking-widest text-white/50 mb-3 font-semibold">
                Мы в социальных сетях
              </div>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/[0.05] ring-1 ring-white/10 hover:ring-gold/40 hover:bg-white/10 px-4 py-2.5 text-sm font-medium transition-all"
                  >
                    <MessageCircle className="h-4 w-4 text-gold" />
                    {s.name}
                    <ExternalLink className="h-3 w-3 text-white/40" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="mt-6 rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-4 flex items-start gap-3"
            >
              <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <div className="text-sm text-white/70">
                <div className="text-white font-medium">Официальный сайт</div>
                <a
                  href="https://mfr-mg.ru"
                  className="text-gold hover:underline"
                >
                  mfr-mg.ru
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-3xl bg-white text-navy-deep ring-1 ring-white/20 shadow-navy overflow-hidden">
              <div className="p-6 md:p-8 border-b border-border bg-gradient-to-br from-gold-soft to-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark text-navy-deep flex items-center justify-center shadow-gold">
                    <Send className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-navy">
                      Предварительная регистрация
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Заполните форму для участия в Кубке России 2026
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="relative">
                  <iframe
                    ref={iframeRef}
                    src="https://forms.yandex.ru/cloud/6991d860493639bacb236b9c/?iframe=1"
                    frameBorder={0}
                    name="ya-form-6991d860493639bacb236b9c"
                    className="w-full rounded-xl bg-muted/30"
                    style={{ height: 850 }}
                    loading="lazy"
                    title="Форма предварительной регистрации на Кубок России по ФУМ 2026"
                  />
                  {/* Fallback */}
                  {fallbackVisible && (
                    <div className="absolute inset-0 bg-white flex flex-col items-center justify-center text-center p-6 rounded-xl">
                      <div className="h-14 w-14 rounded-2xl bg-gold-soft ring-1 ring-gold/30 flex items-center justify-center mb-4">
                        <Send className="h-7 w-7 text-gold-dark" />
                      </div>
                      <h4 className="font-display font-bold text-lg text-navy mb-2">
                        Форма заблокирована расширением браузера
                      </h4>
                      <p className="text-sm text-muted-foreground mb-5 max-w-md">
                        Похоже, расширение блокирует встраивание формы.
                        Откройте её в новом окне, чтобы заполнить регистрацию.
                      </p>
                      <a
                        href="https://forms.yandex.ru/cloud/6991d860493639bacb236b9c/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-dark text-navy-deep px-6 py-3 font-bold text-sm shadow-gold hover:scale-105 transition-transform"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Открыть форму регистрации
                      </a>
                    </div>
                  )}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  *Поля, отмеченные звёздочкой{" "}
                  <span className="text-flag-red">*</span>, обязательны для
                  заполнения.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
