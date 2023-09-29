import React from "react"
import { Hero, inintialHero } from "../../types/hero"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useUpdateHeroMutation } from "../../redux/heroAPI/heroApi"

type Props = {
  hero: Hero
  remove: (id: number) => void
  isError: boolean
}

export const HeroCard: React.FC<Props> = ({ hero, remove, isError }) => {
  const navigate = useNavigate()
  const [isEditClicked, setIsEditClicked] = React.useState(false)
  const [heroData, setHeroData] = React.useState(hero as Omit<Hero, "id">)
  const [updateHero, { isError: isUpdateError }] = useUpdateHeroMutation()

  const handleHeroFieldUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeroData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isUpdateError) {
      toast.error("Hero has not been updated")
    }

    if (
      heroData.name === hero.name &&
      heroData.superpowers === hero.superpowers
    ) {
      toast.success("None of the fields have been changed")
      setIsEditClicked(false)

      return
    }

    if (!heroData.name.trim() || !heroData.superpowers.trim()) {
      toast.error("No field can be empty")
      setIsEditClicked(false)

      return
    }

    const updatedHero = {
      ...heroData,
      name: heroData.name,
      superpowers: heroData.superpowers,
    }

    await updateHero(updatedHero)
      .unwrap()
      .then(() => {
        setIsEditClicked(false)

        toast.success("Hero has been updated")
      })
      .catch((error) => {
        throw new Error(`Something went wrong${error}`)
      })
  }

  const handleCardClick = () => {
    if (!isEditClicked) {
      navigate(`/heroes/detail/${hero.id}`)
    }
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditClicked(true)

    setHeroData(hero)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditClicked(true)

    if (isError) {
      toast.error("error")

      return
    }

    remove(hero.id)
    toast.success("Hero has been deleted")
  }

  return (
    <>
      {isEditClicked ? (
        <form
          onSubmit={handleSubmit}
          className="relative w-72 p-3 rounded-md bg-slate-300 cursor-pointer
        transition-transform transform scale-100 hover:scale-105 focus:scale-105"
        >
          <p
            className="absolute right-3 top-2 w-6 text-center
                      font-bold text-lg"
            onClick={handleRemove}
          >
            &times;
          </p>
          <p className="font-bold">
            ID: <span className="font-normal">{hero.id}</span>
          </p>
          <p className="font-bold">
            Name:{" "}
            <input
              className="w-3/5 pl-2 py-0.5 mt-2 outline-none font-normal"
              name="name"
              value={heroData.name}
              onChange={handleHeroFieldUpdate}
            />
          </p>
          <p className="font-bold">
            Superpowers:
            <input
              className="w-3/5 pl-2 py-0.5 mt-2 outline-none font-normal"
              name="superpowers"
              value={heroData.superpowers}
              onChange={handleHeroFieldUpdate}
            />
          </p>
          <button
            type="submit"
            className="inline-block m-auto w-20 mt-8 py-0.5 
            text-white bg-gray-600 rounded-md hover:bg-slate-500"
          >
            Accept
          </button>
        </form>
      ) : (
        <li
          onClick={handleCardClick}
          className="relative w-72 p-3 rounded-md bg-slate-300 cursor-pointer
      transition-transform transform scale-100 hover:scale-105 focus:scale-105"
        >
          <p
            className="absolute right-3 top-2 w-6 text-center
                      font-bold text-lg"
            onClick={handleRemove}
          >
            &times;
          </p>
          <p className="font-bold">
            ID: <span className="font-normal">{hero.id}</span>
          </p>
          <p className="font-bold mt-2">
            Name: <span className="font-normal">{hero.name}</span>
          </p>
          <p className="font-bold mt-2">
            Superpowers: <span className="font-normal">{hero.superpowers}</span>
          </p>
          <button
            type="button"
            onClick={handleEditClick}
            className="inline-block m-auto w-20 mt-10 py-0.5 
          text-white bg-gray-600 rounded-md hover:bg-slate-500"
          >
            Edit
          </button>
        </li>
      )}
    </>
  )
}
