import Link from 'next/link'
import React from 'react'

export default function DashboardHeader() {
    return (
        <header className="bg-black/75">
            <nav className="text-center text-gray-400">
                <Link className="mx-4 hover:text-white" href="/exploration-dashboard">Exploration Dashboard</Link>
                <Link className="mx-4 hover:text-white" href="/characters">Characters</Link>
                <Link className="mx-4 hover:text-white" href="/fits">Fits</Link>
                <Link className="mx-4 hover:text-white" href="/objets">Objets</Link>
                <Link className="mx-4 hover:text-white" href="/production">Production</Link>
                <Link className="mx-4 hover:text-white" href="/stations">Stations</Link>
            </nav>
        </header>
    )
}
