"use client";

import Link from "next/link";
import { useState } from "react";


export default function Search() {

  const [name, setName] = useState('')

  return (
    <div className="flex justify-center items-center w-full">
      <input className="input-primary mr-4" placeholder="Input Pokemon Name" onChange={(e) => setName(e.target.value)} />
      <Link href={`search/${name}`} className="button-primary mt-2" > 
        Submit
      </Link>
    </div>

  )
}
