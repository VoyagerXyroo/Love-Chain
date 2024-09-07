let web3;
let account;
let contract;

const contractAddress ='0xE270719956aEbaA2f2A93776520Af28659633751';
const contractABI = [
	[
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "newWord",
					"type": "string"
				}
			],
			"name": "addWord",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "getWord",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getWordCount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "words",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]
];

async function loadWeb3() {
  if (typeof window.ethereum !== 'undefined') {
    // MetaMask atau wallet Web3 lainnya tersedia
    web3 = new Web3(window.ethereum);
    try {
      // Meminta akses ke akun pengguna
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      account = (await web3.eth.getAccounts())[0];
      document.getElementById('account').innerText = `Connected: ${account}`;
      loadContract();
    } catch (error) {
      console.error("User denied account access", error);
    }
  } else {
    alert("Please install MetaMask or another Web3 wallet.");
  }
}

async function loadContract() {
  contract = new web3.eth.Contract(contractABI, contractAddress);
}

async function addWord() {
  const word = document.getElementById('wordInput').value;
  if (!word) {
    alert("Please enter a word");
    return;
  }

  try {
    await contract.methods.addWord(word).send({ from: account });
    alert(`Word "${word}" added to blockchain!`);
  } catch (error) {
    console.error("Error adding word to blockchain", error);
  }
}

async function displayWords() {
  try {
    const wordCount = await contract.methods.getWordCount().call();
    let wordList = '';
    for (let i = 0; i < wordCount; i++) {
      const word = await contract.methods.words(i).call();
      wordList += `<li>${word}</li>`;
    }
    document.getElementById('wordList').innerHTML = wordList;
  } catch (error) {
    console.error("Error fetching words from blockchain", error);
  }
}

window.addEventListener('load', async () => {
  await loadWeb3();
  document.getElementById('addWordButton').addEventListener('click', addWord);
  document.getElementById('loadWordsButton').addEventListener('click', displayWords);
});
