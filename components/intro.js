import { CMS_NAME, CMS_URL } from '../lib/constants'

export default function Intro() {
  return (
    <section className="flex-col md:flex-col flex items-left md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        SensiblLog.
      </h1>
      <h4 className="text-left md:text-left text-lg mt-5 md:pl-2 overline decoration-double">
        logs that make <b>sense</b>.
      </h4>
    </section>
  )
}