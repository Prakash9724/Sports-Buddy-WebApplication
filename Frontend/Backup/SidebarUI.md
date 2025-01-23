import React, { useState, createContext, useContext, useEffect } from "react"
import { IconMenu2, IconX } from "@tabler/icons-react"

const SidebarContext = createContext()

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export const SidebarProvider = ({ children, open: openProp, setOpen: setOpenProp, animate = true }) => {
  const [openState, setOpenState] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const open = openProp !== undefined ? openProp : openState
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return <SidebarContext.Provider value={{ open, setOpen, animate, isMobile }}>{children}</SidebarContext.Provider>
}

export const Sidebar = ({ children, open, setOpen, animate }) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  )
}

export const SidebarBody = (props) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  )
}

export const DesktopSidebar = ({ className, children, ...props }) => {
  const { open, setOpen, animate, isMobile } = useSidebar()

  if (isMobile) return null

  return (
    <div
      className={`h-full py-4 flex flex-col bg-white dark:bg-neutral-800 shadow-lg flex-shrink-0 transition-all duration-300 ease-in-out ${className}`}
      style={{
        width: open ? "240px" : "60px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      <div className={`px-4 mb-6 transition-all duration-300 ${open ? "opacity-100" : "opacity-0"}`}>
        <Logo />
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4">{children}</div>
    </div>
  )
}

export const MobileSidebar = ({ className, children, ...props }) => {
  const { open, setOpen, isMobile } = useSidebar()

  if (!isMobile) return null

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-16 px-4 flex items-center justify-between bg-white dark:bg-neutral-800 w-full shadow-md z-50`}
        {...props}
      >
        <Logo />
        <IconMenu2 className="text-gray-500 dark:text-gray-400 h-6 w-6" onClick={() => setOpen(!open)} />
      </div>
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transition-opacity duration-300 ease-in-out ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-neutral-800 p-6 overflow-y-auto transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "-translate-x-full"
          } ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <Logo />
            <IconX className="text-gray-500 dark:text-gray-400 h-6 w-6" onClick={() => setOpen(false)} />
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export const SidebarLink = ({ link, className, ...props }) => {
  const { open, animate, isMobile } = useSidebar()
  return (
    <a
      href={link.href}
      className={`flex items-center justify-start gap-2 group/sidebar py-2 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors ${className}`}
      {...props}
    >
      {link.icon}
      <span
        className={`text-gray-700 dark:text-gray-200 text-sm whitespace-pre transition-all duration-300 ease-in-out ${
          open || isMobile ? "opacity-100 max-w-full" : "opacity-0 max-w-0 overflow-hidden"
        }`}
      >
        {link.label}
      </span>
    </a>
  )
}

const Logo = () => {
  return (
    <a href="#" className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
      <div className="h-6 w-6 bg-blue-600 rounded-lg mr-2" />
      <span>Dashboard</span>
    </a>
  )
}

