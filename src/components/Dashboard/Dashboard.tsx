import React from "react"
import { Link } from "react-router-dom"
import { useGetAllHeroesQuery } from "../../redux/heroAPI/heroApi"
import { ErrorHandler } from "../ErrorHandler"
import { Loader } from "../Loader"

export const Dashboard: React.FC = () => {
  const { data: heroes, isError, isLoading } = useGetAllHeroesQuery(10)
  return (
    <>
      <h2>Top Heroes</h2>
      <ErrorHandler isError={isError}>
        <Loader isLoading={isLoading}>
          <div className="heroes-menu">
            {heroes &&
              heroes.slice(0, 5).map((topHero) => (
                <Link to={`detail/${topHero.id}`} key={topHero.id}>
                  {topHero.name}
                </Link>
              ))}
          </div>
        </Loader>
      </ErrorHandler>
    </>
  )
}
