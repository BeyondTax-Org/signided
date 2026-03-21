import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="border-y px-6 py-20"
      style={{
        background: "linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)",
        borderColor: "var(--bd)",
      }}
    >
      <div className="mx-auto max-w-[560px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 28px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--tx)",
            }}
          >
            Common questions
          </h2>
          <p className="mt-2 text-[15px]" style={{ color: "var(--tx2)" }}>
            Everything you need to know about verifying documents.
          </p>
        </motion.div>

        <div className="space-y-3">
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
              >
                <div
                  className="overflow-hidden rounded-[var(--r-md)] border bg-white transition-all duration-200"
                  style={{
                    borderColor: isOpen
                      ? "rgba(245,158,11,0.3)"
                      : "var(--bd)",
                    boxShadow: isOpen
                      ? "0 4px 16px rgba(245,158,11,0.06)"
                      : "var(--shadow-sm)",
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-[13px] font-semibold transition-colors duration-200 cursor-pointer"
                    style={{
                      color: "var(--tx)",
                      letterSpacing: "-0.01em",
                    }}
                    onMouseEnter={(e) => {
                      if (!isOpen)
                        (e.currentTarget.parentElement as HTMLElement).style.borderColor =
                          "rgba(245,158,11,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isOpen)
                        (e.currentTarget.parentElement as HTMLElement).style.borderColor =
                          "var(--bd)";
                    }}
                  >
                    {item.question}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                    >
                      <ChevronDown
                        size={16}
                        style={{ color: isOpen ? "var(--am)" : "var(--tx3)" }}
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
                        <div
                          className="border-t px-5 py-4"
                          style={{
                            borderColor: "rgba(245,158,11,0.15)",
                            background: "var(--bg2)",
                          }}
                        >
                          <p
                            className="text-[13px] leading-[1.7]"
                            style={{ color: "var(--tx2)" }}
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
