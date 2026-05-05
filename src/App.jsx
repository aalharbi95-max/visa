import { useEffect } from "react"
import { supabase } from "./supabase"

function App() {

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const { data, error } = await supabase
      .from('visa_batches')
      .select('*')

    console.log("DATA:", data)
    console.log("ERROR:", error)
  }

  return (
    <div>
      <h1>VisaFlow KSA 🚀</h1>
    </div>
  )
}

export default App
