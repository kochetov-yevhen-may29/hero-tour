import React from "react"
import { useParams } from "react-router-dom"
import { useGetHeroByIdQuery } from "../../redux/heroAPI/heroApi"
import { ErrorHandler } from "../ErrorHandler"
import { Loader } from "../Loader"

export const HeroDetail: React.FC = () => {
  const { id } = useParams()
  const { data: hero, isError, isLoading } = useGetHeroByIdQuery(id!)

  return (
    <div className="hero-detail-container">
      <h2>Hero Details</h2>
      <ErrorHandler isError={isError}>
        <Loader isLoading={isLoading}>
        {hero && (
        <>
          <div className="hero-detail-item">
            <strong>ID:</strong> {hero.id}
          </div>
          <div className="hero-detail-item">
            <strong>HERO:</strong> {hero.name}
          </div>
          <div className="hero-detail-item">
            <strong>SUPERPOWERS:</strong> {hero.superpowers}
          </div>
        </>
      )}
        </Loader>
      </ErrorHandler>
    </div>
  )
}