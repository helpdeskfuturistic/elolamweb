import type { ReactNode } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  MapPin,
  Star,
  Shield,
  Smartphone,
  ChefHat,
  Store,
  Truck,
  User,
  ShoppingBag,
  CheckCircle2,
  Mail,
  UtensilsCrossed,
} from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useMarketingLocale } from '@/hooks/use-marketing-locale';
import {
  DEVELOPER_NAME,
  MARKETING_HOME_COPY,
  type ProviderTypeKey,
} from '@/lib/marketing-home-copy';

const CONTACT_EMAIL = 'elchuwltechnologies@outlook.com';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const PROVIDER_ICONS: Record<ProviderTypeKey, ReactNode> = {
  restaurant: <UtensilsCrossed className="h-6 w-6 text-primary" />,
  food_business: <Store className="h-6 w-6 text-primary" />,
  home_cook: <ChefHat className="h-6 w-6 text-primary" />,
  food_truck: <Truck className="h-6 w-6 text-primary" />,
  individual_seller: <User className="h-6 w-6 text-primary" />,
  other: <ShoppingBag className="h-6 w-6 text-primary" />,
};

const TRUST_ICONS = [<Shield className="h-7 w-7" />, <Star className="h-7 w-7" />, <MapPin className="h-7 w-7" />];

export default function Home() {
  const { locale, setLocale } = useMarketingLocale();
  const t = MARKETING_HOME_COPY[locale];

  return (
    <div className="overflow-x-hidden min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <BrandLogo iconClassName="w-9 h-9" />
          </Link>
          <nav className="hidden sm:flex items-center gap-4 md:gap-6 text-sm font-medium text-muted-foreground">
            <a href="#sobre" className="hover:text-primary transition-colors">
              {t.nav.about}
            </a>
            <a href="#fornecedores" className="hover:text-primary transition-colors">
              {t.nav.providers}
            </a>
            <a href="#como-funciona" className="hover:text-primary transition-colors">
              {t.nav.howItWorks}
            </a>
            <a href="#contacto" className="hover:text-primary transition-colors">
              {t.nav.contact}
            </a>
          </nav>
          <LanguageToggle locale={locale} onChange={setLocale} />
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-[#FFF8F2] via-[#FFF4EA] to-[#FFE8CC] flex-1 flex items-center">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #FF7A00 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp}>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-3 py-1">
                <MapPin className="h-3 w-3 mr-1" />
                {t.hero.badge}
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight mb-6"
            >
              {t.hero.titleLine1}
              <br />
              <span className="text-primary">{t.hero.titleHighlight}</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg sm:text-xl text-muted-foreground mb-4 max-w-2xl leading-relaxed">
              <strong className="font-semibold text-foreground">ElOlam Meal</strong> {t.hero.paragraph1}
            </motion.p>

            <motion.p variants={fadeUp} className="text-base text-muted-foreground mb-6 max-w-2xl leading-relaxed">
              {t.hero.paragraph2}
            </motion.p>

            <motion.p variants={fadeUp} className="text-sm text-muted-foreground mb-8">
              {t.hero.developedBy}{' '}
              <span className="font-semibold text-foreground">{DEVELOPER_NAME}</span>
            </motion.p>

            <motion.div variants={fadeUp}>
              <a
                href="#sobre"
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                {t.hero.learnMore}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="sobre" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 scroll-mt-20">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.about.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t.about.p1}</p>
            <p className="text-muted-foreground leading-relaxed mb-6">{t.about.p2}</p>
            <ul className="space-y-3">
              {t.about.bullets.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">{t.about.audienceTitle}</h3>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>{t.about.customers}</p>
                <p>{t.about.providers}</p>
                <p>{t.about.admins}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section id="fornecedores" className="bg-muted/50 py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">{t.providersSection.badge}</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.providersSection.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{t.providersSection.intro}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {t.providersSection.types.map((type, i) => (
              <motion.div
                key={type.key}
                custom={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      {PROVIDER_ICONS[type.key]}
                    </div>
                    <h3 className="font-bold mb-1">{type.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{type.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/10 to-transparent p-8 sm:p-10 text-center sm:text-left"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-2">{t.providersSection.calloutTitle}</h3>
            <p className="text-sm text-muted-foreground max-w-2xl">{t.providersSection.calloutBody}</p>
          </motion.div>
        </div>
      </section>

      <section id="como-funciona" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 scroll-mt-20">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t.howItWorks.title}</h2>
          <p className="text-muted-foreground text-lg">{t.howItWorks.subtitle}</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {t.howItWorks.steps.map((s, i) => (
            <motion.div
              key={s.step}
              custom={i}
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto mb-4">
                {s.step}
              </div>
              <h3 className="font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-8 text-center text-white">
            {t.trust.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center mb-4">
                  {TRUST_ICONS[i]}
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-orange-100 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center scroll-mt-20">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.contact.title}</h2>
          <p className="text-muted-foreground mb-4 text-lg max-w-xl mx-auto">{t.contact.body}</p>
          <p className="text-sm text-muted-foreground mb-6">
            {t.footer.developerLine}{' '}
            <span className="font-semibold text-foreground">{DEVELOPER_NAME}</span>
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center justify-center gap-2 text-primary font-medium hover:underline text-sm"
          >
            <Mail className="h-4 w-4" />
            {CONTACT_EMAIL}
          </a>
        </motion.div>
      </section>

      <footer className="border-t border-border bg-card mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <UtensilsCrossed className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold">
                  ElOlam <span className="text-primary">Meal</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm mb-3">{t.footer.tagline}</p>
              <p className="text-sm text-muted-foreground">
                {t.footer.developerLine}{' '}
                <span className="font-semibold text-foreground">{DEVELOPER_NAME}</span>
              </p>
            </div>
            <div className="text-sm space-y-2">
              <p className="font-semibold">{t.footer.contactLabel}</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-8 text-center md:text-left">
            © {new Date().getFullYear()} {t.footer.copyright} · {DEVELOPER_NAME}
          </p>
        </div>
      </footer>
    </div>
  );
}
