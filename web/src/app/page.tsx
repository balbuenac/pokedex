import Info from "./components/info";
import Search from "./components/search";
import Stats from "./components/stats";
import Viewer from "./components/viewer";

export default function Home() {

  return (
    <> 
        <div className="grid grid-cols-3 gap-4">
          <div className="..."><Search /></div>
          <div className="col-span-2 ...">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 ..."><Viewer /></div>
              <div className="..."><Info /></div>
              <div className="..."><Stats /></div>
            </div>
          </div>
        </div>
    </>
  )
}
