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
    <div className=' hover:scale-[0.8] transition-all duration-300 rounded-full  text-gray-600 dark:text-gray-400 hover:text-[#4e9999] dark:hover:text-gray-100  flex items-center '>
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