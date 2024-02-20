import React from 'react'
import { Link } from "@nextui-org/link";

function Footer() {
    return (
        <footer className="w-full flex items-center justify-center py-3">
            <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                title="nextui.org homepage"
            >
                <span className="text-default-600">Implemented By</span>
                <p className="text-primary-gradient">Project-Xams Group</p>
            </Link>
        </footer>
    )
}

export default Footer