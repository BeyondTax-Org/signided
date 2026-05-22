import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-20 border-y "
      style={{
        background: "#FAFBFD",
        borderColor: "#E5E9F1",
        padding: "4rem 1rem",
      }}
    >
      <div className="mx-auto max-w-full md:max-w-[55%]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className=" text-center"
          style={{ marginBottom: "2rem" }}
        >
          <h2
            style={{
              fontSize: "clamp(25px, 2.9vw, 28px)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
              color: "#191B2A",
            }}
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  delay: i * 0.06,
                }}
                style={{ marginBottom: "0.8rem" }}
              >
                <div
                  className="overflow-hidden rounded-md border bg-white transition-all duration-200"
                  style={{
                    borderColor: "#DCE1EA",
                    boxShadow: "0 1px 2px rgba(15, 23, 42, 0.02)",
                    padding: "1rem",
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 text-left text-[0.85rem] font-[600] transition-colors duration-200 cursor-pointer sm:gap-6 sm:text-[0.9rem]"
                    style={{
                      color: "#191B2A",
                      letterSpacing: "-0.015em",
                    }}
                    onMouseEnter={(e) => {
                      if (!isOpen)
                        (
                          e.currentTarget.parentElement as HTMLElement
                        ).style.borderColor = "#C9CEDA";
                    }}
                    onMouseLeave={(e) => {
                      if (!isOpen)
                        (
                          e.currentTarget.parentElement as HTMLElement
                        ).style.borderColor = "#DCE1EA";
                    }}
                  >
                    <span>{item.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                      className="shrink-0"
                    >
                      <ChevronDown
                        size={18}
                        strokeWidth={2}
                        style={{ color: "#6F7686" }}
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: {
                            type: "spring",
                            stiffness: 500,
                            damping: 35,
                          },
                          opacity: { duration: 0.2 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-0">
                          <p
                            className="max-w-[910px] text-[0.85rem] font-[500] leading-[1.65]"
                            style={{ color: "#6F7686", marginTop: "0.8rem" }}
                          >
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
