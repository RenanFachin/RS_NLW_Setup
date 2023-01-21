import { Header } from "../components/Header";
import { Table } from "../components/Summary/Table";
import '../lib/dayjs'
import { Toaster } from 'react-hot-toast'

export function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-5xl p-6 flex flex-col gap-16">
        <Header />
        <Table />
      </div>
    </div>
  )
}