import {JsonRpcProvider, Contract} from 'ethers';

const provider = new JsonRpcProvider('https://sepolia.infura.io/v3/c575cf3d6fb640b0b72d829525284399');
const walletAddress = "0x6dd36640bcba8ff51e522616c15f52b43eb2a6ab"
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

const contractInteraction = async () => {
    try {
        const walletContract = new Contract(walletAddress, walletAbi, provider);
        const num = await walletContract.getCounter();
        console.log(num);
    } catch (error) {
        console.error("Error interacting with contract:", error);
    }
};
contractInteraction();