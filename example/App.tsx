import React from "react";
import CopilotHandler from "./CopilotHandler";
import { CopilotProvider } from "react-native-copilot";

const App = () => {
  return ( 
    <CopilotProvider verticalOffset={24}>
      <CopilotHandler />
    </CopilotProvider>
   );
}
 
export default App;