// ============================================================
// ALERTA-ED — Hook: estado del onboarding de SENA
// ============================================================

import { useState, useCallback } from 'react';
import type { OnboardingState, UserRole, SenaProfile } from '@/types';
import { generateProfile } from '@/data/sena-flow';

const TOTAL_STEPS = 5; // bienvenida(0) + rol(1) + q1(2) + q2(3) + perfil(4)

export function useOnboarding() {
  const [state, setState] = useState<OnboardingState>({
    step: 0,
    completed: false,
    profile: null,
  });

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setState((prev) => {
        const nextStep = prev.step + 1;
        if (nextStep >= TOTAL_STEPS) {
          return { ...prev, step: TOTAL_STEPS - 1 };
        }
        return { ...prev, step: nextStep };
      });
      setIsAnimating(false);
    }, 250);
  }, [isAnimating]);

  const selectAnswer = useCallback(
    (questionId: string, valor: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: valor }));
      // Si es el rol, espera un breve momento y avanza
      // Si es otra pregunta, también avanza
      setTimeout(() => {
        goToNext();
      }, 400);
    },
    [goToNext]
  );

  const finalizeProfile = useCallback(() => {
    const role = (answers['rol'] as UserRole) ?? 'otro';
    const profile = generateProfile(role, answers);
    setState((prev) => ({
      ...prev,
      step: TOTAL_STEPS - 1,
      completed: false, // todavía está en la pantalla de perfil
      profile,
    }));
  }, [answers]);

  const completeOnboarding = useCallback(() => {
    setState((prev) => ({ ...prev, completed: true }));
  }, []);

  const getCurrentRole = (): UserRole => {
    return (answers['rol'] as UserRole) ?? 'otro';
  };

  const getProfile = (): SenaProfile | null => state.profile;

  return {
    step: state.step,
    completed: state.completed,
    profile: state.profile,
    answers,
    isAnimating,
    goToNext,
    selectAnswer,
    finalizeProfile,
    completeOnboarding,
    getCurrentRole,
    getProfile,
    totalSteps: TOTAL_STEPS,
  };
}
