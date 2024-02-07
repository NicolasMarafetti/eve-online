import Link from 'next/link'
import React from 'react'

export default function DashboardHeader() {
    return (
        <header>
            <nav className="text-center text-gray-400">
                <Link className="mx-4 hover:text-white" href="/exploration-dashboard">Exploration Dashboard</Link>
                <Link className="mx-4 hover:text-white" href="/production">Production</Link>
                <Link className="mx-4 hover:text-white" href="/characters">Characters</Link>
            </nav>
        </header>
    )
}
