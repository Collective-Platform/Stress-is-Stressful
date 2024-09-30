import Image from 'next/image'
import Parallax from './components/Parallax'

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-dark-blue to-light-blue p-24">
      <Parallax />

      <div className="lg:flex">
        <div>
          <h1 className="font-pressstart2p decoration-20 text-stroke inline-block bg-gradient-to-b from-orange-600 to-orange-200 bg-clip-text text-6xl text-transparent decoration-solid">
            What&apos;s Stressing You Out?
          </h1>
          <Image src="/room.gif" width={500} height={20} alt={''} />
        </div>
        <div className="flex-col place-items-center">
          <input
            className="h-1/3 w-80 text-wrap rounded-2xl bg-light-blue p-5 font-mono text-xs"
            placeholder="Things that's stressing me out..."
          />
          <input
            className="mt-5 h-5 w-80 rounded-2xl bg-light-blue p-5 font-mono text-xs"
            placeholder="Name"
          />
          <button className="mt-5 justify-center text-sm text-orange-200">
            Toss It In The Trash
          </button>
        </div>
      </div>

      <div className="h-screen flex-col place-self-center">
        <div>
          <div className="flex justify-center">
            <Image
              src="/truck.gif"
              width={400}
              height={20}
              alt={''}
              className=""
            />
          </div>
          <h3 className="text-xl text-orange-200">
            we&apos;re tossing the stress out for you...
          </h3>
        </div>
      </div>
    </main>
  )
}
