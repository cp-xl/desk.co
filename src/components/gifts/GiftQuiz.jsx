import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import GiftQuizResult from './GiftQuizResult';
import {
  QUESTIONS,
  PRONOUNS,
  BUDGET_QUESTION_ID,
  rankArchetypes,
  recommend,
  getArchetype,
  budgetFilterFor,
  budgetLabelFor,
} from '@/lib/archetypes';

const TOTAL_STEPS = QUESTIONS.length + 1;

// Steps slide in from the side they came from, so going back feels like going
// back. Distance is small on purpose: this is a shop, not a slideshow.
const variants = {
  enter: (direction) => ({ opacity: 0, x: direction > 0 ? 28 : -28 }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction > 0 ? -28 : 28 }),
};

export default function GiftQuiz({ products }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pronoun, setPronoun] = useState(null);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState({});
  // A result restored from a shared link, kept apart from live quiz state so
  // "start again" returns to a working quiz rather than a stale URL.
  const [shared, setShared] = useState(null);

  // A shared link carries the verdict itself, not the answers: it should keep
  // working even if the questions are reworded later.
  useEffect(() => {
    const id = searchParams.get('r');
    if (!id) return;
    const archetype = getArchetype(id);
    if (!archetype) return;
    // Number('') and Number(null) are both 0, which is a real budget index — so
    // a link without `b` would silently restore the cheapest band and its label.
    // Only parse when the param is actually present.
    const rawBudget = searchParams.get('b');
    const budgetIndex = rawBudget?.trim() ? Number(rawBudget) : NaN;
    const pronounId = searchParams.get('p');
    setShared({
      archetype,
      runnerUp: null,
      pronoun: PRONOUNS.find((p) => p.id === pronounId) || PRONOUNS[2],
      budgetIndex: Number.isInteger(budgetIndex) ? budgetIndex : null,
    });
  }, [searchParams]);

  const restart = useCallback(() => {
    setShared(null);
    setPronoun(null);
    setStep(0);
    setDirection(1);
    setAnswers({});
    if (searchParams.get('r')) {
      const next = new URLSearchParams(searchParams);
      ['r', 'b', 'p'].forEach((k) => next.delete(k));
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const answer = (questionId, index) => {
    setAnswers((prev) => ({ ...prev, [questionId]: index }));
    setDirection(1);
    setStep((s) => s + 1);
  };

  const back = () => {
    setDirection(-1);
    if (step === 1) {
      setPronoun(null);
      setStep(0);
      return;
    }
    const previous = QUESTIONS[step - 2];
    if (previous) {
      setAnswers((prev) => {
        const next = { ...prev };
        delete next[previous.id];
        return next;
      });
    }
    setStep((s) => Math.max(0, s - 1));
  };

  const liveDone = pronoun && step >= TOTAL_STEPS;
  const ranked = useMemo(() => (liveDone ? rankArchetypes(answers) : []), [liveDone, answers]);

  const result = useMemo(() => {
    if (shared) {
      return {
        archetype: shared.archetype,
        runnerUp: null,
        share: null,
        pronoun: shared.pronoun,
        budgetIndex: shared.budgetIndex,
      };
    }
    if (!liveDone) return null;
    return {
      archetype: ranked[0]?.archetype,
      // Only name a runner-up when it actually scored; otherwise the verdict
      // claims a nuance the answers never supported.
      runnerUp: ranked[1]?.score > 0 ? ranked[1].archetype : null,
      share: ranked[0]?.share ?? null,
      pronoun,
      budgetIndex: answers[BUDGET_QUESTION_ID] ?? null,
    };
  }, [shared, liveDone, ranked, pronoun, answers]);

  const picks = useMemo(() => {
    if (!result?.archetype) return [];
    return recommend(products, result.archetype, budgetFilterFor(result.budgetIndex));
  }, [products, result]);

  const progress = result ? 1 : step / TOTAL_STEPS;
  const stepNumber = Math.min(step + 1, TOTAL_STEPS);

  let body;
  if (result?.archetype) {
    body = (
      <GiftQuizResult
        archetype={result.archetype}
        runnerUp={result.runnerUp}
        share={result.share}
        pronounWord={result.pronoun.word}
        budgetLabel={budgetLabelFor(result.budgetIndex)}
        picks={picks}
        shareUrl={`${window.location.origin}/gifts?r=${result.archetype.id}&p=${result.pronoun.id}${
          result.budgetIndex != null ? `&b=${result.budgetIndex}` : ''
        }`}
        onRestart={restart}
      />
    );
  } else if (!pronoun) {
    body = (
      <div>
        <h3 className="font-display text-[28px] sm:text-[36px] leading-tight text-cream">
          Who are you buying for?
        </h3>
        <div className="mt-8 flex flex-wrap gap-3">
          {PRONOUNS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setPronoun(p);
                setDirection(1);
                setStep(1);
              }}
              className="border border-cream/20 px-6 py-3 text-[12px] tracking-label text-cream hover:border-amber hover:bg-amber/10 hover:text-amber transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    );
  } else {
    const question = QUESTIONS[step - 1];
    body = (
      <div>
        <h3 className="font-display text-[28px] sm:text-[36px] leading-tight text-cream max-w-xl">
          {question.prompt}
        </h3>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question.options.map((o, i) => (
            <button
              key={o.label}
              type="button"
              onClick={() => answer(question.id, i)}
              className="group border border-cream/20 px-5 py-4 text-left text-[14px] text-cream/85 hover:border-amber hover:bg-amber/10 hover:text-amber transition-colors"
            >
              <span className="mr-2 font-ui text-[11px] text-cream/30 group-hover:text-amber/60 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              {o.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section id="quiz" className="bg-charcoal text-cream py-16 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-focus px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-[11px] tracking-label text-amber mb-4">Not sure what to get</p>
            <h2 className="font-display text-[34px] sm:text-[44px] leading-[0.95]">
              Four questions,<br />one answer.
            </h2>
            <p className="mt-5 text-[14px] leading-relaxed text-cream/60 max-w-xs">
              Tell us how they actually behave and we will tell you what to buy. No email, no
              newsletter at the end.
            </p>
          </div>

          <div className="lg:col-span-8 lg:border-l lg:border-cream/10 lg:pl-10">
            <div className="mb-8 flex items-center gap-4">
              {step > 0 && !result && (
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex items-center gap-1.5 text-[11px] tracking-label text-cream/45 hover:text-amber transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back
                </button>
              )}
              <p className="text-[11px] tracking-label text-amber">
                {result ? 'The verdict' : `Question ${stepNumber} of ${TOTAL_STEPS}`}
              </p>
              <div className="h-px flex-1 bg-cream/15" aria-hidden="true">
                <motion.div
                  className="h-px bg-amber origin-left"
                  initial={false}
                  animate={{ scaleX: progress }}
                  transition={{ duration: 0.45, ease: [0.17, 0.67, 0.83, 0.67] }}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={result ? 'result' : step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                {body}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
