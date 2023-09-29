import React from "react"
import { useParams } from "react-router-dom"
import { useGetHeroByIdQuery } from "../../redux/heroAPI/heroApi"
import { ErrorHandler } from "../ErrorHandler"
import { Loader } from "../Loader"
import { BackButton } from "../BackButton"

export const HeroDetail: React.FC = () => {
  const { id } = useParams()
  const { data: hero, isError, isLoading } = useGetHeroByIdQuery(id!)

  return (
    <article className="mt-5 relative h-screen flex justify-center items-center">
      <BackButton />
      <div className="p-3 bg-neutral-200 rounded-md">
        <h2 className="mb-3 flex justify-center text-lg font-bold">
          Hero Details
        </h2>
        <ErrorHandler isError={isError}>
          <Loader isLoading={isLoading}>
            {hero && (
              <>
                <div className="mb-3">
                  <strong>ID:</strong> {hero.id}
                </div>
                <div className="mb-3">
                  <strong>HERO:</strong> {hero.name}
                </div>
                <div className="mb-3">
                  <strong>SUPERPOWERS:</strong> {hero.superpowers}
                </div>
              </>
            )}
          </Loader>
        </ErrorHandler>
      </div>
    </article>
  )
}
