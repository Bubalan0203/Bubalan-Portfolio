'use client'

const Title = ({ title, des }) => (
  <div className="mb-14">
    <p className="text-designColor text-xs font-semibold tracking-[0.2em] uppercase mb-3">{title}</p>
    <h2 className="text-3xl mdl:text-4xl font-bold text-lightText tracking-tight">{des}</h2>
    <div className="mt-4 w-10 h-px bg-designColor" />
  </div>
)

export default Title
