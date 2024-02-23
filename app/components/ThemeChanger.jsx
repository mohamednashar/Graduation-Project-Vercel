"use client"
import { useTheme } from 'next-themes'
import { useState , useEffect } from 'react'
import { MoonIcon,SunIcon } from '@heroicons/react/24/outline'
function ThemeChanger() {
  const { theme, setTheme } = useTheme()
  const [mounted , setMounted]=useState(false)

  useEffect(()=>{
      setMounted(true)
  },[])

  if(!mounted){
    return null
  }
  return (
    <div className=' rounded-full p-1 text-gray-600 dark:text-gray-400 hover:text-[#f76b8a] dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center pr-2 pl-4'>
    {
      theme==="dark"? 
      <button  onClick={() => setTheme('light')}>  
          <MoonIcon className="h-6 w-6" aria-hidden="true" />
      </button> 
      : 
      <button  onClick={() => setTheme('dark')}>

<SunIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    }
    </div>
  )
}

export default ThemeChanger