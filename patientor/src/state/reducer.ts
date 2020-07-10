import { State } from "./state";
import { Patient, Diagnosis } from "../types";

//for testing default imports
// const car = "swift";
// export default car;

export const setPatientList = (patientListFromApi: Patient[]): Action => ({
  type: "SET_PATIENT_LIST", payload: patientListFromApi
})

export const setDiagnosesList = (diagnosisCodesFromApi: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSIS_CODES_LIST", payload: diagnosisCodesFromApi
})

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "UPDATE_FULLDETAILS_PATIENT";
    payload: Patient;
  }
  |
  {
    type: "SET_DIAGNOSIS_CODES_LIST";
    payload: Diagnosis[]
  }
  ;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      //#region MY TESTING CODE BELOWset
      // const myPatient = state.patients['non-existing-id'];
      // const myPatient = state.patients.get('non-existing-id')
      // console.log(myPatient.name); //Says unsafe member access .name on an any value.
      // console.log(myPatient?.name); // Says unsafe member access .name on an any value.
      //#endregion
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_FULLDETAILS_PATIENT":
      return { ...state, ...action.payload };
    case "SET_DIAGNOSIS_CODES_LIST":
      return { ...state, diagnosisCodes: [...action.payload] }
    default:
      return state;
  }
};
