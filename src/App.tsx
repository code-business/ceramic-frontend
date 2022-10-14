import React, { useEffect } from "react";
import run from "./client";
export default function App() {
  // const app = useApp()

  useEffect(() => {
    (async () => {
      console.log("hjeloo");

      await run();
    })();
  }, []);

  // const [mobileOpen, setMobileOpen] = useState(false)
  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen)
  // }

  return <div>App</div>;
}
