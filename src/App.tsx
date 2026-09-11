import AppRoutes from './Routes/Routes';
import { Analytics } from "@vercel/analytics/react"
function App() {
  
  return <>
  <AppRoutes />
   <Analytics />
  </>;
}

export default App;