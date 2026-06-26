import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/SectionHeading";
import { homeFaqs } from "@/lib/faqs";

export function FaqSection() {
  return (
    <section id="faq" className="relative overflow-hidden bg-surface py-20 md:py-28">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="container relative mx-auto px-4">
        <SectionHeading
          eyebrow="FAQs"
          title={
            <>
              Tempo traveller, bus &amp; cab rental <span className="italic text-primary">questions</span>
            </>
          }
          description="Everything you need to know about renting a tempo traveller, bus or cab in Bangalore with Buddiez Holidays."
          className="mb-12"
        />

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {homeFaqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${i}`}
                className="overflow-hidden rounded-2xl border border-border/60 bg-white/70 px-5 shadow-soft backdrop-blur-sm"
              >
                <AccordionTrigger className="text-left font-display text-lg text-primary-deep hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-pretty leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
