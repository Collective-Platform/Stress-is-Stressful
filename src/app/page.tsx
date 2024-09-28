import Parallax from './components/Parallax'
import Trashcan from './components/Trashcan'

export default function Home() {
  return (
    <main className="bg-dark-blue">
      <Parallax />

      <div className="p-[10%]">
        <p className="m-auto text-xs leading-5 text-oren-4 lg:w-[70%]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex molestiae
          officiis laboriosam molestias omnis adipisci minus cum iure rerum,
          velit, numquam consequuntur! Error, eos. Corporis magni perferendis
          voluptatem non minus.
          <br></br>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio fuga
          ipsam vero officia modi veritatis qui amet! Optio ipsam obcaecati, a
          ducimus esse aut temporibus blanditiis quas at vitae sequi.
          <br></br>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum modi
          molestiae obcaecati incidunt quae nostrum vero quibusdam animi, enim,
          assumenda, magni tempora perferendis id tenetur ipsum ratione mollitia
          deleniti reprehenderit?
        </p>
      </div>

      <Trashcan />
    </main>
  )
}
