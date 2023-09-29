import React from "react"
import { Toaster } from "react-hot-toast"
import {
  useDeleteHeroMutation,
  useGetAllHeroesQuery,
} from "../../redux/heroAPI/heroApi"
import { ErrorHandler } from "../ErrorHandler"
import { Loader } from "../Loader"
import { inintialHero } from "../../types/hero"
import { HeroForm } from "../HeroForm"
import { HeroCard } from "../HeroCard"
import { BackButton } from "../BackButton"

export const Heroes: React.FC = () => {
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

            <BackButton path="/" />
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
