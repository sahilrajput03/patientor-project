/* eslint-disable @typescript-eslint/no-floating-promises */
import React from "react";
// import { hot } from 'react-hot-loader/root'
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnosesList } from "./state";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);
    // axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        const { data: diagnosisCodesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setPatientList(patientListFromApi)); // New action creator used.
        // dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi }); // Older code.
        dispatch(setDiagnosesList(diagnosisCodesFromApi)); // Dispatching diagnoses codes to the state.
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor Program</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App; // using original, coz now I'm fast-refresh.
// export default process.env.NODE_ENV === "development" ? hot(App) : App
