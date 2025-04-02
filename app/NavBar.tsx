"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { VscDebugAll } from "react-icons/vsc"
import { useSession, signIn, signOut } from 'next-auth/react'
import { Box, DropdownMenu, Text, Flex } from '@radix-ui/themes'
import Image from 'next/image'

const NavBar = () => {
    const currentPath = usePathname()
    const { status, data: session } = useSession()
    const links = [{ label: 'Dashboard', path: '/' }, { label: 'Issues', path: '/issues' }]

    return (
        <nav className="bg-black px-4 py-3 border-b border-gray-700">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">

                {/* Left - Logo & Nav Links */}
                <div className="flex items-center justify-between md:justify-normal gap-6">
                    <Link href="/" className="text-white text-2xl hover:text-purple-400 transition-colors">
                        <VscDebugAll />
                    </Link>
                    <ul className="flex gap-4">
                        {links.map(link => (
                            <li key={link.path}>
                                <Link href={link.path} className={`px-3 py-1 text-white transition-all ${currentPath === link.path ? "font-medium text-purple-300 border-b-2 border-purple-400" : "hover:text-purple-300"}`}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right - Profile Dropdown */}
                <Box>
                    {status === "authenticated" ? (
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger className="outline-none">
                                <Image 
                                    width={40} height={40}
                                    src={session?.user?.image || ""} 
                                    alt="User Avatar" 
                                    className="w-9 h-9 rounded-full cursor-pointer border border-gray-600 hover:border-purple-400 transition"
                                    referrerPolicy="no-referrer"
                                />
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Content align="end" className="bg-gray-900 shadow-lg rounded-lg p-2 min-w-[200px]">
                                {/* User Info */}
                                <DropdownMenu.Label className="px-3 py-2 text-white">
                                    <Flex direction="column">
                                        <Text className="text-sm font-semibold">{session?.user?.name}</Text>
                                        <Text className="text-xs text-gray-400">{session?.user?.email}</Text>
                                    </Flex>
                                </DropdownMenu.Label>

                                <DropdownMenu.Separator className="my-1 border-gray-700" />

                                {/* Logout Button */}
                                <DropdownMenu.Item 
                                    onClick={() => signOut()} 
                                    className="text-red-700 px-3 py-2 rounded-md hover:bg-red-700 hover:text-white transition cursor-pointer"
                                >
                                    Logout
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    ) : (
                        <button 
                            onClick={() => signIn()} 
                            className="px-3 py-1 text-sm rounded text-white bg-gray-800 hover:bg-green-600 transition-colors focus:outline-none"
                        >
                            Login
                        </button>
                    )}
                </Box>
            </div>
        </nav>
    )
}

export default NavBar
