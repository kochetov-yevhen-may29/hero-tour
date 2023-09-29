import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./src/App"
import { Heroes } from "./src/components/Heroes"
import { Dashboard } from "./src/components/Dashboard/Dashboard"
import { NotFound } from "./src/components/NotFound"
import { HeroDetail } from "./src/components/HeroDetail"

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/heroes">
          <Route index element={<Heroes />} />
          <Route path="detail/:id" element={<HeroDetail />} />
        </Route>
        <Route path="/dashboard">
          <Route index element={<Dashboard />} />
          <Route path="detail/:id" element={<HeroDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Root
