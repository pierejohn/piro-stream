import { useState } from "react";
import { SyncLoader } from "react-spinners";
import '../../index.css'

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Spinner() {

  const [color, setColor] = useState('#ffffff');

  return (
    <div className="w-screen h-screen bg-gradient-to-r  from-blue-950 to-purple-950 flex justify-center items-center">
    

     

      <SyncLoader 
      speedMultiplier={0.5}
        color={color}
        cssOverride={override}
        size={15}
        
      />
    </div>
  );
}

export default Spinner;