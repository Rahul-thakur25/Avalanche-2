import {ethers} from 'ethers';
import { useState, useEffect } from 'react';


function Main(){
    // eslint-disable-next-line no-unused-vars
    const [signer,setSigner] = useState(null)
    const[counter, setCounter] = useState(0);
    const [contract, setContract] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const walletAbi = [
      {
            "inputs": [],
            "name": "decrement",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "increment",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "_num",
                        "type": "uint256"
                  }
            ],
            "name": "setValue",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
      },
      {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
      },
      {
            "inputs": [],
            "name": "getCounter",
            "outputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      }
]
const walletAddress = "0x6dd36640bcba8ff51e522616c15f52b43eb2a6ab";
      
     
useEffect(()=>{
      const ConnectMeta  = async () =>{
           
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    
                    // We now have access to the user's MetaMask accounts
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = await provider.getSigner();
                    setSigner(signer);
                    
                    const walletContract = new ethers.Contract(walletAddress, walletAbi, signer);
                    setContract(walletContract);
                    
                  }
                
            ConnectMeta();
});
      
const increment = async () =>{
      if(contract){
       const tx = await  contract.increment(); 
       await tx.wait(); 
       const newValue = await contract.getCounter();
       setCounter(newValue.toString());
      }
      
     
    }
    const decrement = async () =>{
      if(contract){
            const tx = await  contract.decrement(); 
            await tx.wait(); 
            const newValue = await contract.getCounter();
            setCounter(newValue.toString());
      }
}
const handleChange = (e)=>{
      setInputValue(e.target.value);
}
const ValueSet = async ()=>{
      if(contract){               
              const tx = await  contract.setValue(inputValue); 
              await tx.wait(); 
              const newValue = await contract.getCounter();
              setCounter(newValue.toString());
      }
    }

      return(
            <div className="w-1/2 h-96 flex content-center flex-col ml-96 mt-44 box-border pl-52">
                  <h1 className="font-semibold text-xl mb-4 tracking-tight ml-28">Count:{counter} </h1>
                  
                  <div className = "m-2 -mt-2">
                  
                  <button type="button" className="m-2 bg-transparent hover:bg-blue-500 w-1/4 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={increment}>Increment</button>

                  <button className="bg-transparent w-1/4 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border m-2 border-blue-500 hover:border-transparent rounded" onClick={decrement}>Decrement</button>
                  
                  </div>
                  
                  <div className="ml-7">
                    
                    <label htmlFor="" className="mr-2">SET VALUE</label>
                    <input type="number" value={inputValue} onChange={handleChange}/>

                    <button className="bg-transparent w-1/4 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border m-2 border-blue-500 hover:border-transparent rounded" onClick={ValueSet}>SET VAlUE</button>

                    
                  </div>
                  
             </div>
      )
}


export default Main;