import React, { useState } from 'react';
import GiftQuizResult from './GiftQuizResult';
import {
  QUESTIONS,
  PRONOUNS,
  scoreArchetype,
  recommend,
} from '@/lib/archetypes';

// Interactive gift-finder: pronoun step, then one question per screen, then a verdict.
export default function GiftQuiz({ products }) {
  const [pronoun, setPronoun] = useState(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const totalSteps = QUESTIONS.length + 1;
  const done = pronoun && step >= totalSteps;

  const answer = (questionId, index) => {
    setAnswers((prev) => ({ ...prev, [questionId]: index }));
    setStep((s) => s + 1);
  };

  const restart = () => {
    setPronoun(null);
    setStep(0);
    setAnswers({});
  };

  let body;
  if (done) {
    const archetype = scoreArchetype(answers);
    const budgetIndex = answers.budget;
    const budgetFilter =
      budgetIndex != null ? QUESTIONS[QUESTIONS.length - 1].options[budgetIndex].budget : null;
    body = (
      <GiftQuizResult
        archetype={archetype}
        pronounWord={pronoun.word}
        picks={recommend(products, archetype, budgetFilter)}
        onRestart={restart}
      />
    );
  } else if (!pronoun) {
    body = (
      <div>
        <p className="text-[11px] tracking-label text-amber">Question 1 of {totalSteps}</p>
        <h3 className="mt-3 font-display text-[28px] sm:text-[36px] leading-tight text-cream">
          Who are you buying for?
        </h3>
        <div className="mt-8 flex flex-wrap gap-3">
          {PRONOUNS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setPronoun(p);
                setStep(1);
              }}
              className="border border-cream/20 px-6 py-3 text-[12px] tracking-label text-cream hover:border-amber hover:text-amber transition-colors"
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
        <p className="text-[11px] tracking-label text-amber">
          Question {step + 1} of {totalSteps}
        </p>
        <h3 className="mt-3 font-display text-[28px] sm:text-[36px] leading-tight text-cream max-w-xl">
          {question.prompt}
        </h3>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question.options.map((o, i) => (
            <button
              key={o.label}
              type="button"
              onClick={() => answer(question.id, i)}
              className="border border-cream/20 px-5 py-4 text-left text-[14px] text-cream/85 hover:border-amber hover:text-amber transition-colors"
            >
              {o.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={restart}
          className="mt-8 text-[11px] tracking-label text-cream/40 hover:text-cream/70 transition-colors"
        >
          Start again
        </button>
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
          <div className="lg:col-span-8 lg:border-l lg:border-cream/10 lg:pl-10">{body}</div>
        </div>
      </div>
    </section>
  );
}