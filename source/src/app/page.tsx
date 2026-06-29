import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Discipline } from "@/components/sections/discipline";
import { Stages } from "@/components/sections/stages";
import { Documents } from "@/components/sections/documents";
import { Commission } from "@/components/sections/commission";
import { RegionalCommissions } from "@/components/sections/regional-commissions";
import { News } from "@/components/sections/news";
import { Partners } from "@/components/sections/partners";
import { Faq } from "@/components/sections/faq";
import { Contacts } from "@/components/sections/contacts";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Discipline />
        <Stages />
        <Documents />
        <Commission />
        <RegionalCommissions />
        <News />
        <Partners />
        <Faq />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}
