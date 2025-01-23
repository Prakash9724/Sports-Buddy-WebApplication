import React, { useState } from "react"
import { Sidebar, SidebarBody, SidebarLink } from "./SidebarUI.jsx/index.js"
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconUsers,
  IconChartBar,
} from "@tabler/icons-react"

export default function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: <IconChartBar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Profile",
      href: "#",
      icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Users",
      href: "#",
      icon: <IconUsers className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ]
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-neutral-900">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="flex flex-col justify-between h-full">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="py-4">
              <Logo />
            </div>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="py-4">
            <SidebarLink
              link={{
                label: "John Doe",
                href: "#",
                icon: (
                  <img
                    src="https://via.placeholder.com/50"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  )
}

const Logo = () => {
  return (
    <a href="#" className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
      <div className="h-6 w-6 bg-blue-600 rounded-lg mr-2" />
      
    </a>
  )
}

const Dashboard = () => {
  return (
    <div className="flex-1 overflow-auto">
      <header className="bg-white dark:bg-neutral-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UserInfoCard
                title="Personal Information"
                items={[
                  { label: "Name", value: "John Doe" },
                  { label: "Email", value: "john.doe@example.com" },
                  { label: "Phone", value: "+1 (555) 123-4567" },
                ]}
              />
              <UserInfoCard
                title="Account Details"
                items={[
                  { label: "Username", value: "johndoe123" },
                  { label: "Account Type", value: "Premium" },
                  { label: "Member Since", value: "January 1, 2023" },
                ]}
              />
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Activity</h3>
              <div className="bg-white dark:bg-neutral-800 shadow rounded-lg p-4">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { action: "Logged in", time: "2 hours ago" },
                    { action: "Updated profile picture", time: "1 day ago" },
                    { action: "Changed password", time: "3 days ago" },
                    { action: "Completed survey", time: "1 week ago" },
                  ].map((activity, index) => (
                    <li key={index} className="py-3 flex justify-between items-center">
                      <span className="text-gray-900 dark:text-white">{activity.action}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const UserInfoCard = ({ title, items }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{title}</h3>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
        {items.map((item, index) => (
          <div key={index} className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.label}</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

