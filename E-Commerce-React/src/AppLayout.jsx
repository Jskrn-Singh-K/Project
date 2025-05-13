import { Outlet } from "react-router-dom"
import Navigation from "./Components/Navigation"
import HomeFooter from "./Components/HomeFooter"
function AppLayout() {
  
  return (
    <div className="flex flex-col min-h-screen">
    <Navigation />

    <div className="flex-1 p-4 bg-gray-100">
      <Outlet />
    </div>

    <HomeFooter />
  </div>
  )
}
export default AppLayout
