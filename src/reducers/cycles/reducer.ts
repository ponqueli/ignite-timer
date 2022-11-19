import { produce } from "immer";
import { ActionTypes } from "./actions";

export interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface ICyclesState {
  cycles: ICycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: ICyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_CYCLE:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id,
      // };
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === action.payload.activeCycleId) {
      //       return {
      //         ...cycle,
      //         interruptedDate: new Date(),
      //       };
      //     }
      //     return cycle;
      //   }),
      //   activeCycleId: null,
      // };
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === action.payload.activeCycleId
      );

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].interruptedDate = new Date();
      });
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === action.payload.activeCycleId
      );

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].finishedDate = new Date();
      });
    }
    // return {
    //   ...state,
    //   cycles: state.cycles.map((cycle) => {
    //     if (cycle.id === action.payload.activeCycleId) {
    //       return {
    //         ...cycle,
    //         finishedDate: new Date(),
    //       };
    //     }
    //     return cycle;
    //   }),
    // };
    default:
      return state;
  }
}
