import { RouterProvider } from "react-router-dom"
import router from "./routes/Router.tsx";

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
