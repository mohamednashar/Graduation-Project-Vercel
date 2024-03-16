
import AssignmentCardProf from '../components/AssignmentCardProf';

function AssignmentProf() {


  return (
    <div className="">
      <h1 className="text-2xl font-bold  text-center text-[#66bfbf] my-10"> choose which college you want to make assignment</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-4">
      
          <AssignmentCardProf  subject={"DatabAse"} college={"Engineering"} department ={"Control"}  group={"1"} code={"data-13"}/>
      
          <AssignmentCardProf  subject={"Algorithms"} college={"Computer Science"} department ={"IT"}  group={"2"} code={"Algo-14"} />
          <AssignmentCardProf  subject={"C++"} college={"Engineering"} department ={"Computer Science"}  group={"2"} code={"Cpp-25"} />
          <AssignmentCardProf  subject={"Control"} college={"Engineering"} department ={"Control"}  group={"3"} code={"con-34"} />
          <AssignmentCardProf  subject={"OOP"} college={"Computer Science"} department ={"General"}  group={"1"} code={"oop-65"} />
          <AssignmentCardProf  subject={"AI"} college={"Computer Science"} department ={"AI"}  group={"4"} code={"ai-35"} />
        
      </div>
    
    </div>
  );
}

export default AssignmentProf;