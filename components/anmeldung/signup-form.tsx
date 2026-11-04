"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent, type RefObject } from "react";
import { anmeldung as t, phoneProblem } from "@/content/anmeldung";
import { Gauge } from "./gauge";
import styles from "./anmeldung.module.css";

/*
 * SIMULATION ONLY – safety guarantees (DESIGN.md 4.7):
 * - <form> has no action/method; onSubmit always calls preventDefault()
 *   and only switches the view. No fetch, no server action, no API route.
 * - Answers live only in React state (memory) – no cookies, no
 *   localStorage/sessionStorage/IndexedDB, no logging, no analytics.
 * - autoComplete="off" everywhere, so the browser doesn't keep entries.
 * - Until JavaScript runs, every control is disabled (a plain HTML form
 *   without JS would otherwise submit the values in the URL).
 */

type Answers = { getriebe: string; kontaktzeit: string; name: string; phone: string };
type Errors = Partial<Record<keyof Answers, string>>;

const EMPTY: Answers = { getriebe: "", kontaktzeit: "", name: "", phone: "" };

/** true only in the browser after hydration – false on the server / without JS. */
const useHydrated = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

export function SignupForm() {
  const hydrated = useHydrated();
  const [step, setStep] = useState(1); // 1–4, 5 = result screen
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  // After a step change (not on page load): focus the new step's heading.
  useEffect(() => {
    if (!moved.current) return;
    headingRef.current?.focus();
  }, [step]);

  const set = (key: keyof Answers, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const goTo = (next: number) => {
    moved.current = true;
    setErrors({});
    setStep(next);
  };

  /** Validate the current step; returns errors and focuses the first invalid control. */
  const validate = (): boolean => {
    const e: Errors = {};
    if (step === 1 && !answers.getriebe) e.getriebe = t.getriebe.error;
    if (step === 2 && !answers.kontaktzeit) e.kontaktzeit = t.kontaktzeit.error;
    if (step === 3) {
      if (answers.name.trim().length < 2) e.name = t.kontakt.name.errorEmpty;
      const p = phoneProblem(answers.phone);
      if (p) e.phone = p === "empty" ? t.kontakt.phone.errorEmpty : t.kontakt.phone.errorInvalid;
    }
    setErrors(e);
    const first = (["getriebe", "kontaktzeit", "name", "phone"] as const).find((k) => e[k]);
    if (first) {
      // Radios: focus the first option; text fields: the field itself.
      const el = document.querySelector<HTMLElement>(`[data-field="${first}"]`);
      el?.focus();
      return false;
    }
    return true;
  };

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault(); // never navigates, never sends
    if (step <= 3) {
      if (validate()) goTo(step + 1);
    } else if (step === 4) {
      goTo(5);
    }
  };

  const restart = () => {
    setAnswers(EMPTY);
    goTo(1);
  };

  const stepName = t.steps[Math.min(step, 4) - 1];
  const label = (key: "getriebe" | "kontaktzeit", value: string) =>
    (t[key].options as readonly { value: string; label: string }[]).find((o) => o.value === value)?.label ?? "";

  return (
    <div className={styles.panel}>
      {/* Required notice – at every step and on the result screen */}
      <p className={styles.notice} role="note">
        <span aria-hidden="true" className={styles.noticeIcon}>
          i
        </span>
        {t.demoNotice}
      </p>

      <div className={styles.progress}>
        <Gauge step={Math.min(step, 4)} />
        <p className={styles.progressText}>{t.progress(Math.min(step, 4), stepName)}</p>
      </div>

      {step === 5 ? (
        <div className={styles.result}>
          <h3 ref={headingRef} tabIndex={-1} className={styles.question}>
            {t.result.title}
          </h3>
          <p>{t.result.text}</p>
          <h4 className={styles.subhead}>{t.buerozeiten.title}</h4>
          <dl className={styles.hours}>
            {t.buerozeiten.slots.map((s) => (
              <div key={s.day}>
                <dt>{s.day}</dt>
                <dd>{s.time}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.actions}>
            <a href={t.telefon.href} className={styles.primary}>
              {t.telefon.text}
            </a>
            <button type="button" className={styles.secondary} onClick={restart}>
              {t.result.restart}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate autoComplete="off" className={styles.form}>
          {/* disabled until hydrated: without JS nothing can be submitted */}
          <fieldset className={styles.fieldsetReset} disabled={!hydrated}>
            {step === 1 && (
              <Choice
                name="getriebe"
                question={t.getriebe.question}
                options={t.getriebe.options}
                value={answers.getriebe}
                error={errors.getriebe}
                onChange={(v) => set("getriebe", v)}
                headingRef={headingRef}
              />
            )}

            {step === 2 && (
              <Choice
                name="kontaktzeit"
                question={t.kontaktzeit.question}
                hint={t.kontaktzeit.hint}
                options={t.kontaktzeit.options}
                value={answers.kontaktzeit}
                error={errors.kontaktzeit}
                onChange={(v) => set("kontaktzeit", v)}
                headingRef={headingRef}
              />
            )}

            {step === 3 && (
              <fieldset className={styles.group}>
                <legend>
                  <h3 ref={headingRef} tabIndex={-1} className={styles.question}>
                    {t.kontakt.question}
                  </h3>
                </legend>
                <TextField
                  id="anmeldung-name"
                  field="name"
                  label={t.kontakt.name.label}
                  value={answers.name}
                  error={errors.name}
                  onChange={(v) => set("name", v)}
                />
                <TextField
                  id="anmeldung-phone"
                  field="phone"
                  label={t.kontakt.phone.label}
                  hint={t.kontakt.phone.hint}
                  type="tel"
                  value={answers.phone}
                  error={errors.phone}
                  onChange={(v) => set("phone", v)}
                />
              </fieldset>
            )}

            {step === 4 && (
              <div className={styles.group}>
                <h3 ref={headingRef} tabIndex={-1} className={styles.question}>
                  {t.review.question}
                </h3>
                <dl className={styles.summary}>
                  {(
                    [
                      [t.getriebe.summaryLabel, label("getriebe", answers.getriebe), 1],
                      [t.kontaktzeit.summaryLabel, label("kontaktzeit", answers.kontaktzeit), 2],
                      [t.kontakt.name.label, answers.name.trim(), 3],
                      [t.kontakt.phone.label, answers.phone.trim(), 3],
                    ] as const
                  ).map(([term, value, target]) => (
                    <div key={term} className={styles.summaryRow}>
                      <dt>{term}</dt>
                      <dd>{value}</dd>
                      <dd>
                        <button type="button" className={styles.change} onClick={() => goTo(target)}>
                          {t.review.change}
                          <span className="sr-only">: {term}</span>
                        </button>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className={styles.actions}>
              {step > 1 && (
                <button type="button" className={styles.secondary} onClick={() => goTo(step - 1)}>
                  {t.nav.back}
                </button>
              )}
              <button type="submit" className={step === 4 ? styles.simulate : styles.primary}>
                {step === 4 ? t.review.submit : t.nav.next}
              </button>
            </div>
          </fieldset>
        </form>
      )}
    </div>
  );
}

/* ---------- Building blocks ---------- */

function Choice({
  name,
  question,
  hint,
  options,
  value,
  error,
  onChange,
  headingRef,
}: {
  name: "getriebe" | "kontaktzeit";
  question: string;
  hint?: string;
  options: readonly { value: string; label: string }[];
  value: string;
  error?: string;
  onChange: (v: string) => void;
  headingRef: RefObject<HTMLHeadingElement | null>;
}) {
  const hintId = `${name}-hint`;
  const errorId = `${name}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;
  return (
    // role="radiogroup": a fieldset that may carry aria-invalid + the error description
    <fieldset className={styles.group} role="radiogroup" aria-describedby={describedBy} aria-invalid={error ? true : undefined}>
      <legend>
        <h3 ref={headingRef} tabIndex={-1} className={styles.question}>
          {question}
        </h3>
      </legend>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      <div className={styles.options}>
        {options.map((o, i) => (
          <label key={o.value} className={styles.option}>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              autoComplete="off"
              // the first option receives focus when the group has an error
              data-field={i === 0 ? name : undefined}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </fieldset>
  );
}

function TextField({
  id,
  field,
  label,
  hint,
  type = "text",
  value,
  error,
  onChange,
}: {
  id: string;
  field: "name" | "phone";
  label: string;
  hint?: string;
  type?: "text" | "tel";
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      <input
        id={id}
        data-field={field}
        type={type}
        inputMode={type === "tel" ? "tel" : undefined}
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={styles.input}
      />
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
