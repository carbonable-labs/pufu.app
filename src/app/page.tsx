import Decompose from "./components/decompose";
import Navbar from "./components/navbar";
import { StarknetConfig, InjectedConnector } from '@starknet-react/core'

const connectors = [
  new InjectedConnector({ options: { id: 'braavos' }}),
  new InjectedConnector({ options: { id: 'argentX' }}),
]
export default function Home() {
  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#0b0d13]">
    
        <div className="grid grid-flow-row  z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex bg-primary">
          <Navbar />
          <Decompose />
        </div>
   
    </main>
   
  )
}
