import { Header } from "../components/Header";
import { Table } from "../components/Summary/Table";

export function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl p-6 flex flex-col gap-16">
        <Header />
        <Table />
      </div>
    </div>
  )
}