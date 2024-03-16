
import AssignmentCardStudent from '../components/AssignmentCardStudent';

function AssignmentStudent() {


  return (
    <div className="">
      <h1 className="text-2xl font-bold my-4 text-center"> Assignments</h1>
      <div className="grid grid-cols-3 gap-4">
      
          <AssignmentCardStudent  subject={"Algorithms"} chapter={"2"} type={"prof"} name={"Usama"}   points={"10"} date={"30/7/2024"} code={"CSE-Algo"} />
      
          <AssignmentCardStudent  subject={"Database"} chapter={"1"} type={"Assistant"} name={"ibrahem"}   points={"5"} date={"28/7/2024"} code={"CSE-Data"} />
          <AssignmentCardStudent  subject={"Database"} chapter={"1"} type={"Assistant"} name={"ibrahem"}   points={"5"} date={"28/7/2024"} code={"CSE-Data"} />
          <AssignmentCardStudent  subject={"Database"} chapter={"1"} type={"Assistant"} name={"ibrahem"}   points={"5"} date={"28/7/2024"} code={"CSE-Data"} />
          <AssignmentCardStudent  subject={"Database"} chapter={"1"} type={"Assistant"} name={"ibrahem"}   points={"5"} date={"28/7/2024"} code={"CSE-Data"} />
          <AssignmentCardStudent  subject={"Database"} chapter={"1"} type={"Assistant"} name={"ibrahem"}   points={"5"} date={"28/7/2024"} code={"CSE-Data"} />
          <AssignmentCardStudent  subject={"Database"} chapter={"1"} type={"Assistant"} name={"ibrahem"}   points={"5"} date={"28/7/2024"} code={"CSE-Data"} />
          <AssignmentCardStudent  subject={"Database"} chapter={"1"} type={"Assistant"} name={"ibrahem"}   points={"5"} date={"28/7/2024"} code={"CSE-Data"} />
      </div>
    
    </div>
  );
}

export default AssignmentStudent;