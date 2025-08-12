import { atom } from "jotai";
import type { SimulationResult } from "../types/form";

export const simulationResultAtom = atom<SimulationResult | null>(null);
export const isLoadingAtom = atom<boolean>(false);