import React from "react"
import toast from "react-hot-toast"
import { Hero, inintialHero } from "../../types/hero"
import { useCreateHeroMutation } from "../../redux/heroAPI/heroApi"

type Props = {
  heroData: Omit<Hero, "id">
  changeHeroData: (heroData: Omit<Hero, "id">) => void
}

export const HeroForm: React.FC<Props> = ({
  heroData,
  changeHeroData,
}) => {
  const [createHero, { isError }] = useCreateHeroMutation()
  const clearHeroData = () => {
    changeHeroData(inintialHero)
  }

  const handleHeroFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeHeroData({
      ...heroData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!heroData.name.trim() || !heroData.superpowers.trim()) {
      toast.error(
        "Enter data if you want to create a Hero, and all fields are required!",
      )

      return
    }

    if (isError) {
      toast.error("Error when you trying to create a Hero")
    }

    const newHero = {
      ...heroData,
      name: heroData.name,
      superpowers: heroData.superpowers,
    }

    await createHero(newHero)
      .unwrap()
      .then(() => {
        clearHeroData()
        toast.success("Hero has been created")
      })
      .catch((error: string) => {
        throw new Error(`Something went wrong: ${error}`)
      })
  }

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <label htmlFor="name" className="mb-1">
        <strong>Hero Name: </strong>
      </label>
      <input
        className="mb-1 py-1 rounded-md pl-2 outline-none"
        id="name"
        placeholder="Name"
        name="name"
        value={heroData.name}
        onChange={handleHeroFieldChange}
      />
      <label htmlFor="superpowers" className="mb-1">
        <strong>Hero Superpowers: </strong>
      </label>
      <input
        className="mb-1 py-1 rounded-md pl-2 outline-none"
        id="superpowers"
        placeholder="Superpowers"
        name="superpowers"
        value={heroData.superpowers}
        onChange={handleHeroFieldChange}
      />
      <button
        type="submit"
        className="m-auto w-32 mt-5 py-2 text-white bg-gray-600 rounded-md
                hover:bg-slate-500"
      >
        Create Hero
      </button>
    </form>
  )
}
