import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { AnimatedSection } from './AnimatedSection'
import { faqs } from './constants'

export function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-[#e8e0d0]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#c9a84c]/20 text-[#c9a84c] border-[#c9a84c] font-body">
              Got Questions?
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0e0c0a] mb-6">
              Frequently Asked Questions
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-xl px-6 border border-[#d4cdc0] data-[state=open]:shadow-lg"
              >
                <AccordionTrigger className="font-display text-lg text-[#0e0c0a] hover:text-[#b85c38] text-left py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-[#6b6560] pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  )
}
