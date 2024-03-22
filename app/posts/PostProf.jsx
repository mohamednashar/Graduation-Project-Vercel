import CardCourses from "../components/CardCourses";


function PostProf() {


  return (
    <div className="">
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 p-4 gap-5 ">
      
          <CardCourses link={"posts"} subject={"Database"} college={"Engineering"} department ={"Control"}  group={"1"} code={"data-13"}/>
      
          <CardCourses link={"posts"} subject={"Algorithms"} college={"Computer Science"} department ={"IT"}  group={"2"} code={"Algo-14"} />
          <CardCourses link={"posts"} subject={"C++"} college={"Engineering"} department ={"Computer Science"}  group={"2"} code={"Cpp-25"} />
          <CardCourses link={"posts"} subject={"Control"} college={"Engineering"} department ={"Control"}  group={"3"} code={"con-34"} />
          <CardCourses link={"posts"} subject={"OOP"} college={"Computer Science"} department ={"General"}  group={"1"} code={"oop-65"} />
          <CardCourses link={"posts"} subject={"AI"} college={"Computer Science"} department ={"AI"}  group={"4"} code={"ai-35"} />
        
      </div>
    
    </div>
  );
}

export default PostProf;