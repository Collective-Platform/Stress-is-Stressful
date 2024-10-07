import Parallax from './components/Parallax'
import Trashcan from './components/Trashcan'

export default function Home() {
  return (
    <main className="bg-dark-blue">
      <Parallax />

      <div className="p-[10%]">
        <p className="m-auto text-xs leading-5 text-oren-4 lg:w-[70%]">
          School work. Family stuff. Friend drama.
          <br />
          <br />
          You&apos;re trying to keep up with trends, but you&apos;re always one
          step behind. You scroll and scroll, but you&apos;re not sure why. You
          are tired, but you keep looking.
          <br />
          <br />
          Ever feel like there&apos;s more to life? <br />
          You&apos;re right. Deep down, you know it. You&apos;re created for
          more. You&apos;re supposed to do something that matters.
          <br />
          <br />
          Take The First Step
          <br />
          <br />
          There&apos;s a lot going on inside you that you don&apos;t always show
          others. Life can get messy, but you are not alone.
          <br />
          <br />
          Don&apos;t use your problems as an excuse to shut others out. We are
          all just one breath away from feeling as if we&apos;re on our own.
          <br />
          <br />
          &quot;When hard pressed, I cried to the Lord; he brought me into a
          spacious place. The Lord is with me; I will not be afraid...&quot;
          <br />
          <br />
          Give all your worries to God. He cares about you. This is not about
          giving up. It&apos;s about giving in. Make room for God to work in
          your life.
          <br />
          <br />
          You own your stress so your stress never owns you.
        </p>
      </div>

      <Trashcan />
    </main>
  )
}
