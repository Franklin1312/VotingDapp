const hre = require("hardhat");

async function main(){
    const votingContract = await hre.ethers.getContractFactory("voting");
    const deployedVotingContract = await votingContract.deploy();

    console.log(`Conract Address deployed: ${deployedVotingContract.target}`)

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

//Conract Address deployed:0x7935EB0f724AA6264f3b588888c1bb1D3090Db86
//https://sepolia.etherscan.io/address/0x7935EB0f724AA6264f3b588888c1bb1D3090Db86#code