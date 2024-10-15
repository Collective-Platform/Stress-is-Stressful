import Parallax from './components/Parallax'
import Trashcan from './components/Trashcan'

export default function Home() {
  return (
    <main className="bg-dark-blue">
      <Parallax />

      <div className="p-[10%] text-left">
        <h1 className="m-auto text-xl leading-7 text-oren-3 lg:w-[70%]">
          School work.
          <br /> Family stuff.
          <br /> Friend drama.
        </h1>
        <p className="m-auto text-xs leading-5 text-oren-1 lg:w-[70%]">
          <br />
          You&apos;re trying to keep up with trends, but you&apos;re always one
          step behind. You scroll and scroll, but you&apos;re not sure why.
          <br />
        </p>
        <p className="m-auto text-xs leading-5 text-oren-1 lg:w-[70%]">
          <br />
          You are tired, but you keep looking.
          <br />
          <br />
        </p>
        <h1 className="m-auto text-xl leading-7 text-oren-3 lg:w-[70%]">
          Ever feel like there&apos;s more to life?
          <br />
          <br />
        </h1>
        <p className="m-auto text-xs leading-5 text-oren-1 lg:w-[70%]">
          There&apos;s a lot going on inside you that you don&apos;t always show
          others. Life can get messy, but you are not alone.
          <br />
          <br />
          Don&apos;t use your problems as an excuse to shut others out. We are
          all just one breath away from feeling as if we&apos;re on our own.
          <br />
          <br />
        </p>
        <p className="m-auto w-[80%] text-center text-xs leading-5 text-oren-3 lg:w-[50%]">
          <br />
          &quot;When hard pressed, I cried to the Lord; he brought me into a
          spacious place. The Lord is with me; I will not be afraid...&quot;
          <br />
          <br />
          <br />
        </p>
        <p className="m-auto text-left text-xs leading-5 text-oren-1 lg:w-[70%]">
          Give all your worries to God. He cares about you. Make room for God to
          work in your life.
          <br />
          <br />
          {/* You own your stress so your stress never owns you. */}
        </p>
      </div>

      <Trashcan />
    </main>
  )
}
