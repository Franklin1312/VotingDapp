// Contract ABI - Matches your voting.sol contract
const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
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
      "name": "candidates",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "no_of_votes",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "checkElectionperiod",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "electionStarted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "electionTimer",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "listofvoters",
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
      "inputs": [],
      "name": "resetAllVoterStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "retrieveVotes",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "no_of_votes",
              "type": "uint256"
            }
          ],
          "internalType": "struct voting.Candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "_candidates",
          "type": "string[]"
        },
        {
          "internalType": "uint256",
          "name": "_voting_duration",
          "type": "uint256"
        }
      ],
      "name": "start_election",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_voter",
          "type": "address"
        }
      ],
      "name": "voterStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "voteto",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingend",
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
      "name": "votingstart",
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
  ];

// Replace with your deployed contract address
const contractAddress = "0x7935EB0f724AA6264f3b588888c1bb1D3090Db86";

let provider;
let signer;
let contract;
let userAccount;
let timerInterval;

// DOM Elements
const connectWalletDiv = document.getElementById("connectMetaMask");
const votingStationDiv = document.getElementById("VotingStation");
const connectWalletBtn = document.getElementById("ConnectWallet");
const timeDisplay = document.getElementById("time");
const voteInput = document.getElementById("vote");
const sendVoteBtn = document.getElementById("sendVote");
const showResultBtn = document.getElementById("showResult");
const resultDiv = document.getElementById("result");
const startElectionBtn = document.getElementById("startAnElection");
const addCandidateBtn = document.getElementById("addthecandidate");
const candidatesInput = document.getElementById("Candidates");
const electionDurationInput = document.getElementById("electionduration");
const candidateInput = document.getElementById("Candidate");
const adminDiv = document.getElementById("admin");

// Tab Switching Functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Wait for ethers to load
function waitForEthers() {
    return new Promise((resolve) => {
        if (typeof ethers !== 'undefined') {
            resolve();
        } else {
            const checkInterval = setInterval(() => {
                if (typeof ethers !== 'undefined') {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
        }
    });
}

// Initialize
window.addEventListener("load", async () => {
    // Wait for ethers library to load
    await waitForEthers();
    
    if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
        // Don't auto-connect - user must click the Connect button
    } else {
        alert("Please install MetaMask to use this DApp!");
    }
});

// Connect Wallet
connectWalletBtn.addEventListener("click", connectWallet);

async function connectWallet() {
    try {
        // Check if ethers is loaded
        if (typeof ethers === 'undefined') {
            alert("Ethers library is not loaded. Please refresh the page.");
            return;
        }
        
        if (typeof window.ethereum === "undefined") {
            alert("MetaMask is not installed!");
            return;
        }

        // Request account access
        const accounts = await window.ethereum.request({ 
            method: "eth_requestAccounts" 
        });
        window.ethereum.on('chainChanged', (_chainId) => {
            console.log("Chain changed to:", _chainId);
            window.location.reload();
        });
        userAccount = accounts[0];
        
        // Initialize ethers
        provider = new ethers.providers.Web3Provider(window.ethereum,11155111);
        const network = await provider.getNetwork();
        if (network.chainId !== 11155111) { // Sepolia
            alert("Please switch MetaMask to the Sepolia testnet!");
            return;
        }
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        // Hide connect screen, show voting station
        connectWalletDiv.style.display = "none";
        votingStationDiv.style.display = "block";
        
        console.log("Connected account:", userAccount);
        
        // Check if user is admin
        await checkAdmin();
        
        // FOR TESTING: Always show admin panel
        adminDiv.style.display = "block";
        
        // Load candidates
        await loadCandidates();
        
        // Start timer
        await updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
        
    } catch (error) {
        console.error("Error connecting wallet:", error);
        alert("Failed to connect wallet: " + error.message);
    }
}

// Check if connected user is admin
async function checkAdmin() {
    try {
        const ownerAddress = await contract.owner();
        if (ownerAddress.toLowerCase() === userAccount.toLowerCase()) {
            adminDiv.style.display = "block";
        } else {
            adminDiv.style.display = "none";
        }
    } catch (error) {
        console.error("Error checking admin:", error);
        adminDiv.style.display = "none";
    }
}

// Load candidates
async function loadCandidates() {
    try {
        const allCandidates = await contract.retrieveVotes();
        const candidateBoard = document.getElementById("candidateBoard");
        const resultBoard = document.getElementById("resultBoard");
        
        // Clear existing rows except header
        while (candidateBoard.rows.length > 1) {
            candidateBoard.deleteRow(1);
        }
        while (resultBoard.rows.length > 1) {
            resultBoard.deleteRow(1);
        }
        
        // Check if there are candidates
        if (allCandidates.length === 0) {
            console.log("No candidates yet");
            return;
        }
        
        // Load each candidate
        for (let i = 0; i < allCandidates.length; i++) {
            const candidate = allCandidates[i];
            
            // Add to candidate board
            const row1 = candidateBoard.insertRow();
            row1.insertCell(0).textContent = candidate.id.toString();
            row1.insertCell(1).textContent = candidate.name;
            
            // Add to result board
            const row2 = resultBoard.insertRow();
            row2.insertCell(0).textContent = candidate.id.toString();
            row2.insertCell(1).textContent = candidate.name;
            row2.insertCell(2).textContent = candidate.no_of_votes.toString();
        }
    } catch (error) {
        console.error("Error loading candidates:", error);
    }
}

// Update timer
async function updateTimer() {
    try {
        const electionStarted = await contract.electionStarted();
        
        if (!electionStarted) {
            timeDisplay.textContent = "No active election";
            document.getElementById("timermessage").innerHTML = '<span id="time">No active election</span>';
            return;
        }
        
        const remainingTime = await contract.electionTimer();
        const seconds = remainingTime.toNumber();
        
        if (seconds <= 0) {
            timeDisplay.textContent = "0";
            document.getElementById("timermessage").innerHTML = '<span id="time">0</span> seconds left';
            clearInterval(timerInterval);
            alert("Election has ended!");
        } else {
            // Convert seconds to readable format
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            timeDisplay.textContent = seconds.toString();
            document.getElementById("timermessage").innerHTML = `<span id="time">${seconds}</span> seconds left (${minutes}m ${secs}s)`;
        }
    } catch (error) {
        console.error("Error updating timer:", error);
        timeDisplay.textContent = "N/A";
        document.getElementById("timermessage").innerHTML = '<span id="time">N/A</span> seconds left';
    }
}

// Send vote
sendVoteBtn.addEventListener("click", async () => {
    try {
        const candidateId = parseInt(voteInput.value);
        
        if (isNaN(candidateId) || candidateId < 0) {
            alert("Please enter a valid candidate ID!");
            return;
        }
        
        // Check if election is active
        const electionStarted = await contract.electionStarted();
        if (!electionStarted) {
            alert("Election is not active!");
            return;
        }
        
        // Check if user has already voted
        const hasVoted = await contract.voterStatus(userAccount);
        if (hasVoted) {
            alert("You have already voted!");
            return;
        }
        
        // Send vote
        const tx = await contract.voteto(candidateId);
        alert("Vote submitted! Waiting for confirmation...");
        
        await tx.wait();
        alert("Vote confirmed successfully!");
        
        voteInput.value = "";
        await loadCandidates();
        
    } catch (error) {
        console.error("Error sending vote:", error);
        
        if (error.message.includes("You ave already voted")) {
            alert("You have already voted!");
        } else if (error.message.includes("Election period has ended")) {
            alert("Election period has ended!");
        } else if (error.message.includes("no election yet")) {
            alert("No election is currently running!");
        } else if (error.data && error.data.message) {
            alert("Failed to vote: " + error.data.message);
        } else {
            alert("Failed to vote: " + error.message);
        }
    }
});

// Show results
showResultBtn.addEventListener("click", async () => {
    try {
        await loadCandidates();
        resultDiv.style.display = "block";
        alert("Results updated!");
    } catch (error) {
        console.error("Error showing results:", error);
        alert("Failed to load results");
    }
});

// Start election (Admin only)
startElectionBtn.addEventListener("click", async () => {
    try {
        const candidatesStr = candidatesInput.value.trim();
        const duration = parseInt(electionDurationInput.value);
        
        console.log("Input candidates string:", candidatesStr);
        console.log("Input duration:", duration);
        
        if (!candidatesStr) {
            alert("Please enter candidate names!");
            return;
        }
        
        if (isNaN(duration) || duration < 1) {
            alert("Please enter a valid duration in minutes!");
            return;
        }
        
        const candidateNames = candidatesStr.split(",").map(name => name.trim()).filter(name => name.length > 0);
        
        console.log("Parsed candidate names:", candidateNames);
        console.log("Number of candidates:", candidateNames.length);
        
        if (candidateNames.length < 2) {
            alert("Please enter at least 2 candidates!");
            return;
        }
        
        // Duration is already in minutes as per contract
        console.log("Calling start_election with:", candidateNames, duration);
        
        const tx = await contract.start_election(candidateNames, duration);
        alert("Starting election... Please wait for confirmation.");
        
        await tx.wait();
        alert("Election started successfully!");
        
        candidatesInput.value = "";
        electionDurationInput.value = "";
        
        await loadCandidates();
        await updateTimer();
        
    } catch (error) {
        console.error("Error starting election:", error);
        console.error("Error details:", error.reason, error.code, error.data);
        
        if (error.message.includes("Election is ongoing")) {
            alert("An election is already in progress!");
        } else if (error.message.includes("You are not authorised")) {
            alert("You are not authorized to start an election!");
        } else if (error.reason) {
            alert("Failed to start election: " + error.reason);
        } else if (error.data && error.data.message) {
            alert("Failed to start election: " + error.data.message);
        } else {
            alert("Failed to start election: " + error.message);
        }
    }
});

// Add candidate (Admin only)
addCandidateBtn.addEventListener("click", async () => {
    try {
        const candidateName = candidateInput.value.trim();
        
        if (!candidateName) {
            alert("Please enter a candidate name!");
            return;
        }
        
        const tx = await contract.addCandidate(candidateName);
        alert("Adding candidate... Please wait for confirmation.");
        
        await tx.wait();
        alert("Candidate added successfully!");
        
        candidateInput.value = "";
        await loadCandidates();
        
    } catch (error) {
        console.error("Error adding candidate:", error);
        
        if (error.message.includes("no election yet")) {
            alert("Please start an election first!");
        } else if (error.message.includes("Election period as ended")) {
            alert("Cannot add candidates - election period has ended!");
        } else if (error.message.includes("You are not authorised")) {
            alert("You are not authorized to add candidates!");
        } else if (error.data && error.data.message) {
            alert("Failed to add candidate: " + error.data.message);
        } else {
            alert("Failed to add candidate: " + error.message);
        }
    }
});

// Handle account changes
if (window.ethereum) {
    window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length === 0) {
            // User disconnected wallet
            location.reload();
        } else {
            userAccount = accounts[0];
            await checkAdmin();
            console.log("Account changed to:", userAccount);
        }
    });
    
    window.ethereum.on("chainChanged", () => {
        // Reload page on network change
        location.reload();
    });
}