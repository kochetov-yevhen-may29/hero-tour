import React from "react"
import { Link, useNavigate } from "react-router-dom"

type Props = {
  path?: string
}

export const BackButton: React.FC<Props> = ({ path = '/' }) => {
  const navigate = useNavigate()
  return (
    <>
      <div
        className="absolute top-1 left-10 px-6 cursor-pointer
              py-1 rounded-md bg-gray-600 text-white max-[550px]:hidden"
        onClick={() => navigate(`${path}`)}
      >
        Back
      </div>
      <span className="absolute top-0.5 left-1 text-2xl min-[550px]:hidden">
        <Link to="/">&#8592;</Link>
      </span>
    </>
  )
}
