import getData from "./useGet"


export const getFaculties = async()=>{
  const data = await getData("Faculty/GetFaculties")
  return {data}
 }

 export const getDepartments = async()=>{
  const data = await getData("Departement/GetDepartements")
  return {data}
 }