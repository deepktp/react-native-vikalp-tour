import React from "react";
import CopilotHandler from "./CopilotHandler";
import { CoachMarkProvider } from "react-native-coach-mark";

const App = () => {
  return ( 
    <CoachMarkProvider verticalOffset={24}>
      <CopilotHandler />
    </CoachMarkProvider>
   );
}
 
export default App;