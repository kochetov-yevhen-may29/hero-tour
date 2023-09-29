import React from "react"
import { Toaster } from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import {
  useDeleteHeroMutation,
  useGetAllHeroesQuery,
} from "../../redux/heroAPI/heroApi"
import { ErrorHandler } from "../ErrorHandler"
import { Loader } from "../Loader"
import { inintialHero } from "../../types/hero"
import { HeroForm } from "../HeroForm"
import { HeroCard } from "../HeroCard"

export const Heroes: React.FC = () => {
  const navigate = useNavigate()
  const { data: heroes, isError, isLoading } = useGetAllHeroesQuery(100)
  const [deleteHero, { isError: isDeleteError }] = useDeleteHeroMutation()
  const [heroData, setHeroData] = React.useState(inintialHero)

  return (
    <article className="relative m-4">
      <Toaster />
      <h1 className="mb-8 text-3xl text-center text-sky-800 uppercase">
        My Heroes
      </h1>

      <div className="mx-auto">
        <ErrorHandler isError={isError}>
          <Loader isLoading={isLoading}>
            <div
              className="flex justify-center w-72 h-56 m-auto mb-8 p-5
            bg-neutral-400 rounded-md"
            >
              <HeroForm
                changeHeroData={setHeroData}
                heroData={heroData}
              />
            </div>

            <div
              className="absolute top-1 left-10 px-6 cursor-pointer
              py-1 rounded-md bg-gray-600 text-white max-[550px]:hidden"
              onClick={() => navigate("/")}
            >
              Back
            </div>
            <span className="absolute top-0.5 left-1 text-2xl min-[550px]:hidden">
              <Link to="/">&#8592;</Link>
            </span>
            <ul className="flex justify-center flex-wrap gap-3 xl:justify-start">
              {heroes &&
                heroes.map((hero) => (
                  <HeroCard
                    key={hero.id}
                    hero={hero}
                    remove={deleteHero}
                    isError={isDeleteError}
                  />
                ))}
            </ul>
          </Loader>
        </ErrorHandler>
      </div>
    </article>
  )
}
